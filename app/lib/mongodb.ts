import { MongoClient, MongoClientOptions, Db, Collection, Document } from "mongodb";
import { cache } from "react";

// Validate environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "eleservsoftech";

// Enhanced options for better performance
const options: MongoClientOptions = {
  maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || "20", 10),
  minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || "10", 10),
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  retryReads: true,
  serverSelectionTimeoutMS: 5000,
  compressors: ["snappy", "zlib"],
  maxIdleTimeMS: 120000,
  waitQueueTimeoutMS: 10000,
  tls: uri.includes("ssl=true") || uri.includes("mongodb+srv://"),
  monitorCommands: process.env.NODE_ENV === "development",
};

// Global types
interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoDb?: Db;
  _collections: { [key: string]: Collection };
}

// Extend global object
const globalWithMongo = global as typeof globalThis & GlobalWithMongo;
globalWithMongo._collections = globalWithMongo._collections || {};

// Connection cache with performance optimization
let clientPromise: Promise<MongoClient>;
let dbPromise: Promise<Db>;

// Enhanced connection retry logic with exponential backoff
const connectWithRetry = async (
  uri: string,
  options: MongoClientOptions,
  retries = 5,
  initialDelay = 1000
): Promise<MongoClient> => {
  let lastError: Error | null = null;
  let delay = initialDelay;

  for (let i = 0; i < retries; i++) {
    try {
      const client = new MongoClient(uri, options);
      await client.connect();

      // Setup event listeners for monitoring
      client.on("connectionPoolCreated", (event) => {
        console.log("MongoDB pool created:", event);
      });

      client.on("connectionPoolClosed", (event) => {
        console.log("MongoDB pool closed:", event);
      });

      client.on("serverHeartbeatFailed", (event) => {
        console.error("MongoDB heartbeat failed:", event);
      });

      return client;
    } catch (err) {
      lastError = err as Error;
      console.error(
        `MongoDB connection attempt ${i + 1} failed:`,
        err,
        `Retrying in ${delay}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }

  throw new Error(
    `Failed to connect to MongoDB after ${retries} attempts: ${lastError?.message}`
  );
};

// Initialize connection with caching
if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectWithRetry(uri, options);
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    clientPromise = globalWithMongo._mongoClientPromise;
  }
} else {
  clientPromise = connectWithRetry(uri, options);
}

// Cached database getter
export const getDb = cache(async (): Promise<Db> => {
  if (!dbPromise) {
    const client = await clientPromise;
    dbPromise = Promise.resolve(client.db(dbName));
  }
  return dbPromise;
});

// Cached collection getter
export const getCollection = cache(async <T extends Document>(name: string): Promise<Collection<T>> => {
  if (!globalWithMongo._collections[name]) {
    const db = await getDb();
    globalWithMongo._collections[name] = db.collection(name);
  }
  return globalWithMongo._collections[name] as unknown as Collection<T>;
});

// Health check with detailed diagnostics
export const checkMongoHealth = async (): Promise<{
  isHealthy: boolean;
  details: Record<string, any>;
}> => {
  try {
    const client = await clientPromise;
    const adminDb = client.db("admin");

    const [serverStatus, ping] = await Promise.all([
      adminDb.command({ serverStatus: 1 }),
      adminDb.command({ ping: 1 }),
    ]);

    return {
      isHealthy: true,
      details: {
        connections: serverStatus.connections,
        uptime: serverStatus.uptime,
        ping: ping.ok,
        version: serverStatus.version,
      },
    };
  } catch (err) {
    console.error("MongoDB health check failed:", err);
    return {
      isHealthy: false,
      details: { error: err instanceof Error ? err.message : "Unknown error" },
    };
  }
};

// Graceful shutdown with cleanup
export const closeMongoConnection = async (): Promise<void> => {
  try {
    const client = await clientPromise;
    await client.close(true); // Force close
    console.log("MongoDB connection closed successfully");

    // Clear caches
    globalWithMongo._mongoClientPromise = undefined;
    globalWithMongo._mongoDb = undefined;
    globalWithMongo._collections = {};
    
    // Clear promises
    clientPromise = undefined as any;
    dbPromise = undefined as any;
  } catch (err) {
    console.error("Error during MongoDB shutdown:", err);
    throw err;
  }
};

// Handle process termination
if (typeof process !== "undefined") {
  const shutdown = async () => {
    console.log("Shutting down MongoDB connections...");
    await closeMongoConnection();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("SIGQUIT", shutdown);
}

export default clientPromise;
export type { MongoClient, Db, Collection };

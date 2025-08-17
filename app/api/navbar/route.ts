import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { revalidatePath } from "next/cache";
import {
  NavbarConfigSchema,
  DEFAULT_NAVBAR_CONFIG,
} from "@/app/lib/models/navbar";

// Cache MongoDB connection and collection reference
let cachedDb: any = null;
let cachedCollection: any = null;

async function getCollection() {
  if (cachedDb && cachedCollection) {
    return { db: cachedDb, collection: cachedCollection };
  }

  const client = await clientPromise;
  cachedDb = client.db("excellentearningdb");
  cachedCollection = cachedDb.collection("navbar");

  return { db: cachedDb, collection: cachedCollection };
}

export async function GET() {
  try {
    const { collection } = await getCollection();

    const navbar = await collection.findOne(
      { id: "main" },
      { projection: { _id: 0 } }
    );

    const data = navbar?.config || DEFAULT_NAVBAR_CONFIG;

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching navbar configuration:", error);

    return NextResponse.json(DEFAULT_NAVBAR_CONFIG, {
      status: 200,
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate input data
    const validationResult = NavbarConfigSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: validationResult.error.format(),
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    const { collection } = await getCollection();

    // First, try to get the existing document to check if it exists
    const existingDoc = await collection.findOne({ id: "main" });

    const updateData = {
      config: validationResult.data,
      updatedAt: new Date().toISOString(),
    };

    let result;

    if (existingDoc) {
      // Document exists, update it and increment version
      result = await collection.updateOne(
        { id: "main" },
        {
          $set: updateData,
          $inc: { version: 1 },
        }
      );
    } else {
      // Document doesn't exist, create it with initial version
      result = await collection.updateOne(
        { id: "main" },
        {
          $set: {
            ...updateData,
            id: "main",
            createdAt: new Date().toISOString(),
            version: 1,
          },
        },
        { upsert: true }
      );
    }

    // Revalidate paths
    revalidatePath("/api/navbar");
    revalidatePath("/");
    revalidatePath("/admin/navbar");

    return NextResponse.json(
      {
        success: true,
        message: "Navbar configuration updated successfully",
        data: { id: "main", ...updateData },
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error updating navbar configuration:", error);

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        {
          status: 400,
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Failed to update navbar configuration" },
      {
        status: 500,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}

export async function DELETE() {
  try {
    const { collection } = await getCollection();

    const result = await collection.deleteOne({ id: "main" });

    // Revalidate paths
    revalidatePath("/api/navbar");
    revalidatePath("/");
    revalidatePath("/admin/navbar");

    return NextResponse.json(
      {
        success: true,
        message: "Navbar configuration deleted successfully",
        deletedCount: result.deletedCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting navbar configuration:", error);

    return NextResponse.json(
      { error: "Failed to delete navbar configuration" },
      {
        status: 500,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}

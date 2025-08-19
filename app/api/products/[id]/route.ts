import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// Types
export interface TopViralProduct {
  _id?: string;
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  image: string;
  isNew: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  downloadCount: number;
  fileSize: string;
  format: string;
  compatibility: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  order: number;
  status: "active" | "inactive" | "draft";
  sectionId: string;
}

// MongoDB Collection Names
const PRODUCTS_COLLECTION = "top_viral_products";

// GET - Fetch product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);

    console.log("API: Fetching product with ID:", id);

    if (!id) {
      console.log("API: No product ID provided");
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const productsCollection = await getCollection(PRODUCTS_COLLECTION);
    console.log("API: MongoDB collection obtained");

    // Check if collection has documents
    const documentCount = await productsCollection.countDocuments();
    console.log("API: Collection document count:", documentCount);

    // Try to find product by ID
    let product = await productsCollection.findOne({ id });
    console.log(
      "API: Product search by ID result:",
      product ? "Found" : "Not found"
    );

    // If not found by ID, try to find by _id (MongoDB ObjectId)
    if (!product && /^[0-9a-fA-F]{24}$/.test(id)) {
      console.log("API: Trying to find by MongoDB ObjectId");
      product = await productsCollection.findOne({ _id: new ObjectId(id) });
      console.log(
        "API: Product search by ObjectId result:",
        product ? "Found" : "Not found"
      );
    }

    if (!product) {
      console.log("API: Product not found in database");
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if product is active
    if (product.status !== "active") {
      console.log("API: Product found but status is:", product.status);
      return NextResponse.json(
        { success: false, error: "Product is not available" },
        { status: 404 }
      );
    }

    console.log("API: Product found successfully:", product.title);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("API: GET product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

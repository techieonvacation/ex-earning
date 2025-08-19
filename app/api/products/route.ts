import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/app/lib/mongodb";

// MongoDB Collection Names
const PRODUCTS_COLLECTION = "top_viral_products";

// GET - List all products (for debugging)
export async function GET() {
  try {
    const productsCollection = await getCollection(PRODUCTS_COLLECTION);
    
    // Get all products
    const products = await productsCollection 
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    console.log("API: Found products:", products.length);
    
    return NextResponse.json({ 
      success: true, 
      data: products,
      count: products.length 
    });
  } catch (error) {
    console.error("API: GET products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

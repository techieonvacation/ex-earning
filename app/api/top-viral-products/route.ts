import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/app/lib/mongodb";

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

export interface TopDealSection {
  _id?: string;
  id: string;
  title: string;
  description?: string;
  products: string[]; // Array of product IDs
  viewAllLink: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
  updatedAt: string;
}

// MongoDB Collection Names
const SECTIONS_COLLECTION = "top_viral_sections";
const PRODUCTS_COLLECTION = "top_viral_products";

// Generate unique ID
function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Initialize default data if collections are empty
async function initializeDefaultData() {
  try {
    const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
    const productsCollection = await getCollection(PRODUCTS_COLLECTION);
    
    const sectionsCount = await sectionsCollection.countDocuments();
    
    if (sectionsCount === 0) {
      const defaultSection = {
        id: "trendingDeals",
        title: "Top Viral Bundle",
        description: "Featured trending products and bundles",
        viewAllLink: "/products/trending",
        status: "active",
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: []
      };
      
      const sectionResult = await sectionsCollection.insertOne(defaultSection);
      
      const defaultProduct = {
        id: "trending-1",
        title: "Premium Reels Bundle 2024",
        description: "Get access to 500+ high-quality reels templates for Instagram, TikTok, and YouTube Shorts. Perfect for influencers and content creators.",
        price: 2999,
        originalPrice: 5999,
        discount: 50,
        rating: 4.8,
        reviewCount: 1247,
        category: "Reels Bundle",
        tags: ["Instagram", "TikTok", "YouTube Shorts", "Templates"],
        image: "https://sasitag.in/wp-content/uploads/2024/09/1000-Viral-Hooks-Reels-e1725331139794.jpg",
        isNew: true,
        isFeatured: true,
        isBestSeller: true,
        downloadCount: 15420,
        fileSize: "2.5 GB",
        format: "MP4, MOV",
        compatibility: ["iOS", "Android", "Desktop"],
        features: ["500+ Templates", "HD Quality", "Easy Customization", "Commercial License"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: 1,
        status: "active",
        sectionId: defaultSection.id
      };
      
      await productsCollection.insertOne(defaultProduct);
      
      // Update section with product reference
      await sectionsCollection.updateOne(
        { _id: sectionResult.insertedId },
        { $push: { products: defaultProduct.id } } as any 
      );
    }
  } catch (error) {
    console.error("Error initializing default data:", error);
  }
}

// GET - Fetch all sections with their products
export async function GET() {
  try {
    await initializeDefaultData();
    
    const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
    const productsCollection = await getCollection(PRODUCTS_COLLECTION);
    
    // Get all sections
    const sections = await sectionsCollection
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    // Get all products
    const products = await productsCollection
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    // Map products to sections
    const sectionsWithProducts = sections.map(section => ({
      ...section,
      products: products.filter(product => product.sectionId === section.id)
    }));
    
    return NextResponse.json({ success: true, data: sectionsWithProducts });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST - Create new section or product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sectionId, product, section } = body;
    
    if (action === "createSection") {
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      
      const newSection = {
        id: generateId(),
        title: section.title,
        description: section.description || "",
        products: [],
        viewAllLink: section.viewAllLink,
        status: section.status || "active",
        order: await sectionsCollection.countDocuments() + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const result = await sectionsCollection.insertOne(newSection);
      
      return NextResponse.json({ 
        success: true, 
        data: { ...newSection, _id: result.insertedId } 
      });
    }
    
    if (action === "createProduct") {
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      const productsCollection = await getCollection(PRODUCTS_COLLECTION);
      
      // Verify section exists
      const sectionExists = await sectionsCollection.findOne({ id: sectionId });
      if (!sectionExists) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      const newProduct = {
        id: generateId(),
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: await productsCollection.countDocuments({ sectionId }) + 1,
        status: product.status || "active",
        sectionId
      };
      
      const result = await productsCollection.insertOne(newProduct);
      
      // Update section's products array
      await sectionsCollection.updateOne(
        { id: sectionId },
        { 
          $push: { products: newProduct.id },
          $set: { updatedAt: new Date().toISOString() }
        }
      );
      
      return NextResponse.json({ 
        success: true, 
        data: { ...newProduct, _id: result.insertedId } 
      });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create" },
      { status: 500 }
    );
  }
}

// PUT - Update section or product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sectionId, productId, updates } = body;
    
    if (action === "updateSection") {
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      
      const result = await sectionsCollection.updateOne(
        { id: sectionId },
        { 
          $set: {
            ...updates,
            updatedAt: new Date().toISOString()
          }
        }
      );
      
      if (result.matchedCount === 0) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      const updatedSection = await sectionsCollection.findOne({ id: sectionId });
      return NextResponse.json({ success: true, data: updatedSection });
    }
    
    if (action === "updateProduct") {
      const productsCollection = await getCollection(PRODUCTS_COLLECTION);
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      
      const result = await productsCollection.updateOne(
        { id: productId, sectionId },
        { 
          $set: {
            ...updates,
            updatedAt: new Date().toISOString()
          }
        }
      );
      
      if (result.matchedCount === 0) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      
      // Update section's updatedAt
      await sectionsCollection.updateOne(
        { id: sectionId },
        { $set: { updatedAt: new Date().toISOString() } }
      );
      
      const updatedProduct = await productsCollection.findOne({ id: productId });
      return NextResponse.json({ success: true, data: updatedProduct });
    }
    
    if (action === "reorderProducts") {
      const { productIds } = updates;
      const productsCollection = await getCollection(PRODUCTS_COLLECTION);
      
      // Update order for each product
      for (let i = 0; i < productIds.length; i++) {
        await productsCollection.updateOne(
          { id: productIds[i] },
          { $set: { order: i + 1 } }
        );
      }
      
      const reorderedProducts = await productsCollection
        .find({ id: { $in: productIds } })
        .sort({ order: 1 })
        .toArray();
      
      return NextResponse.json({ success: true, data: reorderedProducts });
    }
    
    if (action === "reorderSections") {
      const { sectionIds } = updates;
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      
      // Update order for each section
      for (let i = 0; i < sectionIds.length; i++) {
        await sectionsCollection.updateOne(
          { id: sectionIds[i] },
          { $set: { order: i + 1 } }
        );
      }
      
      const reorderedSections = await sectionsCollection
        .find({ id: { $in: sectionIds } })
        .sort({ order: 1 })
        .toArray();
      
      return NextResponse.json({ success: true, data: reorderedSections });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update" },
      { status: 500 }
    );
  }
}

// DELETE - Delete section or product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const sectionId = searchParams.get("sectionId");
    const productId = searchParams.get("productId");
    
    if (action === "deleteSection") {
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      const productsCollection = await getCollection(PRODUCTS_COLLECTION);
      
      // Delete all products in the section
      await productsCollection.deleteMany({ sectionId });
      
      // Delete the section
      const result = await sectionsCollection.deleteOne({ id: sectionId });
      
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      // Reorder remaining sections
      const remainingSections = await sectionsCollection
        .find({})
        .sort({ order: 1 })
        .toArray();
      
      for (let i = 0; i < remainingSections.length; i++) {
        await sectionsCollection.updateOne(
          { _id: remainingSections[i]._id },
          { $set: { order: i + 1 } }
        );
      }
      
      return NextResponse.json({ success: true, message: "Section deleted" });
    }
    
    if (action === "deleteProduct") {
      const productsCollection = await getCollection(PRODUCTS_COLLECTION);
      const sectionsCollection = await getCollection(SECTIONS_COLLECTION);
      
      const result = await productsCollection.deleteOne({ 
        id: productId, 
        sectionId 
      });
      
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      
      // Remove product ID from section's products array
      await sectionsCollection.updateOne(
        { id: sectionId },
        { 
          $pull: { products: productId } as any,
          $set: { updatedAt: new Date().toISOString() }
        }
      );
      
      // Reorder remaining products in the section
      const remainingProducts = await productsCollection
        .find({ sectionId })
        .sort({ order: 1 })
        .toArray();
      
      for (let i = 0; i < remainingProducts.length; i++) {
        await productsCollection.updateOne(
          { _id: remainingProducts[i]._id },
          { $set: { order: i + 1 } }
        );
      }
      
      return NextResponse.json({ success: true, message: "Product deleted" });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}

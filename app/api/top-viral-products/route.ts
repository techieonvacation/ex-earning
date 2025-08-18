import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Types
export interface TopViralProduct {
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
}

export interface TopDealSection {
  id: string;
  title: string;
  description?: string;
  products: TopViralProduct[];
  viewAllLink: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Data file path
const dataFilePath = path.join(process.cwd(), "data", "top-viral-products.json");

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(dataFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read data from file
async function readData(): Promise<TopDealSection[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Return default data if file doesn't exist
    return [
      {
        id: "trendingDeals",
        title: "Top Viral Bundle",
        description: "Featured trending products and bundles",
        viewAllLink: "/products/trending",
        status: "active",
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [
          {
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
            status: "active"
          }
        ]
      }
    ];
  }
}

// Write data to file
async function writeData(data: TopDealSection[]) {
  await ensureDataDirectory();
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

// Generate unique ID
function generateId(): string {
  return `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// GET - Fetch all sections
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
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
    
    const data = await readData();
    
    if (action === "createSection") {
      const newSection: TopDealSection = {
        id: generateId(),
        title: section.title,
        description: section.description || "",
        products: [],
        viewAllLink: section.viewAllLink,
        status: section.status || "active",
        order: data.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      data.push(newSection);
      await writeData(data);
      
      return NextResponse.json({ success: true, data: newSection });
    }
    
    if (action === "createProduct") {
      const sectionIndex = data.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      const newProduct: TopViralProduct = {
        id: generateId(),
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: data[sectionIndex].products.length + 1,
        status: product.status || "active"
      };
      
      data[sectionIndex].products.push(newProduct);
      data[sectionIndex].updatedAt = new Date().toISOString();
      
      await writeData(data);
      
      return NextResponse.json({ success: true, data: newProduct });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
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
    
    const data = await readData();
    
    if (action === "updateSection") {
      const sectionIndex = data.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      data[sectionIndex] = {
        ...data[sectionIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await writeData(data);
      
      return NextResponse.json({ success: true, data: data[sectionIndex] });
    }
    
    if (action === "updateProduct") {
      const sectionIndex = data.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      const productIndex = data[sectionIndex].products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      
      data[sectionIndex].products[productIndex] = {
        ...data[sectionIndex].products[productIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      data[sectionIndex].updatedAt = new Date().toISOString();
      
      await writeData(data);
      
      return NextResponse.json({ 
        success: true, 
        data: data[sectionIndex].products[productIndex] 
      });
    }
    
    if (action === "reorderProducts") {
      const sectionIndex = data.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      const { productIds } = updates;
      const reorderedProducts = [];
      
      for (const productId of productIds) {
        const product = data[sectionIndex].products.find(p => p.id === productId);
        if (product) {
          product.order = reorderedProducts.length + 1;
          reorderedProducts.push(product);
        }
      }
      
      data[sectionIndex].products = reorderedProducts;
      data[sectionIndex].updatedAt = new Date().toISOString();
      
      await writeData(data);
      
      return NextResponse.json({ success: true, data: reorderedProducts });
    }
    
    if (action === "reorderSections") {
      const { sectionIds } = updates;
      const reorderedSections = [];
      
      for (const sectionId of sectionIds) {
        const section = data.find(s => s.id === sectionId);
        if (section) {
          section.order = reorderedSections.length + 1;
          reorderedSections.push(section);
        }
      }
      
      await writeData(reorderedSections);
      
      return NextResponse.json({ success: true, data: reorderedSections });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
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
    
    const data = await readData();
    
    if (action === "deleteSection") {
      const sectionIndex = data.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      data.splice(sectionIndex, 1);
      
      // Reorder remaining sections
      data.forEach((section, index) => {
        section.order = index + 1;
      });
      
      await writeData(data);
      
      return NextResponse.json({ success: true, message: "Section deleted" });
    }
    
    if (action === "deleteProduct") {
      const sectionIndex = data.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Section not found" },
          { status: 404 }
        );
      }
      
      const productIndex = data[sectionIndex].products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      
      data[sectionIndex].products.splice(productIndex, 1);
      data[sectionIndex].updatedAt = new Date().toISOString();
      
      // Reorder remaining products
      data[sectionIndex].products.forEach((product, index) => {
        product.order = index + 1;
      });
      
      await writeData(data);
      
      return NextResponse.json({ success: true, message: "Product deleted" });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { FaArrowRight, FaFilter, FaList } from "react-icons/fa";
import { Grid3X3 } from "lucide-react";
import {
  LucideIcon,
  Zap,
  Video,
  Palette,
  FileText,
  Globe,
  Smartphone,
  Camera,
  Sparkles,
  TrendingUp,
  Star,
  Clock,
  Download,
  Package,
} from "lucide-react";
import Link from "next/link";
import ProductCard from "@/app/components/ui/ProductCard";
import { useCart } from "@/app/components/ui/Cart";
import { ProductCardProps } from "@/app/components/ui/ProductCard/data";
import { CartItem } from "@/app/components/ui/Cart/CartProvider";
import { Button } from "../../ui/Button";

// Category interface with enhanced properties
interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  productCount: number;
  color: string;
  gradient: string;
  isPopular?: boolean;
  isNew?: boolean;
}

// Enhanced product data with more categories
const categoryProducts: Record<string, ProductCardProps[]> = {
  "reels-bundle": [
    {
      id: "reels-1",
      title: "Premium Reels Bundle 2024",
      description:
        "Get access to 500+ high-quality reels templates for Instagram, TikTok, and YouTube Shorts. Perfect for influencers and content creators.",
      price: 2999,
      originalPrice: 5999,
      discount: 50,
      rating: 4.8,
      reviewCount: 1247,
      category: "Reels Bundle",
      tags: ["Instagram", "TikTok", "YouTube Shorts", "Templates"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/09/1000-Viral-Hooks-Reels-e1725331139794.jpg",
      isNew: true,
      isFeatured: true,
      isBestSeller: true,
      downloadCount: 15420,
      fileSize: "2.5 GB",
      format: "MP4, MOV",
      compatibility: ["iOS", "Android", "Desktop"],
      features: [
        "500+ Templates",
        "HD Quality",
        "Easy Customization",
        "Commercial License",
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "reels-2",
      title: "Viral Movie Reels Bundle",
      description:
        "Cinematic reels templates inspired by blockbuster movies. Perfect for creating engaging content with dramatic effects.",
      price: 3999,
      originalPrice: 7999,
      discount: 50,
      rating: 4.7,
      reviewCount: 892,
      category: "Reels Bundle",
      tags: ["Cinematic", "Movie Style", "Dramatic", "Viral"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/07/Viral-Movie-Reels-Bundle-1-e1720843122732.jpg",
      isFeatured: true,
      downloadCount: 12540,
      fileSize: "3.2 GB",
      format: "MP4, MOV",
      compatibility: ["iOS", "Android", "Desktop"],
      features: [
        "Cinematic Effects",
        "Movie Templates",
        "HD Quality",
        "Easy Customization",
      ],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-18",
    },
    {
      id: "reels-3",
      title: "Love Only AI Reels Bundle",
      description:
        "Romantic and love-themed reels with AI-generated content. Perfect for couples and relationship content creators.",
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      rating: 4.6,
      reviewCount: 634,
      category: "Reels Bundle",
      tags: ["Romantic", "Love", "AI Generated", "Couples"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/10/Loveonly-ai-Reels-Bundle-e1728532040957.jpg",
      isNew: true,
      downloadCount: 8920,
      fileSize: "2.8 GB",
      format: "MP4, AI Templates",
      compatibility: ["All Platforms", "Cloud Sync"],
      features: [
        "AI Generated",
        "Romantic Themes",
        "Easy Customization",
        "Commercial License",
      ],
      createdAt: "2024-01-14",
      updatedAt: "2024-01-21",
    },
  ],
  "ai-tools": [
    {
      id: "ai-1",
      title: "AI-Powered Reels Creator Pro",
      description:
        "Revolutionary AI technology that generates engaging reels automatically. Includes 1000+ AI-generated templates and smart editing tools.",
      price: 4999,
      originalPrice: 8999,
      discount: 44,
      rating: 4.9,
      reviewCount: 892,
      category: "AI Tools",
      tags: ["AI Generated", "Automation", "Smart Editing", "Premium"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/03/Free-CD-DVD-Storage-Box-Mockup-1-3-e1710910653195.jpg",
      isBestSeller: true,
      isFeatured: true,
      downloadCount: 8930,
      fileSize: "4.2 GB",
      format: "MP4, AI Templates",
      compatibility: ["All Platforms", "Cloud Sync"],
      features: [
        "AI Generation",
        "1000+ Templates",
        "Smart Analytics",
        "Auto-Optimization",
      ],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "ai-2",
      title: "AI Cartoon Character Bundle",
      description:
        "Create stunning AI-generated cartoon characters for your content. Includes character generator, poses, expressions, and animation tools.",
      price: 3999,
      originalPrice: 6999,
      discount: 43,
      rating: 4.7,
      reviewCount: 1563,
      category: "AI Tools",
      tags: ["AI Generated", "Cartoon Characters", "Animation", "Creative"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/10/Loveonly-ai-Reels-Bundle-e1728532040957.jpg",
      isNew: true,
      downloadCount: 12540,
      fileSize: "3.8 GB",
      format: "PNG, SVG, MP4",
      compatibility: ["All Platforms", "Web App"],
      features: [
        "Character Generator",
        "500+ Poses",
        "Expression Library",
        "Animation Tools",
      ],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
    },
  ],
  "digital-marketing": [
    {
      id: "marketing-1",
      title: "Digital Marketing Templates Pack",
      description:
        "Complete collection of marketing templates including social media posts, email campaigns, and landing pages.",
      price: 1999,
      originalPrice: 3999,
      discount: 50,
      rating: 4.6,
      reviewCount: 892,
      category: "Digital Marketing",
      tags: ["Marketing", "Social Media", "Email", "Landing Pages"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/07/Viral-Movie-Reels-Bundle-1-e1720843122732.jpg",
      downloadCount: 8920,
      fileSize: "1.8 GB",
      format: "PSD, AI, Figma",
      compatibility: ["Adobe Suite", "Figma", "Sketch"],
      features: [
        "200+ Templates",
        "Multiple Formats",
        "Easy Customization",
        "Commercial Use",
      ],
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
    },
    {
      id: "marketing-2",
      title: "Social Media Automation Platform",
      description:
        "Complete social media management platform with scheduling, analytics, and automation tools.",
      price: 7999,
      originalPrice: 14999,
      discount: 47,
      rating: 4.8,
      reviewCount: 1247,
      category: "Digital Marketing",
      tags: ["Automation", "Social Media", "Analytics", "Scheduling"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/09/1000-Viral-Hooks-Reels-e1725331139794.jpg",
      isBestSeller: true,
      downloadCount: 5670,
      fileSize: "8.5 GB",
      format: "Web App, Mobile App",
      compatibility: ["All Platforms", "Cloud Based"],
      features: [
        "Auto Scheduling",
        "Analytics Dashboard",
        "Multi Platform",
        "AI Optimization",
      ],
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
    },
  ],
  "web-development": [
    {
      id: "web-1",
      title: "E-commerce Website Bundle",
      description:
        "Complete e-commerce solution with premium themes, plugins, and tools for building successful online stores.",
      price: 5999,
      originalPrice: 11999,
      discount: 50,
      rating: 4.9,
      reviewCount: 2341,
      category: "Web Development",
      tags: ["E-commerce", "WordPress", "Themes", "Plugins"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/09/1000-Viral-Hooks-Reels-e1725331139794.jpg",
      isBestSeller: true,
      downloadCount: 18750,
      fileSize: "5.2 GB",
      format: "WordPress, HTML, CSS",
      compatibility: ["WordPress", "All Browsers", "Mobile Responsive"],
      features: [
        "10 Premium Themes",
        "50+ Plugins",
        "Payment Gateways",
        "SEO Optimized",
      ],
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
    },
    {
      id: "web-2",
      title: "Mobile App Development Kit",
      description:
        "Complete mobile app development solution with templates, UI kits, and development tools.",
      price: 4499,
      originalPrice: 8999,
      discount: 50,
      rating: 4.7,
      reviewCount: 1563,
      category: "Web Development",
      tags: ["Mobile App", "UI/UX", "Templates", "Development"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/07/Viral-Movie-Reels-Bundle-1-e1720843122732.jpg",
      downloadCount: 12340,
      fileSize: "4.8 GB",
      format: "Figma, Sketch, Adobe XD",
      compatibility: ["iOS", "Android", "Cross Platform"],
      features: [
        "100+ UI Templates",
        "Component Library",
        "Prototyping Tools",
        "Export Options",
      ],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
  ],
  "graphics-design": [
    {
      id: "graphics-1",
      title: "Professional Logo Design Pack",
      description:
        "Premium logo design templates and tools for businesses. Includes vector files and brand guidelines.",
      price: 2999,
      originalPrice: 5999,
      discount: 50,
      rating: 4.8,
      reviewCount: 892,
      category: "Graphics & Design",
      tags: ["Logo Design", "Branding", "Vector", "Professional"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/09/1000-Viral-Hooks-Reels-e1725331139794.jpg",
      isFeatured: true,
      downloadCount: 15670,
      fileSize: "2.1 GB",
      format: "AI, EPS, SVG, PNG",
      compatibility: ["Adobe Illustrator", "CorelDRAW", "Inkscape"],
      features: [
        "500+ Logo Templates",
        "Vector Files",
        "Brand Guidelines",
        "Commercial License",
      ],
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
    },
    {
      id: "graphics-2",
      title: "Social Media Graphics Bundle",
      description:
        "Complete collection of social media graphics including posts, stories, and banner templates.",
      price: 1999,
      originalPrice: 3999,
      discount: 50,
      rating: 4.6,
      reviewCount: 634,
      category: "Graphics & Design",
      tags: ["Social Media", "Graphics", "Templates", "Posts"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/07/Viral-Movie-Reels-Bundle-1-e1720843122732.jpg",
      downloadCount: 8920,
      fileSize: "3.5 GB",
      format: "PSD, AI, Figma, Canva",
      compatibility: ["Adobe Suite", "Figma", "Canva"],
      features: [
        "1000+ Templates",
        "Multiple Formats",
        "Easy Customization",
        "Commercial Use",
      ],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-20",
    },
  ],
  "content-creation": [
    {
      id: "content-1",
      title: "Content Writing Templates",
      description:
        "Professional content writing templates for blogs, social media, and marketing campaigns.",
      price: 1499,
      originalPrice: 2999,
      discount: 50,
      rating: 4.5,
      reviewCount: 456,
      category: "Content Creation",
      tags: ["Content Writing", "Blogs", "Social Media", "Marketing"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/09/1000-Viral-Hooks-Reels-e1725331139794.jpg",
      downloadCount: 5670,
      fileSize: "1.2 GB",
      format: "DOCX, PDF, Google Docs",
      compatibility: ["Microsoft Word", "Google Docs", "All Platforms"],
      features: [
        "200+ Templates",
        "Writing Guidelines",
        "SEO Optimized",
        "Professional",
      ],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "content-2",
      title: "Video Script Templates",
      description:
        "Professional video script templates for YouTube, TikTok, and social media content.",
      price: 1999,
      originalPrice: 3999,
      discount: 50,
      rating: 4.7,
      reviewCount: 789,
      category: "Content Creation",
      tags: ["Video Scripts", "YouTube", "TikTok", "Social Media"],
      image:
        "https://sasitag.in/wp-content/uploads/2024/07/Viral-Movie-Reels-Bundle-1-e1720843122732.jpg",
      downloadCount: 7890,
      fileSize: "2.8 GB",
      format: "DOCX, PDF, Google Docs",
      compatibility: ["All Platforms", "Cloud Sync"],
      features: [
        "500+ Scripts",
        "Multiple Genres",
        "Easy Customization",
        "Professional",
      ],
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
    },
  ],
};

// Categories data with enhanced properties
const categories: Category[] = [
  {
    id: "reels-bundle",
    name: "Reels Bundle",
    icon: Video,
    description: "Viral reels templates for social media",
    productCount: categoryProducts["reels-bundle"].length,
    color: "from-blue-500 to-purple-600",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    isPopular: true,
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    icon: Sparkles,
    description: "AI-powered content creation tools",
    productCount: categoryProducts["ai-tools"].length,
    color: "from-purple-500 to-pink-600",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    isNew: true,
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: TrendingUp,
    description: "Marketing templates and automation",
    productCount: categoryProducts["digital-marketing"].length,
    color: "from-green-500 to-teal-600",
    gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    isPopular: true,
  },
  {
    id: "web-development",
    name: "Web Development",
    icon: Globe,
    description: "Website templates and development tools",
    productCount: categoryProducts["web-development"].length,
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
  },
  {
    id: "graphics-design",
    name: "Graphics & Design",
    icon: Palette,
    description: "Professional design templates",
    productCount: categoryProducts["graphics-design"].length,
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    icon: FileText,
    description: "Writing and content templates",
    productCount: categoryProducts["content-creation"].length,
    color: "from-indigo-500 to-blue-600",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
  },
];

const CategorySection: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("reels-bundle");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Get current category products
  const currentProducts = useMemo(() => {
    return categoryProducts[selectedCategory] || [];
  }, [selectedCategory]);

  // Sort products based on selection
  const sortedProducts = useMemo(() => {
    let sorted = [...currentProducts];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        sorted.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return sorted;
  }, [currentProducts, sortBy]);

  // Handle add to cart
  const handleAddToCart = (product: ProductCardProps) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      serviceType: "digital_product",
    };

    addItem(cartItem);
  };

  // Handle wishlist (placeholder)
  const handleWishlist = (product: ProductCardProps) => {
    console.log("Add to wishlist:", product.title);
  };

  // Handle quick view (placeholder)
  const handleQuickView = (product: ProductCardProps) => {
    console.log("Quick view:", product.title);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-urbanist mb-4"
          >
            Explore by <span className="highlight">Category</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover our curated collection of digital products organized by
            category. Find exactly what you need for your next project.
          </motion.p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `border-primary shadow-lg shadow-primary/20 ${category.gradient} text-white`
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {/* Popular/New Badge */}
                {(category.isPopular || category.isNew) && (
                  <div
                    className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      category.isPopular
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {category.isPopular ? "Popular" : "New"}
                  </div>
                )}

                <div className="text-center">
                  <div className={`mx-auto mb-3 p-3 rounded-xl`}>
                    <category.icon
                      className={`w-10 h-10 lg:w-12 lg:h-12 mx-auto ${
                        selectedCategory === category.id
                          ? "text-white"
                          : "text-primary group-hover:text-primary/80"
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-semibold text-base mb-1 ${
                      selectedCategory === category.id
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-xs ${
                      selectedCategory === category.id
                        ? "text-white/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {category.productCount} products
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Info and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          {/* Category Info */}
          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl md:text-3xl font-bold font-urbanist mb-2"
            >
              {categories.find((c) => c.id === selectedCategory)?.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-muted-foreground"
            >
              {categories.find((c) => c.id === selectedCategory)?.description} •{" "}
              {currentProducts.length} products available
            </motion.p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>

            {/* View All Button */}
            <Link href={`/products/${selectedCategory}`}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<FaArrowRight className="size-4" />}
                className="rounded-xl"
              >
                View All
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={viewMode === "list" ? "w-full" : "h-full"}
              >
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                  onQuickView={handleQuickView}
                  variant={viewMode === "list" ? "compact" : "default"}
                  className={viewMode === "list" ? "w-full" : "h-full"}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products in this category. Please try another
              category.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("reels-bundle")}
            >
              Browse Popular Categories
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;

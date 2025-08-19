"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import ProductCard from "@/app/components/ui/ProductCard";
import { useCart } from "@/app/components/ui/Cart";
import { ProductCardProps } from "@/app/components/ui/ProductCard/data";
import { CartItem } from "@/app/components/ui/Cart/CartProvider";
import { Button } from "../../ui/Button";

// Type definitions
interface TopDealSection {
  id: string;
  title: string;
  products: ProductCardProps[];
  viewAllLink: string;
}

// Top Deal Data - Production ready with real product information
const topDealSections: TopDealSection[] = [
  {
    id: "trendingDeals",
    title: "Best Selling Products",
    viewAllLink: "/products/trending",
    products: [
      {
        id: "trending-1",
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
        id: "trending-2",
        title: "AI-Powered Reels Creator Pro",
        description:
          "Revolutionary AI technology that generates engaging reels automatically. Includes 1000+ AI-generated templates and smart editing tools.",
        price: 4999,
        originalPrice: 8999,
        discount: 44,
        rating: 4.9,
        reviewCount: 892,
        category: "AI Reels Bundle",
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
        id: "trending-3",
        title: "AI Cartoon Character Bundle",
        description:
          "Create stunning AI-generated cartoon characters for your content. Includes character generator, poses, expressions, and animation tools.",
        price: 3999,
        originalPrice: 6999,
        discount: 43,
        rating: 4.7,
        reviewCount: 1563,
        category: "AI Cartoon Bundle",
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
      {
        id: "trending-4",
        title: "Digital Marketing Templates Pack",
        description:
          "Complete collection of marketing templates including social media posts, email campaigns, and landing pages.",
        price: 1999,
        originalPrice: 3999,
        discount: 50,
        rating: 4.6,
        reviewCount: 892,
        category: "Templates",
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
        id: "trending-5",
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
    ],
  },
];

const BestProduct: React.FC = () => {
  const { addItem, isItemInCart } = useCart();

  // Handle add to cart with proper cart item conversion
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

  // Handle wishlist (placeholder for future implementation)
  const handleWishlist = (product: ProductCardProps) => {
    // TODO: Implement wishlist functionality
    console.log("Add to wishlist:", product.title);
  };

  // Handle quick view - navigate to product details
  const handleQuickView = (product: ProductCardProps) => {
    // Navigate to product details page
    window.location.href = `/product/${product.id}`;
  };

  return (
    <section className="py-10">
      <div className="container relative z-10">
        {/* Top Deal Sections */}
        {topDealSections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
            className="relative"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4">
              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold font-urbanist"
                >
                  {section.title}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden sm:block"
              >
                <Link href={section.viewAllLink}>
                  <Button
                    variant={"primary"}
                    size={"md"}
                    rightIcon={<FaArrowRight className="size-4" />}
                    className="rounded-xl"
                  >
                    View All
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4"
            >
              {section.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="h-full"
                >
                  <ProductCard
                    {...product}
                    onAddToCart={handleAddToCart}
                    onWishlist={handleWishlist}
                    onQuickView={handleQuickView}
                    variant="featured"
                    className="h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestProduct;

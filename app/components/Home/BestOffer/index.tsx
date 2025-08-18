"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "@/app/components/ui/ProductCard";
import { useCart } from "@/app/components/ui/Cart";
import { ProductCardProps } from "@/app/components/ui/ProductCard/data";
import { CartItem } from "@/app/components/ui/Cart/CartProvider";
import { Button } from "../../ui/Button";
import { useRef } from "react";

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
    title: "Top Viral Bundle",
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

// Swiper configuration for different sections
const swiperConfig = {
  trendingDeals: {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next-trending",
      prevEl: ".swiper-button-prev-trending",
    },
    pagination: {
      el: ".swiper-pagination-trending",
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    },
    loop: true,
    grabCursor: true,
    effect: "slide",
    speed: 600,
  },
};

const BestOffer: React.FC = () => {
  const { addItem, isItemInCart } = useCart();
  const swiperRef = useRef<any>(null);

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

  // Handle quick view (placeholder for future implementation)
  const handleQuickView = (product: ProductCardProps) => {
    // TODO: Implement quick view functionality
    console.log("Quick view:", product.title);
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

            {/* Products Swiper */}
            <div className="relative">
              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-trending absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/90 backdrop-blur-sm hover:bg-background border border-border rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                <FaChevronLeft className="w-4 h-4 text-primary" />
              </button>

              <button className="swiper-button-next-trending absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/90 backdrop-blur-sm hover:bg-background border border-border rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                <FaChevronRight className="w-4 h-4 text-primary" />
              </button>

              {/* Swiper Container */}
              <Swiper
                ref={swiperRef}
                {...swiperConfig[section.id as keyof typeof swiperConfig]}
                className="products-swiper"
              >
                {section.products.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full px-2"
                    >
                      <div className="h-full">
                        <ProductCard
                          {...product}
                          onAddToCart={handleAddToCart}
                          onWishlist={handleWishlist}
                          onQuickView={handleQuickView}
                          variant="default"
                          className="h-full"
                        />
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination */}
              <div className="swiper-pagination-trending flex items-center justify-center gap-2 mt-6"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestOffer;

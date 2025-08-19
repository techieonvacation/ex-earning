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
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Type definitions from API
interface TopViralProduct {
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

interface TopDealSection {
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

// Swiper configuration for different sections
const swiperConfig = {
  default: {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next-default",
      prevEl: ".swiper-button-prev-default",
    },
    pagination: {
      el: ".swiper-pagination-default",
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
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const [sections, setSections] = useState<TopDealSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from CMS API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/top-viral-products");
        const result = await response.json();

        if (result.success) {
          // Filter only active sections and sort by order
          const activeSections = result.data
            .filter((section: TopDealSection) => section.status === "active")
            .sort((a: TopDealSection, b: TopDealSection) => a.order - b.order);

          setSections(activeSections);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    // Navigate to product details page using Next.js router
    router.push(`/product/${product.id}`);
  };

  // Convert TopViralProduct to ProductCardProps
  const convertToProductCardProps = (
    product: TopViralProduct
  ): ProductCardProps => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating,
    reviewCount: product.reviewCount,
    category: product.category,
    tags: product.tags,
    image: product.image || "https://via.placeholder.com/400x300?text=No+Image",
    isNew: product.isNew,
    isFeatured: product.isFeatured,
    isBestSeller: product.isBestSeller,
    downloadCount: product.downloadCount,
    fileSize: product.fileSize,
    format: product.format,
    compatibility: product.compatibility,
    features: product.features,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });

  if (loading) {
    return (
      <section className="py-10">
        <div className="container relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || sections.length === 0) {
    return (
      <section className="py-10">
        <div className="container relative z-10">
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-muted-foreground mb-4">
              {error ? "Failed to load products" : "No products available"}
            </h3>
            <p className="text-muted-foreground">
              {error || "Please check back later or contact support."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container relative z-10 space-y-10 lg:space-y-20">
        {/* Top Deal Sections */}
        {sections.map((section, sectionIndex) => (
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
                {section.description && (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-muted-foreground mt-2"
                  >
                    {section.description}
                  </motion.p>
                )}
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
              <button
                className={`swiper-button-prev-${section.id} absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/90 backdrop-blur-sm hover:bg-background border border-border rounded-full shadow-lg transition-all duration-200 hover:scale-110`}
              >
                <FaChevronLeft className="w-4 h-4 text-primary" />
              </button>

              <button
                className={`swiper-button-next-${section.id} absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/90 backdrop-blur-sm hover:bg-background border border-border rounded-full shadow-lg transition-all duration-200 hover:scale-110`}
              >
                <FaChevronRight className="w-4 h-4 text-primary" />
              </button>

              {/* Swiper Container */}
              <Swiper
                ref={swiperRef}
                {...swiperConfig.default}
                navigation={{
                  nextEl: `.swiper-button-next-${section.id}`,
                  prevEl: `.swiper-button-prev-${section.id}`,
                }}
                pagination={{
                  el: `.swiper-pagination-${section.id}`,
                  clickable: true,
                  dynamicBullets: true,
                }}
                className="products-swiper"
              >
                {section.products
                  .filter(
                    (product) =>
                      product.status === "active" &&
                      product.image &&
                      product.image.trim() !== ""
                  )
                  .sort((a, b) => a.order - b.order)
                  .map((product, index) => (
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
                            {...convertToProductCardProps(product)}
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
              <div
                className={`swiper-pagination-${section.id} flex items-center justify-center gap-2 mt-6`}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestOffer;

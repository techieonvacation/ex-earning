"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Truck, RotateCcw, ChevronLeft } from "lucide-react";
import { Button } from "../Button";
import { ProductCardProps } from "../ProductCard/data";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: ProductCardProps;
  relatedProducts?: ProductCardProps[];
  className?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  relatedProducts = [],
  className = "",
}) => {
  const router = useRouter();

  // Generate multiple images for gallery (in production, this would come from API)
  const productImages = [
    product.image,
    // Add more images if available, otherwise duplicate the main image
    ...(product.image ? [product.image] : []),
    ...(product.image ? [product.image] : []),
  ];

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={`bg-background ${className}`}>
      <div className="container">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <ProductImageGallery images={productImages} title={product.title} />

            {/* Trust Indicators */}
            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Why Choose This Product?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Secure</h4>
                    <p className="text-xs text-muted-foreground">100% Safe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Instant</h4>
                    <p className="text-xs text-muted-foreground">Download</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Refund</h4>
                    <p className="text-xs text-muted-foreground">30 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <ProductInfo product={product} />
          </motion.div>
        </div>

        {/* Product Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <ProductTabs product={product} relatedProducts={relatedProducts} />
        </motion.div>

        {/* Additional Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8"
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Trusted by Thousands of Customers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of satisfied customers who trust us for their
              digital product needs. We provide premium quality, excellent
              support, and unbeatable value.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {product.downloadCount >= 1000000
                    ? `${(product.downloadCount / 1000000).toFixed(1)}M+`
                    : product.downloadCount >= 1000
                    ? `${(product.downloadCount / 1000).toFixed(1)}K+`
                    : product.downloadCount}
                </div>
                <p className="text-muted-foreground">Downloads</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {product.rating}
                </div>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info mb-2">
                  {product.reviewCount}+
                </div>
                <p className="text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99%</div>
                <p className="text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;

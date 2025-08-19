"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import ProductDetails from "@/app/components/ui/ProductDetails";
import { ProductCardProps } from "@/app/components/ui/ProductCard/data";

const ProductPage: React.FC = () => {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch product from API
        console.log("Fetching product with ID:", productId);

        const response = await fetch(`/api/products/${productId}`);
        console.log("API response status:", response.status);

        if (!response.ok) {
          console.error("API error:", response.status, response.statusText);
          setError(`Failed to fetch product: ${response.status}`);
          return;
        }

        const result = await response.json();
        console.log("API result:", result);

        if (!result.success) {
          setError(result.error || "Product not found");
          return;
        }

        const foundProduct = result.data;

        // Convert API product to ProductCardProps format
        const productCardProps: ProductCardProps = {
          id: foundProduct.id,
          title: foundProduct.title,
          description: foundProduct.description,
          price: foundProduct.price,
          originalPrice: foundProduct.originalPrice,
          discount: foundProduct.discount,
          rating: foundProduct.rating,
          reviewCount: foundProduct.reviewCount,
          category: foundProduct.category,
          tags: foundProduct.tags,
          image: foundProduct.image,
          isNew: foundProduct.isNew,
          isFeatured: foundProduct.isFeatured,
          isBestSeller: foundProduct.isBestSeller,
          downloadCount: foundProduct.downloadCount,
          fileSize: foundProduct.fileSize,
          format: foundProduct.format,
          compatibility: foundProduct.compatibility,
          features: foundProduct.features,
          createdAt: foundProduct.createdAt,
          updatedAt: foundProduct.updatedAt,
        };

        setProduct(productCardProps);

        // For now, set empty related products (can be implemented later)
        setRelatedProducts([]);
      } catch (err) {
        setError("Failed to fetch product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-lg text-muted-foreground">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">
            {error || "Product not found"}
          </h1>
          <p className="text-muted-foreground">
            {error === "Product not found"
              ? "The product you're looking for doesn't exist or has been removed."
              : "Something went wrong while loading the product. Please try again later."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go Back
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </motion.div>
  );
};

export default ProductPage;

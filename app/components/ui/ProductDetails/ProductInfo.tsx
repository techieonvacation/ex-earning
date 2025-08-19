"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Eye, Download, Clock, Tag, Zap, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "../Button";
import { ProductCardProps } from "../ProductCard/data";
import { useCart } from "../Cart";
import { CartItem } from "../Cart/CartProvider";

interface ProductInfoProps {
  product: ProductCardProps;
  className?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, className = "" }) => {
  const { addItem, isItemInCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Format price with Indian currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format download count
  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-accent text-accent" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-accent/50 text-accent" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-muted" />);
    }

    return stars;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      quantity: quantity,
      image: product.image,
      category: product.category,
      serviceType: "digital_product",
    };

    addItem(cartItem);
  };

  // Handle wishlist toggle
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(10, newQuantity)));
  };

  // Calculate savings
  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Product Header */}
      <div className="space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
        >
          {product.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {product.description}
        </motion.p>
      </div>

      {/* Rating and Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
          <span className="text-lg font-semibold text-foreground">
            {product.rating}
          </span>
        </div>
        <span className="text-muted-foreground">
          ({product.reviewCount} reviews)
        </span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Download className="w-4 h-4" />
          <span>{formatDownloadCount(product.downloadCount)} downloads</span>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <div className="space-y-1">
              <span className="text-2xl text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <div className="flex items-center gap-2">
                <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}% OFF
                </span>
                <span className="text-sm text-muted-foreground">
                  Save {formatPrice(savings)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Limited Time Offer */}
        {product.discount > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-accent-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Limited Time Offer!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This offer ends soon. Don't miss out on {product.discount}% savings!
            </p>
          </div>
        )}
      </motion.div>

      {/* Product Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-foreground">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Product Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">File Size:</span>
              <span className="text-sm font-medium">{product.fileSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Format:</span>
              <span className="text-sm font-medium">{product.format}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Compatibility:</span>
              <span className="text-sm font-medium">{product.compatibility.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tags:</span>
              <span className="text-sm font-medium">{product.tags.slice(0, 3).join(", ")}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">Quantity:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-2 hover:bg-muted transition-colors"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-2 border-x border-border font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-2 hover:bg-muted transition-colors"
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
            className="flex-1 h-14 text-lg font-semibold"
            leftIcon={<ShoppingCart className="w-5 h-5" />}
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
            className="flex-1 h-14 text-lg font-semibold"
            leftIcon={<Eye className="w-5 h-5" />}
          >
            Buy Now
          </Button>
          <Button
            onClick={handleWishlist}
            variant="outline"
            size="lg"
            className="h-14 px-4"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current text-destructive" : ""}`} />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-accent" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="w-4 h-4 text-accent" />
            <span>Instant Download</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RotateCcw className="w-4 h-4 text-accent" />
            <span>30-Day Refund</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Star,
  Download,
  Eye,
  ShoppingCart,
  Tag,
  Clock,
  Zap,
} from "lucide-react";
import { ProductCardProps } from "./data";

interface ProductCardComponentProps extends ProductCardProps {
  onAddToCart?: (product: ProductCardProps) => void;
  onWishlist?: (product: ProductCardProps) => void;
  onQuickView?: (product: ProductCardProps) => void;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const ProductCard: React.FC<ProductCardComponentProps> = ({
  id,
  title,
  description,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  category,
  tags,
  image,
  isNew,
  isFeatured,
  isBestSeller,
  downloadCount,
  fileSize,
  format,
  compatibility,
  features,
  onAddToCart,
  onWishlist,
  onQuickView,
  variant = "default",
  className = "",
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.({
      id,
      title,
      description,
      price,
      originalPrice,
      discount,
      rating,
      reviewCount,
      category,
      tags,
      image,
      isNew,
      isFeatured,
      isBestSeller,
      downloadCount,
      fileSize,
      format,
      compatibility,
      features,
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleAddToCart = () => {
    onAddToCart?.({
      id,
      title,
      description,
      price,
      originalPrice,
      discount,
      rating,
      reviewCount,
      category,
      tags,
      image,
      isNew,
      isFeatured,
      isBestSeller,
      downloadCount,
      fileSize,
      format,
      compatibility,
      features,
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleQuickView = () => {
    onQuickView?.({
      id,
      title,
      description,
      price,
      originalPrice,
      discount,
      rating,
      reviewCount,
      category,
      tags,
      image,
      isNew,
      isFeatured,
      isBestSeller,
      downloadCount,
      fileSize,
      format,
      compatibility,
      features,
      createdAt: "",
      updatedAt: "",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-accent text-accent" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-3 h-3 fill-accent/50 text-accent" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-muted" />);
    }

    return stars;
  };

  if (variant === "compact") {
    return (
      <div
        className={`group bg-card dark:bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-border dark:border-border ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <span className="bg-info text-info-foreground text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            )}
            {isBestSeller && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                BEST SELLER
              </span>
            )}
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              isWishlisted
                ? "bg-destructive text-destructive-foreground shadow-lg"
                : "bg-background/90 dark:bg-card/90 text-muted-foreground dark:text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          {/* Quick Actions */}
          <div
            className={`absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2`}
          >
            <button
              onClick={handleQuickView}
              className="bg-background/90 dark:bg-card/90 p-2 rounded-full text-muted-foreground dark:text-muted-foreground hover:bg-info hover:text-info-foreground transition-colors duration-200"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-primary p-2 rounded-full text-primary-foreground hover:bg-primary-hover transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary font-medium">{category}</span>
          </div>

                  {/* Title */}
        <h3 
          className="font-semibold text-card-foreground text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200 cursor-pointer"
          onClick={() => window.location.href = `/product/${id}`}
        >
          {title}
        </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-xs text-muted-foreground dark:text-muted-foreground">
              ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-card-foreground">
              {formatPrice(price)}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Download Count */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Download className="w-3 h-3" />
            <span>{formatDownloadCount(downloadCount)} downloads</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-3 h-3" />
              Add to Cart
            </button>
            <button
              onClick={handleQuickView}
              className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Eye className="w-3 h-3" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className={`group bg-gradient-to-br from-card to-muted rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-gradient-to-r from-info to-info-hover text-info-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                ✨ NEW
              </span>
            )}
            {isBestSeller && (
              <span className="bg-gradient-to-r from-accent to-accent-hover text-accent-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                🏆 BEST SELLER
              </span>
            )}
            {discount > 0 && (
              <span className="bg-gradient-to-r from-destructive to-destructive-hover text-destructive-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                🔥 -{discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
              isWishlisted
                ? "bg-destructive text-destructive-foreground shadow-xl scale-110"
                : "bg-background/20 backdrop-blur-sm text-background hover:bg-destructive hover:scale-110"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          {/* Quick Actions */}
          <div
            className={`absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3`}
          >
            <button
              onClick={handleQuickView}
              className="bg-background/90 backdrop-blur-sm p-3 rounded-full text-muted-foreground hover:bg-info hover:text-info-foreground transition-all duration-300 hover:scale-110"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-primary to-primary-hover p-3 rounded-full text-primary-foreground hover:from-primary-hover hover:to-primary transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-semibold">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 
            className="font-bold text-card-foreground text-xl line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-300 cursor-pointer"
            onClick={() => window.location.href = `/product/${id}`}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-sm text-muted-foreground font-medium">
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-card-foreground">
              {formatPrice(price)}
            </span>
            {originalPrice > price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Zap className="w-3 h-3 text-accent" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>{formatDownloadCount(downloadCount)} downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{fileSize}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-foreground text-background hover:bg-foreground/90 text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={handleQuickView}
              className="flex-1 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`group bg-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={350}
            height={350}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-info text-info-foreground text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-lg">
              NEW
            </span>
          )}
          {isBestSeller && (
            <span className="bg-accent text-accent-foreground text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-lg">
              BEST SELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
            isWishlisted
              ? "bg-destructive text-destructive-foreground shadow-xl scale-110"
              : "bg-background/90 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:scale-110"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Actions */}
        <div
          className={`absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2`}
        >
          <button
            onClick={handleQuickView}
            className="bg-background/90 p-2.5 rounded-full text-muted-foreground hover:bg-info hover:text-info-foreground transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-primary p-2.5 rounded-full text-primary-foreground hover:bg-primary-hover transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-semibold">{category}</span>
        </div>

        {/* Title */}
        <h3 
          className="font-bold font-urbanist text-card-foreground text-lg line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-200 cursor-pointer"
          onClick={() => window.location.href = `/product/${id}`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">{renderStars(rating)}</div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-card-foreground">
            {formatPrice(price)}
          </span>
          {originalPrice > price && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {features.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Zap className="w-3 h-3 text-accent" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>{formatDownloadCount(downloadCount)} downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{fileSize}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-foreground text-background hover:bg-foreground/90 text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleQuickView}
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Eye className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

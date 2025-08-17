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
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-3 h-3 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

  if (variant === "compact") {
    return (
      <div
        className={`group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ${className}`}
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
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            )}
            {isBestSeller && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                BEST SELLER
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              isWishlisted
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          {/* Quick Actions */}
          <div
            className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2`}
          >
            <button
              onClick={handleQuickView}
              className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(price)}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Download Count */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <Download className="w-3 h-3" />
            <span>{formatDownloadCount(downloadCount)} downloads</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-3 h-3" />
              Add to Cart
            </button>
            <button
              onClick={handleQuickView}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
        className={`group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-600 ${className}`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                ✨ NEW
              </span>
            )}
            {isBestSeller && (
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                🏆 BEST SELLER
              </span>
            )}
            {discount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                🔥 -{discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
              isWishlisted
                ? "bg-red-500 text-white shadow-xl scale-110"
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-red-500 hover:scale-110"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          {/* Quick Actions */}
          <div
            className={`absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3`}
          >
            <button
              onClick={handleQuickView}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 dark:text-white text-xl line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(price)}
            </span>
            {originalPrice > price && (
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
              >
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
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
              className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={handleQuickView}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
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
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ${className}`}
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
            <span className="bg-blue-500 text-white text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-lg">
              NEW
            </span>
          )}
          {isBestSeller && (
            <span className="bg-orange-500 text-white text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-lg">
              BEST SELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
            isWishlisted
              ? "bg-red-500 text-white shadow-xl scale-110"
              : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white hover:scale-110"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Actions */}
        <div
          className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2`}
        >
          <button
            onClick={handleQuickView}
            className="bg-white/90 dark:bg-gray-800/90 p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 p-2.5 rounded-full text-white hover:bg-blue-600 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">{renderStars(rating)}</div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(price)}
          </span>
          {originalPrice > price && (
            <span className="text-base text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
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
              className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
            >
              <Zap className="w-3 h-3 text-yellow-500" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
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
            className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleQuickView}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
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

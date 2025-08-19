"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageCircle, FileText, Zap, CheckCircle, Clock, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { ProductCardProps } from "../ProductCard/data";
import ProductCard from "../ProductCard";

interface ProductTabsProps {
  product: ProductCardProps;
  relatedProducts?: ProductCardProps[];
  className?: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  notHelpful: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ 
  product, 
  relatedProducts = [], 
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState("description");

  // Mock reviews data - in production this would come from API
  const reviews: Review[] = [
    {
      id: "1",
      user: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely amazing product! The quality exceeded my expectations and the customer support was fantastic.",
      helpful: 12,
      notHelpful: 0,
    },
    {
      id: "2",
      user: "John D.",
      rating: 4,
      date: "2024-01-12",
      comment: "Great value for money. The features are exactly what I needed for my project.",
      helpful: 8,
      notHelpful: 1,
    },
    {
      id: "3",
      user: "Emily R.",
      rating: 5,
      date: "2024-01-10",
      comment: "Perfect for beginners and professionals alike. Highly recommended!",
      helpful: 15,
      notHelpful: 0,
    },
  ];

  const tabs = [
    {
      id: "description",
      label: "Description",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "features",
      label: "Features",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <MessageCircle className="w-4 h-4" />,
      badge: reviews.length,
    },
    {
      id: "related",
      label: "Related Products",
      icon: <Star className="w-4 h-4" />,
    },
  ];

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

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <motion.div
            key="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Product Description
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  What You'll Get
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      High-quality digital files in multiple formats
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Commercial license for unlimited use
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Detailed documentation and tutorials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Lifetime updates and support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        );

      case "features":
        return (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Detailed Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Core Features
                </h4>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Technical Specifications
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">File Size</span>
                    <span className="font-medium">{product.fileSize}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Format</span>
                    <span className="font-medium">{product.format}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Compatibility</span>
                    <span className="font-medium">{product.compatibility.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Tags</span>
                    <span className="font-medium">{product.tags.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "reviews":
        return (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-lg font-semibold text-foreground">
                  {product.rating}
                </span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{review.user}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                          <span className="text-sm text-muted-foreground">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-accent transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 hover:text-accent transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      Not Helpful ({review.notHelpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "related":
        return (
          <motion.div
            key="related"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Related Products
            </h3>
            
            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.slice(0, 6).map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    {...relatedProduct}
                    variant="compact"
                    className="h-full"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No related products found at the moment.
                </p>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductTabs;

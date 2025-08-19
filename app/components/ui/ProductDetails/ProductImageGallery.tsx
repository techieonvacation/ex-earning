"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";
import { Button } from "../Button";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  title,
  className = "",
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Handle image selection
  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
    setIsZoomed(false);
    setZoomLevel(1);
  };

  // Handle zoom functionality
  const handleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
    }
  };

  // Handle zoom level change
  const handleZoomChange = (newLevel: number) => {
    setZoomLevel(Math.max(1, Math.min(4, newLevel)));
  };

  // Reset zoom
  const resetZoom = () => {
    setIsZoomed(false);
    setZoomLevel(1);
  };

  // Download image
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[selectedImage];
    link.download = `${title}-${selectedImage + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Display */}
      <div className="relative group">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                fill
                className={`object-cover transition-all duration-300 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                style={{
                  transform: isZoomed ? `scale(${zoomLevel})` : "scale(1)",
                }}
                onClick={handleZoom}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom Overlay Controls */}
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 flex flex-col gap-2"
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleZoomChange(zoomLevel + 0.5)}
                className="w-10 h-10 p-0 rounded-full"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleZoomChange(zoomLevel - 0.5)}
                className="w-10 h-10 p-0 rounded-full"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={resetZoom}
                className="w-10 h-10 p-0 rounded-full"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Download Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            className="absolute bottom-4 right-4 w-10 h-10 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Download className="w-4 h-4" />
          </Button>

          {/* Zoom Indicator */}
          {isZoomed && (
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`relative flex-shrink-0 transition-all duration-200 ${
                selectedImage === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:ring-2 hover:ring-muted-foreground/30"
              }`}
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border">
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              {selectedImage === index && (
                <motion.div
                  layoutId="selected-thumbnail"
                  className="absolute inset-0 bg-primary/20 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          {selectedImage + 1} of {images.length}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

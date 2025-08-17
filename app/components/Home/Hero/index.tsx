"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";

interface HeroProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function Hero({
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image:
        "https://ricostudy.com/wp-content/uploads/2025/08/Details-Banner.jpg",
      alt: "Banner 1",
    },
    {
      id: 2,
      image:
        "https://ricostudy.com/wp-content/uploads/2025/08/Details-Banner.jpg",
      alt: "Banner 2",
    },
    {
      id: 3,
      image:
        "https://ricostudy.com/wp-content/uploads/2025/08/Details-Banner.jpg",
      alt: "Banner 3",
    },
    {
      id: 4,
      image:
        "https://ricostudy.com/wp-content/uploads/2025/08/Details-Banner.jpg",
      alt: "Banner 4",
    },
  ];

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setCurrentIndex(index);

      // Reset animation state after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating]
  );

  const goToNextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, slides.length]);

  const goToPrevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, slides.length]);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, goToNextSlide, autoPlayInterval, isPaused]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container relative">
        {/* Carousel container - Responsive banner dimensions */}
        <div className="relative w-full aspect-[1620/460] mx-auto overflow-hidden rounded-lg border border-border shadow-sm">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out",
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : index < currentIndex
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              )}
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1620px"
                quality={90}
              />
            </div>
          ))}
        </div>

        {/* Navigation controls - Responsive positioning */}
        {showControls && (
          <>
            <Button
              variant="outline"
              size="lg"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-none rounded-none rounded-r-lg shadow-lg transition-all duration-200 hover:scale-105"
              onClick={goToPrevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-none rounded-none rounded-l-lg shadow-lg transition-all duration-200 hover:scale-105"
              onClick={goToNextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
              <span className="sr-only">Next slide</span>
            </Button>
          </>
        )}

        {/* Indicators - Responsive sizing */}
        {showIndicators && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 hover:scale-110",
                  index === currentIndex
                    ? "bg-primary w-5 sm:w-6 shadow-lg"
                    : "bg-background hover:bg-primary"
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

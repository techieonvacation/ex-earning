"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { LucideIcons } from "../Icon";
import Image from "next/image";

export default function TopNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Simple scroll handling for smooth transitions
  useEffect(() => {
    let ticking = false;
    const TRANSITION_THRESHOLD = 30;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Simple logic - just check scroll position
          if (currentScrollY <= TRANSITION_THRESHOLD) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    const initialScrollY = window.scrollY;
    if (initialScrollY > 30) {
      setIsVisible(false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  return (
    <>
      {/* Desktop Top Navbar */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background transition-all duration-500 ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }
          hidden md:block
        `}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
              ></Link>
            </div>

            {/* Search Bar Section */}
            <div className="flex-1 max-w-4xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  ref={searchRef}
                  type="search"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`
                    w-full pl-4 pr-12 rounded-full border-2 transition-all duration-200 lg:h-12
                    ${
                      isSearchFocused
                        ? "border-primary shadow-lg ring-2 ring-primary/20"
                        : "border-border hover:border-primary/20"
                    }
                    placeholder:text-muted-foreground text-foreground
                  `}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-md"
                >
                  <LucideIcons.Search className="w-5 h-5 text-primary-foreground" />
                </Button>
              </form>
            </div>

            {/* Contact Section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 group cursor-pointer">
                {/* Phone Icon */}
                <Image
                  src="/images/icon/call.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />
                {/* Contact Text */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    Call Us
                  </span>
                  <span className="text-sm font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                    +91 9006564092
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Navbar */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40 bg-background border-b border-border/30 transition-all duration-500 ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }
          md:hidden
        `}
      >
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-x-1">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <div className="w-3 h-3 bg-accent rounded-full" />
              <div className="w-3 h-3 bg-secondary rounded-full" />
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Toggle Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMobileSearch}
                className="w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <LucideIcons.Search className="w-5 h-5 text-gray-600" />
              </Button>

              {/* Contact Section */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  {/* Phone Icon */}
                  <Image
                    src="/images/icon/call.svg"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  {/* Contact Text */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      Call Us
                    </span>
                    <span className="text-sm font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                      +91 9006564092
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Expandable */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isMobileSearchOpen ? "max-h-20 pb-4" : "max-h-0"}
            `}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                ref={searchRef}
                type="search"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:shadow-lg placeholder:text-gray-400 text-gray-700"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md"
              >
                <LucideIcons.Search className="w-4 h-4 text-white" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

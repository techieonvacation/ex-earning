"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcons } from "../Icon";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useTheme } from "@/app/lib/theme-provider";
import { NavbarProps } from "./Navbar.types";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { Hamburger } from "../Humberger";
import Image from "next/image";
import { NavbarConfig, DEFAULT_NAVBAR_CONFIG } from "@/app/lib/models/navbar";

export default function Navbar({
  config = {},
  className = "",
  onSearchSubmit,
  onConsultationClick,
}: NavbarProps = {}) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>(
    DEFAULT_NAVBAR_CONFIG
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch navbar configuration from API
  useEffect(() => {
    const fetchNavbarConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/navbar", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch navbar configuration");
        }

        const data = await response.json();
        setNavbarConfig(data);
      } catch (error) {
        console.error("Error fetching navbar configuration:", error);
        setNavbarConfig(DEFAULT_NAVBAR_CONFIG);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavbarConfig();
  }, []);

  const finalConfig = useMemo(
    () => ({ ...navbarConfig, ...config }),
    [navbarConfig, config]
  );

  // Get current slider data based on hovered menu item
  const currentSliderData = useMemo(() => {
    if (!hoveredMenuItem) {
      return finalConfig.sliderData || [];
    }

    // Find the menu item that's being hovered
    const allMenuItems = [
      ...finalConfig.mainNavItems,
      ...finalConfig.secondaryNavItems,
    ];
    const hoveredItem = allMenuItems.find(
      (item) => item.name === hoveredMenuItem
    );

    // Only return slider data for grouped layout items
    if (hoveredItem?.layout === "grouped" && hoveredItem?.sliderData) {
      return hoveredItem.sliderData;
    }

    // For grouped layouts without own slider data, use global slider data
    if (hoveredItem?.layout === "grouped") {
      return finalConfig.sliderData || [];
    }

    // For default layouts, don't show slider
    return [];
  }, [hoveredMenuItem, finalConfig]);

  // Advanced scroll effect with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search with advanced features
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearchSubmit?.(searchQuery.trim());
        setIsOpen(false);
        setSearchFocused(false);
        searchRef.current?.blur();
      }
    },
    [searchQuery, onSearchSubmit]
  );

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setSearchFocused(false);
  }, []);

  // Consultation handler
  const handleConsultationClick = useCallback(() => {
    onConsultationClick?.();
    closeMobileMenu();
  }, [onConsultationClick, closeMobileMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      const toggleButton = document.querySelector(
        '[aria-label="Toggle navigation menu"]'
      );

      if (
        toggleButton &&
        (toggleButton === target || toggleButton.contains(target))
      ) {
        return;
      }

      // MobileMenu component handles its own click outside logic
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMobileMenu]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeMobileMenu]);

  const getThemeIcon = () => {
    if (!mounted) return <LucideIcons.Moon className="h-5 w-5" />;
    return theme === "dark" ? (
      <LucideIcons.Sun className="h-5 w-5" />
    ) : (
      <LucideIcons.Moon className="h-5 w-5" />
    );
  };

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="animate-pulse bg-muted h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-muted h-8 w-48 rounded"></div>
            <div className="animate-pulse bg-muted h-8 w-24 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Main Navigation Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out
          ${
            isScrolled
              ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
              : "bg-background border-b border-border"
          }
          ${className}
        `}
      >
        <div className="container">
          {/* Mobile Navigation Bar */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <h2 className="text-2xl font-bold text-primary font-dm-sans">
                Ex-Earning
              </h2>
              {/* <Image
                src="/images/light-logo.webp"
                alt={finalConfig.companyName || "Renderwise"}
                width={100}
                height={100}
                className={`w-full h-full transition-all duration-300 ${
                  theme === "dark" ? "hidden" : "block"
                }`}
              />
              <Image
                src="/images/dark-logo.webp"
                alt={finalConfig.companyName || "Renderwise"}
                width={100}
                height={100}
                className={`w-full h-full transition-all duration-300 ${
                  theme === "dark" ? "block" : "hidden"
                }`}
              /> */}
            </Link>

            {/* Enhanced Desktop Navigation with Advanced Sub-menus */}
            <nav className="hidden lg:flex items-center space-x-2">
              <ul className="flex items-center space-x-1">
                {finalConfig.mainNavItems
                  .filter((item) => item.isActive !== false)
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((item, index) => (
                    <DesktopMenu
                      key={`${item.name}-${index}`}
                      menu={item}
                      onHover={(menuName) => setHoveredMenuItem(menuName)}
                      onLeave={() => setHoveredMenuItem(null)}
                      currentSliderData={currentSliderData}
                    />
                  ))}
              </ul>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              {/* Theme Toggle */}
              {finalConfig.showThemeToggle && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-10 w-10 rounded-full border border-border hover:bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } theme`}
                >
                  {getThemeIcon()}
                </Button>
              )}

              {/* Consultation CTA - Desktop */}
              {finalConfig.showConsultation && (
                <>
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={handleConsultationClick}
                    className="sm:hidden whitespace-nowrap"
                    rightIcon={<LucideIcons.ArrowUpRight className="size-5" />}
                  >
                    Let&apos;s Talk
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConsultationClick}
                    className="hidden sm:flex lg:hidden whitespace-nowrap"
                    rightIcon={<LucideIcons.ArrowUpRight className="size-5" />}
                  >
                    Let&apos;s Talk
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="hidden lg:flex whitespace-nowrap"
                    onClick={handleConsultationClick}
                    rightIcon={<LucideIcons.ArrowUpRight className="size-5" />}
                  >
                    Let&apos;s Talk
                  </Button>
                </>
              )}
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Hamburger
                  isOpen={isOpen}
                  onToggle={toggleMobileMenu}
                  className="lg:hidden"
                />
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Expandable */}
          {finalConfig.showSearch && (
            <div
              className={`
                hidden lg:block overflow-hidden transition-all duration-300 ease-out
                ${searchFocused ? "max-h-20 pb-4" : "max-h-0"}
              `}
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Input
                    ref={searchRef}
                    type="search"
                    placeholder="Search our services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-border text-foreground placeholder:text-text-muted rounded-full"
                    autoFocus={searchFocused}
                  />
                  <LucideIcons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground transition-all 
                    duration-200 hover:scale-105"
                  >
                    <LucideIcons.ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Advanced Mobile Menu */}
      <MobileMenu
        config={finalConfig}
        isOpen={isOpen}
        onClose={closeMobileMenu}
        onConsultationClick={handleConsultationClick}
      />

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}

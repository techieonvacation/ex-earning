/**
 * DesktopMenu Component
 *
 * An advanced desktop menu component with sophisticated sub-menu functionality.
 * Features include:
 * - Auto-positioning sub-menus based on screen space
 * - Grouped and default layout options
 * - Auto-slider for enhanced visual appeal
 * - Responsive design with mobile-first approach
 * - Dynamic icon loading from Lucide React
 * - Beautiful animations and hover effects
 *
 * @component
 * @example
 * <DesktopMenu menu={menuItem} />
 */

"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import SubMenuFooter from "./SubMenuFooter";
import Image from "next/image";
import { DesktopMenuProps, SubMenuItem, SliderData } from "./Navbar.types";

interface ExtendedDesktopMenuProps extends DesktopMenuProps {
  onHover?: (menuName: string) => void;
  onLeave?: () => void;
  currentSliderData?: SliderData[];
}

export default function DesktopMenu({
  menu,
  onHover,
  onLeave,
  currentSliderData = [],
}: ExtendedDesktopMenuProps) {
  // State management for menu interactions and animations
  const [isHover, setIsHover] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuPosition, setMenuPosition] = useState<"left" | "center" | "right">(
    "center"
  );

  // Refs for DOM manipulation and positioning calculations
  const menuRef = useRef<HTMLLIElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  // Use the passed slider data or fallback to menu's own slider data
  const sliderData = useMemo(() => {
    // For grouped layouts, use the menu's own slider data if available
    if (
      menu.layout === "grouped" &&
      menu.sliderData &&
      menu.sliderData.length > 0
    ) {
      return menu.sliderData;
    }

    // For grouped layouts without own slider data, use passed currentSliderData
    if (menu.layout === "grouped" && currentSliderData.length > 0) {
      return currentSliderData;
    }

    // For default layouts, don't show slider
    return [];
  }, [menu.layout, menu.sliderData, currentSliderData]);

  /**
   * Handles menu item clicks and closes sub-menus
   */
  const handleMenuItemClick = () => {
    setIsHover(false);
  };

  /**
   * Handles mouse enter with hover callback
   */
  const handleMouseEnter = () => {
    setIsHover(true);
    onHover?.(menu.name);
  };

  /**
   * Handles mouse leave with leave callback
   */
  const handleMouseLeave = () => {
    setIsHover(false);
    onLeave?.();
  };

  /**
   * Determines if the menu has sub-menu items
   */
  const hasSubMenu = React.useMemo(
    () =>
      (menu?.subMenu && menu?.subMenu?.length > 0) ||
      (menu?.dropdownItems && menu?.dropdownItems?.length > 0),
    [menu?.subMenu, menu?.dropdownItems]
  );

  /**
   * Determines if this menu should use the advanced sub-menu layout
   * Based on layout property - "grouped" layout shows advanced sub-menu with slider
   */
  const useAdvancedSubMenu = React.useMemo(
    () => menu.layout === "grouped" && menu.subMenu,
    [menu.layout, menu.subMenu]
  );

  /**
   * Dynamic icon loading from Lucide React
   * Safely retrieves icons by name with fallback
   */
  const getIcon = React.useCallback((iconName: string | undefined) => {
    if (!iconName) return null;
    const Icon = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as LucideIcons.LucideIcon;
    return Icon ? <Icon className="h-5 w-5 text-primary" /> : null;
  }, []);

  /**
   * Groups sub-menu items by their group property for organized display
   */
  const groupedSubMenus = React.useMemo(() => {
    if (!menu.subMenu || menu.layout !== "grouped") return null;

    return menu.subMenu.reduce((acc, item) => {
      const group = item.group || "default";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {} as Record<string, SubMenuItem[]>);
  }, [menu.subMenu, menu.layout]);

  /**
   * Calculates optimal sub-menu positioning to prevent overflow
   * Dynamically adjusts based on viewport width and menu position
   */
  useEffect(() => {
    if (!isHover || !menuRef.current || !hasSubMenu) return;

    const menuElement = menuRef.current;
    const menuRect = menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const submenuWidth = useAdvancedSubMenu ? 900 : 400;

    // Calculate potential overflow and adjust positioning
    const leftPosition = menuRect.left - submenuWidth / 2 + menuRect.width / 2;
    const rightPosition = leftPosition + submenuWidth;

    if (leftPosition < 20) {
      setMenuPosition("left");
    } else if (rightPosition > viewportWidth - 20) {
      setMenuPosition("right");
    } else {
      setMenuPosition("center");
    }
  }, [isHover, hasSubMenu, useAdvancedSubMenu]);

  /**
   * Auto-slider effect for enhanced visual appeal
   * Automatically cycles through slides when sub-menu is open for grouped layouts
   */
  useEffect(() => {
    if (!isHover || !useAdvancedSubMenu || sliderData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHover, useAdvancedSubMenu, sliderData.length]);

  return (
    <li
      ref={menuRef}
      className="group/link"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Menu Item - Link or Dropdown Trigger */}
      {!hasSubMenu && menu.href ? (
        <Link href={menu.href}>
          <span className="flex items-center text-foreground font-medium font-urbanist text-xs lg:text-sm xl:text-lg whitespace-nowrap gap-1 hover:text-primary cursor-pointer px-3 py-1 rounded-xl transition-all duration-300">
            {menu.name}
          </span>
        </Link>
      ) : (
        <span className="flex items-center font-medium font-urbanist text-xs lg:text-sm xl:text-lg text-foreground gap-1 hover:text-primary cursor-pointer px-3 py-1 rounded-xl transition-all duration-300">
          {menu.name}
          {hasSubMenu && (
            <ChevronDown
              className={cn(
                "mt-[0.6px] duration-300 size-5 text-foreground/70 group-hover/link:text-primary transition-all",
                isHover ? "rotate-180" : "rotate-0"
              )}
              aria-hidden="true"
            />
          )}
        </span>
      )}

      {/* Advanced Sub-Menu for Services/Solutions */}
      {hasSubMenu && useAdvancedSubMenu && (
        <div
          ref={subMenuRef}
          className={cn(
            "advanced-sub-menu absolute top-[4.2rem] bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/10 overflow-hidden transition-all duration-300 ease-out origin-top z-50",
            // Dynamic positioning based on screen space
            menuPosition === "left" && "left-1/2 -translate-x-1/2",
            menuPosition === "center" && "left-1/2 -translate-x-1/2",
            menuPosition === "right" && "right-0",
            // Responsive widths
            "w-[900px] max-w-[95vw]",
            // Animation states
            isHover
              ? "opacity-100 visible translate-y-0 scale-100"
              : "opacity-0 invisible translate-y-2 scale-95"
          )}
          role="menu"
          aria-label={`${menu.name} submenu`}
        >
          <div
            className={cn(
              "grid min-h-[400px] lg:h-[500px]",
              sliderData.length > 0
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {/* Left Side - Menu Items */}
            <div className="p-6 lg:p-8 overflow-y-auto custom-scrollbar">
              {menu.layout === "grouped" &&
              groupedSubMenus &&
              menu.subMenuHeading ? (
                <>
                  <div className="space-y-6 lg:space-y-8">
                    {menu.subMenuHeading.map((heading, idx) => (
                      <div key={idx} className="space-y-3 lg:space-y-4">
                        <h3 className="text-base lg:text-lg font-bold font-urbanist text-foreground mb-3 lg:mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-primary">
                          {heading}
                        </h3>
                        <div className="space-y-2">
                          {groupedSubMenus[heading]?.map((submenu, subIdx) => (
                            <Link
                              href={submenu.href || "#"}
                              key={submenu.name}
                              onClick={handleMenuItemClick}
                              className="group/item flex items-center gap-3 lg:gap-4 p-2.5 lg:p-3 rounded-xl hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                            >
                              {submenu.iconName && (
                                <div className="p-1.5 lg:p-2 rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover/item:bg-primary/20 group-hover/item:scale-110 flex-shrink-0">
                                  {getIcon(submenu.iconName)}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold font-urbanist text-foreground group-hover/item:text-primary transition-colors duration-200 text-sm lg:text-base truncate">
                                  {submenu.name}
                                </h4>
                                <p className="text-xs lg:text-sm text-foreground/70 group-hover/item:text-foreground/90 transition-colors duration-200 line-clamp-2">
                                  {submenu.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-3 lg:space-y-4">
                  {menu.subMenu?.map((submenu, i) => (
                    <Link
                      href={submenu.href || "#"}
                      key={`${menu.name}-submenu-${i}`}
                      onClick={handleMenuItemClick}
                      className="group/item flex items-center gap-3 lg:gap-4 p-2.5 lg:p-3 rounded-xl hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                    >
                      {submenu.iconName && (
                        <div className="p-1.5 lg:p-2 rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover/item:bg-primary/20 group-hover/item:scale-110 flex-shrink-0">
                          {getIcon(submenu.iconName)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold font-urbanist text-foreground group-hover/item:text-primary transition-colors duration-200 text-sm lg:text-base truncate">
                          {submenu.name}
                        </h4>
                        <p className="text-xs lg:text-sm text-foreground/70 group-hover/item:text-foreground/90 transition-colors duration-200 line-clamp-2">
                          {submenu.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Auto Slider */}
            {sliderData.length > 0 && (
              <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 p-6 lg:p-8 items-center justify-center hidden lg:flex">
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  {sliderData.map((slide, index) => (
                    <div
                      key={index}
                      className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ease-in-out",
                        currentSlide === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      )}
                    >
                      <div className="relative z-10">
                        <div className="mb-4 lg:mb-6 rounded-2xl overflow-hidden max-w-[200px] mx-auto w-full">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold font-urbanist text-foreground mb-2 lg:mb-3">
                          {slide.title}
                        </h4>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slide indicators */}
                {sliderData.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sliderData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          currentSlide === index
                            ? "bg-primary scale-125"
                            : "bg-foreground/30 hover:bg-foreground/50"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {menu.footerText && menu.footerLink && (
            <SubMenuFooter text={menu.footerText} href={menu.footerLink} />
          )}
        </div>
      )}

      {/* Regular Sub-Menu for other items or legacy dropdowns */}
      {hasSubMenu && !useAdvancedSubMenu && (
        <div
          className={cn(
            "sub-menu absolute top-[4.2rem] bg-background/95 backdrop-blur-xl rounded-xl shadow-lg border border-border/10 p-4 transition-all duration-300 ease-out origin-top z-50",
            // Dynamic positioning
            menuPosition === "left" && "left-0",
            menuPosition === "center" && "left-1/2 -translate-x-1/2",
            menuPosition === "right" && "right-0",
            // Responsive widths
            "w-[400px] max-w-[95vw]",
            // Animation states
            isHover
              ? "opacity-100 visible translate-y-0 scale-100"
              : "opacity-0 invisible translate-y-2 scale-95"
          )}
          role="menu"
          aria-label={`${menu.name} submenu`}
        >
          <div
            className={cn(
              "grid gap-3 lg:gap-4",
              menu.gridCols === 3 && "grid-cols-1 lg:grid-cols-3",
              menu.gridCols === 2 && "grid-cols-1 lg:grid-cols-2",
              (!menu.gridCols || menu.gridCols === 1) && "grid-cols-1"
            )}
          >
            {/* Enhanced sub-menu items */}
            {menu.subMenu?.map((submenu, i) => (
              <Link
                href={submenu.href || "#"}
                key={`${menu.name}-submenu-${i}`}
                onClick={handleMenuItemClick}
                className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
              >
                {submenu.iconName && (
                  <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover/item:bg-primary/20 group-hover/item:scale-110 flex-shrink-0">
                    {getIcon(submenu.iconName)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold font-urbanist text-foreground group-hover/item:text-primary transition-colors duration-200 text-sm truncate">
                    {submenu.name}
                  </h4>
                  <p className="text-xs text-foreground/70 group-hover/item:text-foreground/90 transition-colors duration-200 line-clamp-2">
                    {submenu.desc}
                  </p>
                </div>
              </Link>
            ))}

            {/* Legacy dropdown items for backward compatibility */}
            {menu.dropdownItems?.map((dropdownItem, i) => (
              <Link
                href={dropdownItem.href || "#"}
                key={`${menu.name}-dropdown-${i}`}
                onClick={handleMenuItemClick}
                className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
              >
                {dropdownItem.icon && (
                  <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover/item:bg-primary/20 group-hover/item:scale-110 flex-shrink-0">
                    <dropdownItem.icon className="h-5 w-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold font-urbanist text-foreground group-hover/item:text-primary transition-colors duration-200 text-sm truncate">
                    {dropdownItem.name}
                  </h4>
                  {dropdownItem.description && (
                    <p className="text-xs text-foreground/70 group-hover/item:text-foreground/90 transition-colors duration-200 line-clamp-2">
                      {dropdownItem.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer for regular sub-menus */}
          {menu.footerText && menu.footerLink && (
            <SubMenuFooter text={menu.footerText} href={menu.footerLink} />
          )}
        </div>
      )}
    </li>
  );
}

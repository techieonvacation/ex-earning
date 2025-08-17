/**
 * MobileSubMenu Component
 * 
 * Advanced mobile sub-menu component with sophisticated functionality:
 * - Collapsible/expandable sub-menu sections
 * - Grouped layout support with category headers
 * - Beautiful animations and transitions
 * - Touch-optimized interactions
 * - Dynamic icon loading from Lucide React
 * - Smooth expand/collapse animations
 * 
 * @component
 * @example
 * ```tsx
 * <MobileSubMenu 
 *   menu={menuItem} 
 *   isExpanded={true}
 *   onToggle={() => handleToggle()}
 *   onItemClick={() => handleItemClick()}
 * />
 * ```
 */

"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { NavItem, SubMenuItem } from "./Navbar.types";

interface MobileSubMenuProps {
  menu: NavItem;
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}

export default function MobileSubMenu({ 
  menu, 
  isExpanded, 
  onToggle, 
  onItemClick 
}: MobileSubMenuProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * Dynamic icon loading from Lucide React
   * Safely retrieves icons by name with fallback
   */
  const getIcon = React.useCallback(
    (iconName: string | undefined) => {
      if (!iconName) return null;
      const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
      return Icon ? <Icon className="h-4 w-4 text-primary" /> : null;
    },
    []
  );

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
   * Check if menu has sub-items (either new subMenu or legacy dropdownItems)
   */
  const hasSubItems = React.useMemo(
    () => (menu?.subMenu && menu?.subMenu?.length > 0) || 
          (menu?.dropdownItems && menu?.dropdownItems?.length > 0),
    [menu?.subMenu, menu?.dropdownItems]
  );

  /**
   * Handle menu item click - if it has sub-items, toggle; otherwise navigate
   */
  const handleItemClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      onToggle();
    } else if (menu.href) {
      onItemClick();
    }
  };

  return (
    <div className="border-b border-border/10 last:border-b-0">
      {/* Main Menu Item Button */}
      <button
        onClick={handleItemClick}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left transition-all duration-200 hover:bg-primary/5 active:bg-primary/10",
          isExpanded && hasSubItems && "bg-primary/5"
        )}
        aria-expanded={hasSubItems ? isExpanded : undefined}
        aria-controls={hasSubItems ? `submenu-${menu.name}` : undefined}
      >
        <div className="flex items-center space-x-3">
          {menu.icon && getIcon(menu.icon)}
          <span className={cn(
            "font-medium transition-colors duration-200",
            isExpanded && hasSubItems ? "text-primary" : "text-foreground"
          )}>
            {menu.name}
          </span>
          {menu.badge && (
            <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
              {menu.badge}
            </span>
          )}
        </div>
        
        {hasSubItems && (
          <div className={cn(
            "transition-transform duration-200 ease-out",
            isExpanded ? "rotate-90" : "rotate-0"
          )}>
            <ChevronRight className="h-4 w-4 text-foreground/50" />
          </div>
        )}
      </button>

      {/* Collapsible Sub-Menu Content */}
      {hasSubItems && (
        <div
          ref={contentRef}
          id={`submenu-${menu.name}`}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-background/50 border-t border-border/10">
            {/* Enhanced Sub-Menu Items */}
            {menu.subMenu && (
              <div className="p-2">
                {menu.layout === "grouped" && groupedSubMenus && menu.subMenuHeading ? (
                  // Grouped Layout
                  <div className="space-y-4">
                    {menu.subMenuHeading.map((heading, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider px-3 py-2">
                          {heading}
                        </h4>
                        <div className="space-y-1">
                          {groupedSubMenus[heading]?.map((submenu, subIdx) => (
                            <Link
                              href={submenu.href || "#"}
                              key={`${heading}-${subIdx}`}
                              onClick={onItemClick}
                              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1 active:bg-primary/10"
                            >
                              {submenu.iconName && (
                                <div className="p-1.5 rounded-md bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110 flex-shrink-0">
                                  {getIcon(submenu.iconName)}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 text-sm">
                                  {submenu.name}
                                </h5>
                                <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-200 line-clamp-2 mt-0.5">
                                  {submenu.desc}
                                </p>
                              </div>
                              {submenu.isNew && (
                                <span className="px-1.5 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded">
                                  New
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Default Layout
                  <div className="space-y-1">
                    {menu.subMenu.map((submenu, i) => (
                      <Link
                        href={submenu.href || "#"}
                        key={`${menu.name}-submenu-${i}`}
                        onClick={onItemClick}
                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1 active:bg-primary/10"
                      >
                        {submenu.iconName && (
                          <div className="p-1.5 rounded-md bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110 flex-shrink-0">
                            {getIcon(submenu.iconName)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 text-sm">
                            {submenu.name}
                          </h5>
                          <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-200 line-clamp-2 mt-0.5">
                            {submenu.desc}
                          </p>
                        </div>
                        {submenu.isNew && (
                          <span className="px-1.5 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded">
                            New
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Sub-Menu Footer */}
                {menu.footerText && menu.footerLink && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/20">
                    <Link
                      href={menu.footerLink}
                      onClick={onItemClick}
                      className="group flex items-center justify-between w-full"
                    >
                      <div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {menu.footerText}
                        </span>
                        <p className="text-xs text-foreground/60 mt-0.5">
                          Explore all options
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Legacy Dropdown Items Support */}
            {menu.dropdownItems && (
              <div className="p-2 space-y-1">
                {menu.dropdownItems.map((dropdownItem, i) => (
                  <Link
                    href={dropdownItem.href || "#"}
                    key={`${menu.name}-dropdown-${i}`}
                    onClick={onItemClick}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1 active:bg-primary/10"
                  >
                    {dropdownItem.icon && (
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110 flex-shrink-0">
                        <dropdownItem.icon className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 text-sm">
                        {dropdownItem.name}
                      </h5>
                      {dropdownItem.description && (
                        <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-200 line-clamp-2 mt-0.5">
                          {dropdownItem.description}
                        </p>
                      )}
                    </div>
                    {dropdownItem.isNew && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded">
                        New
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
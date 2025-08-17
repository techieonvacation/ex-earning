import { LucideIcon } from "lucide-react";

/**
 * Enhanced SubMenuItem interface supporting advanced sub-menu features
 * Includes support for grouped menus, icons, descriptions, and categorization
 */
export interface SubMenuItem {
  name: string;
  href: string;
  desc: string;
  iconName?: string; // Changed from keyof typeof import("lucide-react") to string for dynamic icons
  group?: string; // For grouped menu layouts
  external?: boolean;
  isNew?: boolean;
  badge?: string;
  order?: number;
}

/**
 * Enhanced NavItem interface with advanced sub-menu support
 * Supports multiple layout types, positioning, and grid configurations
 */
export interface NavItem {
  name: string;
  href?: string; // Optional for items with sub-menus only
  hasDropdown?: boolean;

  // Advanced sub-menu configuration
  subMenu?: SubMenuItem[]; // Enhanced sub-menu items
  subMenuHeading?: string[]; // Headings for grouped layouts
  gridCols?: 1 | 2 | 3; // Grid column configuration for sub-menu
  layout?: "grouped" | "default"; // Layout type for sub-menu

  // Footer configuration for sub-menus
  footerText?: string;
  footerLink?: string;

  // Legacy dropdown support (for backward compatibility)
  dropdownItems?: DropdownItem[];

  // Basic properties
  external?: boolean;
  icon?: string; // Changed from LucideIcon to string for dynamic icons
  badge?: string;
  order?: number;
  isActive?: boolean;
  
  // Individual slider data for grouped layout items
  sliderData?: SliderData[];
}

/**
 * Legacy DropdownItem interface for backward compatibility
 */
export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  external?: boolean;
  isNew?: boolean;
}

/**
 * Social media icon configuration
 */
export interface SocialIcon {
  icon: string; // Changed from LucideIcon to string for dynamic icons
  href: string;
  label: string;
  external?: boolean;
  order?: number;
  isActive?: boolean;
}

/**
 * Complete navbar configuration interface
 */
export interface NavbarConfig {
  mainNavItems: NavItem[];
  secondaryNavItems: NavItem[];
  socialIcons: SocialIcon[];
  showSearch?: boolean;
  showThemeToggle?: boolean;
  showConsultation?: boolean;
  companyName?: string;
  sliderData?: SliderData[];
}

/**
 * Props for the main Navbar component
 */
export interface NavbarProps {
  config?: Partial<NavbarConfig>;
  className?: string;
  onSearchSubmit?: (query: string) => void;
  onConsultationClick?: () => void;
}

/**
 * Navigation section types
 */
export type NavigationSection = "main" | "secondary" | "mobile";

/**
 * Props for DesktopMenu component
 */
export interface DesktopMenuProps {
  menu: NavItem;
}

/**
 * Props for SubMenuFooter component
 */
export interface SubMenuFooterProps {
  text: string;
  href: string;
  className?: string;
}

/**
 * Slider data interface for advanced sub-menu auto-slider
 */
export interface SliderData {
  title: string;
  description: string;
  image: string;
  order?: number;
}

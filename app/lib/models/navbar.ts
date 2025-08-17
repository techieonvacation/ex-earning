import { z } from "zod";
import { ObjectId } from "mongodb";

// Base schemas for validation
export const SubMenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  href: z.string().min(1, "Href is required"),
  desc: z.string().min(1, "Description is required"),
  iconName: z.string().optional(),
  group: z.string().optional(),
  external: z.boolean().optional(),
  isNew: z.boolean().optional(),
  badge: z.string().optional(),
  order: z.number().int().positive().optional(),
});

export const SliderDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required"),
  order: z.number().int().positive().optional(),
});

export const NavItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  href: z.string().optional(),
  hasDropdown: z.boolean().optional(),
  subMenu: z.array(SubMenuItemSchema).optional(),
  subMenuHeading: z.array(z.string()).optional(),
  gridCols: z.number().int().min(1).max(3).optional(),
  layout: z.enum(["grouped", "default"]).optional(),
  footerText: z.string().optional(),
  footerLink: z.string().optional(),
  external: z.boolean().optional(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  order: z.number().int().positive().optional(),
  isActive: z.boolean().optional().default(true),
  sliderData: z.array(SliderDataSchema).optional(),
});

export const SocialIconSchema = z.object({
  icon: z.string().min(1, "Icon name is required"),
  href: z.string().min(1, "Href is required"),
  label: z.string().min(1, "Label is required"),
  external: z.boolean().optional(),
  order: z.number().int().positive().optional(),
  isActive: z.boolean().optional().default(true),
});

export const NavbarConfigSchema = z.object({
  mainNavItems: z.array(NavItemSchema),
  secondaryNavItems: z.array(NavItemSchema),
  socialIcons: z.array(SocialIconSchema),
  showSearch: z.boolean().optional().default(true),
  showThemeToggle: z.boolean().optional().default(true),
  showConsultation: z.boolean().optional().default(true),
  companyName: z.string().optional().default("Renderwise"),
  sliderData: z.array(SliderDataSchema).optional(),
});

// MongoDB document interfaces
export interface NavbarDocument {
  _id?: ObjectId;
  id: string;
  config: z.infer<typeof NavbarConfigSchema>;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface SubMenuItem {
  name: string;
  href: string;
  desc: string;
  iconName?: string;
  group?: string;
  external?: boolean;
  isNew?: boolean;
  badge?: string;
  order?: number;
}

export interface SliderData {
  title: string;
  description: string;
  image: string;
  order?: number;
}

export interface NavItem {
  name: string;
  href?: string;
  hasDropdown?: boolean;
  subMenu?: SubMenuItem[];
  subMenuHeading?: string[];
  gridCols?: 1 | 2 | 3;
  layout?: "grouped" | "default";
  footerText?: string;
  footerLink?: string;
  external?: boolean;
  icon?: string;
  badge?: string;
  order?: number;
  isActive?: boolean;
  sliderData?: SliderData[];
}

export interface SocialIcon {
  icon: string;
  href: string;
  label: string;
  external?: boolean;
  order?: number;
  isActive?: boolean;
}

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

// Default navbar configuration
export const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  mainNavItems: [
    {
      name: "Home",
      href: "/",
      order: 1,
      isActive: true,
    },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      layout: "grouped",
      subMenuHeading: ["Development", "Infrastructure", "Design"],
      subMenu: [
        {
          name: "Web Development",
          href: "/services/web-development",
          desc: "Modern, responsive websites built with cutting-edge technologies and frameworks",
          iconName: "Code",
          group: "Development",
          order: 1,
        },
        {
          name: "Mobile Development",
          href: "/services/mobile",
          desc: "Native iOS and Android applications with cross-platform solutions",
          iconName: "Smartphone",
          group: "Development",
          order: 2,
        },
        {
          name: "API Development",
          href: "/services/api",
          desc: "Robust RESTful and GraphQL APIs with comprehensive documentation",
          iconName: "Server",
          group: "Development",
          order: 3,
        },
        {
          name: "Cloud Solutions",
          href: "/services/cloud",
          desc: "Scalable cloud infrastructure with AWS, Azure, and Google Cloud",
          iconName: "Cloud",
          group: "Infrastructure",
          order: 4,
        },
        {
          name: "DevOps & CI/CD",
          href: "/services/devops",
          desc: "Automated deployment pipelines and infrastructure as code",
          iconName: "GitBranch",
          group: "Infrastructure",
          order: 5,
        },
        {
          name: "UI/UX Design",
          href: "/services/ui-ux",
          desc: "Beautiful and intuitive user experiences with modern design principles",
          iconName: "Palette",
          group: "Design",
          order: 6,
        },
      ],
      footerText: "Explore All Services",
      footerLink: "/services",
      order: 2,
      isActive: true,
      sliderData: [
        {
          title: "Web Development",
          description: "Modern, responsive websites built with cutting-edge technologies",
          image: "/images/services/web-development.jpg",
          order: 1,
        },
        {
          title: "Mobile Development",
          description: "Native and cross-platform mobile applications",
          image: "/images/services/mobile-dev.jpg",
          order: 2,
        },
        {
          title: "Cloud Solutions",
          description: "Scalable cloud infrastructure for modern businesses",
          image: "/images/services/cloud-solutions.jpg",
          order: 3,
        },
        {
          title: "UI/UX Design",
          description: "Beautiful and intuitive user experiences",
          image: "/images/services/ui-ux-design.jpg",
          order: 4,
        },
        {
          title: "DevOps & Security",
          description: "Secure deployment pipelines and infrastructure",
          image: "/images/services/devops.jpg",
          order: 5,
        },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      hasDropdown: true,
      layout: "grouped",
      subMenuHeading: ["Enterprise", "E-commerce", "Specialized"],
      subMenu: [
        {
          name: "Enterprise Software",
          href: "/solutions/enterprise",
          desc: "Large-scale business solutions with enterprise-grade security",
          iconName: "Building",
          group: "Enterprise",
          order: 1,
        },
        {
          name: "E-commerce Platforms",
          href: "/solutions/ecommerce",
          desc: "Custom online stores with payment gateway integrations",
          iconName: "ShoppingCart",
          group: "E-commerce",
          order: 2,
        },
        {
          name: "SaaS Products",
          href: "/solutions/saas",
          desc: "Software as a Service platforms with subscription management",
          iconName: "Rocket",
          group: "Specialized",
          order: 3,
        },
      ],
      footerText: "View All Solutions",
      footerLink: "/solutions",
      order: 3,
      isActive: true,
      sliderData: [
        {
          title: "Enterprise Solutions",
          description: "Large-scale business solutions with enterprise-grade security",
          image: "/images/solutions/enterprise.jpg",
          order: 1,
        },
        {
          title: "E-commerce Platforms",
          description: "Custom online stores with payment gateway integrations",
          image: "/images/solutions/ecommerce.jpg",
          order: 2,
        },
        {
          title: "SaaS Products",
          description: "Software as a Service platforms with subscription management",
          image: "/images/solutions/saas.jpg",
          order: 3,
        },
        {
          title: "AI & Machine Learning",
          description: "Intelligent automation and data-driven insights",
          image: "/images/solutions/ai-ml.jpg",
          order: 4,
        },
        {
          title: "Blockchain Development",
          description: "Decentralized applications and smart contracts",
          image: "/images/solutions/blockchain.jpg",
          order: 5,
        },
      ],
    },
    {
      name: "About",
      href: "/about",
      hasDropdown: true,
      gridCols: 2,
      subMenu: [
        {
          name: "Our Story",
          href: "/about/story",
          desc: "Learn about our journey and mission to deliver exceptional solutions",
          iconName: "Book",
          order: 1,
        },
        {
          name: "Our Team",
          href: "/about/team",
          desc: "Meet the talented professionals behind our success",
          iconName: "Users",
          order: 2,
        },
        {
          name: "Careers",
          href: "/careers",
          desc: "Join our team and build the future of technology together",
          iconName: "Briefcase",
          order: 3,
        },
        {
          name: "Culture & Values",
          href: "/about/culture",
          desc: "Discover our core values and company culture",
          iconName: "Heart",
          order: 4,
        },
      ],
      order: 4,
      isActive: true,
      sliderData: [
        {
          title: "Our Story",
          description: "Learn about our journey and mission to deliver exceptional solutions",
          image: "/images/about/our-story.jpg",
          order: 1,
        },
        {
          title: "Our Team",
          description: "Meet the talented professionals behind our success",
          image: "/images/about/our-team.jpg",
          order: 2,
        },
        {
          title: "Careers",
          description: "Join our team and build the future of technology together",
          image: "/images/about/careers.jpg",
          order: 3,
        },
        {
          title: "Culture & Values",
          description: "Discover our core values and company culture",
          image: "/images/about/culture.jpg",
          order: 4,
        },
      ],
    },
    {
      name: "Contact",
      href: "/contact-us",
      order: 5,
      isActive: true,
    },
  ],
  secondaryNavItems: [
    {
      name: "Career",
      href: "/careers",
      order: 1,
      isActive: true,
    },
    {
      name: "Support",
      href: "/support",
      hasDropdown: true,
      gridCols: 1,
      subMenu: [
        {
          name: "Help Center",
          href: "/support/help",
          desc: "Find answers to frequently asked questions",
          iconName: "HelpCircle",
          order: 1,
        },
        {
          name: "Technical Support",
          href: "/support/technical",
          desc: "Get technical assistance for your projects",
          iconName: "Wrench",
          order: 2,
        },
      ],
      order: 2,
      isActive: true,
      sliderData: [
        {
          title: "Help Center",
          description: "Find answers to frequently asked questions",
          image: "/images/support/help-center.jpg",
          order: 1,
        },
        {
          title: "Technical Support",
          description: "Get technical assistance for your projects",
          image: "/images/support/technical-support.jpg",
          order: 2,
        },
      ],
    },
  ],
  socialIcons: [
    {
      icon: "Github",
      href: "https://github.com/renderwise",
      label: "GitHub",
      external: true,
      order: 1,
      isActive: true,
    },
    {
      icon: "Linkedin",
      href: "https://linkedin.com/company/renderwise",
      label: "LinkedIn",
      external: true,
      order: 2,
      isActive: true,
    },
    {
      icon: "Twitter",
      href: "https://twitter.com/renderwise",
      label: "Twitter",
      external: true,
      order: 3,
      isActive: true,
    },
    {
      icon: "Mail",
      href: "mailto:hello@renderwise.com",
      label: "Email",
      external: true,
      order: 4,
      isActive: true,
    },
  ],
  showSearch: true,
  showThemeToggle: true,
  showConsultation: true,
  companyName: "Renderwise",
  sliderData: [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      image: "/images/services/web-development.jpg",
      order: 1,
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure for modern businesses",
      image: "/images/services/cloud-solutions.jpg",
      order: 2,
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent automation and data-driven insights",
      image: "/images/services/ai-ml.jpg",
      order: 3,
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      image: "/images/services/mobile-dev.jpg",
      order: 4,
    },
    {
      title: "DevOps & Security",
      description: "Secure deployment pipelines and infrastructure",
      image: "/images/services/devops.jpg",
      order: 5,
    },
  ],
}; 
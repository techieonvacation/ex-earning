/**
 * Enhanced Navbar Configuration
 *
 * Comprehensive configuration for the Renderwise navbar including:
 * - Advanced sub-menu layouts with grouping
 * - Detailed service descriptions
 * - Dynamic icon assignments
 * - Footer configurations for sub-menus
 * - Individual slider images for dropdown menu items
 * - Backward compatibility with existing structure
 */

import { NavItem, SocialIcon } from "./Navbar.types";

export const NAVBAR_CONFIG = {
  mainNavItems: [
    {
      name: "Home",
      href: "/",
      icon: "Home",
    },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      layout: "grouped",
      subMenu: [
        // Development Group
        {
          name: "Web Development",
          href: "/services/web-development",
          desc: "Modern, responsive websites built with cutting-edge technologies and frameworks",
          iconName: "Code" as const,
          group: "Development",
        },
        {
          name: "Mobile Development",
          href: "/services/mobile",
          desc: "Native iOS and Android applications with cross-platform solutions",
          iconName: "Smartphone" as const,
          group: "Development",
        },
        {
          name: "API Development",
          href: "/services/api",
          desc: "Robust RESTful and GraphQL APIs with comprehensive documentation",
          iconName: "Server" as const,
          group: "Development",
        },
        {
          name: "Custom Software",
          href: "/services/custom-software",
          desc: "Tailored software solutions for unique business requirements",
          iconName: "Wrench" as const,
          group: "Development",
        },
        // Infrastructure Group
        {
          name: "Cloud Solutions",
          href: "/services/cloud",
          desc: "Scalable cloud infrastructure with AWS, Azure, and Google Cloud",
          iconName: "Cloud" as const,
          group: "Infrastructure",
        },
        {
          name: "DevOps & CI/CD",
          href: "/services/devops",
          desc: "Automated deployment pipelines and infrastructure as code",
          iconName: "GitBranch" as const,
          group: "Infrastructure",
        },
        {
          name: "Security & Compliance",
          href: "/services/security",
          desc: "Comprehensive security audits and compliance implementations",
          iconName: "Shield" as const,
          group: "Infrastructure",
        },
        {
          name: "Database Design",
          href: "/services/database",
          desc: "Optimized database architecture and migration services",
          iconName: "Database" as const,
          group: "Infrastructure",
        },
        // Design Group
        {
          name: "UI/UX Design",
          href: "/services/ui-ux",
          desc: "Beautiful and intuitive user experiences with modern design principles",
          iconName: "Palette" as const,
          group: "Design",
        },
        {
          name: "Brand Identity",
          href: "/services/branding",
          desc: "Complete brand identity development and visual design systems",
          iconName: "Brush" as const,
          group: "Design",
        },
        {
          name: "Prototyping",
          href: "/services/prototyping",
          desc: "Interactive prototypes and wireframes for user testing",
          iconName: "Layers" as const,
          group: "Design",
        },
      ],
      footerText: "Explore All Services",
      footerLink: "/services",
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
      subMenu: [
        // Enterprise Group
        {
          name: "Enterprise Software",
          href: "/solutions/enterprise",
          desc: "Large-scale business solutions with enterprise-grade security",
          iconName: "Building" as const,
          group: "Enterprise",
        },
        {
          name: "CRM Systems",
          href: "/solutions/crm",
          desc: "Customer relationship management platforms and integrations",
          iconName: "Users" as const,
          group: "Enterprise",
        },
        {
          name: "ERP Solutions",
          href: "/solutions/erp",
          desc: "Enterprise resource planning systems for streamlined operations",
          iconName: "Settings" as const,
          group: "Enterprise",
        },
        {
          name: "Business Intelligence",
          href: "/solutions/bi",
          desc: "Data analytics and reporting dashboards for informed decisions",
          iconName: "BarChart3" as const,
          group: "Enterprise",
        },
        // E-commerce Group
        {
          name: "E-commerce Platforms",
          href: "/solutions/ecommerce",
          desc: "Custom online stores with payment gateway integrations",
          iconName: "ShoppingCart" as const,
          group: "E-commerce",
        },
        {
          name: "Marketplace Solutions",
          href: "/solutions/marketplace",
          desc: "Multi-vendor marketplaces with advanced seller management",
          iconName: "Store" as const,
          group: "E-commerce",
        },
        {
          name: "Payment Systems",
          href: "/solutions/payments",
          desc: "Secure payment processing and financial transaction systems",
          iconName: "CreditCard" as const,
          group: "E-commerce",
        },
        // Specialized Group
        {
          name: "SaaS Products",
          href: "/solutions/saas",
          desc: "Software as a Service platforms with subscription management",
          iconName: "Rocket" as const,
          group: "Specialized",
        },
        {
          name: "AI & Machine Learning",
          href: "/solutions/ai-ml",
          desc: "Intelligent automation and predictive analytics solutions",
          iconName: "Brain" as const,
          group: "Specialized",
        },
        {
          name: "IoT Solutions",
          href: "/solutions/iot",
          desc: "Internet of Things applications and device management",
          iconName: "Wifi" as const,
          group: "Specialized",
        },
        {
          name: "Blockchain Development",
          href: "/solutions/blockchain",
          desc: "Decentralized applications and smart contract development",
          iconName: "Link" as const,
          group: "Specialized",
        },
      ],
      footerText: "View All Solutions",
      footerLink: "/solutions",
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
      icon: "Users",
      hasDropdown: true,
      gridCols: 2,
      subMenu: [
        {
          name: "Our Story",
          href: "/about/story",
          desc: "Learn about our journey and mission to deliver exceptional solutions",
          iconName: "Book" as const,
        },
        {
          name: "Our Team",
          href: "/about/team",
          desc: "Meet the talented professionals behind our success",
          iconName: "Users" as const,
        },
        {
          name: "Careers",
          href: "/careers",
          desc: "Join our team and build the future of technology together",
          iconName: "Briefcase" as const,
        },
        {
          name: "Culture & Values",
          href: "/about/culture",
          desc: "Discover our core values and company culture",
          iconName: "Heart" as const,
        },
      ],
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
      name: "Portfolio",
      href: "/portfolio",
      icon: "Award",
      hasDropdown: true,
      gridCols: 1,
      subMenu: [
        {
          name: "Featured Projects",
          href: "/portfolio/featured",
          desc: "Showcase of our most impactful and innovative projects",
          iconName: "Star" as const,
        },
        {
          name: "Case Studies",
          href: "/portfolio/case-studies",
          desc: "In-depth analysis of our successful project implementations",
          iconName: "FileText" as const,
        },
        {
          name: "Client Testimonials",
          href: "/portfolio/testimonials",
          desc: "What our clients say about working with us",
          iconName: "MessageSquare" as const,
        },
        {
          name: "Industries We Serve",
          href: "/portfolio/industries",
          desc: "Explore our expertise across various industry sectors",
          iconName: "Globe" as const,
        },
      ],
      sliderData: [
        {
          title: "Featured Projects",
          description: "Showcase of our most impactful and innovative projects",
          image: "/images/portfolio/featured-projects.jpg",
          order: 1,
        },
        {
          title: "Case Studies",
          description: "In-depth analysis of our successful project implementations",
          image: "/images/portfolio/case-studies.jpg",
          order: 2,
        },
        {
          title: "Client Testimonials",
          description: "What our clients say about working with us",
          image: "/images/portfolio/testimonials.jpg",
          order: 3,
        },
        {
          title: "Industries We Serve",
          description: "Explore our expertise across various industry sectors",
          image: "/images/portfolio/industries.jpg",
          order: 4,
        },
      ],
    },
    {
      name: "Blog",
      href: "/blog",
      icon: "MessageCircle",
      hasDropdown: true,
      gridCols: 2,
      subMenu: [
        {
          name: "Technical Insights",
          href: "/blog/technical",
          desc: "Deep dives into the latest technologies and development practices",
          iconName: "Code2" as const,
        },
        {
          name: "Industry Trends",
          href: "/blog/trends",
          desc: "Analysis of current trends and future predictions in tech",
          iconName: "TrendingUp" as const,
        },
        {
          name: "Best Practices",
          href: "/blog/best-practices",
          desc: "Proven methodologies and strategies for successful projects",
          iconName: "CheckCircle" as const,
        },
        {
          name: "Company News",
          href: "/blog/news",
          desc: "Latest updates and announcements from Renderwise",
          iconName: "Newspaper" as const,
        },
      ],
      sliderData: [
        {
          title: "Technical Insights",
          description: "Deep dives into the latest technologies and development practices",
          image: "/images/blog/technical-insights.jpg",
          order: 1,
        },
        {
          title: "Industry Trends",
          description: "Analysis of current trends and future predictions in tech",
          image: "/images/blog/industry-trends.jpg",
          order: 2,
        },
        {
          title: "Best Practices",
          description: "Proven methodologies and strategies for successful projects",
          image: "/images/blog/best-practices.jpg",
          order: 3,
        },
        {
          title: "Company News",
          description: "Latest updates and announcements from Renderwise",
          image: "/images/blog/company-news.jpg",
          order: 4,
        },
      ],
    },
    {
      name: "Contact",
      href: "/contact-us",
      icon: "Mail",
    },
  ] as NavItem[],

  secondaryNavItems: [
    {
      name: "Career",
      href: "/careers",
      icon: "Briefcase",
    },
    {
      name: "Support",
      href: "/support",
      icon: "MessageCircle",
      hasDropdown: true,
      gridCols: 1,
      subMenu: [
        {
          name: "Help Center",
          href: "/support/help",
          desc: "Find answers to frequently asked questions",
          iconName: "HelpCircle" as const,
        },
        {
          name: "Technical Support",
          href: "/support/technical",
          desc: "Get technical assistance for your projects",
          iconName: "Wrench" as const,
        },
        {
          name: "Contact Support",
          href: "/support/contact",
          desc: "Reach out to our support team directly",
          iconName: "Mail" as const,
        },
      ],
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
        {
          title: "Contact Support",
          description: "Reach out to our support team directly",
          image: "/images/support/contact-support.jpg",
          order: 3,
        },
      ],
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
    {
      name: "Terms of Service",
      href: "/terms",
    },
  ] as NavItem[],

  socialIcons: [
    {
      icon: "Github",
      href: "https://github.com/renderwise",
      label: "GitHub",
      external: true,
    },
    {
      icon: "Linkedin",
      href: "https://linkedin.com/company/renderwise",
      label: "LinkedIn",
      external: true,
    },
    {
      icon: "Twitter",
      href: "https://twitter.com/renderwise",
      label: "Twitter",
      external: true,
    },
    {
      icon: "Mail",
      href: "mailto:hello@renderwise.com",
      label: "Email",
      external: true,
    },
  ] as SocialIcon[],

  showSearch: true,
  showThemeToggle: true,
  showConsultation: true,
  companyName: "Renderwise",
};

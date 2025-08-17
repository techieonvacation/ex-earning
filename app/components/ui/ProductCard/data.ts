export interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  downloadCount: number;
  fileSize: string;
  format: string;
  compatibility: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export const productCategories = [
  "Reels Bundle",
  "AI Reels Bundle",
  "AI Cartoon Bundle",
  "Movies Clips",
  "Digital Assets",
  "Templates",
  "Graphics",
];

export const dummyProducts: ProductCardProps[] = [
  {
    id: "1",
    title: "Premium Reels Bundle 2024",
    description:
      "Get access to 500+ high-quality reels templates for Instagram, TikTok, and YouTube Shorts. Perfect for influencers and content creators.",
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.8,
    reviewCount: 1247,
    category: "Reels Bundle",
    tags: ["Instagram", "TikTok", "YouTube Shorts", "Templates"],
    image: "/images/home/reels-bundle.webp",
    isNew: true,
    isFeatured: true,
    downloadCount: 15420,
    fileSize: "2.5 GB",
    format: "MP4, MOV",
    compatibility: ["iOS", "Android", "Desktop"],
    features: [
      "500+ Templates",
      "HD Quality",
      "Easy Customization",
      "Commercial License",
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "AI-Powered Reels Creator Pro",
    description:
      "Revolutionary AI technology that generates engaging reels automatically. Includes 1000+ AI-generated templates and smart editing tools.",
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.9,
    reviewCount: 892,
    category: "AI Reels Bundle",
    tags: ["AI Generated", "Automation", "Smart Editing", "Premium"],
    image: "/images/home/ai-reels-bundle.webp",
    isBestSeller: true,
    isFeatured: true,
    downloadCount: 8930,
    fileSize: "4.2 GB",
    format: "MP4, AI Templates",
    compatibility: ["All Platforms", "Cloud Sync"],
    features: [
      "AI Generation",
      "1000+ Templates",
      "Smart Analytics",
      "Auto-Optimization",
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    title: "AI Cartoon Character Bundle",
    description:
      "Create stunning AI-generated cartoon characters for your content. Includes character generator, poses, expressions, and animation tools.",
    price: 3999,
    originalPrice: 6999,
    discount: 43,
    rating: 4.7,
    reviewCount: 567,
    category: "AI Cartoon Bundle",
    tags: ["AI Cartoon", "Character Design", "Animation", "Creative"],
    image: "/images/home/ai-cartoon-bundle.webp",
    isNew: true,
    downloadCount: 4560,
    fileSize: "3.8 GB",
    format: "PNG, SVG, MP4",
    compatibility: ["Web", "Mobile", "Desktop Apps"],
    features: [
      "Character Generator",
      "500+ Poses",
      "Expression Library",
      "Animation Tools",
    ],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
  },
  {
    id: "4",
    title: "Hollywood Movie Clips Collection",
    description:
      "Exclusive collection of movie clips, trailers, and cinematic moments. Perfect for video editors, content creators, and film enthusiasts.",
    price: 7999,
    originalPrice: 12999,
    discount: 38,
    rating: 4.6,
    reviewCount: 234,
    category: "Movies Clips",
    tags: ["Hollywood", "Cinematic", "Trailers", "Exclusive"],
    image: "/images/home/movies-clips.webp",
    isFeatured: true,
    downloadCount: 2890,
    fileSize: "15.6 GB",
    format: "4K, HD, MP4",
    compatibility: ["Professional Editing Software"],
    features: [
      "4K Quality",
      "Exclusive Content",
      "Multiple Formats",
      "Commercial License",
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "5",
    title: "Social Media Content Pack",
    description:
      "Complete social media content solution with posts, stories, reels, and carousel templates. Designed for businesses and marketers.",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.5,
    reviewCount: 789,
    category: "Digital Assets",
    tags: ["Social Media", "Marketing", "Business", "Templates"],
    image: "/images/home/social-media-pack.webp",
    downloadCount: 12340,
    fileSize: "1.8 GB",
    format: "PSD, AI, PNG, MP4",
    compatibility: ["Adobe Suite", "Canva", "Mobile Apps"],
    features: [
      "500+ Templates",
      "All Platforms",
      "Editable Files",
      "Brand Guidelines",
    ],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
  },
  {
    id: "6",
    title: "E-commerce Product Photography Kit",
    description:
      "Professional product photography templates and backgrounds. Perfect for online stores, marketplaces, and product catalogs.",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 4.4,
    reviewCount: 445,
    category: "Templates",
    tags: ["E-commerce", "Product Photography", "Professional", "Backgrounds"],
    image: "/images/home/ecommerce-photography.webp",
    downloadCount: 6780,
    fileSize: "2.9 GB",
    format: "PSD, AI, JPG, PNG",
    compatibility: ["Adobe Photoshop", "Lightroom", "Mobile Apps"],
    features: [
      "100+ Backgrounds",
      "Lighting Setups",
      "Product Poses",
      "Color Variations",
    ],
    createdAt: "2024-01-03",
    updatedAt: "2024-01-14",
  },
  {
    id: "7",
    title: "YouTube Thumbnail Master Pack",
    description:
      "Create eye-catching YouTube thumbnails with our professional template collection. Includes graphics, fonts, and design elements.",
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    rating: 4.7,
    reviewCount: 1234,
    category: "Graphics",
    tags: ["YouTube", "Thumbnails", "Design", "Templates"],
    image: "/images/home/youtube-thumbnails.webp",
    isBestSeller: true,
    downloadCount: 18920,
    fileSize: "1.2 GB",
    format: "PSD, AI, PNG, JPG",
    compatibility: ["Adobe Suite", "Canva", "Figma"],
    features: [
      "200+ Templates",
      "Customizable",
      "High Resolution",
      "Trending Styles",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-12",
  },
  {
    id: "8",
    title: "AI Video Editing Suite",
    description:
      "Complete AI-powered video editing solution with automatic cuts, transitions, effects, and music synchronization.",
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.8,
    reviewCount: 678,
    category: "AI Reels Bundle",
    tags: ["AI Video", "Editing", "Automation", "Professional"],
    image: "/images/home/ai-video-editing.webp",
    isNew: true,
    isFeatured: true,
    downloadCount: 3450,
    fileSize: "8.5 GB",
    format: "Software + Templates",
    compatibility: ["Windows", "Mac", "Cloud"],
    features: [
      "AI Editing",
      "Auto Music Sync",
      "Smart Transitions",
      "Cloud Rendering",
    ],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
];

export const getProductsByCategory = (category: string) => {
  return dummyProducts.filter((product) => product.category === category);
};

export const getFeaturedProducts = () => {
  return dummyProducts.filter((product) => product.isFeatured);
};

export const getNewProducts = () => {
  return dummyProducts.filter((product) => product.isNew);
};

export const getBestSellers = () => {
  return dummyProducts.filter((product) => product.isBestSeller);
};

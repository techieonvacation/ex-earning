"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/Select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { ImageUpload } from "@/app/components/ui/ImageUpload";
import { toast } from "react-hot-toast";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Download,
  Tag,
  Settings,
  Grid3X3,
  List,
  Search,
  Filter,
  SortAsc,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

// Types
interface TopViralProduct {
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
  isNew: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  downloadCount: number;
  fileSize: string;
  format: string;
  compatibility: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  order: number;
  status: "active" | "inactive" | "draft";
}

interface TopDealSection {
  id: string;
  title: string;
  description?: string;
  products: TopViralProduct[];
  viewAllLink: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Tag Input Component
const TagInput = ({
  value,
  onChange,
  placeholder = "Type and press Enter to add tags",
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    } else if (e.key === "," && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(",", "");
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-input rounded-md bg-background">
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : "Add more tags..."}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add tags
      </p>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: CheckCircle,
        };
      case "inactive":
        return { bg: "bg-gray-100", text: "text-gray-800", icon: EyeOff };
      case "draft":
        return { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", icon: AlertCircle };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

export default function TopViralProduct() {
  const [sections, setSections] = useState<TopDealSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TopViralProduct | null>(
    null
  );
  const [editingSection, setEditingSection] = useState<TopDealSection | null>(
    null
  );
  const [currentSectionId, setCurrentSectionId] = useState<string>("");

  // Form states
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 0,
    reviewCount: 0,
    category: "",
    tags: [] as string[],
    image: "",
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    downloadCount: 0,
    fileSize: "",
    format: "",
    compatibility: [] as string[],
    features: [] as string[],
    status: "draft" as "active" | "inactive" | "draft",
  });

  const [sectionForm, setSectionForm] = useState<{
    title: string;
    description?: string;
    viewAllLink: string;
    status: "active" | "inactive";
  }>({
    title: "",
    description: "",
    viewAllLink: "",
    status: "active",
  });

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/top-viral-products");
      const result = await response.json();

      if (result.success) {
        setSections(
          result.data.sort(
            (a: TopDealSection, b: TopDealSection) => a.order - b.order
          )
        );
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtered sections
  const filteredSections = sections.filter((section) => {
    const matchesSearch =
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || section.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // API functions
  const createSection = async () => {
    try {
      const response = await fetch("/api/top-viral-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createSection",
          section: sectionForm,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Section created successfully");
        setShowSectionModal(false);
        setSectionForm({
          title: "",
          description: "",
          viewAllLink: "",
          status: "active",
        });
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create section");
    }
  };

  const createProduct = async () => {
    try {
      const response = await fetch("/api/top-viral-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createProduct",
          sectionId: currentSectionId,
          product: productForm,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product created successfully");
        setShowProductModal(false);
        setProductForm({
          title: "",
          description: "",
          price: 0,
          originalPrice: 0,
          discount: 0,
          rating: 0,
          reviewCount: 0,
          category: "",
          tags: [],
          image: "",
          isNew: false,
          isFeatured: false,
          isBestSeller: false,
          downloadCount: 0,
          fileSize: "",
          format: "",
          compatibility: [],
          features: [],
          status: "draft",
        });
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  const updateSection = async () => {
    if (!editingSection) return;

    try {
      const response = await fetch("/api/top-viral-products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateSection",
          sectionId: editingSection.id,
          updates: sectionForm,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Section updated successfully");
        setShowSectionModal(false);
        setEditingSection(null);
        setSectionForm({
          title: "",
          description: "",
          viewAllLink: "",
          status: "active",
        });
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update section");
    }
  };

  const updateProduct = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch("/api/top-viral-products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateProduct",
          sectionId: currentSectionId,
          productId: editingProduct.id,
          updates: productForm,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product updated successfully");
        setShowProductModal(false);
        setEditingProduct(null);
        setProductForm({
          title: "",
          description: "",
          price: 0,
          originalPrice: 0,
          discount: 0,
          rating: 0,
          reviewCount: 0,
          category: "",
          tags: [],
          image: "",
          isNew: false,
          isFeatured: false,
          isBestSeller: false,
          downloadCount: 0,
          fileSize: "",
          format: "",
          compatibility: [],
          features: [],
          status: "draft",
        });
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const deleteSection = async (sectionId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this section? This will also delete all products in it."
      )
    )
      return;

    try {
      const response = await fetch(
        `/api/top-viral-products?action=deleteSection&sectionId=${sectionId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Section deleted successfully");
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete section");
    }
  };

  const deleteProduct = async (sectionId: string, productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(
        `/api/top-viral-products?action=deleteProduct&sectionId=${sectionId}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Product deleted successfully");
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Modal handlers
  const openProductModal = (sectionId: string, product?: TopViralProduct) => {
    setCurrentSectionId(sectionId);
    if (product) {
      setEditingProduct(product);
      setProductForm(product);
    } else {
      setEditingProduct(null);
      setProductForm({
        title: "",
        description: "",
        price: 0,
        originalPrice: 0,
        discount: 0,
        rating: 0,
        reviewCount: 0,
        category: "",
        tags: [],
        image: "",
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        downloadCount: 0,
        fileSize: "",
        format: "",
        compatibility: [],
        features: [],
        status: "draft",
      });
    }
    setShowProductModal(true);
  };

  const openSectionModal = (section?: TopDealSection) => {
    if (section) {
      setEditingSection(section);
      setSectionForm(section);
    } else {
      setEditingSection(null);
      setSectionForm({
        title: "",
        description: "",
        viewAllLink: "",
        status: "active",
      });
    }
    setShowSectionModal(true);
  };

  const closeModals = () => {
    setShowProductModal(false);
    setShowSectionModal(false);
    setEditingProduct(null);
    setEditingSection(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-4 p-4 border rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Top Viral Products CMS
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced management for trending products and bundles
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => openSectionModal()}
            variant="outline"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Section
          </Button>
          <Button
            onClick={() => openProductModal(sections[0]?.id || "")}
            disabled={sections.length === 0}
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Sections
                </p>
                <p className="text-3xl font-bold">{sections.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Products
                </p>
                <p className="text-3xl font-bold">
                  {sections.reduce(
                    (acc, section) => acc + section.products.length,
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Tag className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Sections
                </p>
                <p className="text-3xl font-bold">
                  {sections.filter((s) => s.status === "active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Featured Products
                </p>
                <p className="text-3xl font-bold">
                  {sections.reduce(
                    (acc, section) =>
                      acc + section.products.filter((p) => p.isFeatured).length,
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search sections and products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-8">
        {filteredSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                    <StatusBadge status={section.status} />
                  </div>
                  <CardDescription className="text-base">
                    {section.description || "No description"} •{" "}
                    {section.products.length} products
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openSectionModal(section)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openProductModal(section.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSection(section.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {section.products.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <Tag className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h4 className="text-lg font-medium mb-2">No products yet</h4>
                  <p className="text-sm mb-4">
                    Add your first product to get started
                  </p>
                  <Button onClick={() => openProductModal(section.id)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Product
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {section.products
                    .filter((product) => product.status === "active")
                    .sort((a, b) => a.order - b.order)
                    .map((product) => (
                      <Card
                        key={product.id}
                        className="group hover:shadow-lg transition-all duration-200"
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="relative">
                              <img
                                src={
                                  product.image ||
                                  "https://via.placeholder.com/300x200?text=No+Image"
                                }
                                alt={product.title}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="absolute top-2 left-2 flex gap-1">
                                {product.isNew && (
                                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                    New
                                  </span>
                                )}
                                {product.isFeatured && (
                                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                                    Featured
                                  </span>
                                )}
                                {product.isBestSeller && (
                                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                    Best Seller
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm line-clamp-2">
                                {product.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{product.rating}</span>
                                <span>({product.reviewCount})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-primary">
                                  ₹{product.price}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Download className="w-3 h-3" />
                                <span>{product.downloadCount} downloads</span>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  openProductModal(section.id, product)
                                }
                                className="flex-1"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  deleteProduct(section.id, product.id)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-muted/30">
              <h2 className="text-2xl font-bold">
                {editingProduct ? "Edit Product" : "Create New Product"}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      value={productForm.title}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Product title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <Input
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      placeholder="e.g., Reels Bundle"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description *</label>
                    <Textarea
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Product description"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image *</label>
                    <ImageUpload
                      label="Product Image"
                      value={productForm.image}
                      onChange={(url) =>
                        setProductForm((prev) => ({ ...prev, image: url }))
                      }
                      required
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      maxSize={5}
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (₹) *</label>
                  <Input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Original Price (₹)
                  </label>
                  <Input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        originalPrice: Number(e.target.value),
                      }))
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount (%)</label>
                  <Input
                    type="number"
                    value={productForm.discount}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        discount: Number(e.target.value),
                      }))
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={productForm.rating}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        rating: Number(e.target.value),
                      }))
                    }
                    placeholder="4.5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Review Count</label>
                  <Input
                    type="number"
                    value={productForm.reviewCount}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        reviewCount: Number(e.target.value),
                      }))
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">File Size</label>
                  <Input
                    value={productForm.fileSize}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        fileSize: e.target.value,
                      }))
                    }
                    placeholder="e.g., 2.5 GB"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Input
                    value={productForm.format}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        format: e.target.value,
                      }))
                    }
                    placeholder="e.g., MP4, MOV, PSD"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <TagInput
                  value={productForm.tags}
                  onChange={(tags) =>
                    setProductForm((prev) => ({ ...prev, tags }))
                  }
                  placeholder="Type and press Enter to add tags"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Compatibility</label>
                <TagInput
                  value={productForm.compatibility}
                  onChange={(compatibility) =>
                    setProductForm((prev) => ({ ...prev, compatibility }))
                  }
                  placeholder="Type and press Enter to add compatibility options"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <TagInput
                  value={productForm.features}
                  onChange={(features) =>
                    setProductForm((prev) => ({ ...prev, features }))
                  }
                  placeholder="Type and press Enter to add features"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Download Count</label>
                  <Input
                    type="number"
                    value={productForm.downloadCount}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        downloadCount: Number(e.target.value),
                      }))
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={productForm.status}
                    onValueChange={(value) =>
                      setProductForm((prev) => ({
                        ...prev,
                        status: value as any,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">New Product</label>
                    <p className="text-xs text-muted-foreground">
                      Mark as new arrival
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={productForm.isNew}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        isNew: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Featured Product
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Highlight in featured section
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        isFeatured: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Best Seller</label>
                    <p className="text-xs text-muted-foreground">
                      Mark as best selling product
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        isBestSeller: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button onClick={editingProduct ? updateProduct : createProduct}>
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Section Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b bg-muted/30">
              <h2 className="text-2xl font-bold">
                {editingSection ? "Edit Section" : "Create New Section"}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={sectionForm.title}
                  onChange={(e) =>
                    setSectionForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Section title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={sectionForm.description}
                  onChange={(e) =>
                    setSectionForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Section description (optional)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">View All Link *</label>
                <Input
                  value={sectionForm.viewAllLink}
                  onChange={(e) =>
                    setSectionForm((prev) => ({
                      ...prev,
                      viewAllLink: e.target.value,
                    }))
                  }
                  placeholder="/products/trending"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={sectionForm.status}
                  onValueChange={(value) =>
                    setSectionForm((prev) => ({
                      ...prev,
                      status: value as any,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button onClick={editingSection ? updateSection : createSection}>
                {editingSection ? "Update Section" : "Create Section"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

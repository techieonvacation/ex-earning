"use client";

import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { toast } from "react-hot-toast";
import {
  SaveIcon,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  MoveUp,
  MoveDown,
  Settings,
  Menu,
  Users,
  Share2,
  Image as ImageIcon,
} from "lucide-react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Checkbox } from "@/app/components/ui/Checkbox";
import Loader from "@/app/components/ui/Loader";
import { ImageUpload } from "@/app/components/ui/ImageUpload";
import {
  NavbarConfig,
  NavItem,
  SubMenuItem,
  SocialIcon,
  SliderData,
  DEFAULT_NAVBAR_CONFIG,
} from "@/app/lib/models/navbar";

interface NavbarAdminState {
  config: NavbarConfig;
  isEditing: boolean;
  activeTab:
    | "main"
    | "secondary"
    | "social"
    | "slider"
    | "menuSliders"
    | "settings";
  expandedItems: Set<string>;
  editingItem: string | null;
}

const LUCIDE_ICONS = [
  "Home",
  "Code",
  "Smartphone",
  "Server",
  "Cloud",
  "GitBranch",
  "Palette",
  "Building",
  "ShoppingCart",
  "Rocket",
  "Book",
  "Users",
  "Briefcase",
  "Heart",
  "HelpCircle",
  "Wrench",
  "Github",
  "Linkedin",
  "Twitter",
  "Mail",
  "Settings",
  "Menu",
  "Share2",
  "Image",
];
export default function NavbarAdminPage() {
  const [state, setState] = useState<NavbarAdminState>({
    config: DEFAULT_NAVBAR_CONFIG,
    isEditing: false,
    activeTab: "main",
    expandedItems: new Set(),
    editingItem: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoized fetch function with abort controller
  const fetchNavbarConfig = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      const response = await fetch("/api/navbar", {
        signal: abortControllerRef.current.signal,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch navbar configuration: ${response.status}`
        );
      }

      const data = await response.json();

      // Ensure all required arrays exist
      const validatedConfig: NavbarConfig = {
        mainNavItems: data.mainNavItems || DEFAULT_NAVBAR_CONFIG.mainNavItems,
        secondaryNavItems:
          data.secondaryNavItems || DEFAULT_NAVBAR_CONFIG.secondaryNavItems,
        socialIcons: data.socialIcons || DEFAULT_NAVBAR_CONFIG.socialIcons,
        sliderData: data.sliderData || DEFAULT_NAVBAR_CONFIG.sliderData,
        showSearch:
          data.showSearch !== undefined
            ? data.showSearch
            : DEFAULT_NAVBAR_CONFIG.showSearch,
        showThemeToggle:
          data.showThemeToggle !== undefined
            ? data.showThemeToggle
            : DEFAULT_NAVBAR_CONFIG.showThemeToggle,
        showConsultation:
          data.showConsultation !== undefined
            ? data.showConsultation
            : DEFAULT_NAVBAR_CONFIG.showConsultation,
        companyName: data.companyName || DEFAULT_NAVBAR_CONFIG.companyName,
      };

      setState((prev) => ({ ...prev, config: validatedConfig }));
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Error fetching navbar configuration:", error);
      toast.error("Failed to load navbar configuration");
      // Fallback to default config
      setState((prev) => ({ ...prev, config: DEFAULT_NAVBAR_CONFIG }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNavbarConfig();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchNavbarConfig]);

  const handleSave = useCallback(async () => {
    const previousConfig = { ...state.config };

    try {
      startTransition(async () => {
        const response = await fetch("/api/navbar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(state.config),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Failed to update navbar configuration: ${response.status}`
          );
        }

        await fetchNavbarConfig();
        setState((prev) => ({ ...prev, isEditing: false }));
        toast.success("Navbar configuration saved successfully");
      });
    } catch (error) {
      setState((prev) => ({ ...prev, config: previousConfig }));
      console.error("Error saving navbar configuration:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save navbar configuration"
      );
    }
  }, [state.config, fetchNavbarConfig]);

  const toggleExpanded = useCallback((itemId: string) => {
    setState((prev) => {
      const newExpanded = new Set(prev.expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      return { ...prev, expandedItems: newExpanded };
    });
  }, []);

  const updateConfig = useCallback(
    (updater: (config: NavbarConfig) => NavbarConfig) => {
      setState((prev) => ({
        ...prev,
        config: updater(prev.config),
        isEditing: true,
      }));
    },
    []
  );

  const addNavItem = useCallback(
    (section: "mainNavItems" | "secondaryNavItems") => {
      updateConfig((config) => ({
        ...config,
        [section]: [
          ...config[section],
          {
            name: "New Item",
            href: "/new-item",
            order: config[section].length + 1,
            isActive: true,
          },
        ],
      }));
    },
    [updateConfig]
  );

  const updateNavItem = useCallback(
    (
      section: "mainNavItems" | "secondaryNavItems",
      index: number,
      updates: Partial<NavItem>
    ) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) =>
          i === index ? { ...item, ...updates } : item
        ),
      }));
    },
    [updateConfig]
  );

  const removeNavItem = useCallback(
    (section: "mainNavItems" | "secondaryNavItems", index: number) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].filter((_, i) => i !== index),
      }));
    },
    [updateConfig]
  );

  const addSubMenuItem = useCallback(
    (section: "mainNavItems" | "secondaryNavItems", navIndex: number) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) => {
          if (i === navIndex) {
            const subMenu = item.subMenu || [];
            return {
              ...item,
              subMenu: [
                ...subMenu,
                {
                  name: "New Sub Item",
                  href: "/new-sub-item",
                  desc: "Description for new sub item",
                  order: subMenu.length + 1,
                },
              ],
            };
          }
          return item;
        }),
      }));
    },
    [updateConfig]
  );

  const updateSubMenuItem = useCallback(
    (
      section: "mainNavItems" | "secondaryNavItems",
      navIndex: number,
      subIndex: number,
      updates: Partial<SubMenuItem>
    ) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) => {
          if (i === navIndex && item.subMenu) {
            return {
              ...item,
              subMenu: item.subMenu.map((subItem, j) =>
                j === subIndex ? { ...subItem, ...updates } : subItem
              ),
            };
          }
          return item;
        }),
      }));
    },
    [updateConfig]
  );

  const removeSubMenuItem = useCallback(
    (
      section: "mainNavItems" | "secondaryNavItems",
      navIndex: number,
      subIndex: number
    ) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) => {
          if (i === navIndex && item.subMenu) {
            return {
              ...item,
              subMenu: item.subMenu.filter((_, j) => j !== subIndex),
            };
          }
          return item;
        }),
      }));
    },
    [updateConfig]
  );

  const addSocialIcon = useCallback(() => {
    updateConfig((config) => ({
      ...config,
      socialIcons: [
        ...config.socialIcons,
        {
          icon: "Github",
          href: "https://example.com",
          label: "New Social",
          external: true,
          order: config.socialIcons.length + 1,
          isActive: true,
        },
      ],
    }));
  }, [updateConfig]);

  const updateSocialIcon = useCallback(
    (index: number, updates: Partial<SocialIcon>) => {
      updateConfig((config) => ({
        ...config,
        socialIcons: config.socialIcons.map((item, i) =>
          i === index ? { ...item, ...updates } : item
        ),
      }));
    },
    [updateConfig]
  );

  const removeSocialIcon = useCallback(
    (index: number) => {
      updateConfig((config) => ({
        ...config,
        socialIcons: config.socialIcons.filter((_, i) => i !== index),
      }));
    },
    [updateConfig]
  );

  const addSliderData = useCallback(() => {
    updateConfig((config) => ({
      ...config,
      sliderData: [
        ...(config.sliderData || []),
        {
          title: "New Slide",
          description: "Description for new slide",
          image: "/images/services/new-slide.jpg",
          order: (config.sliderData?.length || 0) + 1,
        },
      ],
    }));
  }, [updateConfig]);

  const updateSliderData = useCallback(
    (index: number, updates: Partial<SliderData>) => {
      updateConfig((config) => ({
        ...config,
        sliderData: (config.sliderData || []).map((item, i) =>
          i === index ? { ...item, ...updates } : item
        ),
      }));
    },
    [updateConfig]
  );

  const removeSliderData = useCallback(
    (index: number) => {
      updateConfig((config) => ({
        ...config,
        sliderData: (config.sliderData || []).filter((_, i) => i !== index),
      }));
    },
    [updateConfig]
  );

  const addMenuSliderData = useCallback(
    (section: "mainNavItems" | "secondaryNavItems", navIndex: number) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) => {
          if (i === navIndex) {
            return {
              ...item,
              sliderData: [
                ...(item.sliderData || []),
                {
                  title: "New Slide",
                  description: "Description for new slide",
                  image: "/images/services/new-slide.jpg",
                  order: (item.sliderData?.length || 0) + 1,
                },
              ],
            };
          }
          return item;
        }),
      }));
    },
    [updateConfig]
  );

  const updateMenuSliderData = useCallback(
    (
      section: "mainNavItems" | "secondaryNavItems",
      navIndex: number,
      slideIndex: number,
      updates: Partial<SliderData>
    ) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) => {
          if (i === navIndex) {
            return {
              ...item,
              sliderData: item.sliderData?.map((slide, j) =>
                j === slideIndex ? { ...slide, ...updates } : slide
              ),
            };
          }
          return item;
        }),
      }));
    },
    [updateConfig]
  );

  const removeMenuSliderData = useCallback(
    (
      section: "mainNavItems" | "secondaryNavItems",
      navIndex: number,
      slideIndex: number
    ) => {
      updateConfig((config) => ({
        ...config,
        [section]: config[section].map((item, i) => {
          if (i === navIndex) {
            return {
              ...item,
              sliderData: item.sliderData?.filter((_, j) => j !== slideIndex),
            };
          }
          return item;
        }),
      }));
    },
    [updateConfig]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Navbar Management</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setState((prev) => ({ ...prev, isEditing: false }))}
            variant="ghost"
            size="sm"
            disabled={!state.isEditing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending || !state.isEditing}
            variant="primary"
            size="sm"
            leftIcon={<SaveIcon />}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground">
        Manage your website's navigation menu, social links, and slider content.
      </p>

      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b">
        {[
          { id: "main", label: "Main Menu", icon: Menu },
          { id: "secondary", label: "Secondary Menu", icon: Users },
          { id: "social", label: "Social Links", icon: Share2 },
          { id: "slider", label: "Global Slider", icon: ImageIcon },
          { id: "menuSliders", label: "Menu Sliders", icon: ImageIcon },
          { id: "settings", label: "Settings", icon: Settings },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() =>
              setState((prev) => ({ ...prev, activeTab: id as any }))
            }
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              state.activeTab === id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Main Menu Tab */}
      {state.activeTab === "main" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Main Navigation Items</h2>
            <Button
              onClick={() => addNavItem("mainNavItems")}
              variant="outline"
              size="sm"
              leftIcon={<Plus />}
            >
              Add Item
            </Button>
          </div>

          {state.config.mainNavItems.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpanded(`main-${index}`)}
                    className="p-1 hover:bg-hover rounded"
                  >
                    {state.expandedItems.has(`main-${index}`) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <span className="font-medium">{item.name}</span>
                  {!item.isActive && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeNavItem("mainNavItems", index)}
                    variant="ghost"
                    size="sm"
                    leftIcon={<Trash2 />}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {state.expandedItems.has(`main-${index}`) && (
                <div className="space-y-4 pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          updateNavItem("mainNavItems", index, {
                            name: e.target.value,
                          })
                        }
                        placeholder="Menu item name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Link</label>
                      <Input
                        value={item.href || ""}
                        onChange={(e) =>
                          updateNavItem("mainNavItems", index, {
                            href: e.target.value,
                          })
                        }
                        placeholder="/path"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.hasDropdown || false}
                        onCheckedChange={(checked) =>
                          updateNavItem("mainNavItems", index, {
                            hasDropdown: checked === true,
                          })
                        }
                      />
                      <label className="text-sm">Has Dropdown</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.isActive !== false}
                        onCheckedChange={(checked) =>
                          updateNavItem("mainNavItems", index, {
                            isActive: checked === true,
                          })
                        }
                      />
                      <label className="text-sm">Active</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.external || false}
                        onCheckedChange={(checked) =>
                          updateNavItem("mainNavItems", index, {
                            external: checked === true,
                          })
                        }
                      />
                      <label className="text-sm">External Link</label>
                    </div>
                  </div>

                  {item.hasDropdown && (
                    <div className="space-y-4">
                      {/* Dropdown Configuration */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                        <div>
                          <label className="text-sm font-medium">Layout</label>
                          <select
                            value={item.layout || "default"}
                            onChange={(e) =>
                              updateNavItem("mainNavItems", index, {
                                layout: e.target.value as "grouped" | "default",
                              })
                            }
                            className="w-full px-3 py-2 border border-border rounded-md bg-background"
                          >
                            <option value="default">Default</option>
                            <option value="grouped">Grouped</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Sub Menu Headings (comma-separated)
                          </label>
                          <Input
                            value={item.subMenuHeading?.join(", ") || ""}
                            onChange={(e) =>
                              updateNavItem("mainNavItems", index, {
                                subMenuHeading: e.target.value
                                  .split(",")
                                  .map((heading) => heading.trim())
                                  .filter((heading) => heading.length > 0),
                              })
                            }
                            placeholder="Development, Infrastructure, Design"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Sub Menu Items</h3>
                        <Button
                          onClick={() => addSubMenuItem("mainNavItems", index)}
                          variant="outline"
                          size="sm"
                          leftIcon={<Plus />}
                        >
                          Add Sub Item
                        </Button>
                      </div>

                      {item.subMenu?.map((subItem, subIndex) => (
                        <Card key={subIndex} className="p-3">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium">
                                  Name
                                </label>
                                <Input
                                  value={subItem.name}
                                  onChange={(e) =>
                                    updateSubMenuItem(
                                      "mainNavItems",
                                      index,
                                      subIndex,
                                      { name: e.target.value }
                                    )
                                  }
                                  placeholder="Sub item name"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Link
                                </label>
                                <Input
                                  value={subItem.href}
                                  onChange={(e) =>
                                    updateSubMenuItem(
                                      "mainNavItems",
                                      index,
                                      subIndex,
                                      { href: e.target.value }
                                    )
                                  }
                                  placeholder="/sub-path"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() =>
                                removeSubMenuItem(
                                  "mainNavItems",
                                  index,
                                  subIndex
                                )
                              }
                              variant="ghost"
                              size="sm"
                              leftIcon={<Trash2 />}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <Input
                                value={subItem.desc}
                                onChange={(e) =>
                                  updateSubMenuItem(
                                    "mainNavItems",
                                    index,
                                    subIndex,
                                    { desc: e.target.value }
                                  )
                                }
                                placeholder="Description"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Icon
                              </label>
                              <select
                                value={subItem.iconName || ""}
                                onChange={(e) =>
                                  updateSubMenuItem(
                                    "mainNavItems",
                                    index,
                                    subIndex,
                                    { iconName: e.target.value }
                                  )
                                }
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                              >
                                <option value="">No Icon</option>
                                {LUCIDE_ICONS.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium">
                                Group
                              </label>
                              <select
                                value={subItem.group || ""}
                                onChange={(e) =>
                                  updateSubMenuItem(
                                    "mainNavItems",
                                    index,
                                    subIndex,
                                    { group: e.target.value }
                                  )
                                }
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                              >
                                <option value="">Select a group</option>
                                {item.subMenuHeading?.map((heading) => (
                                  <option key={heading} value={heading}>
                                    {heading}
                                  </option>
                                )) || []}
                              </select>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Slider Management for Grouped Layout */}
                  {item.hasDropdown && item.layout === "grouped" && (
                    <div className="space-y-4 mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-primary">
                            Slider Images
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Add slider images that will appear on the right side
                            of the dropdown menu
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            addMenuSliderData("mainNavItems", index)
                          }
                          variant="outline"
                          size="sm"
                          leftIcon={<Plus />}
                        >
                          Add Slide
                        </Button>
                      </div>

                      {item.sliderData?.map((slide, slideIndex) => (
                        <Card key={slideIndex} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{slide.title}</span>
                            </div>
                            <Button
                              onClick={() =>
                                removeMenuSliderData(
                                  "mainNavItems",
                                  index,
                                  slideIndex
                                )
                              }
                              variant="ghost"
                              size="sm"
                              leftIcon={<Trash2 />}
                            >
                              Remove
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">
                                Title
                              </label>
                              <Input
                                value={slide.title}
                                onChange={(e) =>
                                  updateMenuSliderData(
                                    "mainNavItems",
                                    index,
                                    slideIndex,
                                    { title: e.target.value }
                                  )
                                }
                                placeholder="Slide title"
                              />
                            </div>
                            <div>
                              <ImageUpload
                                label="Slide Image"
                                value={slide.image}
                                onChange={(url) =>
                                  updateMenuSliderData(
                                    "mainNavItems",
                                    index,
                                    slideIndex,
                                    { image: url }
                                  )
                                }
                                placeholder="Click to upload slide image or drag and drop"
                                helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                maxSize={5}
                                aspectRatio={4}
                                showPreview={true}
                                onSuccess={(url) => {
                                  toast.success("Image uploaded successfully");
                                }}
                                onError={(error) => {
                                  toast.error(error);
                                }}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <Input
                                value={slide.description}
                                onChange={(e) =>
                                  updateMenuSliderData(
                                    "mainNavItems",
                                    index,
                                    slideIndex,
                                    { description: e.target.value }
                                  )
                                }
                                placeholder="Slide description"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Secondary Menu Tab */}
      {state.activeTab === "secondary" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Secondary Navigation Items
            </h2>
            <Button
              onClick={() => addNavItem("secondaryNavItems")}
              variant="outline"
              size="sm"
              leftIcon={<Plus />}
            >
              Add Item
            </Button>
          </div>

          {state.config.secondaryNavItems.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpanded(`secondary-${index}`)}
                    className="p-1 hover:bg-hover rounded"
                  >
                    {state.expandedItems.has(`secondary-${index}`) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <span className="font-medium">{item.name}</span>
                  {!item.isActive && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeNavItem("secondaryNavItems", index)}
                    variant="ghost"
                    size="sm"
                    leftIcon={<Trash2 />}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {state.expandedItems.has(`secondary-${index}`) && (
                <div className="space-y-4 pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          updateNavItem("secondaryNavItems", index, {
                            name: e.target.value,
                          })
                        }
                        placeholder="Menu item name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Link</label>
                      <Input
                        value={item.href || ""}
                        onChange={(e) =>
                          updateNavItem("secondaryNavItems", index, {
                            href: e.target.value,
                          })
                        }
                        placeholder="/path"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.hasDropdown || false}
                        onCheckedChange={(checked) =>
                          updateNavItem("secondaryNavItems", index, {
                            hasDropdown: checked === true,
                          })
                        }
                      />
                      <label className="text-sm">Has Dropdown</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.isActive !== false}
                        onCheckedChange={(checked) =>
                          updateNavItem("secondaryNavItems", index, {
                            isActive: checked === true,
                          })
                        }
                      />
                      <label className="text-sm">Active</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.external || false}
                        onCheckedChange={(checked) =>
                          updateNavItem("secondaryNavItems", index, {
                            external: checked === true,
                          })
                        }
                      />
                      <label className="text-sm">External Link</label>
                    </div>
                  </div>

                  {item.hasDropdown && (
                    <div className="space-y-4">
                      {/* Dropdown Configuration */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                        <div>
                          <label className="text-sm font-medium">Layout</label>
                          <select
                            value={item.layout || "default"}
                            onChange={(e) =>
                              updateNavItem("secondaryNavItems", index, {
                                layout: e.target.value as "grouped" | "default",
                              })
                            }
                            className="w-full px-3 py-2 border border-border rounded-md bg-background"
                          >
                            <option value="default">Default</option>
                            <option value="grouped">Grouped</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Sub Menu Headings (comma-separated)
                          </label>
                          <Input
                            value={item.subMenuHeading?.join(", ") || ""}
                            onChange={(e) =>
                              updateNavItem("secondaryNavItems", index, {
                                subMenuHeading: e.target.value
                                  .split(",")
                                  .map((heading) => heading.trim())
                                  .filter((heading) => heading.length > 0),
                              })
                            }
                            placeholder="Enterprise, E-commerce, Specialized"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Sub Menu Items</h3>
                        <Button
                          onClick={() =>
                            addSubMenuItem("secondaryNavItems", index)
                          }
                          variant="outline"
                          size="sm"
                          leftIcon={<Plus />}
                        >
                          Add Sub Item
                        </Button>
                      </div>

                      {item.subMenu?.map((subItem, subIndex) => (
                        <Card key={subIndex} className="p-3">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium">
                                  Name
                                </label>
                                <Input
                                  value={subItem.name}
                                  onChange={(e) =>
                                    updateSubMenuItem(
                                      "secondaryNavItems",
                                      index,
                                      subIndex,
                                      { name: e.target.value }
                                    )
                                  }
                                  placeholder="Sub item name"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Link
                                </label>
                                <Input
                                  value={subItem.href}
                                  onChange={(e) =>
                                    updateSubMenuItem(
                                      "secondaryNavItems",
                                      index,
                                      subIndex,
                                      { href: e.target.value }
                                    )
                                  }
                                  placeholder="/sub-path"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() =>
                                removeSubMenuItem(
                                  "secondaryNavItems",
                                  index,
                                  subIndex
                                )
                              }
                              variant="ghost"
                              size="sm"
                              leftIcon={<Trash2 />}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <Input
                                value={subItem.desc}
                                onChange={(e) =>
                                  updateSubMenuItem(
                                    "secondaryNavItems",
                                    index,
                                    subIndex,
                                    { desc: e.target.value }
                                  )
                                }
                                placeholder="Description"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Icon
                              </label>
                              <select
                                value={subItem.iconName || ""}
                                onChange={(e) =>
                                  updateSubMenuItem(
                                    "secondaryNavItems",
                                    index,
                                    subIndex,
                                    { iconName: e.target.value }
                                  )
                                }
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                              >
                                <option value="">No Icon</option>
                                {LUCIDE_ICONS.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium">
                                Group
                              </label>
                              <select
                                value={subItem.group || ""}
                                onChange={(e) =>
                                  updateSubMenuItem(
                                    "secondaryNavItems",
                                    index,
                                    subIndex,
                                    { group: e.target.value }
                                  )
                                }
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                              >
                                <option value="">Select a group</option>
                                {item.subMenuHeading?.map((heading) => (
                                  <option key={heading} value={heading}>
                                    {heading}
                                  </option>
                                )) || []}
                              </select>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Slider Management for Grouped Layout */}
                  {item.hasDropdown && item.layout === "grouped" && (
                    <div className="space-y-4 mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-primary">
                            Slider Images
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Add slider images that will appear on the right side
                            of the dropdown menu
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            addMenuSliderData("secondaryNavItems", index)
                          }
                          variant="outline"
                          size="sm"
                          leftIcon={<Plus />}
                        >
                          Add Slide
                        </Button>
                      </div>

                      {item.sliderData?.map((slide, slideIndex) => (
                        <Card key={slideIndex} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{slide.title}</span>
                            </div>
                            <Button
                              onClick={() =>
                                removeMenuSliderData(
                                  "secondaryNavItems",
                                  index,
                                  slideIndex
                                )
                              }
                              variant="ghost"
                              size="sm"
                              leftIcon={<Trash2 />}
                            >
                              Remove
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">
                                Title
                              </label>
                              <Input
                                value={slide.title}
                                onChange={(e) =>
                                  updateMenuSliderData(
                                    "secondaryNavItems",
                                    index,
                                    slideIndex,
                                    { title: e.target.value }
                                  )
                                }
                                placeholder="Slide title"
                              />
                            </div>
                            <div>
                              <ImageUpload
                                label="Slide Image"
                                value={slide.image}
                                onChange={(url) =>
                                  updateMenuSliderData(
                                    "secondaryNavItems",
                                    index,
                                    slideIndex,
                                    { image: url }
                                  )
                                }
                                placeholder="Click to upload slide image or drag and drop"
                                helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                maxSize={5}
                                aspectRatio={4}
                                showPreview={true}
                                onSuccess={(url) => {
                                  toast.success(
                                    "Image uploaded successfully"
                                  );
                                }}
                                onError={(error) => {
                                  toast.error(error);
                                }}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <Input
                                value={slide.description}
                                onChange={(e) =>
                                  updateMenuSliderData(
                                    "secondaryNavItems",
                                    index,
                                    slideIndex,
                                    { description: e.target.value }
                                  )
                                }
                                placeholder="Slide description"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Social Links Tab */}
      {state.activeTab === "social" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Social Media Links</h2>
            <Button
              onClick={addSocialIcon}
              variant="outline"
              size="sm"
              leftIcon={<Plus />}
            >
              Add Social Link
            </Button>
          </div>

          {state.config.socialIcons.map((social, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{social.label}</span>
                  {!social.isActive && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => removeSocialIcon(index)}
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 />}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Label</label>
                  <Input
                    value={social.label}
                    onChange={(e) =>
                      updateSocialIcon(index, { label: e.target.value })
                    }
                    placeholder="Social media name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    value={social.href}
                    onChange={(e) =>
                      updateSocialIcon(index, { href: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <select
                    value={social.icon}
                    onChange={(e) =>
                      updateSocialIcon(index, { icon: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {LUCIDE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={social.external || false}
                    onCheckedChange={(checked) =>
                      updateSocialIcon(index, { external: checked === true })
                    }
                  />
                  <label className="text-sm">External Link</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={social.isActive !== false}
                    onCheckedChange={(checked) =>
                      updateSocialIcon(index, { isActive: checked === true })
                    }
                  />
                  <label className="text-sm">Active</label>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Slider Content Tab */}
      {state.activeTab === "slider" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Slider Content</h2>
            <Button
              onClick={addSliderData}
              variant="outline"
              size="sm"
              leftIcon={<Plus />}
            >
              Add Slide
            </Button>
          </div>

          {state.config.sliderData?.map((slide, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{slide.title}</span>
                </div>
                <Button
                  onClick={() => removeSliderData(index)}
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 />}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={slide.title}
                    onChange={(e) =>
                      updateSliderData(index, { title: e.target.value })
                    }
                    placeholder="Slide title"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Slide Image"
                    value={slide.image}
                    onChange={(url) => updateSliderData(index, { image: url })}
                    placeholder="Click to upload slide image or drag and drop"
                    helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    maxSize={5}
                    aspectRatio={4}
                    showPreview={true}
                    onSuccess={(url) => {
                      toast.success("Image uploaded successfully");
                    }}
                    onError={(error) => {
                      toast.error(error);
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={slide.description}
                    onChange={(e) =>
                      updateSliderData(index, { description: e.target.value })
                    }
                    placeholder="Slide description"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Menu Sliders Tab */}
      {state.activeTab === "menuSliders" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Menu Dropdown Sliders</h2>
            <p className="text-sm text-muted-foreground">
              Manage slider images for dropdown menu items
            </p>
          </div>

          {/* Main Menu Items with Dropdowns */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Main Menu Items</h3>
            {state.config.mainNavItems
              .filter((item) => item.hasDropdown && item.layout === "grouped")
              .map((item) => {
                const originalIndex = state.config.mainNavItems.findIndex(
                  (originalItem) => originalItem.name === item.name
                );
                return (
                  <Card key={originalIndex} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Dropdown menu with {item.subMenu?.length || 0} items
                        </p>
                      </div>
                      <Button
                        onClick={() =>
                          toggleExpanded(`menu-slider-main-${originalIndex}`)
                        }
                        variant="outline"
                        size="sm"
                        leftIcon={
                          state.expandedItems.has(`menu-slider-main-${originalIndex}`) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        }
                      >
                        {state.expandedItems.has(`menu-slider-main-${originalIndex}`)
                          ? "Hide"
                          : "Manage Sliders"}
                      </Button>
                    </div>

                    {state.expandedItems.has(`menu-slider-main-${originalIndex}`) && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-md font-medium">
                            Slider Images for {item.name}
                          </h5>
                          <Button
                            onClick={() =>
                              addMenuSliderData("mainNavItems", originalIndex)
                            }
                            variant="outline"
                            size="sm"
                            leftIcon={<Plus />}
                          >
                            Add Slide
                          </Button>
                        </div>

                        {item.sliderData?.map((slide, slideIndex) => (
                          <Card key={slideIndex} className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{slide.title}</span>
                              </div>
                              <Button
                                onClick={() =>
                                  removeMenuSliderData(
                                    "mainNavItems",
                                    originalIndex,
                                    slideIndex
                                  )
                                }
                                variant="ghost"
                                size="sm"
                                leftIcon={<Trash2 />}
                              >
                                Remove
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Title
                                </label>
                                <Input
                                  value={slide.title}
                                  onChange={(e) =>
                                    updateMenuSliderData(
                                      "mainNavItems",
                                      originalIndex,
                                      slideIndex,
                                      { title: e.target.value }
                                    )
                                  }
                                  placeholder="Slide title"
                                />
                              </div>
                              <div>
                                <ImageUpload
                                  label="Slide Image"
                                  value={slide.image}
                                  onChange={(url) =>
                                    updateMenuSliderData(
                                      "mainNavItems",
                                      originalIndex,
                                      slideIndex,
                                      { image: url }
                                    )
                                  }
                                  placeholder="Click to upload slide image or drag and drop"
                                  helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
                                  accept="image/png,image/jpeg,image/jpg,image/webp"
                                  maxSize={5}
                                  aspectRatio={4}
                                  showPreview={true}
                                  onSuccess={(url) => {
                                    toast.success("Image uploaded successfully");
                                  }}
                                  onError={(error) => {
                                    toast.error(error);
                                  }}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-sm font-medium">
                                  Description
                                </label>
                                <Input
                                  value={slide.description}
                                  onChange={(e) =>
                                    updateMenuSliderData(
                                      "mainNavItems",
                                      originalIndex,
                                      slideIndex,
                                      { description: e.target.value }
                                    )
                                  }
                                  placeholder="Slide description"
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}

            {/* Secondary Menu Items with Dropdowns */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Secondary Menu Items</h3>
              {state.config.secondaryNavItems
                .filter((item) => item.hasDropdown && item.layout === "grouped")
                .map((item) => {
                  const originalIndex = state.config.secondaryNavItems.findIndex(
                    (originalItem) => originalItem.name === item.name
                  );
                  return (
                    <Card key={originalIndex} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Dropdown menu with {item.subMenu?.length || 0} items
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            toggleExpanded(`menu-slider-secondary-${originalIndex}`)
                          }
                          variant="outline"
                          size="sm"
                          leftIcon={
                            state.expandedItems.has(
                              `menu-slider-secondary-${originalIndex}`
                            ) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          }
                        >
                          {state.expandedItems.has(
                            `menu-slider-secondary-${originalIndex}`
                          )
                            ? "Hide"
                            : "Manage Sliders"}
                        </Button>
                      </div>

                      {state.expandedItems.has(
                        `menu-slider-secondary-${originalIndex}`
                      ) && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h5 className="text-md font-medium">
                              Slider Images for {item.name}
                            </h5>
                            <Button
                              onClick={() =>
                                addMenuSliderData("secondaryNavItems", originalIndex)
                              }
                              variant="outline"
                              size="sm"
                              leftIcon={<Plus />}
                            >
                              Add Slide
                            </Button>
                          </div>

                          {item.sliderData?.map((slide, slideIndex) => (
                            <Card key={slideIndex} className="p-4">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {slide.title}
                                  </span>
                                </div>
                                <Button
                                  onClick={() =>
                                    removeMenuSliderData(
                                      "secondaryNavItems",
                                      originalIndex,
                                      slideIndex
                                    )
                                  }
                                  variant="ghost"
                                  size="sm"
                                  leftIcon={<Trash2 />}
                                >
                                  Remove
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">
                                    Title
                                  </label>
                                  <Input
                                    value={slide.title}
                                    onChange={(e) =>
                                      updateMenuSliderData(
                                        "secondaryNavItems",
                                        originalIndex,
                                        slideIndex,
                                        { title: e.target.value }
                                      )
                                    }
                                    placeholder="Slide title"
                                  />
                                </div>
                                <div>
                                  <ImageUpload
                                    label="Slide Image"
                                    value={slide.image}
                                    onChange={(url) =>
                                      updateMenuSliderData(
                                        "secondaryNavItems",
                                        originalIndex,
                                        slideIndex,
                                        { image: url }
                                      )
                                    }
                                    placeholder="Click to upload slide image or drag and drop"
                                    helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    maxSize={5}
                                    aspectRatio={4}
                                    showPreview={true}
                                    onSuccess={(url) => {
                                      toast.success(
                                        "Image uploaded successfully"
                                      );
                                    }}
                                    onError={(error) => {
                                      toast.error(error);
                                    }}
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="text-sm font-medium">
                                    Description
                                  </label>
                                  <Input
                                    value={slide.description}
                                    onChange={(e) =>
                                      updateMenuSliderData(
                                        "secondaryNavItems",
                                        originalIndex,
                                        slideIndex,
                                        { description: e.target.value }
                                      )
                                    }
                                    placeholder="Slide description"
                                  />
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {state.activeTab === "settings" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Navbar Settings</h2>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={state.config.companyName || ""}
                  onChange={(e) =>
                    updateConfig((config) => ({
                      ...config,
                      companyName: e.target.value,
                    }))
                  }
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="text-md font-medium">Feature Toggles</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={state.config.showSearch !== false}
                    onCheckedChange={(checked) =>
                      updateConfig((config) => ({
                        ...config,
                        showSearch: checked === true,
                      }))
                    }
                  />
                  <label className="text-sm">Show Search</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={state.config.showThemeToggle !== false}
                    onCheckedChange={(checked) =>
                      updateConfig((config) => ({
                        ...config,
                        showThemeToggle: checked === true,
                      }))
                    }
                  />
                  <label className="text-sm">Show Theme Toggle</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={state.config.showConsultation !== false}
                    onCheckedChange={(checked) =>
                      updateConfig((config) => ({
                        ...config,
                        showConsultation: checked === true,
                      }))
                    }
                  />
                  <label className="text-sm">Show Consultation CTA</label>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

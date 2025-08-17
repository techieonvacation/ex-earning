"use client";

import { Button } from "@/app/components/ui/Button";
import { LucideIcons } from "../Icon";
import { CartItem as CartItemType } from "./CartProvider";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isUpdating?: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
}: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border hover:bg-muted/50 transition-colors duration-200">
      <div className="flex items-start space-x-4">
        {/* Item Image */}
        <div className="w-16 h-16 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
          <LucideIcons.Package className="h-8 w-8 text-primary" />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">
                {item.name}
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                  {item.serviceType}
                </span>
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              disabled={isUpdating}
              className="h-6 w-6 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove item"
            >
              <LucideIcons.Trash2 className="h-3 w-3" />
            </Button>
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                ${(item.price * item.quantity).toFixed(2)} total
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                className="h-8 w-8 rounded-full border-border hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <LucideIcons.Minus className="h-3 w-3" />
              </Button>

              <span className="w-8 text-center font-medium text-foreground">
                {item.quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="h-8 w-8 rounded-full border-border hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <LucideIcons.Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

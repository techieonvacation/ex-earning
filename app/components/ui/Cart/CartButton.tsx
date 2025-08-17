"use client";

import { Button } from "@/app/components/ui/Button";
import { LucideIcons } from "../Icon";
import { useCart } from "./CartProvider";

interface CartButtonProps {
  variant?: "ghost" | "outline" | "primary" | "secondary";
  size?: "sm" | "lg" | "icon" | "xs" | "md" | "xl";
  className?: string;
  showBadge?: boolean;
  onClick?: () => void;
}

export default function CartButton({
  variant = "ghost",
  size = "icon",
  className = "",
  showBadge = true,
  onClick,
}: CartButtonProps) {
  const { state, openCart } = useCart();
  const { totalItems } = state;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      openCart();
    }
  };

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={`cursor-pointer touch-manipulation ${className}`}
        aria-label="Shopping Cart"
      >
        <LucideIcons.ShoppingCart className="h-5 w-5" />
      </Button>
      {/* Cart Badge */}
      {showBadge && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 z-50 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium border-2 border-background animate-pulse shadow-lg">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </div>
  );
}

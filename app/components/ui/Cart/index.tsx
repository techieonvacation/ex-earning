"use client";

import { useCart } from "./CartProvider";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Button } from "@/app/components/ui/Button";
import { LucideIcons } from "../Icon";

interface CartProps {
  className?: string;
}

export default function Cart({ className = "" }: CartProps) {
  const { state, closeCart, updateQuantity, removeItem, applyCoupon, removeCoupon, clearCart } = useCart();
  const { items, isOpen, subtotal, tax, total, appliedCoupon, couponDiscount } = state;

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    // Navigate to checkout page or open checkout modal
    window.location.href = "/checkout";
  };

  // Continue shopping
  const handleContinueShopping = () => {
    closeCart();
    // Optionally navigate to services page
    // window.location.href = "/services";
  };

  // Handle escape key
  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeCart();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[450px] bg-background border-l border-border shadow-2xl z-50
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        ${className}
      `}>
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-3">
            <LucideIcons.ShoppingCart className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              {items.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="h-8 w-8 rounded-full hover:bg-muted transition-colors"
            aria-label="Close cart"
          >
            <LucideIcons.X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <LucideIcons.ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Add some amazing services to get started!</p>
                <Button onClick={handleContinueShopping} className="bg-primary hover:bg-primary/90">
                  Browse Services
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <CartSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              itemCount={items.length}
              appliedCoupon={appliedCoupon}
              couponDiscount={couponDiscount}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
              onProceedToCheckout={handleProceedToCheckout}
              onClearCart={clearCart}
              onContinueShopping={handleContinueShopping}
            />
          )}
        </div>
      </div>
    </>
  );
}

// Export all cart components
export { CartProvider } from "./CartProvider";
export { default as CartButton } from "./CartButton";
export { default as CartItem } from "./CartItem";
export { default as CartSummary } from "./CartSummary";
export { useCart } from "./CartProvider";
export type { CartItem as CartItemType } from "./CartProvider";

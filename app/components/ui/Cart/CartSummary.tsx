"use client";

import { useState, useCallback } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { LucideIcons } from "../Icon";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
  appliedCoupon: string | null;
  couponDiscount: number;
  onApplyCoupon: (code: string, discount: number) => void;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

export default function CartSummary({
  subtotal,
  tax,
  total,
  itemCount,
  appliedCoupon,
  couponDiscount,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
  onClearCart,
  onContinueShopping,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("");

  // Mock coupon validation - replace with actual API call
  const validCoupons = {
    "SAVE20": 20,
    "WELCOME10": 10,
    "FREESHIP": 15,
    "NEWCUSTOMER": 25,
    "LOYALTY": 30,
  };

  const handleApplyCoupon = useCallback(() => {
    if (!couponCode.trim()) return;
    
    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
    
    if (discount) {
      onApplyCoupon(couponCode.toUpperCase(), (subtotal * discount) / 100);
      setCouponCode("");
    } else {
      alert("Invalid coupon code. Try: SAVE20, WELCOME10, FREESHIP, NEWCUSTOMER, or LOYALTY");
    }
  }, [couponCode, subtotal, onApplyCoupon]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyCoupon();
    }
  }, [handleApplyCoupon]);

  return (
    <div className="border-t border-border bg-muted/30 p-6 space-y-4">
      {/* Coupon Section */}
      <div className="space-y-3">
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2">
              <LucideIcons.CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Coupon {appliedCoupon} applied
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemoveCoupon}
              className="text-green-600 hover:text-green-700 h-6 px-2"
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Have a coupon code?
            </label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleApplyCoupon}
                variant="outline"
                size="sm"
                className="whitespace-nowrap border-border hover:bg-muted"
              >
                Apply
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Try: SAVE20, WELCOME10, FREESHIP, NEWCUSTOMER, or LOYALTY
            </p>
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-lg">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items ({itemCount})</span>
            <span className="font-medium">{itemCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          {couponDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span className="font-medium">-${couponDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground text-lg">Total</span>
              <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onProceedToCheckout}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <LucideIcons.CreditCard className="h-4 w-4 mr-2" />
          Proceed to Checkout
        </Button>
        
        <div className="flex space-x-2">
          <Button
            onClick={onClearCart}
            variant="outline"
            className="flex-1 border-border hover:bg-muted transition-colors duration-200"
          >
            <LucideIcons.Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
          <Button
            onClick={onContinueShopping}
            variant="outline"
            className="flex-1 border-border hover:bg-muted transition-colors duration-200"
          >
            <LucideIcons.ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <LucideIcons.Shield className="h-3 w-3" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
          <LucideIcons.Clock className="h-3 w-3" />
          <span>Orders processed within 24 hours</span>
        </div>
      </div>
    </div>
  );
}

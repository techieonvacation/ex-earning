"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";

// Cart Item Interface
export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  serviceType: string;
}

// Cart State Interface
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  appliedCoupon: string | null;
  couponDiscount: number;
}

// Cart Action Types
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "APPLY_COUPON"; payload: { code: string; discount: number } }
  | { type: "REMOVE_COUPON" }
  | { type: "LOAD_CART"; payload: CartItem[] };

// Cart Context Interface
interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getItemQuantity: (id: string) => number;
  isItemInCart: (id: string) => boolean;
}

// Initial Cart State
const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  appliedCoupon: null,
  couponDiscount: 0,
};

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );

        return calculateCartTotals({
          ...state,
          items: updatedItems,
        });
      } else {
        // Add new item
        const newItems = [...state.items, action.payload];

        return calculateCartTotals({
          ...state,
          items: newItems,
        });
      }
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      return calculateCartTotals({
        ...state,
        items: filteredItems,
      });
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const filteredItems = state.items.filter((item) => item.id !== id);

        return calculateCartTotals({
          ...state,
          items: filteredItems,
        });
      }

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return calculateCartTotals({
        ...state,
        items: updatedItems,
      });
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
        appliedCoupon: null,
        couponDiscount: 0,
        totalItems: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
      };
    }

    case "SET_CART_OPEN": {
      return {
        ...state,
        isOpen: action.payload,
      };
    }

    case "APPLY_COUPON": {
      const { code, discount } = action.payload;
      return {
        ...state,
        appliedCoupon: code,
        couponDiscount: discount,
        total: Math.max(0, state.subtotal + state.tax - discount),
      };
    }

    case "REMOVE_COUPON": {
      return {
        ...state,
        appliedCoupon: null,
        couponDiscount: 0,
        total: state.subtotal + state.tax,
      };
    }

    case "LOAD_CART": {
      return calculateCartTotals({
        ...state,
        items: action.payload,
      });
    }

    default:
      return state;
  }
}

// Helper function to calculate cart totals
function calculateCartTotals(state: CartState): CartState {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = Math.max(0, subtotal + tax - state.couponDiscount);

  return {
    ...state,
    totalItems,
    subtotal,
    tax,
    total,
  };
}

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  // Open cart
  const openCart = useCallback(() => {
    dispatch({ type: "SET_CART_OPEN", payload: true });
  }, []);

  // Close cart
  const closeCart = useCallback(() => {
    dispatch({ type: "SET_CART_OPEN", payload: false });
  }, []);

  // Toggle cart
  const toggleCart = useCallback(() => {
    dispatch({ type: "SET_CART_OPEN", payload: !state.isOpen });
  }, [state.isOpen]);

  // Apply coupon
  const applyCoupon = useCallback((code: string, discount: number) => {
    dispatch({ type: "APPLY_COUPON", payload: { code, discount } });
  }, []);

  // Remove coupon
  const removeCoupon = useCallback(() => {
    dispatch({ type: "REMOVE_COUPON" });
  }, []);

  // Get item quantity
  const getItemQuantity = useCallback(
    (id: string) => {
      const item = state.items.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
    [state.items]
  );

  // Check if item is in cart
  const isItemInCart = useCallback(
    (id: string) => {
      return state.items.some((item) => item.id === id);
    },
    [state.items]
  );

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    applyCoupon,
    removeCoupon,
    getItemQuantity,
    isItemInCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

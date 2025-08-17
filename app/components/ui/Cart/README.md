# Cart System Components

A comprehensive, beautiful, and fully functional cart system for your Next.js application with TypeScript support.

## Features

- 🛒 **Full Cart Management**: Add, remove, update quantities, and clear cart
- 🎫 **Coupon System**: Apply and remove discount codes
- 💰 **Real-time Calculations**: Automatic tax, subtotal, and total calculations
- 📱 **Responsive Design**: Mobile-first design with beautiful animations
- 🎨 **Theme Support**: Dark/light mode compatible
- ♿ **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- 🔄 **State Management**: Global cart state with React Context
- ⚡ **Performance**: Optimized with useCallback and useMemo

## Components

### 1. CartProvider
Global context provider for cart state management.

### 2. Cart
Main cart sidebar component that displays all cart items and summary.

### 3. CartButton
Button component with cart icon and item count badge.

### 4. CartItem
Individual cart item component with quantity controls and remove functionality.

### 5. CartSummary
Cart summary section with totals, coupon input, and action buttons.

## Installation & Setup

### 1. Wrap your app with CartProvider

```tsx
// app/layout.tsx or your root component
import { CartProvider } from "@/app/components/ui/Cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

### 2. Add Cart component to your layout

```tsx
// app/layout.tsx
import Cart from "@/app/components/ui/Cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Cart />
    </>
  );
}
```

### 3. Use CartButton in your navbar

```tsx
// app/components/ui/Navbar/index.tsx
import { CartButton } from "@/app/components/ui/Cart";

export default function Navbar() {
  return (
    <nav>
      {/* Your navbar content */}
      <CartButton />
    </nav>
  );
}
```

## Usage Examples

### Adding Items to Cart

```tsx
import { useCart } from "@/app/components/ui/Cart";

export default function ServiceCard({ service }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      quantity: 1,
      image: service.image,
      category: service.category,
      serviceType: service.type,
    });
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### Checking Cart State

```tsx
import { useCart } from "@/app/components/ui/Cart";

export default function Header() {
  const { state } = useCart();
  const { totalItems, total } = state;

  return (
    <header>
      <span>Items: {totalItems}</span>
      <span>Total: ${total.toFixed(2)}</span>
    </header>
  );
}
```

### Programmatically Opening Cart

```tsx
import { useCart } from "@/app/components/ui/Cart";

export default function CheckoutButton() {
  const { openCart } = useCart();

  const handleCheckout = () => {
    // Open cart before proceeding to checkout
    openCart();
  };

  return (
    <button onClick={handleCheckout}>
      Review Cart
    </button>
  );
}
```

## Cart Item Interface

```tsx
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  serviceType: string;
}
```

## Available Coupon Codes

For testing purposes, the following coupon codes are available:

- `SAVE20` - 20% discount
- `WELCOME10` - 10% discount
- `FREESHIP` - 15% discount
- `NEWCUSTOMER` - 25% discount
- `LOYALTY` - 30% discount

## Styling & Customization

The cart components use Tailwind CSS classes and can be customized by:

1. **Modifying className props** on any component
2. **Updating the theme** in your theme provider
3. **Customizing CSS variables** for colors and spacing

### Custom Styling Example

```tsx
<Cart className="custom-cart-styles" />
<CartButton className="bg-blue-500 hover:bg-blue-600" />
```

## State Management

The cart system uses React Context with useReducer for efficient state management:

- **Cart State**: Items, totals, coupons, and UI state
- **Actions**: Add, remove, update, clear, and coupon operations
- **Automatic Calculations**: Tax (8%), totals, and discounts

## Performance Features

- **Memoized Calculations**: Cart totals are calculated efficiently
- **Optimized Renders**: Components only re-render when necessary
- **Debounced Updates**: Quantity changes are optimized
- **Lazy Loading**: Cart content loads only when opened

## Accessibility Features

- **Keyboard Navigation**: Escape key to close cart
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Focus is managed when cart opens/closes
- **Screen Reader Support**: All interactive elements are properly labeled

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Troubleshooting

### Common Issues

1. **Cart not opening**: Ensure CartProvider is wrapping your app
2. **Items not adding**: Check that the CartItem interface matches your data
3. **Styling issues**: Verify Tailwind CSS is properly configured

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
NEXT_PUBLIC_CART_DEBUG=true
```

## Contributing

When contributing to the cart system:

1. Maintain TypeScript types
2. Add proper accessibility features
3. Test on mobile devices
4. Update this documentation

## License

This cart system is part of your project and follows the same license terms.

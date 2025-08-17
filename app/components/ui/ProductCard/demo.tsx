'use client';

import React from 'react';
import ProductCard from './index';
import { dummyProducts, getFeaturedProducts, getNewProducts, getBestSellers } from './data';

const ProductCardDemo: React.FC = () => {
  const handleAddToCart = (product: any) => {
    console.log('Added to cart:', product.title);
    // Add your cart logic here
  };

  const handleWishlist = (product: any) => {
    console.log('Wishlisted:', product.title);
    // Add your wishlist logic here
  };

  const handleQuickView = (product: any) => {
    console.log('Quick view:', product.title);
    // Add your quick view logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Product Card Component Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beautiful, modern, and advanced reusable product cards for your Next.js e-commerce website. 
            Built with TypeScript, Tailwind CSS, and mobile-first responsive design.
          </p>
        </div>

        {/* Featured Products Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Featured Products (Featured Variant)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeaturedProducts().slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                variant="featured"
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </section>

        {/* New Products Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            New Products (Default Variant)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getNewProducts().map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Best Sellers (Compact Variant)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {getBestSellers().map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                variant="compact"
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </section>

        {/* All Products Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            All Products (Mixed Variants)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                variant={index % 3 === 0 ? 'featured' : index % 3 === 1 ? 'compact' : 'default'}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </section>

        {/* Category Showcase */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Category Showcase
          </h2>
          <div className="space-y-12">
            {['Reels Bundle', 'AI Reels Bundle', 'AI Cartoon Bundle', 'Movies Clips'].map((category) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyProducts
                    .filter(product => product.category === category)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={handleAddToCart}
                        onWishlist={handleWishlist}
                        onQuickView={handleQuickView}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            How to Use
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Basic Usage:</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm">
{`import ProductCard from './components/ui/ProductCard';
import { dummyProducts } from './components/ui/ProductCard/data';

<ProductCard
  {...dummyProducts[0]}
  onAddToCart={(product) => console.log('Added:', product)}
  onWishlist={(product) => console.log('Wishlisted:', product)}
  onQuickView={(product) => console.log('Quick view:', product)}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Variants:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">variant="default"</code> - Standard card with full details</li>
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">variant="compact"</code> - Smaller card for grid layouts</li>
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">variant="featured"</code> - Large card for hero sections</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>✨ Beautiful hover effects and animations</li>
                <li>📱 Mobile-first responsive design</li>
                <li>🌙 Dark mode support</li>
                <li>⭐ Dynamic star ratings</li>
                <li>🏷️ Category and tag display</li>
                <li>💰 Price formatting in INR</li>
                <li>📊 Download count and file size</li>
                <li>❤️ Wishlist functionality</li>
                <li>🛒 Add to cart functionality</li>
                <li>👁️ Quick view functionality</li>
                <li>🎨 Multiple visual variants</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductCardDemo;

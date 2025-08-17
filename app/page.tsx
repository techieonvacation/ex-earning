"use client";

import { useCart } from "./components/ui/Cart";
import { Button } from "./components/ui/Button";

export default function Home() {
  const { addItem } = useCart();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">RICO STUDY</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the smooth transition effect as you scroll. The top
            navbar will disappear and the main navbar will smoothly move up to
            become fixed at the top.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
          
          {/* Cart Demo Section */}
          <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Try Our Cart System</h3>
            <p className="text-gray-600 mb-6">Add some demo services to test the shopping cart functionality.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2">Web Development</h4>
                <p className="text-sm text-gray-600 mb-3">Professional web development services</p>
                <p className="text-lg font-bold text-blue-600 mb-3">$299.00</p>
                <Button 
                  onClick={() => addItem({
                    id: "web-dev-1",
                    name: "Web Development",
                    description: "Professional web development services",
                    price: 299.00,
                    quantity: 1,
                    image: "/images/home/web-dev.webp",
                    category: "Development",
                    serviceType: "Web"
                  })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add to Cart
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2">UI/UX Design</h4>
                <p className="text-sm text-gray-600 mb-3">Creative and intuitive design solutions</p>
                <p className="text-lg font-bold text-blue-600 mb-3">$199.00</p>
                <Button 
                  onClick={() => addItem({
                    id: "ui-ux-1",
                    name: "UI/UX Design",
                    description: "Creative and intuitive design solutions",
                    price: 199.00,
                    quantity: 1,
                    image: "/images/home/ui-ux-design.webp",
                    category: "Design",
                    serviceType: "UI/UX"
                  })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add to Cart
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2">Digital Marketing</h4>
                <p className="text-sm text-gray-600 mb-3">Comprehensive digital marketing strategies</p>
                <p className="text-lg font-bold text-blue-600 mb-3">$399.00</p>
                <Button 
                  onClick={() => addItem({
                    id: "digital-marketing-1",
                    name: "Digital Marketing",
                    description: "Comprehensive digital marketing strategies",
                    price: 399.00,
                    quantity: 1,
                    image: "/images/home/digital-marketing.webp",
                    category: "Marketing",
                    serviceType: "Digital"
                  })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Click the cart icon in the navbar to view your cart items
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections for Scrolling */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Scroll Down to See the Effect
          </h2>

          {/* Multiple content blocks for scrolling */}
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mb-16 p-8 bg-gray-50 rounded-lg">
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">
                Section {i + 1}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This is content section {i + 1}. As you scroll down, you'll
                notice the smooth transition where the top navbar disappears and
                the main navbar smoothly moves up to become fixed at the top.
                The transition uses CSS transforms and opacity changes for a
                production-ready, smooth experience.
              </p>
              
              {/* Add cart demo to first section */}
              {i === 0 && (
                <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">🛒 Cart Integration Demo</h4>
                  <p className="text-blue-700 mb-4">
                    This section demonstrates the cart integration. Try adding items from the hero section above, 
                    then click the cart icon in the navbar to see your cart!
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => addItem({
                        id: "demo-1",
                        name: "Demo Service 1",
                        description: "This is a demo service for testing",
                        price: 99.00,
                        quantity: 1,
                        image: "/images/home/web-dev.webp",
                        category: "Demo",
                        serviceType: "Test"
                      })}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add Demo Item 1
                    </Button>
                    <Button 
                      onClick={() => addItem({
                        id: "demo-2",
                        name: "Demo Service 2",
                        description: "Another demo service for testing",
                        price: 149.00,
                        quantity: 1,
                        image: "/images/home/ui-ux-design.webp",
                        category: "Demo",
                        serviceType: "Test"
                      })}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add Demo Item 2
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded border">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Feature {i + 1}.1
                  </h4>
                  <p className="text-sm text-gray-600">
                    Description of feature {i + 1}.1
                  </p>
                </div>
                <div className="p-4 bg-white rounded border">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Feature {i + 1}.2
                  </h4>
                  <p className="text-sm text-gray-600">
                    Description of feature {i + 1}.2
                  </p>
                </div>
                <div className="p-4 bg-white rounded border">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Feature {i + 1}.3
                  </h4>
                  <p className="text-sm text-gray-600">
                    Description of feature {i + 1}.3
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Smooth Transition Complete!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            You've experienced the smooth navbar transition. The top navbar
            disappeared on scroll and the main navbar smoothly moved up to
            become fixed at the top.
          </p>
          <button
            onClick={scrollToTop}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Scroll to Top
          </button>
        </div>
      </section>
    </div>
  );
}

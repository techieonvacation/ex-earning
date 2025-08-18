"use client";

import { motion } from "framer-motion";
import CategorySection from "../components/Home/Category";
import BestOffer from "../components/Home/BestOffer";
import BestProduct from "../components/Home/BestProduct";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary to-primary/80 text-white py-16"
      >
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-urbanist mb-4">
            Component Demo
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our beautiful and advanced UI components built with modern design principles
          </p>
        </div>
      </motion.header>

      {/* Category Section Demo */}
      <CategorySection />

      {/* Best Offer Section Demo */}
      <BestOffer />

      {/* Best Product Section Demo */}
      <BestProduct />
    </div>
  );
};

export default DemoPage;

"use client";
import { useState } from "react";

interface HamburgerProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const Hamburger = ({
  isOpen = false,
  onToggle,
  className = "",
}: HamburgerProps) => {
  // Fallback to internal state if no external state is provided
  const [internalIsOpen, setIsInternalOpen] = useState(false);

  const isMenuOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setIsInternalOpen(!internalIsOpen));

  return (
    <button
      onClick={handleToggle}
      className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      aria-label="Toggle navigation menu"
      aria-expanded={isMenuOpen}
      type="button"
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-1.5">
        <span
          className={`block w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-1000 ease-out ${
            isMenuOpen
              ? "rotate-[540deg] translate-y-1 scale-50 shadow-[0_0_15px_#ffffff]"
              : ""
          }`}
        />
        <span
          className={`block w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-800 ${
            isMenuOpen ? "rotate-[360deg] scale-75 opacity-60" : ""
          }`}
        />
        <span
          className={`block w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-1000 ease-out ${
            isMenuOpen
              ? "rotate-[-540deg] -translate-y-1 scale-50 shadow-[0_0_15px_#ffffff]"
              : ""
          }`}
        />
      </div>
      {isMenuOpen && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" />
          <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse animation-delay-100" />
          <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-pink-300 rounded-full animate-pulse animation-delay-200" />
          <div className="absolute bottom-3 right-2 w-1 h-1 bg-cyan-300 rounded-full animate-pulse animation-delay-300" />
        </div>
      )}
    </button>
  );
};

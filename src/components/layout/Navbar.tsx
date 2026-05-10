"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Dispatch event to open feedback widget
    window.dispatchEvent(new CustomEvent("open-feedback"));
    // Scroll to bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-bold tracking-wider text-primary">
              LUXHOME
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="hover:text-primary transition-colors duration-300 font-medium">Home</Link>
              <Link href="/product" className="hover:text-primary transition-colors duration-300 font-medium">Collection</Link>
              <Link href="/about" className="hover:text-primary transition-colors duration-300 font-medium">About</Link>
              <button 
                onClick={handleContactClick}
                className="hover:text-primary transition-colors duration-300 font-medium"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-primary transition-colors duration-300">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:text-primary transition-colors duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-4 text-base font-medium hover:bg-muted">Home</Link>
              <Link href="/product" className="block px-3 py-4 text-base font-medium hover:bg-muted">Collection</Link>
              <Link href="/about" className="block px-3 py-4 text-base font-medium hover:bg-muted">About</Link>
              <button 
                onClick={handleContactClick}
                className="block w-full text-left px-3 py-4 text-base font-medium hover:bg-muted"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

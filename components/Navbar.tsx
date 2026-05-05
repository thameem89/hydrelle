'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-botanical-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Empty left side to keep logo centered if needed, or just let logo be on the left */}
        <div className="hidden lg:flex w-1/3" />

        {/* Logo */}
        <Link href="/" className="text-3xl font-serif tracking-tighter text-botanical-dark">
          HYDRELLE
        </Link>

        {/* Links - Desktop Right + Cart */}
        <div className="flex gap-8 items-center uppercase tracking-widest text-xs font-medium w-full lg:w-auto justify-end lg:justify-start">
          <Link href="/#products" className="hidden lg:block hover:text-earth-deep transition-colors">Shop All</Link>
          <Link href="/#products" className="hidden lg:block hover:text-earth-deep transition-colors">Best Sellers</Link>
          <Link href="/story" className="hidden lg:block hover:text-earth-deep transition-colors">Our Story</Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-botanical-light/20 rounded-full transition-colors"
          >
            <ShoppingCart size={20} className="text-botanical-dark" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-botanical-dark text-cream text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 z-[60] bg-cream flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif text-botanical-dark">
                HYDRELLE
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-botanical-dark">
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {[
                { name: 'Shop All', href: '/#products' },
                { name: 'Our Story', href: '/story' },
                { name: 'Collections', href: '#' },
                { name: 'Philosophy', href: '#' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif text-botanical-dark hover:italic transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-earth-soft">Follow Us</p>
              <div className="flex gap-6 text-botanical-dark text-xs uppercase tracking-widest font-bold">
                <Link href="#">Instagram</Link>
                <Link href="#">TikTok</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

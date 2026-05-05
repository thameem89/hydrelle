'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

        {/* Links - Desktop */}
        <div className="hidden lg:flex gap-8 items-center uppercase tracking-widest text-xs font-medium">
          <Link href="/shop" className="hover:text-earth-deep transition-colors">Shop All</Link>
          <Link href="/collections" className="hover:text-earth-deep transition-colors">Collections</Link>
        </div>

        {/* Logo */}
        <Link href="/" className="text-3xl font-serif tracking-tighter text-botanical-dark">
          HYDRELLE
        </Link>

        {/* Links - Desktop Right + Cart */}
        <div className="flex gap-8 items-center uppercase tracking-widest text-xs font-medium">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cream border-t border-earth-soft/20 p-6 flex flex-col gap-4 uppercase tracking-widest text-xs">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
          <Link href="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link>
          <Link href="/story" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

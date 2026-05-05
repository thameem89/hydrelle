'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1c18] text-cream py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif tracking-tighter">HYDRELLE</h2>
          <p className="text-earth-soft/60 text-sm max-w-xs leading-relaxed">
            Redefining radiance through the perfect synergy of botanical wisdom and clinical precision. Pure nature, scientific care for your unique skin.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-white transition-all">
              <Globe size={18} />
            </Link>
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-white transition-all">
              <Mail size={18} />
            </Link>
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-white transition-all">
              <MessageCircle size={18} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8 uppercase tracking-widest text-[10px] font-semibold text-cream">
          <div className="flex flex-col gap-4">
            <span className="text-earth-soft mb-2 opacity-50">Shop</span>
            <Link href="/#products" className="hover:text-accent transition-colors">All Products</Link>
            <Link href="/#products" className="hover:text-accent transition-colors">New Arrivals</Link>
            <Link href="/#products" className="hover:text-accent transition-colors">Best Sellers</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-earth-soft mb-2 opacity-50">Discovery</span>
            <Link href="/story" className="hover:text-accent transition-colors">Our Story</Link>
            <Link href="/shipping-policy" className="hover:text-accent transition-colors">Shipping Policy</Link>
            <Link href="/return-policy" className="hover:text-accent transition-colors">Return Policy</Link>
          </div>
          <div className="flex flex-col gap-6 col-span-2 sm:col-span-1">
            <span className="text-earth-soft opacity-50">Stay Updated</span>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[10px] focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent/20 text-accent px-4 py-1.5 text-[9px] font-bold hover:bg-accent hover:text-white transition-all rounded-sm uppercase tracking-widest">
                  Join
                </button>
              </div>
              <p className="text-[8px] text-earth-soft/40 lowercase tracking-normal">
                By joining, you agree to our terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-[9px] uppercase tracking-[0.2em] text-earth-soft/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2024 Hydrelle Skincare. Crafted for clinical perfection.</p>
        <div className="flex gap-8">
          <Link href="/privacy-policy" className="hover:text-cream transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-cream transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

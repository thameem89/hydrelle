'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import MiniCart from '@/components/MiniCart';
import { getProducts } from '@/lib/products';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const products = getProducts();

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MiniCart />
      
      <HeroSection />

      {/* Featured Collection Section */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-botanical-dark"
          >
            The Radiance Collection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-earth-deep max-w-xl mx-auto font-light"
          >
            Clinically proven formulas derived from the rarest botanical essences.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-botanical-dark text-cream py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-earth-soft">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Where Science <br /> Meets the <br /> <span className="italic">Botanical Soul</span>
            </h2>
            <p className="text-earth-soft/80 text-lg leading-relaxed max-w-md">
              Hydrelle was born from a singular vision: to create a skincare line that doesn't force a choice between clinical effectiveness and organic purity.
            </p>
            <div className="pt-4">
              <button className="border-b border-cream/30 pb-2 text-xs uppercase tracking-widest hover:text-earth-soft transition-colors">
                Learn more about our process
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] bg-botanical-light/10 overflow-hidden"
          >
            <Image 
              src="/sections/home.jpeg"
              alt="Botanical Philosophy"
              fill
              className="object-cover transition-transform duration-[2s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-botanical-dark/10" />
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-cream border-t border-earth-soft/20 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-botanical-dark">HYDRELLE</h2>
            <p className="text-earth-deep text-sm max-w-xs leading-relaxed">
              Botanical skincare for the modern era. Clinical precision, natural radiance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-20 gap-y-8 uppercase tracking-widest text-[10px] font-semibold text-botanical-dark">
            <div className="flex flex-col gap-4">
              <span className="text-earth-soft mb-2">Shop</span>
              <Link href="#">All Products</Link>
              <Link href="#">Serums</Link>
              <Link href="#">Moisturizers</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-earth-soft mb-2">About</span>
              <Link href="#">Our Story</Link>
              <Link href="#">Ingredients</Link>
              <Link href="#">Shipping</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-earth-soft/10 text-[10px] uppercase tracking-widest text-earth-soft flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Hydrelle Skincare. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="#">Instagram</Link>
            <Link href="#">TikTok</Link>
            <Link href="#">Facebook</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/products';
import Navbar from '@/components/Navbar';
import MiniCart from '@/components/MiniCart';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, ExternalLink, ChevronLeft, Shield, Sparkles, Leaf, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const product = getProductById(id as string);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif text-botanical-dark">Product Not Found</h1>
          <button onClick={() => router.push('/')} className="text-xs uppercase tracking-widest text-earth-deep underline">
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MiniCart />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-earth-deep mb-12 hover:text-botanical-dark transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Shop
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square bg-white/50 border border-earth-soft/10 overflow-hidden flex items-center justify-center p-12">
              <Image 
                src={product.image_url} 
                alt={product.name} 
                fill 
                className="object-contain p-8" 
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {/* Placeholders for additional gallery images */}
               {[1, 2, 3].map((i) => (
                 <div key={i} className="relative aspect-square bg-white/50 border border-earth-soft/10 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center p-2">
                    <Image 
                      src={product.image_url} 
                      alt={`${product.name} gallery ${i}`} 
                      fill 
                      className="object-contain p-2"
                    />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.3em] text-earth-deep font-semibold">
                  {product.category}
                </p>
                {product.amazon_link && (
                  <div className="flex items-center gap-1.5 text-[#FF9900] bg-[#FF9900]/5 px-3 py-1 rounded-full">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Available on Amazon</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-serif text-botanical-dark">
                {product.displayPrice.split('/')[0]}
              </p>
            </div>

            <div className="prose prose-sm text-earth-deep leading-relaxed">
              <p>
                {product.description || "A clinical-strength formula designed to revitalize and protect. Infused with pure botanical extracts, this treatment penetrates deep into the dermal layers to restore natural radiance and provide lasting hydration."}
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => addItem(product)}
                className="w-full bg-botanical-dark text-cream py-5 uppercase tracking-[0.2em] text-xs font-semibold flex items-center justify-center gap-3 hover:bg-earth-deep transition-all transform hover:-translate-y-1 shadow-lg"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              
              {product.amazon_link && (
                <a 
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-[#FF9900]/20 text-[#FF9900] py-5 uppercase tracking-[0.2em] text-xs font-semibold flex items-center justify-center gap-3 hover:bg-[#FF9900] hover:text-white transition-all shadow-sm"
                >
                  <ExternalLink size={18} />
                  Buy from Amazon
                </a>
              )}
            </div>

            {/* Features/Trust badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-earth-soft/20">
              <div className="flex flex-col items-center text-center space-y-2">
                <Leaf size={20} className="text-botanical-dark" />
                <span className="text-[10px] uppercase tracking-widest font-bold">100% Organic</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Shield size={20} className="text-botanical-dark" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Clinical Grade</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Sparkles size={20} className="text-botanical-dark" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Radiance Fix</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

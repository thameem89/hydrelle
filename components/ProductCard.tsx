'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-white/50 border border-earth-soft/10 p-8 flex items-center justify-center">
        <Link href={`/product/${product.id}`} className="w-full h-full relative">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Quick Add Button */}
        <button 
          onClick={() => addItem(product)}
          className="absolute bottom-4 right-4 bg-cream/90 backdrop-blur-sm p-2 rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-botanical-dark hover:text-cream"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      <div className="mt-6 space-y-2 w-full">
        <p className="text-[9px] uppercase tracking-[0.3em] text-earth-deep font-bold">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium tracking-tight group-hover:text-botanical-dark transition-colors line-clamp-1 px-4">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-serif text-earth-deep">
          {product.displayPrice.split('/')[0]}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

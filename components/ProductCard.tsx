'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, formatUSD } from '@/lib/utils';

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
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 sm:translate-y-12 opacity-100 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => addItem(product)}
            className="flex-1 bg-cream/90 backdrop-blur-sm p-2 rounded-full shadow-md flex items-center justify-center gap-2 hover:bg-botanical-dark hover:text-cream transition-colors"
          >
            <ShoppingCart size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Add</span>
          </button>
          
          {product.amazon_link && (
            <a 
              href={product.amazon_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md flex items-center justify-center gap-2 hover:bg-[#FF9900] hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Amazon</span>
            </a>
          )}
        </div>
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
        <p className="text-xs font-serif text-botanical-dark">
          {formatPrice(product.numericPrice)} 
          <span className="text-[11px] text-earth-deep font-sans font-medium ml-2">
            ({formatUSD(product.numericPrice)})
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

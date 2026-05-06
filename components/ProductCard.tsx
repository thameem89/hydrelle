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

  const displayImage = product.image_url || (product.images && product.images.length > 0 ? product.images[0] : '');

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
            src={displayImage}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Action Buttons */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10 pointer-events-none group-hover:pointer-events-auto">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-botanical-dark shadow-lg hover:bg-botanical-dark hover:text-white transition-all transform active:scale-95"
          >
            <ShoppingCart size={16} />
          </button>
          {product.amazon_link && (
            <a 
              href={product.amazon_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#FF9900] shadow-lg hover:bg-[#FF9900] hover:text-white transition-all transform active:scale-95"
            >
              <ExternalLink size={16} />
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

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
import { cn, formatUSD } from '@/lib/utils';

const ProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const { addItem } = useCart();
  const [activeMedia, setActiveMedia] = React.useState<string>('');
  const [mediaType, setMediaType] = React.useState<'image' | 'video'>('image');

  React.useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id as string);
      if (data) {
        setProduct(data);
        setActiveMedia(data.image_url);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-botanical-dark"></div>
      </div>
    );
  }

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

  const allMedia = [
    ...(product.images || [product.image_url]).map((src: string) => ({ src, type: 'image' as const })),
    ...(product.videos || []).map((src: string) => ({ src, type: 'video' as const }))
  ];

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
          {/* Media Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square bg-white/50 border border-earth-soft/10 overflow-hidden flex items-center justify-center">
              {mediaType === 'image' ? (
                <Image 
                  src={activeMedia} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-12" 
                  priority
                />
              ) : (
                <video 
                  src={activeMedia} 
                  controls 
                  autoPlay 
                  muted 
                  loop 
                  className="w-full h-full object-contain p-4"
                />
              )}
            </div>
            
            {allMedia.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allMedia.map((media, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      setActiveMedia(media.src);
                      setMediaType(media.type);
                    }}
                    className={cn(
                      "relative aspect-square bg-white/50 border overflow-hidden cursor-pointer hover:opacity-80 transition-all flex items-center justify-center p-2",
                      activeMedia === media.src ? "border-botanical-dark" : "border-earth-soft/10"
                    )}
                  >
                    {media.type === 'image' ? (
                      <Image 
                        src={media.src} 
                        alt={`${product.name} thumbnail ${i}`} 
                        fill 
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center bg-black/5">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-botanical-dark">
                          <motion.div whileHover={{ scale: 1.1 }} className="translate-x-0.5">▶</motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
                <span className="text-lg font-sans text-earth-deep ml-3 font-medium">
                  ({formatUSD(product.numericPrice)})
                </span>
              </p>
            </div>

            <div className="prose prose-sm text-earth-deep leading-relaxed">
              <p className="text-base">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => addItem(product)}
                className="w-full bg-botanical-dark text-cream py-5 rounded-2xl uppercase tracking-[0.2em] text-xs font-semibold flex items-center justify-center gap-3 hover:bg-earth-deep transition-all transform hover:-translate-y-1 shadow-lg"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              
              {product.amazon_link && (
                <a 
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-[#FF9900]/20 text-[#FF9900] py-5 rounded-2xl uppercase tracking-[0.2em] text-xs font-semibold flex items-center justify-center gap-3 hover:bg-[#FF9900] hover:text-white transition-all shadow-sm"
                >
                  <ExternalLink size={18} />
                  Buy from Amazon
                </a>
              )}
            </div>

            {/* Presentation Image */}
            {product.details?.presentation_image && (
              <div className="pt-8">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-earth-soft/10">
                  <Image 
                    src={product.details.presentation_image} 
                    alt={`${product.name} presentation`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            )}

            {/* Rich Details Sections */}
            <div className="space-y-12 pt-10 border-t border-earth-soft/20">
              {product.details?.product_presentation && (
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-botanical-dark">Clinical Profile</h4>
                  <p className="text-sm text-earth-deep leading-relaxed font-light">
                    {product.details.product_presentation}
                  </p>
                </div>
              )}

              {(product.details?.features || product.details?.benefits) && (
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-botanical-dark">Key Benefits</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {(product.details.features || product.details.benefits || []).map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-earth-deep font-light">
                        <Sparkles size={14} className="text-botanical-dark mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.details?.how_to_use && (
                <div className="bg-botanical-light/10 p-6 rounded-3xl space-y-3 border border-botanical-dark/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-botanical-dark/10 rounded-xl flex items-center justify-center text-botanical-dark">
                      <Leaf size={16} />
                    </div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-botanical-dark">Ritual</h4>
                  </div>
                  <p className="text-sm text-earth-deep leading-relaxed italic opacity-80">
                    "{product.details.how_to_use}"
                  </p>
                </div>
              )}

              {product.details?.ingredients && (
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-botanical-dark">Pure Ingredients</h4>
                  <p className="text-[11px] text-earth-soft leading-relaxed uppercase tracking-wider font-medium">
                    {product.details.ingredients}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MiniCart from '@/components/MiniCart';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

const StoryPage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MiniCart />

      {/* Header Section */}
      <section className="pt-40 pb-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-botanical-dark">Our Story</h1>
          <div className="w-16 h-px bg-earth-soft/40 mx-auto" />
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-serif italic text-earth-deep leading-relaxed pt-8">
            At the heart of our brand is a simple belief: beauty should be backed by quality, science, and trust.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section 1 */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <p className="text-earth-deep leading-relaxed text-sm md:text-base">
              We started with a mission to bring the very best of Korean innovation to our customers — sourcing high-quality, science-proven, and responsibly-harvested botanical ingredients.
            </p>
            <p className="text-earth-deep leading-relaxed text-sm md:text-base">
              South Korea has long been at the forefront of beauty technology, and we saw an opportunity to connect people with products that truly deliver results.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] md:aspect-square shadow-2xl rounded-lg overflow-hidden"
          >
            <Image 
              src="/sections/story_bottles.png" 
              alt="Hydrelle Serums" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section 2 */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] md:aspect-square shadow-2xl rounded-lg overflow-hidden order-2 md:order-1"
          >
            <Image 
              src="/sections/story_dropper.png" 
              alt="Botanical Ingredients" 
              fill 
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 order-1 md:order-2"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-botanical-dark">Science Meets Nature</h2>
            <div className="space-y-4 md:space-y-6 text-sm text-earth-deep leading-relaxed">
              <p>
                Every product we offer is carefully selected. We focus on formulas that are not only effective but also trusted by millions worldwide — blending cutting-edge research with real-world performance.
              </p>
              <p>
                Our commitment is to bridge the gap between ancient botanical wisdom and modern clinical precision, ensuring your skin receives the most authentic care possible.
              </p>
            </div>
            <div className="border-l-2 border-botanical-dark/20 pl-6 py-2">
              <p className="text-[12px] md:text-sm font-medium italic text-botanical-dark">
                "We are passionate about authenticity, quality, and innovation — and we bring that commitment into everything we do."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection Grid Section */}
      <section className="bg-white/30 py-32 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-botanical-dark">Our Collection</h2>
          <p className="text-earth-deep text-sm tracking-widest uppercase">Explore our full range of premium scientific products.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-20">
          <Link 
            href="/#products" 
            className="inline-block bg-earth-deep/20 text-botanical-dark px-10 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-botanical-dark hover:text-cream transition-all duration-300 rounded-sm"
          >
            Shop Full Collection
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StoryPage;

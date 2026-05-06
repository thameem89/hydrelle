'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    video: '/hero/Skincare.mp4',
    tag: 'Bestseller',
    title: <>Ampoule <br /><span className="italic">Face Serum</span></>,
    description: 'Anti-Aging Face Treatment with Hyaluronic Acid for a youthful, radiant glow. Experience the pinnacle of Korean skincare.',
    cta: '/product/5'
  },
  {
    image: 'https://m.media-amazon.com/images/I/51SEm2aoHsL._AC_SL1080_.jpg',
    tag: 'Pure Organic',
    title: <>Jojoba <br /><span className="italic">Premium Oil</span></>,
    description: '100% pure organic jojoba oil for deep nourishment of skin and hair. Nature\'s most potent moisturizer.',
    cta: '/product/7'
  },
  {
    image: 'https://m.media-amazon.com/images/I/41Ycdfk0JlL._AC_.jpg',
    tag: 'Skin Texture',
    title: <>Rice <br /><span className="italic">Serum 27%</span></>,
    description: 'Refine your pores and improve skin texture with our advanced rice extract formula. Achieve the glass skin look.',
    cta: '/product/9'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cream">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-botanical-dark/20 to-cream/90 z-10" />
          
          {slides[current].video ? (
            <>
              {/* Desktop Video */}
              <motion.video 
                key={`video-desktop-${current}`}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                autoPlay 
                muted 
                loop 
                playsInline
                className="hidden md:block w-full h-full object-cover"
              >
                <source src="/hero/Skincare.mp4" type="video/mp4" />
              </motion.video>
              {/* Mobile Video */}
              <motion.video 
                key={`video-mobile-${current}`}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                autoPlay 
                muted 
                loop 
                playsInline
                className="block md:hidden w-full h-full object-cover"
              >
                <source src="/hero/mobile.mp4" type="video/mp4" />
              </motion.video>
            </>
          ) : (
            <motion.div
              key={`image-${current}`}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 6, ease: "linear" }}
              className="relative w-full h-full"
            >
              <Image 
                src={slides[current].image!}
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 text-center px-4 md:px-6 max-w-4xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 md:space-y-6"
          >
            <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-botanical-dark font-semibold">
              {slides[current].tag}
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-botanical-dark leading-[1.1] md:leading-[1.1]">
              {slides[current].title}
            </h1>
            <p className="text-earth-deep text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
              {slides[current].description}
            </p>
            <div className="pt-4 md:pt-8 flex justify-center gap-6">
              <Link 
                href={slides[current].cta || "#products"} 
                className="inline-block bg-botanical-dark text-cream px-8 md:px-10 py-3 md:py-4 uppercase tracking-widest text-[10px] md:text-xs font-medium hover:bg-earth-deep transition-all duration-300 transform hover:-translate-y-1"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-500 ${current === index ? 'w-12 bg-botanical-dark' : 'w-4 bg-botanical-dark/20'}`}
          />
        ))}
      </div>

      {/* Static texture elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <p className="text-[10px] uppercase tracking-[1em] rotate-90 origin-left text-botanical-dark">
          Est. 2024
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

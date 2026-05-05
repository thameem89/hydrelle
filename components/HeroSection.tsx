'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    video: '/hero/Skincare.mp4',
    tag: 'Radiance Redefined',
    title: <>Pure Nature, <br /><span className="italic">Scientific Care</span></>,
    description: 'Experience the harmony of botanical extracts and clinical precision. Formulated to reveal your skin\'s most natural glow.',
  },
  {
    image: '/hero/slide2.png',
    tag: 'The Collection',
    title: <>Botanical <br /><span className="italic">Excellence</span></>,
    description: 'Each drop is a testament to our commitment to purity. Discover our range of clinically proven serums.',
  },
  {
    image: '/hero/slide3.png',
    tag: 'Our Philosophy',
    title: <>Reveal Your <br /><span className="italic">Inner Light</span></>,
    description: 'Skincare is more than a routine; it\'s a moment of serenity. Join us in the journey to natural radiance.',
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
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={slides[current].video} type="video/mp4" />
            </video>
          ) : (
            <Image 
              src={slides[current].image!}
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-botanical-dark font-semibold">
              {slides[current].tag}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-botanical-dark leading-[1.1]">
              {slides[current].title}
            </h1>
            <p className="text-earth-deep text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {slides[current].description}
            </p>
            <div className="pt-8 flex justify-center gap-6">
              <Link 
                href="#products" 
                className="inline-block bg-botanical-dark text-cream px-10 py-4 uppercase tracking-widest text-xs font-medium hover:bg-earth-deep transition-all duration-300 transform hover:-translate-y-1"
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

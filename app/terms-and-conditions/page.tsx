'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const PolicyLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <main className="min-h-screen bg-cream">
    <Navbar />
    <section className="pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">{title}</h1>
          <div className="w-12 h-px bg-earth-soft/40 mx-auto" />
          <p className="text-earth-soft text-[10px] uppercase tracking-widest">Last Updated: May 2024</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-earth max-w-none bg-white/40 p-8 md:p-12 rounded-[2rem] border border-earth-soft/10 shadow-sm"
        >
          {children}
        </motion.div>
      </div>
    </section>
    <Footer />
  </main>
);

const TermsAndConditions = () => (
  <PolicyLayout title="Terms & Conditions">
    <div className="space-y-8 text-earth-deep leading-relaxed">
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">1. Acceptance of Terms</h2>
        <p>By accessing and using the Hydrelle website, you agree to comply with and be bound by these Terms and Conditions. These terms apply to all visitors and customers.</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">2. Product Information</h2>
        <p>While we strive for clinical precision in all descriptions, minor variations in botanical color or consistency may occur due to the natural origin of our ingredients.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">3. Intellectual Property</h2>
        <p>All content on this site, including images, botanical formulas, and brand name, is the property of Hydrelle and is protected by international copyright laws.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">4. Limitation of Liability</h2>
        <p>Hydrelle shall not be liable for any indirect or consequential damages arising from the use of our products. Always perform a patch test before full clinical application.</p>
      </section>
    </div>
  </PolicyLayout>
);

export default TermsAndConditions;

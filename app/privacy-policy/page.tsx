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

const PrivacyPolicy = () => (
  <PolicyLayout title="Privacy Policy">
    <div className="space-y-8 text-earth-deep leading-relaxed">
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">1. Commitment to Privacy</h2>
        <p>Your privacy is as important to us as your skin's health. We are committed to protecting the personal data you share with us when visiting Hydrelle.</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">2. Information We Collect</h2>
        <p>We collect information such as your name, email address, shipping address, and payment details only to fulfill your orders and provide a personalized routine experience.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">3. How We Use Your Data</h2>
        <p>Your data is used to process transactions, improve our clinical formulas based on feedback, and send you occasional updates about your skincare routine. We never sell your personal information to third parties.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">4. Security</h2>
        <p>We implement industry-standard security measures to protect your data. All sensitive payment information is processed through secure, encrypted gateways.</p>
      </section>
    </div>
  </PolicyLayout>
);

export default PrivacyPolicy;

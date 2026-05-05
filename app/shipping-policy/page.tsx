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

const ShippingPolicy = () => (
  <PolicyLayout title="Shipping Policy">
    <div className="space-y-8 text-earth-deep leading-relaxed">
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">1. Shipping Coverage</h2>
        <p>We are proud to offer shipping services across the UAE and internationally. Our clinical botanical products are handled with the utmost care to ensure they reach you in perfect condition.</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">2. Delivery Timelines</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>UAE Local:</strong> 1-2 business days.</li>
          <li><strong>GCC Region:</strong> 3-5 business days.</li>
          <li><strong>International:</strong> 7-10 business days depending on location.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">3. Shipping Rates</h2>
        <p>Standard local delivery within the UAE is free for orders over AED 200. For international orders, shipping rates are calculated at checkout based on weight and destination.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">4. Tracking Your Order</h2>
        <p>Once your order is dispatched, you will receive a confirmation email with a tracking number. You can monitor your shipment through our logistics partner's portal.</p>
      </section>
    </div>
  </PolicyLayout>
);

export default ShippingPolicy;

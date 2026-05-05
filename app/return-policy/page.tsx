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

const ReturnPolicy = () => (
  <PolicyLayout title="Return Policy">
    <div className="space-y-8 text-earth-deep leading-relaxed">
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">1. Our Radiance Guarantee</h2>
        <p>At Hydrelle, we stand by the clinical effectiveness of our botanical formulas. If you are not completely satisfied with your purchase, we are here to help.</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">2. Eligibility for Returns</h2>
        <p>Returns are accepted within 14 days of delivery. To be eligible, the product must be in its original packaging, unopened, and unused. Due to hygiene and safety standards, opened clinical products cannot be returned.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">3. Process for Returns</h2>
        <p>To initiate a return, please contact our concierge team at support@hydrelleskincare.com with your order number. Once approved, you will receive instructions on how to return the item.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif text-botanical-dark">4. Refunds</h2>
        <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. Approved refunds will be processed back to your original payment method within 7-10 business days.</p>
      </section>
    </div>
  </PolicyLayout>
);

export default ReturnPolicy;

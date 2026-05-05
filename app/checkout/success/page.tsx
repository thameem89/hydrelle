'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const SuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Payment Successful.</h1>
            <p className="text-earth-deep text-lg font-light">
              Your botanical selection is being prepared for clinical packaging.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/60 p-8 rounded-[2.5rem] border border-earth-soft/10 space-y-6"
          >
            <div className="flex items-center gap-4 text-left border-b border-earth-soft/10 pb-6">
              <div className="w-12 h-12 bg-botanical-dark/10 rounded-2xl flex items-center justify-center text-botanical-dark">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-botanical-dark">Order Confirmed</p>
                <p className="text-[10px] text-earth-soft uppercase tracking-widest font-bold">Preparation in progress</p>
              </div>
            </div>
            
            <p className="text-sm text-earth-deep leading-relaxed">
              We've sent a confirmation email with your order details and tracking information. 
              Our clinical specialists will ensure your products reach you in peak condition.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard/overview"
                className="flex-1 bg-botanical-dark text-cream py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-earth-deep transition-all flex items-center justify-center gap-2"
              >
                View Routine Portal
                <ArrowRight size={14} />
              </Link>
              <Link 
                href="/"
                className="flex-1 py-4 border border-earth-soft/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SuccessPage;

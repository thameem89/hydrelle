'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CancelPage = () => {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto"
          >
            <XCircle size={48} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Payment Cancelled.</h1>
            <p className="text-earth-deep text-lg font-light">
              Your selection is still safe in your cart. You can return whenever you're ready.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-botanical-dark text-cream px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-earth-deep transition-all shadow-lg"
            >
              <ArrowLeft size={14} />
              Return to Store
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CancelPage;

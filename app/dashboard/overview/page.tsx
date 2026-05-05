'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Package,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const CustomerOverview = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={item} className="space-y-2">
          <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Welcome Back</p>
          <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Good morning, Alex.</h1>
          <p className="text-earth-deep font-light">Your skin is looking radiant today. Don't forget your SPF!</p>
        </motion.div>
        <motion.div variants={item} className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-earth-soft/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-botanical-light/20 flex items-center justify-center text-botanical-dark">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-earth-soft font-bold">Skin Type</p>
              <p className="text-sm font-semibold text-botanical-dark">Combination / Sensitive</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Routine Card */}
        <motion.div 
          variants={item}
          className="lg:col-span-2 bg-botanical-dark rounded-[2rem] p-8 text-cream relative overflow-hidden group shadow-xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12">
            <Sparkles size={200} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-cream/20 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm">
                Up Next: Morning Ritual
              </div>
              <div className="flex items-center gap-2 text-cream/60 text-xs">
                <Clock size={14} />
                <span>Starts in 45 mins</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif">Hydration & Protection</h2>
              <p className="text-cream/70 max-w-md font-light leading-relaxed">
                Your AM routine focuses on skin barrier protection and deep hydration using the Rice Serum and Daily Sunscreen.
              </p>
            </div>

            <button className="flex items-center gap-2 bg-cream text-botanical-dark px-6 py-3 rounded-full text-xs font-bold hover:bg-earth-soft transition-colors">
              Begin Routine
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Quick Actions / Stats */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div variants={item} className="bg-white p-6 rounded-[2rem] border border-earth-soft/10 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-400">
                <TrendingUp size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Loyalty</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-serif text-botanical-dark">1,250</p>
              <p className="text-xs text-earth-deep">Radiance Points</p>
            </div>
            <div className="mt-4 pt-4 border-t border-earth-soft/10">
              <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-botanical-dark flex items-center justify-between hover:underline">
                Redeem Rewards <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-accent/10 p-6 rounded-[2rem] border border-accent/20 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                <Star size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent">Subscription</span>
            </div>
            <div className="mt-4">
              <p className="text-lg font-serif text-botanical-dark italic">Next Delivery</p>
              <p className="text-xs text-botanical-dark">August 14th, 2024</p>
            </div>
            <div className="mt-4 pt-4 border-t border-accent/10">
              <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-botanical-dark flex items-center justify-between hover:underline">
                Manage Delivery <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <motion.div variants={item} className="bg-white rounded-[2rem] border border-earth-soft/10 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-earth-soft/10 flex justify-between items-center">
          <h2 className="text-xl font-serif text-botanical-dark">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-xs uppercase tracking-widest text-earth-soft font-bold hover:text-botanical-dark transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/30 text-[10px] uppercase tracking-widest text-earth-soft font-bold">
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-soft/10">
              {[
                { id: '#HY-9021', status: 'Shipped', items: '3 Products', total: 'AED 385.00' },
                { id: '#HY-8842', status: 'Delivered', items: '1 Product', total: 'AED 125.00' },
              ].map((order) => (
                <tr key={order.id} className="text-sm text-botanical-dark hover:bg-cream/20 transition-colors cursor-pointer">
                  <td className="px-8 py-5 font-medium">{order.id}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      order.status === 'Shipped' ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-earth-deep">{order.items}</td>
                  <td className="px-8 py-5 text-right font-medium">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerOverview;

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Info,
  ChevronRight,
  Droplets,
  Wind,
  ShieldCheck
} from 'lucide-react';
import { getProducts } from '@/lib/products';
import { cn } from '@/lib/utils';

const RoutinePage = () => {
  const [activeTab, setActiveTab] = useState<'am' | 'pm'>('am');
  const [products, setProducts] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  const routine = {
    am: [
      { step: 'Cleanser', product: products[0], instructions: 'Apply to damp skin, massage gently for 60 seconds.' },
      { step: 'Serum', product: products[3], instructions: '2-3 drops on face and neck. Pat gently.' },
      { step: 'Sunscreen', product: products[7], instructions: 'Apply as the last step of your routine.' },
    ],
    pm: [
      { step: 'Cleanser', product: products[0], instructions: 'Double cleanse if wearing makeup.' },
      { step: 'Treatment', product: products[4], instructions: 'Focus on areas with redness or irritation.' },
      { step: 'Moisturizer', product: products[1], instructions: 'Seal in hydration with a pea-sized amount.' },
    ]
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Daily Ritual</p>
          <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Skincare Routine.</h1>
          <p className="text-earth-deep font-light">Your personalized path to natural radiance.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-earth-soft/10 shadow-sm">
          <button 
            onClick={() => setActiveTab('am')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
              activeTab === 'am' ? "bg-botanical-dark text-cream shadow-md" : "text-earth-soft hover:text-botanical-dark"
            )}
          >
            <Sun size={16} />
            Morning (AM)
          </button>
          <button 
            onClick={() => setActiveTab('pm')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
              activeTab === 'pm' ? "bg-botanical-dark text-cream shadow-md" : "text-earth-soft hover:text-botanical-dark"
            )}
          >
            <Moon size={16} />
            Evening (PM)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Routine Steps */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {routine[activeTab].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-earth-soft/10 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:border-botanical-dark/20 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-botanical-light/20 flex items-center justify-center text-botanical-dark font-serif text-xl flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="w-32 h-32 rounded-3xl bg-cream border border-earth-soft/5 overflow-hidden flex-shrink-0 relative">
                    <img src={item.product?.image_url} alt={item.product?.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-earth-soft font-bold">{item.step}</p>
                      <h3 className="text-xl font-serif text-botanical-dark">{item.product?.name}</h3>
                    </div>
                    <p className="text-sm text-earth-deep leading-relaxed font-light">
                      {item.instructions}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Droplets size={10} /> Hydrating
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck size={10} /> Protecting
                      </span>
                    </div>
                  </div>
                  <button className="p-4 hover:bg-botanical-light/20 rounded-full text-earth-soft hover:text-botanical-dark transition-colors">
                    <ChevronRight size={24} />
                  </button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Skin Profile Summary */}
          <div className="bg-botanical-dark p-8 rounded-[2.5rem] text-cream space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h2 className="text-xl font-serif">Skin Profile</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-cream/10">
                <span className="text-xs text-cream/60">Skin Type</span>
                <span className="text-xs font-bold uppercase tracking-widest">Combination</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-cream/10">
                <span className="text-xs text-cream/60">Concerns</span>
                <span className="text-xs font-bold uppercase tracking-widest">Aging, Redness</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-xs text-cream/60">Sensitivity</span>
                <span className="text-xs font-bold uppercase tracking-widest">Medium</span>
              </div>
            </div>
            <button className="w-full py-4 bg-cream text-botanical-dark rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-earth-soft transition-colors">
              Update Profile
            </button>
          </div>

          {/* Tips Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-earth-soft/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-accent">
              <Info size={20} />
              <h2 className="text-xl font-serif text-botanical-dark">Expert Tip</h2>
            </div>
            <p className="text-sm text-earth-deep leading-relaxed font-light">
              For best results with the **Rice Serum**, apply it while your skin is still slightly damp from cleansing. This helps lock in maximum moisture.
            </p>
            <div className="pt-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full border-2 border-botanical-light/50 p-0.5">
                  <div className="w-full h-full rounded-full bg-botanical-light/20 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=200" alt="Dermatologist" className="w-full h-full object-cover" />
                  </div>
               </div>
               <div>
                  <p className="text-xs font-bold text-botanical-dark">Dr. Sarah Miller</p>
                  <p className="text-[10px] text-earth-soft uppercase tracking-tighter">Lead Dermatologist</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;

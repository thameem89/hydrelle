'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { cn, formatPrice, formatUSD } from '@/lib/utils';

const MiniCart = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice } = useCart();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-earth-soft/20">
              <h2 className="text-xl font-serif text-botanical-dark">Your Selection</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-botanical-light/20 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-botanical-light/20 rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-earth-deep" />
                  </div>
                  <p className="text-earth-deep font-medium">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs uppercase tracking-widest text-botanical-dark underline underline-offset-4"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-24 h-24 bg-botanical-light/10 overflow-hidden">
                      <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium pr-4">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-earth-soft hover:text-botanical-dark">
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-earth-deep uppercase tracking-wider">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-earth-soft/30 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-botanical-dark">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-botanical-dark">
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-serif">{formatPrice(item.numericPrice * item.quantity)}</p>
                          <p className="text-[11px] text-earth-deep font-medium">({formatUSD(item.numericPrice * item.quantity)})</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-earth-soft/20 bg-botanical-light/5 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-serif">Subtotal</span>
                  <div className="text-right">
                    <p className="text-lg font-serif">{formatPrice(totalPrice)}</p>
                    <p className="text-[11px] text-earth-deep font-medium mt-1">Approx. {formatUSD(totalPrice)}</p>
                  </div>
                </div>
                <p className="text-[10px] text-earth-deep uppercase tracking-widest text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={cn(
                    "w-full bg-botanical-dark text-cream py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-earth-deep transition-all relative flex items-center justify-center",
                    isLoading && "opacity-80 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : "Proceed to Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // In a real app, this would be a server-side check or Supabase Auth
    // For now, we'll use a simple API check or local validation
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('admin_auth', 'true');
      router.push('/dashboard/admin');
    } else {
      setError('Invalid administrative password');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-botanical-dark/10 rounded-2xl text-botanical-dark mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl font-serif text-botanical-dark">Admin Access.</h1>
          <p className="text-earth-deep text-sm tracking-wide font-light">
            Enter your credentials to manage the Hydrelle botanical collection.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-earth-soft/10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1 flex items-center gap-2">
              <Lock size={12} />
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-cream/30 border border-earth-soft/20 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/20 transition-all"
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-[11px] font-medium px-1"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-botanical-dark text-cream rounded-2xl py-4 text-xs font-bold uppercase tracking-widest hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
            <ArrowRight size={14} />
          </button>
        </form>

        <button 
          onClick={() => router.push('/')}
          className="w-full mt-8 text-[10px] uppercase tracking-widest text-earth-deep hover:text-botanical-dark transition-colors font-bold"
        >
          Return to Storefront
        </button>
      </motion.div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Menu, X, User, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Role Toggle for Demo */}
      <div className="fixed bottom-6 right-6 z-[100] flex gap-2 bg-white p-2 rounded-full shadow-2xl border border-earth-soft/20 scale-75 md:scale-100">
        <button 
          onClick={() => setRole('customer')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
            role === 'customer' ? "bg-botanical-dark text-cream" : "text-earth-deep hover:bg-botanical-light/20"
          )}
        >
          <User size={14} />
          Customer View
        </button>
        <button 
          onClick={() => setRole('admin')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
            role === 'admin' ? "bg-botanical-dark text-cream" : "text-earth-deep hover:bg-botanical-light/20"
          )}
        >
          <ShieldCheck size={14} />
          Admin View
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar role={role} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-cream animate-in slide-in-from-left duration-300">
            <Sidebar role={role} />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <DashboardHeader 
          toggleMobileMenu={() => setIsMobileMenuOpen(true)} 
          role={role}
        />
        
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

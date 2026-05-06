'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Menu, X, User, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Auto-detect role and enforce auth
  useEffect(() => {
    const checkAuth = () => {
      const isAdminPath = pathname.includes('/dashboard/admin');
      
      if (isAdminPath) {
        const isAuth = localStorage.getItem('admin_auth') === 'true';
        if (!isAuth) {
          router.push('/dashboard/login');
          return;
        }
        setRole('admin');
      } else {
        setRole('customer');
      }
      setIsAuthChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isAuthChecking && pathname.includes('/dashboard/admin')) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-botanical-dark"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2]">


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

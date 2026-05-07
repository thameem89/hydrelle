'use client';

import React from 'react';
import { Bell, Search, Menu, UserCircle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  toggleMobileMenu: () => void;
  role: 'customer' | 'admin';
}

const DashboardHeader = ({ toggleMobileMenu, role }: DashboardHeaderProps) => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('admin_auth');
    router.push('/dashboard/login');
  };

  return (
    <header className="h-20 bg-white/50 backdrop-blur-md border-b border-earth-soft/10 sticky top-0 z-30 px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 hover:bg-botanical-light/20 rounded-lg text-botanical-dark transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-soft" size={18} />
          <input 
            type="text" 
            placeholder="Search your routine..." 
            className="pl-10 pr-4 py-2 bg-cream/50 border border-earth-soft/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/20 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative p-2 text-earth-deep hover:bg-botanical-light/20 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-earth-soft/20">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-botanical-dark">Alex Rivera</p>
            <p className="text-[10px] uppercase tracking-wider text-earth-soft font-bold">
              {role === 'admin' ? 'Administrator' : 'Premium Member'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-botanical-light/30 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
             <UserCircle size={28} className="text-botanical-dark" />
          </div>
          <button 
            onClick={handleSignOut}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

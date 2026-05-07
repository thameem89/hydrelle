'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  Calendar, 
  Heart, 
  Settings, 
  BarChart3, 
  Package, 
  PackageCheck,
  Users,
  LogOut,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role?: 'customer' | 'admin';
}

const Sidebar = ({ role = 'customer' }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('admin_auth');
    router.push('/dashboard/login');
  };

  const customerLinks = [
    { name: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'My Routine', href: '/dashboard/routine', icon: Sparkles },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: Calendar },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  ];

  const adminLinks = [
    { name: 'Analytics', href: '/dashboard/admin', icon: BarChart3 },
    { name: 'Inventory', href: '/dashboard/admin/inventory', icon: Package },
    { name: 'Orders', href: '/dashboard/admin/orders', icon: PackageCheck },
    { name: 'Customers', href: '/dashboard/admin/customers', icon: Users },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  const links = role === 'admin' ? adminLinks : customerLinks;

  return (
    <aside className="w-64 h-screen bg-cream border-r border-earth-soft/20 flex flex-col fixed left-0 top-0 z-40 overflow-y-auto">
      <div className="p-8 border-b border-earth-soft/10">
        <Link href="/" className="flex items-center gap-2 text-2xl font-serif text-botanical-dark">
          <Leaf className="text-botanical-dark" size={24} />
          HYDRELLE
        </Link>
        <p className="text-[10px] uppercase tracking-[0.2em] text-earth-deep mt-2 font-medium">
          {role === 'admin' ? 'Botanical Control' : 'My Radiance Portal'}
        </p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-medium",
                isActive 
                  ? "bg-botanical-dark text-cream shadow-lg shadow-botanical-dark/10" 
                  : "text-earth-deep hover:bg-botanical-light/20 hover:text-botanical-dark"
              )}
            >
              <Icon size={18} className={cn("transition-colors", isActive ? "text-cream" : "text-earth-soft group-hover:text-botanical-dark")} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-earth-soft/10">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

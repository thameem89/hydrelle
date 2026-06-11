'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Activity,
  Package,
  Calendar,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProducts } from '@/lib/products';

const salesData = [
  { name: 'Mon', sales: 0, subs: 0 },
  { name: 'Tue', sales: 0, subs: 0 },
  { name: 'Wed', sales: 0, subs: 0 },
  { name: 'Thu', sales: 0, subs: 0 },
  { name: 'Fri', sales: 0, subs: 0 },
  { name: 'Sat', sales: 0, subs: 0 },
  { name: 'Sun', sales: 0, subs: 0 },
];

const AdminOverview = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const fetchTopProducts = async () => {
      const data = await getProducts();
      setProducts(data.slice(0, 5));
    };
    fetchTopProducts();
  }, []);

  const handleResetPassword = async () => {
    if (!confirm("Are you sure you want to reset the admin dashboard password to the default ('admin123')?")) {
      return;
    }
    
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: 'admin123' }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Password reset to default ('admin123') successfully!");
      } else {
        alert("Error resetting password: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("An unexpected error occurred while resetting the password.");
    }
  };

  const stats = [
    { name: 'Total Revenue', value: 'AED 0', trend: '0%', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { name: 'Active Orders', value: '0', trend: '0%', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { name: 'New Customers', value: '0', trend: '0%', icon: Users, color: 'bg-orange-50 text-orange-600' },
    { name: 'Subscriptions', value: '0', trend: '0%', icon: Calendar, color: 'bg-accent/10 text-accent' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Management</p>
          <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Botanical Control.</h1>
          <p className="text-earth-deep font-light">Performance overview for the last 30 days.</p>
        </div>
        <button
          onClick={handleResetPassword}
          className="flex items-center justify-center gap-2 bg-amber-600 text-white hover:bg-amber-700 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-amber-600/15 cursor-pointer self-start md:self-end"
        >
          <RotateCcw size={14} />
          Reset Password
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend.startsWith('+');
          
          return (
            <motion.div 
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-[2rem] border border-earth-soft/10 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                  <Icon size={24} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                  isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-2xl font-serif text-botanical-dark">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-earth-soft font-bold">{stat.name}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-earth-soft/10 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-botanical-dark">Revenue & Subscriptions</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-botanical-dark" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Subs</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D4F1E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2D4F1E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEA" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8B7E66' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#8B7E66' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FDFBF7', 
                    border: '1px solid #E6F0E6', 
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2D4F1E" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="subs" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-earth-soft/10 shadow-sm space-y-6">
          <h2 className="text-xl font-serif text-botanical-dark">Top Sellers</h2>
          <div className="space-y-6">
            {products.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-cream border border-earth-soft/10 overflow-hidden relative">
                  <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-botanical-dark truncate">{product.name}</p>
                  <p className="text-[10px] uppercase tracking-wider text-earth-soft font-bold">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-botanical-dark">{120 - idx * 15} units</p>
                  <p className="text-[10px] text-green-600 font-bold">+12%</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 border border-earth-soft/20 rounded-xl text-[10px] uppercase tracking-widest font-bold text-earth-deep hover:bg-cream transition-colors">
            View All Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

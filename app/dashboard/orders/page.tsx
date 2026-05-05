'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Package, Truck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const OrdersPage = () => {
  const orders = [
    { id: '#HY-9021', date: 'August 1, 2024', status: 'Shipped', items: 3, total: 'AED 385.00' },
    { id: '#HY-8842', date: 'July 15, 2024', status: 'Delivered', items: 1, total: 'AED 125.00' },
    { id: '#HY-8510', date: 'June 28, 2024', status: 'Delivered', items: 2, total: 'AED 240.00' },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">History</p>
        <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Order History.</h1>
        <p className="text-earth-deep font-light">Track and manage your previous botanical purchases.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
          { label: 'In Transit', value: '1', icon: Truck, color: 'bg-blue-50 text-blue-600' },
          { label: 'Completed', value: '11', icon: CheckCircle2, color: 'bg-orange-50 text-orange-600' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-earth-soft/10 shadow-sm flex items-center gap-4"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-serif text-botanical-dark">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-earth-soft font-bold">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-earth-soft/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/30 text-[10px] uppercase tracking-widest text-earth-soft font-bold">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Items</th>
                <th className="px-8 py-5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-soft/10">
              {orders.map((order) => (
                <tr key={order.id} className="text-sm text-botanical-dark hover:bg-cream/10 transition-colors cursor-pointer group">
                  <td className="px-8 py-6 font-semibold">{order.id}</td>
                  <td className="px-8 py-6 text-earth-deep">{order.date}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      order.status === 'Shipped' ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-earth-deep">{order.items} Items</td>
                  <td className="px-8 py-6 text-right font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {order.total}
                      <ChevronRight size={14} className="text-earth-soft group-hover:translate-x-1 transition-transform" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

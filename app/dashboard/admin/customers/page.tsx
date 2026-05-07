'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomersPage = () => {
  const customers: any[] = [];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Management</p>
        <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Customers.</h1>
        <p className="text-earth-deep font-light">Insights into your botanical community and their skin profiles.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-soft" size={18} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-earth-soft/10 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-earth-deep hover:bg-cream transition-colors shadow-sm">
          <Filter size={14} />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-earth-soft/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/30 text-[10px] uppercase tracking-widest text-earth-soft font-bold">
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Skin Profile</th>
                <th className="px-8 py-5">Purchase Frequency</th>
                <th className="px-8 py-5 text-right">Total Spent</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-soft/10">
              {customers.map((customer, i) => (
                <tr key={i} className="text-sm text-botanical-dark hover:bg-cream/10 transition-colors">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-[10px] text-earth-soft">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-botanical-light/20 text-botanical-dark rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {customer.skinType}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-earth-deep">{customer.frequency}</td>
                  <td className="px-8 py-6 text-right font-medium">{customer.spent}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-botanical-light/20 rounded-lg text-earth-soft"><Mail size={16} /></button>
                      <button className="p-2 hover:bg-botanical-light/20 rounded-lg text-earth-soft"><MoreHorizontal size={16} /></button>
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

export default CustomersPage;

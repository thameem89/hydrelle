'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { getProducts } from '@/lib/products';
import { cn } from '@/lib/utils';

const InventoryPage = () => {
  const [products, setProducts] = useState(getProducts());
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Management</p>
          <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Inventory.</h1>
          <p className="text-earth-deep font-light">Manage your botanical collection and stock levels.</p>
        </div>
        <button className="flex items-center gap-2 bg-botanical-dark text-cream px-6 py-3 rounded-full text-xs font-bold hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10">
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-soft" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-earth-soft/10 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-earth-deep hover:bg-cream transition-colors shadow-sm">
            <Filter size={14} />
            Filters
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-earth-soft/10 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-earth-deep hover:bg-cream transition-colors shadow-sm">
            Export CSV
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-[2.5rem] border border-earth-soft/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/30 text-[10px] uppercase tracking-widest text-earth-soft font-bold">
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Stock Level</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-soft/10">
              {filteredProducts.map((product, idx) => {
                const stock = 100 - idx * 12; // Mock stock
                const isLow = stock < 20;

                return (
                  <tr key={product.id} className="text-sm text-botanical-dark hover:bg-cream/10 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cream border border-earth-soft/5 overflow-hidden flex-shrink-0 relative">
                          <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate max-w-[200px]">{product.name}</p>
                          <p className="text-[10px] text-earth-soft font-medium truncate uppercase tracking-tighter">SKU: HY-{product.id}-001</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-botanical-light/20 text-botanical-dark rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-medium text-earth-deep">
                      {product.displayPrice.split('/')[0]}
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2 max-w-[120px]">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                          <span className={isLow ? "text-red-500" : "text-green-600"}>
                            {stock} in stock
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-cream rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000", isLow ? "bg-red-400" : "bg-green-500")}
                            style={{ width: `${stock}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-botanical-light/20 rounded-lg text-earth-soft hover:text-botanical-dark transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-earth-soft hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-cream rounded-lg text-earth-soft transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto text-earth-soft">
              <Search size={32} />
            </div>
            <p className="text-earth-deep font-medium">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;

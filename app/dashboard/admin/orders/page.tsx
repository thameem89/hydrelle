'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Eye,
  Clock,
  ExternalLink,
  ChevronRight,
  Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const initialOrders = [
  { id: 'ORD-8291', customer: 'Sarah Johnson', date: '2024-05-01', total: 'AED 244.00', status: 'Pending', items: 3, email: 'sarah.j@example.com' },
  { id: 'ORD-8292', customer: 'Michael Chen', date: '2024-05-02', total: 'AED 128.50', status: 'Approved', items: 1, email: 'm.chen@example.com' },
  { id: 'ORD-8293', customer: 'Elena Rodriguez', date: '2024-05-02', total: 'AED 450.25', status: 'Shipped', items: 5, email: 'elena.r@example.com' },
  { id: 'ORD-8294', customer: 'David Smith', date: '2024-05-03', total: 'AED 99.00', status: 'Pending', items: 1, email: 'd.smith@example.com' },
  { id: 'ORD-8295', customer: 'Amara Okafor', date: '2024-05-03', total: 'AED 320.00', status: 'Cancelled', items: 2, email: 'amara.o@example.com' },
  { id: 'ORD-8296', customer: 'James Wilson', date: '2024-05-04', total: 'AED 189.90', status: 'Approved', items: 2, email: 'j.wilson@example.com' },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const statusColors = {
    'Pending': 'bg-orange-50 text-orange-600 border-orange-100',
    'Approved': 'bg-blue-50 text-blue-600 border-blue-100',
    'Shipped': 'bg-green-50 text-green-600 border-green-100',
    'Cancelled': 'bg-red-50 text-red-600 border-red-100',
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    setOrders(orders.map(order => 
      order.id === editingOrder.id ? editingOrder : order
    ));
    setIsEditModalOpen(false);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                         order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-2">
        <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Operations</p>
        <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Order Tracking.</h1>
        <p className="text-earth-deep font-light">Approve, track, and manage botanical shipments.</p>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-botanical-dark/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-cream w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl border border-earth-soft/10 overflow-hidden"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif text-botanical-dark">Manual Adjustment</h2>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-earth-soft">
                    <XCircle size={24} />
                  </button>
                </div>

                <form onSubmit={handleEditSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Order ID</label>
                      <input 
                        disabled
                        value={editingOrder.id}
                        className="w-full bg-white/50 border border-earth-soft/10 p-3 rounded-xl text-sm text-earth-deep opacity-60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Status</label>
                      <select 
                        value={editingOrder.status}
                        onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                        className="w-full bg-white border border-earth-soft/10 p-3 rounded-xl text-sm text-earth-deep focus:outline-none focus:ring-1 focus:ring-botanical-dark"
                      >
                        {['Pending', 'Approved', 'Shipped', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Customer Name</label>
                    <input 
                      required
                      value={editingOrder.customer}
                      onChange={(e) => setEditingOrder({...editingOrder, customer: e.target.value})}
                      className="w-full bg-white border border-earth-soft/10 p-3 rounded-xl text-sm text-earth-deep focus:outline-none focus:ring-1 focus:ring-botanical-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={editingOrder.email}
                      onChange={(e) => setEditingOrder({...editingOrder, email: e.target.value})}
                      className="w-full bg-white border border-earth-soft/10 p-3 rounded-xl text-sm text-earth-deep focus:outline-none focus:ring-1 focus:ring-botanical-dark"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Order Total</label>
                      <input 
                        required
                        value={editingOrder.total}
                        onChange={(e) => setEditingOrder({...editingOrder, total: e.target.value})}
                        className="w-full bg-white border border-earth-soft/10 p-3 rounded-xl text-sm text-earth-deep focus:outline-none focus:ring-1 focus:ring-botanical-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft">Items Count</label>
                      <input 
                        type="number"
                        required
                        value={editingOrder.items}
                        onChange={(e) => setEditingOrder({...editingOrder, items: parseInt(e.target.value)})}
                        className="w-full bg-white border border-earth-soft/10 p-3 rounded-xl text-sm text-earth-deep focus:outline-none focus:ring-1 focus:ring-botanical-dark"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 py-4 border border-earth-soft/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-botanical-dark text-cream rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-earth-deep transition-all shadow-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Pending Approval', count: orders.filter(o => o.status === 'Pending').length, color: 'text-orange-600' },
          { label: 'Today\'s Orders', count: 12, color: 'text-botanical-dark' },
          { label: 'Awaiting Ship', count: orders.filter(o => o.status === 'Approved').length, color: 'text-blue-600' },
          { label: 'Completion Rate', count: '94%', color: 'text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[1.5rem] border border-earth-soft/10 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-earth-soft font-bold mb-1">{stat.label}</p>
            <p className={cn("text-2xl font-serif", stat.color)}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-earth-soft/10 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-soft" size={18} />
          <input 
            type="text" 
            placeholder="Search Order ID or Customer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-cream/30 border border-earth-soft/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-botanical-dark transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['All', 'Pending', 'Approved', 'Shipped', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                filter === f ? "bg-botanical-dark text-cream shadow-md" : "bg-cream/50 text-earth-deep hover:bg-botanical-light/20"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2rem] border border-earth-soft/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/30 border-b border-earth-soft/10">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-earth-soft font-bold">Order ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-earth-soft font-bold">Customer</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-earth-soft font-bold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-earth-soft font-bold">Total</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-earth-soft font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-soft/10">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-cream/10 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-botanical-dark">{order.id}</span>
                        <ChevronRight size={14} className="text-earth-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[10px] text-earth-soft">{order.date}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-botanical-dark">{order.customer}</p>
                      <p className="text-[10px] text-earth-soft font-light">{order.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold border",
                        statusColors[order.status as keyof typeof statusColors]
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-botanical-dark">{order.total}</p>
                      <p className="text-[10px] text-earth-soft">{order.items} items</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => handleStatusChange(order.id, 'Approved')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors tooltip"
                            title="Approve Order"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        )}
                        {order.status === 'Approved' && (
                          <button 
                            onClick={() => handleStatusChange(order.id, 'Shipped')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark as Shipped"
                          >
                            <Truck size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            setEditingOrder(order);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2 text-earth-soft hover:bg-cream rounded-lg transition-colors"
                          title="Edit Order"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-earth-soft hover:bg-cream rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto">
              <Clock size={24} className="text-earth-soft" />
            </div>
            <p className="text-earth-deep font-medium">No orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Batch Actions Placeholder */}
      <div className="bg-botanical-dark text-cream p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Filter size={20} />
          </div>
          <div>
            <p className="text-sm font-serif">Order Insights</p>
            <p className="text-[10px] opacity-70 uppercase tracking-widest">Tracking and managing your customer fulfillments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Serum',
    price_aed: '',
    amazon_link: '',
    description: '',
    image_url: ''
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price_aed: product.numericPrice.toString(),
      amazon_link: product.amazon_link || '',
      description: product.description || '',
      image_url: product.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct ? { ...formData, id: editingProduct.id } : formData;

      const response = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Management</p>
          <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Inventory.</h1>
          <p className="text-earth-deep font-light">Manage your botanical collection and stock levels.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', category: 'Serum', price_aed: '', amazon_link: '', description: '', image_url: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-botanical-dark text-cream px-6 py-3 rounded-full text-xs font-bold hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10"
        >
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cream w-full max-w-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-botanical-dark/5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl font-serif text-botanical-dark">
                {editingProduct ? 'Edit Botanical.' : 'Add Botanical.'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-earth-deep hover:text-botanical-dark transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Rice Serum"
                    className="w-full px-5 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all appearance-none"
                  >
                    <option value="Serum">Serum</option>
                    <option value="Oil">Oil</option>
                    <option value="Exfoliator">Exfoliator</option>
                    <option value="Mask">Mask</option>
                    <option value="Toner">Toner</option>
                    <option value="Hair Care">Hair Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Price (AED)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price_aed}
                    onChange={(e) => setFormData({...formData, price_aed: e.target.value})}
                    placeholder="99.00"
                    className="w-full px-5 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Amazon Link</label>
                  <input 
                    type="url" 
                    value={formData.amazon_link}
                    onChange={(e) => setFormData({...formData, amazon_link: e.target.value})}
                    placeholder="https://amazon.ae/..."
                    className="w-full px-5 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://m.media-amazon.com/..."
                  className="w-full px-5 py-3 bg-white border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell the story of this product..."
                  className="w-full px-5 py-4 bg-white border border-earth-soft/10 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all resize-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-4 border border-earth-soft/10 rounded-full text-xs font-bold text-earth-deep hover:bg-white transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 bg-botanical-dark text-cream rounded-full text-xs font-bold hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10 disabled:opacity-50 uppercase tracking-widest"
                >
                  {isSubmitting ? (editingProduct ? 'Updating...' : 'Adding...') : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

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
                      {product.displayPrice ? product.displayPrice.split('/')[0] : `AED ${product.numericPrice}`}
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
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-botanical-light/20 rounded-lg text-earth-soft hover:text-botanical-dark transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-earth-soft hover:text-red-600 transition-colors"
                        >
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

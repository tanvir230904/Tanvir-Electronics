
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, ListTree, MessageSquare, 
  Users, Plus, Trash2, Edit2, Save, X, 
  CheckCircle2, AlertCircle, Loader2, Search,
  TrendingUp, ShoppingCart, DollarSign, UserCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Category, Product, Technician } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'complaints' | 'technicians'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingComplaints: 0
  });

  // Form states for adding/editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const [prodRes, compRes, orderRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact' }),
          supabase.from('complaints').select('id', { count: 'exact' }).eq('status', 'pending'),
          supabase.from('orders').select('total_amount')
        ]);
        
        setStats({
          totalProducts: prodRes.count || 0,
          pendingComplaints: compRes.count || 0,
          totalSales: orderRes.data?.reduce((acc, curr) => acc + (curr.total_amount || 0), 0) || 0,
          totalOrders: orderRes.data?.length || 0
        });
      } else if (activeTab === 'products') {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (data) setProducts(data.map(p => ({
          id: p.id, name: p.name, price: p.price, discountPrice: p.discount_price,
          category: p.category_name, description: p.description, imageUrl: p.image_url,
          images: p.images || [], features: p.features || [], specs: p.specs || {}, reviews: []
        })));
      } else if (activeTab === 'categories') {
        const { data } = await supabase.from('categories').select('*').order('name');
        if (data) setCategories(data.map(c => ({
          id: c.id, name: c.name, imageUrl: c.image_url, icon: c.icon_name, productCount: c.product_count
        })));
      } else if (activeTab === 'complaints') {
        const { data } = await supabase.from('complaints').select('*').order('created_at', { ascending: false });
        if (data) setComplaints(data);
      } else if (activeTab === 'technicians') {
        const { data } = await supabase.from('technicians').select('*').order('name');
        if (data) setTechnicians(data.map(t => ({
          id: t.id, name: t.name, specialty: t.specialty, experience: t.experience,
          phone: t.phone, email: t.email, facebookUrl: t.facebook_url, imageUrl: t.image_url,
          rating: t.rating, completed_jobs: t.completed_jobs
        })));
      }
    } catch (err) {
      console.error("Admin Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const table = activeTab;
      let payload = { ...formData };
      
      // Map frontend fields to DB fields if necessary
      if (activeTab === 'products') {
        payload = {
          name: formData.name,
          price: formData.price,
          discount_price: formData.discountPrice,
          category_name: formData.category,
          description: formData.description,
          image_url: formData.imageUrl,
          images: formData.images || [],
          features: formData.features || [],
          specs: formData.specs || {}
        };
      } else if (activeTab === 'categories') {
        payload = {
          name: formData.name,
          image_url: formData.imageUrl,
          icon_name: formData.icon,
          product_count: formData.productCount || 0
        };
      }

      if (editingItem) {
        const { error } = await supabase.from(table).update(payload).eq('id', editingItem.id);
        if (error) throw error;
        setSuccess('Item updated successfully');
      } else {
        const { error } = await supabase.from(table).insert([payload]);
        if (error) throw error;
        setSuccess('Item added successfully');
      }
      
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      setSuccess('Item deleted successfully');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateComplaintStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from('complaints').update({ status }).eq('id', id);
      if (error) throw error;
      setSuccess('Status updated');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <LayoutDashboard className="text-white" size={20} />
              </div>
              <h2 className="font-black uppercase tracking-tighter text-xl">Admin</h2>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'categories', label: 'Categories', icon: ListTree },
                { id: 'complaints', label: 'Complaints', icon: MessageSquare },
                { id: 'technicians', label: 'Technicians', icon: Users },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all ${
                    activeTab === item.id 
                      ? 'bg-black text-white shadow-lg' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            {activeTab !== 'dashboard' && activeTab !== 'complaints' && (
              <button 
                className="bg-amber-500 text-black px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg"
                onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
              >
                <Plus size={16} />
                Add New {activeTab.slice(0, -1)}
              </button>
            )}
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-3 mb-8 animate-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
              <button onClick={() => setError('')} className="ml-auto"><X size={16} /></button>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 px-6 py-4 rounded-2xl flex items-center gap-3 mb-8 animate-in slide-in-from-top-2">
              <CheckCircle2 size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">{success}</span>
              <button onClick={() => setSuccess('')} className="ml-auto"><X size={16} /></button>
            </div>
          )}

          {/* Content Area */}
          <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 min-h-[600px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[500px]">
                <Loader2 className="animate-spin text-amber-500 mb-4" size={48} />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Data...</p>
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Sales', value: `৳ ${stats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
                      { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-blue-500' },
                      { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-amber-500' },
                      { label: 'Pending Complaints', value: stats.pendingComplaints, icon: MessageSquare, color: 'bg-red-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                        <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                          <stat.icon size={24} />
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'products' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50">
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {products.map((p) => (
                          <tr key={p.id} className="group">
                            <td className="py-6">
                              <div className="flex items-center gap-4">
                                <img src={p.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                <span className="font-bold text-sm">{p.name}</span>
                              </div>
                            </td>
                            <td className="py-6 text-sm font-medium text-gray-500">{p.category}</td>
                            <td className="py-6 font-black text-sm">{p.price}</td>
                            <td className="py-6">
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(p)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete('products', p.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'categories' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((c) => (
                      <div key={c.id} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <img src={c.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="" />
                          <div>
                            <h4 className="font-black text-sm uppercase tracking-tight">{c.name}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.productCount} Products</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(c)} className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-black transition-all shadow-sm"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete('categories', c.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all shadow-sm"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'complaints' && (
                  <div className="space-y-6">
                    {complaints.map((c) => (
                      <div key={c.id} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              c.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {c.status}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              {new Date(c.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {c.status === 'pending' && (
                              <button 
                                onClick={() => updateComplaintStatus(c.id, 'resolved')}
                                className="bg-black text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-green-600 transition-all"
                              >
                                Mark Resolved
                              </button>
                            )}
                            <button onClick={() => handleDelete('complaints', c.id)} className="p-2 hover:bg-red-100 rounded-full text-red-600 transition-all"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-2">{c.subject}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{c.message}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200/50">
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                            <p className="text-xs font-bold">{c.name}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                            <p className="text-xs font-bold">{c.email} | {c.phone}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="text-xs font-bold">{c.order_id || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {complaints.length === 0 && (
                      <div className="text-center py-20">
                        <MessageSquare className="mx-auto text-gray-200 mb-4" size={64} />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No complaints found</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'technicians' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {technicians.map((t) => (
                      <div key={t.id} className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 group">
                        <img src={t.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt="" />
                        <div className="flex-1">
                          <h4 className="font-black text-lg uppercase tracking-tight">{t.name}</h4>
                          <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">{t.specialty}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                              <UserCheck size={12} /> {t.completedJobs} Jobs
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                              <TrendingUp size={12} /> {t.rating} Rating
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(t)} className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-black transition-all shadow-sm"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete('technicians', t.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all shadow-sm"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-black p-8 text-white flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {activeTab === 'products' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                      <select 
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold appearance-none"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (e.g. ৳ 1,200)</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Discount Price</label>
                      <input 
                        type="text"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                        value={formData.discountPrice || ''}
                        onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image URL</label>
                    <input 
                      type="url" required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold min-h-[120px]"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </>
              )}

              {activeTab === 'categories' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category Name</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image URL</label>
                    <input 
                      type="url" required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Icon Name (Lucide)</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold"
                      value={formData.icon || ''}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-black transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {editingItem ? 'Update' : 'Create'} {activeTab.slice(0, -1)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

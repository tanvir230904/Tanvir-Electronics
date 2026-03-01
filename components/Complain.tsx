
import React, { useState } from 'react';
import { 
  MessageSquare, Send, AlertCircle, CheckCircle2, 
  Loader2, User, Mail, Phone, FileText, HelpCircle 
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Complain: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase.from('complaints').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          order_id: formData.orderId,
          status: 'pending'
        }
      ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        orderId: ''
      });
    } catch (err: any) {
      console.error("Complaint Submission Error:", err);
      setError('Failed to submit complaint. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">Complaint Received</h1>
        <p className="text-gray-500 font-medium text-lg mb-12 max-w-md mx-auto">
          Thank you for bringing this to our attention. Our support team will review your case and get back to you within 24-48 hours.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-black transition-all shadow-xl"
        >
          Submit Another Complaint
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-black p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20">
            <MessageSquare size={40} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Customer Support</h1>
          <p className="text-white/60 font-medium max-w-md mx-auto">
            We value your feedback. If you've experienced any issues with our products or services, please let us know.
          </p>
        </div>

        <div className="p-12">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-3 mb-8">
              <AlertCircle size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <User size={12} /> Full Name
                </label>
                <input 
                  required 
                  type="text" 
                  placeholder="Tanvir Rahman" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                <input 
                  required 
                  type="email" 
                  placeholder="tanvir@example.com" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <Phone size={12} /> Phone Number
                </label>
                <input 
                  required 
                  type="tel" 
                  placeholder="+880 1XXX XXXXXX" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <HelpCircle size={12} /> Order ID (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="TE-123456789" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" 
                  value={formData.orderId} 
                  onChange={(e) => setFormData({...formData, orderId: e.target.value})} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                <FileText size={12} /> Subject
              </label>
              <input 
                required 
                type="text" 
                placeholder="Product Defect / Delivery Issue / etc." 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" 
                value={formData.subject} 
                onChange={(e) => setFormData({...formData, subject: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                <MessageSquare size={12} /> Detailed Message
              </label>
              <textarea 
                required 
                rows={5} 
                placeholder="Please describe your issue in detail..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black resize-none" 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-black transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Complain;

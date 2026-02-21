
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import { 
  UserCircle, Mail, Phone, MapPin, ShieldCheck, LogOut, 
  UserPlus, Fingerprint, LogIn, Eye, EyeOff, 
  AlertCircle, CheckCircle2, Loader2, ArrowLeft, RefreshCw,
  Terminal
} from 'lucide-react';

interface AccountProps {
  user: User | null;
  onUpdate: (user: User | null) => void;
}

const Account: React.FC<AccountProps> = ({ user, onUpdate }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create Profile record
        await supabase.from('profiles').upsert({
          id: authData.user.id,
          full_name: formData.name,
          phone: formData.phone,
          address: formData.address
        });

        // Log in immediately in the UI
        onUpdate({
          id: authData.user.id,
          name: formData.name,
          email: authData.user.email || '',
          phone: formData.phone,
          address: formData.address,
          createdAt: new Date().toISOString()
        });
        setSuccess('Account created successfully!');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', authData.user.id).single();
        onUpdate({
          id: authData.user.id,
          name: profile?.full_name || 'User',
          email: authData.user.email || '',
          phone: profile?.phone || '',
          address: profile?.address || '',
          createdAt: profile?.created_at || new Date().toISOString()
        });
      }
    } catch (err: any) {
      setError('Invalid Email or Password');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-black p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20">
              <UserCircle size={48} className="text-amber-500" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{user.name}</h1>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30">
              <Fingerprint size={12} />
              Verified Account ID: {user.id.slice(0,8)}...
            </div>
          </div>

          <div className="p-12 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-md group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-amber-500 transition-colors shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Email</p>
                  <p className="font-bold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-md group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-amber-500 transition-colors shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                  <p className="font-bold text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onUpdate(null)}
                className="flex-1 bg-gray-50 text-gray-400 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-50">
          <button onClick={() => { setIsSignIn(false); setError(''); setSuccess(''); }} className={`flex-1 py-6 font-black uppercase tracking-widest text-xs transition-all ${!isSignIn ? 'bg-amber-500 text-black' : 'bg-white text-gray-400 hover:text-black'}`}>Sign Up</button>
          <button onClick={() => { setIsSignIn(true); setError(''); setSuccess(''); }} className={`flex-1 py-6 font-black uppercase tracking-widest text-xs transition-all ${isSignIn ? 'bg-amber-500 text-black' : 'bg-white text-gray-400 hover:text-black'}`}>Sign In</button>
        </div>

        <div className="p-12 text-center pb-0">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            {isSignIn ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">{isSignIn ? 'Welcome Back' : 'Join the Revolution'}</h2>
        </div>

        <div className="px-12 pt-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
              </div>
            </div>
          )}
          {success && <div className="bg-green-50 border border-green-100 text-green-600 px-6 py-4 rounded-2xl flex items-center gap-3"><CheckCircle2 size={20} /><span className="text-xs font-bold uppercase tracking-widest">{success}</span></div>}
        </div>

        {isSignIn ? (
          <form onSubmit={handleSignIn} className="p-12 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
              <input required type="email" placeholder="tanvir@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" value={signInData.email} onChange={(e) => setSignInData({...signInData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
              <div className="relative group">
                <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" value={signInData.password} onChange={(e) => setSignInData({...signInData, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-black transition-all shadow-xl disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="p-12 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
              <input required type="text" placeholder="Tanvir Rahman" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-black" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="email" placeholder="Email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold text-black" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input required type="tel" placeholder="Phone" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold text-black" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <textarea required rows={2} placeholder="Address" className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-amber-500 font-bold text-black resize-none" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="password" placeholder="Password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold text-black" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              <input required type="password" placeholder="Confirm" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold text-black" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-black transition-all shadow-xl disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;

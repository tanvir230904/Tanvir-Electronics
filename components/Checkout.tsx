
import React, { useState } from 'react';
import { CartItem, PaymentMethod, User } from '../types';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2, Wallet, Landmark, Banknote, MapPin, Phone, User as UserIcon, MessageSquare } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onCheckoutSubmit: (shippingInfo: any, paymentMethod: PaymentMethod) => void;
  user: User | null;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onCheckoutSubmit, user }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Dhaka',
    notes: ''
  });

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => {
      const priceStr = item.product.price.replace(/[৳,]/g, '').trim();
      const price = parseFloat(priceStr);
      return acc + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = items.reduce((acc, item) => acc + (item.quantity * 100), 0);
  const total = subtotal + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required shipping information.");
      return;
    }
    onCheckoutSubmit(formData, paymentMethod);
  };

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={20} />, color: 'bg-gray-100', text: 'text-gray-700' },
    { 
      id: 'bkash', 
      name: 'bKash Payment', 
      icon: <img src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" alt="bKash" className="w-6 h-6 object-contain" />, 
      color: 'bg-pink-50', 
      text: 'text-pink-600' 
    },
    { 
      id: 'nagad', 
      name: 'Nagad Payment', 
      icon: <img src="https://freelogopng.com/images/all_img/1679248787nagad-logo-png.png" alt="Nagad" className="w-10 h-10 object-contain" />, 
      color: 'bg-white', 
      text: 'text-orange-600' 
    },
    { id: 'paypal', name: 'PayPal', icon: <CreditCard size={20} />, color: 'bg-blue-50', text: 'text-blue-600' },
    { id: 'bank', name: 'Bank Transfer', icon: <Landmark size={20} />, color: 'bg-indigo-50', text: 'text-indigo-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 font-bold uppercase tracking-wider text-xs group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Form */}
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Shipping Information</h2>
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Logged in as Tanvir Tech ID: {user?.id}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <UserIcon size={12} /> Full Name *
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all shadow-sm font-medium text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <Phone size={12} /> Phone Number *
                </label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all shadow-sm font-medium text-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                <MapPin size={12} /> Full Shipping Address *
              </label>
              <textarea 
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="House #, Road #, Area, Landmark..."
                className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-4 outline-none focus:border-amber-500 transition-all shadow-sm font-medium text-black resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">City</label>
                  <select 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all shadow-sm font-bold text-black"
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                    <option>Barisal</option>
                    <option>Rangpur</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                    <MessageSquare size={12} /> Special Delivery Notes
                  </label>
                  <input 
                    type="text" 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="E.g. Call before arrival"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all shadow-sm font-medium text-black"
                  />
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-500 text-black rounded-xl flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Choose Payment Method</h3>
               </div>
               
               <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label 
                      key={method.id}
                      className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-amber-500 bg-amber-50/30 shadow-md translate-x-2' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center border border-gray-100 ${method.color} ${method.text}`}>
                          {method.icon}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">{method.name}</span>
                          <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                            {method.id === 'cod' ? 'Pay when you receive' : 'Instant secure payment'}
                          </span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                        {paymentMethod === method.id && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <input 
                        type="radio" 
                        name="payment" 
                        value={method.id} 
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                        className="sr-only"
                      />
                    </label>
                  ))}
               </div>
            </div>
          </form>
        </div>

        {/* Order Summary Preview */}
        <div className="lg:pl-8 animate-in fade-in slide-in-from-right-4 duration-700">
           <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 sticky top-32 overflow-hidden">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8 pb-4 border-b border-gray-100">
                Final Review
              </h2>
              
              <div className="max-h-60 overflow-y-auto pr-2 mb-8 space-y-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex-shrink-0 border border-gray-100">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-black text-sm text-gray-900">
                      ৳{(parseFloat(item.product.price.replace(/[৳,]/g, '')) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 pt-4 border-t border-gray-50">
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Delivery Charge</span>
                  <span className="text-gray-900 font-bold">৳{deliveryCharge.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10 pt-4 border-t border-gray-100">
                <span className="text-sm font-black uppercase text-gray-400 tracking-widest mb-1">Grand Total</span>
                <span className="text-4xl font-black text-amber-600">৳{total.toLocaleString()}</span>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-black transition-all shadow-xl active:scale-95"
                >
                  <CheckCircle2 size={18} />
                  Authorize Payment
                </button>
                <div className="flex items-center justify-center gap-4 text-gray-400">
                   <ShieldCheck size={16} className="text-amber-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Secure Transaction</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

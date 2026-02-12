
import React, { useState, useEffect } from 'react';
import { OrderDetails } from '../types';
import { ShieldCheck, Lock, ArrowLeft, Loader2, CheckCircle, CreditCard, Landmark } from 'lucide-react';

interface PaymentProps {
  order: OrderDetails;
  onBack: () => void;
  onSuccess: () => void;
}

const Payment: React.FC<PaymentProps> = ({ order, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'processing'>('details');
  const [walletNumber, setWalletNumber] = useState(order.shippingInfo.phone);
  const [pin, setPin] = useState('');

  const totalToPay = order.subtotal + order.deliveryCharge;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (order.paymentMethod === 'bkash' || order.paymentMethod === 'nagad') {
       if (walletNumber.length < 11 || pin.length < 4) {
         alert("Please enter a valid wallet number and PIN.");
         return;
       }
    }
    
    setStep('processing');
    setLoading(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  const getThemeColor = () => {
    switch (order.paymentMethod) {
      case 'bkash': return 'bg-[#D12053]';
      case 'nagad': return 'bg-[#ED1C24]';
      case 'paypal': return 'bg-[#003087]';
      case 'bank': return 'bg-indigo-600';
      default: return 'bg-black';
    }
  };

  const getLogo = () => {
    switch (order.paymentMethod) {
      case 'bkash': return <img src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" alt="bKash" className="w-12 h-12 brightness-0 invert" />;
      case 'nagad': return <img src="https://freelogopng.com/images/all_img/1679248787nagad-logo-png.png" alt="Nagad" className="w-12 h-12 brightness-0 invert" />;
      case 'paypal': return <CreditCard size={32} className="text-white" />;
      case 'bank': return <Landmark size={32} className="text-white" />;
      default: return <ShieldCheck size={32} className="text-white" />;
    }
  };

  if (step === 'processing') {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center animate-in fade-in duration-700">
        <div className={`w-24 h-24 ${getThemeColor()} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl relative overflow-hidden`}>
           <div className="absolute inset-0 bg-white/20 animate-pulse" />
           <Loader2 className="animate-spin text-white" size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Verifying Payment</h2>
        <p className="text-gray-500 font-medium mb-2">Please do not close this window or press back.</p>
        <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Secure Gateway Connection Active</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 font-bold uppercase tracking-wider text-xs group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Checkout
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header Strip */}
        <div className={`${getThemeColor()} p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6`}>
           <div className="flex items-center gap-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                {getLogo()}
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Secure Payment</h2>
                <p className="text-white/70 font-bold text-xs uppercase tracking-widest">Merchant: Tanvir Electronics</p>
              </div>
           </div>
           <div className="text-right">
              <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Total to Pay</p>
              <p className="text-4xl font-black">৳{totalToPay.toLocaleString()}</p>
           </div>
        </div>

        <div className="p-12">
          {order.paymentMethod === 'cod' ? (
            <div className="text-center py-8">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="text-green-500" size={32} />
               </div>
               <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">Confirm Cash on Delivery</h3>
               <p className="text-gray-500 max-w-md mx-auto mb-10">You have selected Cash on Delivery. You will pay the total amount of ৳{totalToPay.toLocaleString()} (including delivery) once your products are delivered to your doorstep.</p>
               <button 
                onClick={handlePay}
                className="bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-black transition-all shadow-xl"
               >
                 Confirm Order Final Step
               </button>
            </div>
          ) : (
            <form onSubmit={handlePay} className="max-w-md mx-auto space-y-8">
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                      {(order.paymentMethod === 'bkash' || order.paymentMethod === 'nagad') ? 'Your Wallet Number' : 'Account Details'}
                    </label>
                    <input 
                      required
                      type="text" 
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-lg text-black"
                    />
                  </div>
                  
                  {(order.paymentMethod === 'bkash' || order.paymentMethod === 'nagad') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Enter PIN</label>
                      <input 
                        required
                        type="password" 
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="****"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-black text-2xl tracking-[1em] text-center text-black"
                      />
                    </div>
                  )}

                  {order.paymentMethod === 'bank' && (
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                       <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Our Bank Account</p>
                       <p className="font-bold text-indigo-900">TANVIR ELECTRONICS LTD</p>
                       <p className="text-sm font-medium text-indigo-700">A/C: 1234 5678 9012</p>
                       <p className="text-xs text-indigo-600">Branch: Gulshan 1, Dhaka</p>
                    </div>
                  )}
               </div>

               <div className="pt-4">
                  <button 
                    type="submit"
                    className={`w-full ${getThemeColor()} text-white py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 shadow-xl`}
                  >
                    <Lock size={18} />
                    Pay Total ৳{totalToPay.toLocaleString()}
                  </button>
               </div>

               <div className="flex flex-col items-center gap-4 pt-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Secure Payment Processing</span>
                  </div>
               </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;

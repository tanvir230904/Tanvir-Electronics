
import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle, Package, Printer, Home } from 'lucide-react';

interface SuccessProps {
  order: OrderDetails;
  onReturnHome: () => void;
}

const Success: React.FC<SuccessProps> = ({ order, onReturnHome }) => {
  const totalPaid = order.subtotal + order.deliveryCharge;
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* Success Banner */}
        <div className="bg-green-500 p-12 text-center text-white relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">Order Confirmed!</h1>
          <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-xs">Thank you for choosing Tanvir Electronics</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Package size={14} /> Order Information
              </h3>
              <div className="space-y-2">
                 <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Order ID</span>
                    <span className="font-bold text-gray-900">{order.orderId}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Order Date</span>
                    <span className="font-bold text-gray-900">{order.orderDate}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Payment Method</span>
                    <span className="font-bold text-amber-600 uppercase text-xs">{order.paymentMethod}</span>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Home size={14} /> Delivery Address
              </h3>
              <div className="bg-gray-50 p-6 rounded-2xl">
                 <p className="font-bold text-gray-900 mb-1">{order.shippingInfo.name}</p>
                 <p className="text-gray-600 text-sm mb-1">{order.shippingInfo.address}</p>
                 <p className="text-gray-600 text-sm font-bold">{order.shippingInfo.city}</p>
                 <p className="text-gray-400 text-xs mt-3 flex items-center gap-2">
                   <Package size={12} /> Next-Day Priority Delivery
                 </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Items Purchased</h3>
            <div className="space-y-4">
               {order.items.map((item, idx) => (
                 <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-sm">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Quantity: {item.quantity}</p>
                    </div>
                    <div className="font-black text-gray-900">
                      ৳{(parseFloat(item.product.price.replace(/[৳,]/g, '')) * item.quantity).toLocaleString()}
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-8 space-y-4 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Delivery Charge (৳100 × {order.items.reduce((a,c)=>a+c.quantity,0)})</span>
                <span className="text-gray-900 font-bold">৳{order.deliveryCharge.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total Amount Paid</span>
                <span className="text-3xl font-black text-amber-500">৳{totalPaid.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <button 
              onClick={onReturnHome}
              className="flex-1 bg-gray-100 text-gray-900 px-8 py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-black transition-all shadow-sm"
             >
               <Home size={18} />
               Back to Home
             </button>
             <button className="flex-1 bg-black text-white px-8 py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl">
               <Printer size={18} />
               Download Invoice
             </button>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
               <Package size={12} />
               Your tech is on the way!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

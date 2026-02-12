
import React from 'react';
import { CartItem } from '../types';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CreditCard, CheckCircle2, Circle } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleSelection: (productId: string) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, onToggleSelection, onContinueShopping, onCheckout }) => {
  const selectedItems = items.filter(item => item.selected);
  
  const calculateSubtotal = () => {
    return selectedItems.reduce((acc, item) => {
      const priceStr = item.product.price.replace(/[৳,]/g, '').trim();
      const price = parseFloat(priceStr);
      return acc + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = selectedItems.reduce((acc, item) => acc + (item.quantity * 100), 0);
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-12 font-medium">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-black transition-all shadow-xl"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
          Your Shopping Cart
        </h1>
        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
          {items.length} Total Items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all relative overflow-hidden">
              {/* Selection Checkbox */}
              <button 
                onClick={() => onToggleSelection(item.product.id)}
                className={`flex-shrink-0 transition-colors ${item.selected ? 'text-amber-500' : 'text-gray-300'}`}
              >
                {item.selected ? <CheckCircle2 size={24} fill="currentColor" className="text-white bg-amber-500 rounded-full" /> : <Circle size={24} />}
              </button>

              <div className="w-24 sm:w-32 aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                <img src={item.product.imageUrl} alt={item.product.name} className={`w-full h-full object-contain transition-all ${!item.selected ? 'grayscale opacity-50' : 'group-hover:scale-105'}`} />
              </div>

              <div className="flex-1 flex flex-col justify-between py-2 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">{item.product.category}</p>
                    <h3 className={`text-lg font-black tracking-tight truncate transition-colors ${item.selected ? 'text-gray-900' : 'text-gray-400'}`}>
                      {item.product.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => onRemove(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-full">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-all text-gray-600"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-all text-gray-600"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className={`font-black text-lg ${item.selected ? 'text-gray-900' : 'text-gray-400'}`}>
                    ৳{(parseFloat(item.product.price.replace(/[৳,]/g, '')) * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={onContinueShopping}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold uppercase tracking-wider text-xs group mt-8"
          >
            <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 sticky top-32">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8 pb-4 border-b border-gray-100">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Selected Subtotal ({selectedItems.length} items)</span>
                <span className="text-gray-900 font-bold">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <div className="flex flex-col">
                   <span>Delivery Charge</span>
                   <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest">৳100 per unit</span>
                </div>
                <span className="text-gray-900 font-bold">৳{deliveryCharge.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-10 pt-4 border-t border-gray-100">
              <span className="text-sm font-black uppercase text-gray-400 tracking-widest">Estimated Total</span>
              <span className="text-4xl font-black text-amber-600">৳{total.toLocaleString()}</span>
            </div>

            <button 
              onClick={onCheckout}
              disabled={selectedItems.length === 0}
              className={`w-full py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl mb-4 ${selectedItems.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-amber-500 hover:text-black'}`}
            >
              <CreditCard size={18} />
              Checkout {selectedItems.length > 0 ? `(৳${total.toLocaleString()})` : ''}
            </button>
            
            <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-tighter">
              Fast door-to-door delivery within 48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

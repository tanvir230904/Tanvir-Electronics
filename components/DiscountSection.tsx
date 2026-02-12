
import React from 'react';
import { Product } from '../types';
import { ArrowLeft, Tag, ShoppingCart, CreditCard, Sparkles } from 'lucide-react';

interface DiscountSectionProps {
  products: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({ products, onBack, onProductClick, onAddToCart }) => {
  const discountedProducts = products.filter(p => p.discountPrice).slice(0, 25);

  const calculateDiscountPercentage = (currentPrice: string, originalPrice: string) => {
    const current = parseFloat(currentPrice.replace(/[৳,]/g, '').trim());
    const original = parseFloat(originalPrice.replace(/[৳,]/g, '').trim());
    if (isNaN(current) || isNaN(original) || original === 0) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 font-bold uppercase tracking-wider text-xs group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Categories
      </button>

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-red-500 text-white p-2 rounded-xl">
               <Tag size={20} />
             </div>
             <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
               Special Offers
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">
            Discounted Products
          </h1>
          <p className="text-gray-500 mt-2 font-medium max-w-2xl">
            Grab your favorite tech at unbeatable prices. Showing our top {discountedProducts.length} premium deals with official warranty and lifetime support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {discountedProducts.map((product, idx) => {
          const discountPct = product.discountPrice 
            ? calculateDiscountPercentage(product.price, product.discountPrice) 
            : 0;

          return (
            <div 
              key={product.id || idx} 
              className="bg-white group rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer relative"
              onClick={() => onProductClick(product)}
            >
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-red-600 text-white px-3 py-2 rounded-2xl text-xs font-black shadow-xl animate-bounce">
                  -{discountPct}%
                </div>
              </div>

              <div className="absolute top-6 left-6 z-10">
                <div className="bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 border border-white/10">
                  <Sparkles size={12} className="text-amber-400" />
                  Save Big
                </div>
              </div>

              <div className="aspect-square bg-gray-50 relative overflow-hidden p-6">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">{product.category}</p>
                <h3 className="font-black text-xl text-gray-900 mb-2 tracking-tight group-hover:text-amber-600 transition-colors leading-tight">{product.name}</h3>
                
                <div className="flex items-center gap-3 mb-6">
                   <span className="text-2xl font-black text-red-600">{product.price}</span>
                   {product.discountPrice && (
                      <span className="text-sm font-bold text-gray-400 line-through">{product.discountPrice}</span>
                   )}
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{product.description}</p>
                
                <div className="flex flex-col gap-3 pt-6 border-t border-gray-50">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                    className="w-full bg-black text-white py-3.5 font-bold text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all active:scale-95 flex items-center justify-center gap-2 rounded-full"
                  >
                    <CreditCard size={14} />
                    Buy Now
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="w-full bg-white text-black border border-gray-200 py-3.5 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2 rounded-full"
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscountSection;

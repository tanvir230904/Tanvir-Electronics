
import React from 'react';
import { Category, Product } from '../types';
import { Check, Truck, RotateCcw, PhoneCall, ArrowRight, Tag, Percent } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  products: Product[];
  onCategoryClick: (categoryName: string) => void;
  onDiscountClick: () => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, products, onCategoryClick, onDiscountClick }) => {
  const features = [
    { 
      icon: <Check className="text-amber-500" />, 
      title: "Quality Product",
      subText: "Best Quality Product"
    },
    { 
      icon: <Truck className="text-amber-500" />, 
      title: "Free Shipping",
      subText: "Free shipping on 1st order" 
    },
    { icon: <RotateCcw className="text-amber-500" />, title: "14-Day Return" },
    { icon: <PhoneCall className="text-amber-500" />, title: "24/7 Support" },
  ];

  const totalDiscounted = products.filter(p => p.discountPrice).length;
  const discountedDisplayCount = Math.min(totalDiscounted, 25);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Features Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white p-6 flex items-center gap-4 shadow-sm rounded-2xl border border-gray-100 hover:shadow-md transition-all">
            <div className="text-2xl">{feature.icon}</div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-lg">{feature.title}</span>
              {feature.subText && (
                <span className="text-[10px] font-medium text-blue-400 mt-0.5">{feature.subText}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 uppercase">
            Browse Collections
          </h2>
          <p className="text-gray-500 font-medium mt-1">Select a category to explore premium devices.</p>
        </div>
        
        <button 
          onClick={onDiscountClick}
          className="group flex items-center gap-4 bg-amber-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all shadow-xl active:scale-95"
        >
          <div className="bg-white/20 p-2 rounded-lg group-hover:bg-amber-500 transition-colors">
            <Percent size={16} />
          </div>
          <span>View Discounted Products</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Modern Visual Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div 
            key={category.id} 
            onClick={() => onCategoryClick(category.name)}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
          >
            <img 
              src={category.imageUrl} 
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <div className="flex items-center justify-between mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                   <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                    {category.productCount} Items
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium line-clamp-1">
                Explore latest {category.name} models...
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div 
          onClick={onDiscountClick}
          className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            alt="Big Discount Promotion"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-600/40 to-transparent flex flex-col items-start justify-center text-white p-8 md:p-16">
            <div className="flex items-center gap-3 mb-6 animate-pulse">
              <div className="bg-white text-red-600 p-2 rounded-xl">
                <Tag size={20} />
              </div>
              <span className="font-black uppercase tracking-widest text-xs md:text-sm">Limited Time Flash Sale</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black mb-4 uppercase leading-none tracking-tighter">
              SAVE UP TO 50% <br/><span className="text-white/70">ON TOP TECH</span>
            </h3>
            <p className="text-white/90 mb-8 max-w-md font-bold text-sm md:text-lg">Discover {discountedDisplayCount} curated premium products at exclusive member-only prices.</p>
            <button 
              className="bg-white text-black font-black uppercase tracking-widest text-[10px] px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all shadow-xl"
            >
              Shop All Offers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

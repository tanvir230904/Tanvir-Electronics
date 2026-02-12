
import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Product } from '../types';
import { Loader2, ExternalLink, ArrowLeft, Sparkles, ShoppingCart, CreditCard, Tag, Search as SearchIcon } from 'lucide-react';

interface CategoryDetailProps {
  title: string;
  allProducts: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isSearch?: boolean;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ title, allProducts, onBack, onProductClick, onAddToCart, isSearch = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      if (isSearch) {
        setLoading(true);
        const data = await geminiService.getProductsFromInternet(title);
        setProducts(data.products);
        setSources(data.sources);
        setLoading(false);
      } else {
        const filtered = allProducts.filter(p => p.category.toLowerCase() === title.toLowerCase());
        setProducts(filtered);
        setSources([]);
        setLoading(false);
      }
    };
    loadContent();
  }, [title, isSearch, allProducts]);

  const calculateDiscountPercentage = (currentPrice: string, originalPrice: string) => {
    const current = parseFloat(currentPrice.replace(/[৳,]/g, '').trim());
    const original = parseFloat(originalPrice.replace(/[৳,]/g, '').trim());
    if (isNaN(current) || isNaN(original) || original === 0) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const handleDeepSearch = async () => {
    setLoading(true);
    const data = await geminiService.getProductsFromInternet(title);
    setProducts(data.products);
    setSources(data.sources);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold uppercase tracking-wider text-xs group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {isSearch ? "Exit Search" : "Back to Gallery"}
        </button>
        {isSearch && (
          <div className="h-4 w-[1px] bg-gray-300" />
        )}
        {isSearch && (
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <SearchIcon size={12} />
            Search Mode
          </div>
        )}
      </div>

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">
            {isSearch ? `Results: ${title}` : title}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            {isSearch ? `Showing AI-curated matches for your query.` : `Explore our premium selection of ${title} products.`}
          </p>
        </div>
        
        {!isSearch && (
          <button 
            onClick={handleDeepSearch}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-full text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-all shadow-sm active:scale-95"
          >
            <Sparkles size={14} className="animate-pulse" />
            AI Catalog Search
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="animate-spin text-amber-500" size={48} />
          <p className="text-gray-400 font-bold animate-pulse">
            {isSearch ? "Searching the global market..." : "Expanding our catalog with AI..."}
          </p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
               <p className="text-gray-400 font-bold mb-6">No products found in this collection yet.</p>
               <button 
                onClick={handleDeepSearch}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all"
               >
                 Search Global Market
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, idx) => (
                <div 
                  key={product.id || idx} 
                  className="bg-white group rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer relative"
                  onClick={() => onProductClick(product)}
                >
                  {product.discountPrice && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                        <Tag size={10} />
                        -{calculateDiscountPercentage(product.price, product.discountPrice)}%
                      </div>
                    </div>
                  )}

                  <div className="aspect-square bg-gray-50 relative overflow-hidden p-6">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">{product.category}</p>
                    <h3 className="font-black text-xl text-gray-900 mb-3 tracking-tight group-hover:text-amber-600 transition-colors leading-tight">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-black text-gray-900">{product.price}</span>
                      {product.discountPrice && (
                        <span className="text-xs font-bold text-gray-400 line-through">{product.discountPrice}</span>
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
              ))}
            </div>
          )}

          {sources.length > 0 && (
            <div className="mt-20 p-10 bg-gray-50 rounded-3xl border border-gray-200">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <ExternalLink size={14} />
                Market Insights & References
              </h4>
              <div className="flex flex-wrap gap-4">
                {sources.map((chunk, idx) => (
                  chunk.web && (
                    <a 
                      key={idx} 
                      href={chunk.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-gray-600 hover:text-amber-600 hover:border-amber-500 bg-white px-5 py-3 rounded-full border border-gray-200 transition-all shadow-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      {chunk.web.title || "Reference Source"}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryDetail;

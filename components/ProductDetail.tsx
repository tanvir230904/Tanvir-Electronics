
import React, { useState } from 'react';
import { Product, Review } from '../types';
import { ArrowLeft, ShoppingCart, CreditCard, Star, ShieldCheck, Truck, RotateCcw, Tag, MessageSquare, Send, User, Calendar } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(product.imageUrl);
  const [reviews, setReviews] = useState<Review[]>(product.reviews || [
    { id: '1', userName: 'Rahat Hasan', rating: 5, comment: 'Excellent product! The build quality is amazing.', date: '12 Jan 2025' },
    { id: '2', userName: 'Anika Tabassum', rating: 4, comment: 'Very fast delivery and the product is genuine.', date: '05 Feb 2025' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const gallery = product.images || [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl];

  const calculateDiscountPercentage = (currentPrice: string, originalPrice: string) => {
    const current = parseFloat(currentPrice.replace(/[৳,]/g, '').trim());
    const original = parseFloat(originalPrice.replace(/[৳,]/g, '').trim());
    if (isNaN(current) || isNaN(original) || original === 0) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const review: Review = {
      id: Date.now().toString(),
      userName: 'Valued Customer',
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    
    setReviews([review, ...reviews]);
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 font-bold uppercase tracking-wider text-xs group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Product Image Section */}
        <div className="space-y-6">
          <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 p-8 flex items-center justify-center animate-in fade-in zoom-in duration-500 relative">
            {product.discountPrice && (
              <div className="absolute top-8 left-8 z-10">
                <div className="bg-red-600 text-white px-5 py-2 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl border-2 border-white/20">
                  Save {calculateDiscountPercentage(product.price, product.discountPrice)}%
                </div>
              </div>
            )}
            <img 
              src={activeImage} 
              alt={product.name}
              className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {gallery.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all p-2 ${activeImage === img ? 'border-amber-500 shadow-md scale-105' : 'border-transparent hover:border-gray-200'}`}
                >
                   <img src={img} alt={`Angle ${i+1}`} className="w-full h-full object-contain" />
                </div>
             ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-4">
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <span className="text-gray-400 text-xs font-bold ml-1">({reviews.length} Reviews)</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-none">
            {product.name}
          </h1>

          <div className="mb-8">
            <div className="text-4xl font-black text-amber-600 flex items-baseline gap-2">
              <span className="text-2xl">৳</span>
              {product.price.replace('৳', '').trim()}
            </div>
            {product.discountPrice && (
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold text-gray-400 line-through">{product.discountPrice}</span>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1">
                  <Tag size={12} />
                  Exclusive Discount
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-lg mb-12 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="flex flex-col sm:row gap-4 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="flex-1 bg-black text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-black transition-all active:scale-95 shadow-xl">
                  <CreditCard size={18} />
                  Buy Now
                </button>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-white text-black border-2 border-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-xl text-amber-600"><Truck size={20} /></div>
              <div>
                <p className="font-bold text-xs uppercase text-gray-800">Fast Delivery</p>
                <p className="text-[10px] text-gray-500">48-Hour Priority</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-xl text-amber-600"><RotateCcw size={20} /></div>
              <div>
                <p className="font-bold text-xs uppercase text-gray-800">Easy Returns</p>
                <p className="text-[10px] text-gray-500">14-day policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-xl text-amber-600"><ShieldCheck size={20} /></div>
              <div>
                <p className="font-bold text-xs uppercase text-gray-800">Tanvir Guard</p>
                <p className="text-[10px] text-gray-500">Official Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Product Details & Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-gray-200 pt-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Detailed Description */}
          <section>
             <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
               Detailed Specifications & Use
             </h2>
             <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                <p className="leading-relaxed">
                  This {product.name} is engineered for the modern user who demands both aesthetics and performance. 
                  Whether you're professional creator or an everyday tech enthusiast, this device integrates seamlessly into your digital ecosystem.
                </p>
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                   <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4">Manufacturer Statement</h4>
                   <p className="italic text-gray-500 leading-relaxed">
                     "We believe in pushing the boundaries of what electronic hardware can achieve. The {product.name} represents our commitment to durability, intelligence, and beautiful design. Exclusively verified for the Tanvir Electronics catalog."
                   </p>
                </div>
                {product.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                        <span className="font-bold text-sm text-gray-800">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </section>

          {/* Comment/Review Section */}
          <section id="reviews">
             <div className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                 <MessageSquare size={24} className="text-amber-500" />
                 Customer Reviews
               </h2>
               <div className="text-xs font-black uppercase tracking-widest text-gray-400">
                 {reviews.length} Verified Opinions
               </div>
             </div>

             {/* Add Review Form */}
             <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-12">
               <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-gray-900">Add Your Feedback</h3>
               <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rate This Product:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button 
                          key={s} 
                          type="button"
                          onClick={() => setNewRating(s)}
                          className={`transition-colors ${newRating >= s ? 'text-amber-500' : 'text-gray-200 hover:text-amber-200'}`}
                        >
                          <Star size={20} fill="currentColor" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <textarea 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 focus:bg-white transition-all min-h-[120px] font-medium text-black resize-none pr-16"
                    />
                    <button 
                      type="submit"
                      className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-xl hover:bg-amber-500 hover:text-black transition-all shadow-lg active:scale-95"
                    >
                      <Send size={18} />
                    </button>
                  </div>
               </form>
             </div>

             {/* Review List */}
             <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:border-amber-200 transition-colors group">
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
                           <User size={20} />
                         </div>
                         <div>
                           <p className="font-bold text-gray-900 text-sm">{review.userName}</p>
                           <div className="flex text-amber-500">
                             {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                           </div>
                         </div>
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                         <Calendar size={12} />
                         {review.date}
                       </div>
                     </div>
                     <p className="text-gray-600 text-sm leading-relaxed pl-13">
                       "{review.comment}"
                     </p>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Technical Specs Sidebar */}
        <aside className="space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32">
              <h3 className="font-black text-sm uppercase tracking-widest mb-8 text-black border-b border-gray-50 pb-4">
                Technical Blueprint
              </h3>
              <div className="space-y-4">
                 {product.specs && Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-1 border-b border-gray-50 pb-3">
                      <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{key}</span>
                      <span className="text-sm font-bold text-gray-800">{value}</span>
                    </div>
                 ))}
                 <div className="pt-6">
                   <div className="flex items-center gap-3 text-green-600 mb-4">
                     <ShieldCheck size={18} />
                     <span className="text-xs font-black uppercase tracking-widest">Quality Inspected</span>
                   </div>
                   <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                     Every product in our catalog undergoes rigorous testing by Tanvir's technical specialists to ensure it meets our flagship performance standards.
                   </p>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductDetail;

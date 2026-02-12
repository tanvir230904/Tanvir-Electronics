
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import CategoryDetail from './components/CategoryDetail';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Success from './components/Success';
import DiscountSection from './components/DiscountSection';
import Account from './components/Account';
import Features from './components/Features';
import TechnicianSection from './components/TechnicianSection';
import { AppView, Product, CartItem, OrderDetails, PaymentMethod, User, Category, Technician } from './types';
import { supabase } from './lib/supabase';
import { CATEGORIES, PRODUCTS } from './constants';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [previousView, setPreviousView] = useState<AppView>(AppView.LANDING);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const [dbCategories, setDbCategories] = useState<Category[]>(CATEGORIES);
  const [dbProducts, setDbProducts] = useState<Product[]>(PRODUCTS);
  const [dbTechnicians, setDbTechnicians] = useState<Technician[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  // Handle saving cart to DB
  const saveCartToDb = async (newCart: CartItem[], userId: string) => {
    try {
      // Clean delete and insert for reliable sync
      await supabase.from('cart_items').delete().eq('user_id', userId);
      const itemsToInsert = newCart.map(item => ({
        user_id: userId,
        product_id: item.product.id,
        quantity: item.quantity,
        selected: item.selected
      }));
      if (itemsToInsert.length > 0) {
        await supabase.from('cart_items').insert(itemsToInsert);
      }
    } catch (e) {
      console.error("Failed to persist cart to Supabase:", e);
    }
  };

  // Initial App Load: Session + Catalog
  useEffect(() => {
    const bootApp = async () => {
      try {
        // 1. Get Session
        const { data: { session } } = await supabase.auth.getSession();
        let currentUser: User | null = null;

        if (session?.user) {
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          currentUser = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.full_name || 'Tanvir User',
            phone: profile?.phone || '',
            address: profile?.address || '',
            createdAt: profile?.created_at || new Date().toISOString()
          };
          setUser(currentUser);
        }

        // 2. Fetch Catalog
        const [catRes, prodRes, techRes] = await Promise.all([
          supabase.from('categories').select('*'),
          supabase.from('products').select('*'),
          supabase.from('technicians').select('*')
        ]);

        const categories = catRes.data?.length ? catRes.data.map(c => ({
          id: c.id, name: c.name, imageUrl: c.image_url, icon: c.icon_name, productCount: c.product_count
        })) : CATEGORIES;

        const products = prodRes.data?.length ? prodRes.data.map(p => ({
          id: p.id, name: p.name, price: p.price, discountPrice: p.discount_price,
          category: p.category_name, description: p.description, imageUrl: p.image_url,
          images: p.images || [], features: p.features || [], specs: p.specs || {}, reviews: []
        })) : PRODUCTS;

        setDbCategories(categories);
        setDbProducts(products);
        if (techRes.data) {
          setDbTechnicians(techRes.data.map(t => ({
            id: t.id, name: t.name, specialty: t.specialty, experience: t.experience,
            phone: t.phone, email: t.email, facebookUrl: t.facebook_url, imageUrl: t.image_url,
            rating: t.rating, completedJobs: t.completed_jobs
          })));
        }

        // 3. Load User Cart if logged in
        if (currentUser) {
          const { data: dbCart } = await supabase.from('cart_items').select('*').eq('user_id', currentUser.id);
          if (dbCart) {
            const mergedCart = dbCart.map(item => {
              const product = products.find(p => p.id === item.product_id);
              return product ? { product, quantity: item.quantity, selected: item.selected } : null;
            }).filter(Boolean) as CartItem[];
            setCart(mergedCart);
          }
        }
      } catch (err) {
        console.error("Tanvir Elect Boot Error:", err);
      } finally {
        setIsSyncing(false);
      }
    };
    bootApp();
  }, []);

  const navigateTo = (view: AppView) => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      const next = existing 
        ? prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { product, quantity: 1, selected: true }];
      
      if (user) saveCartToDb(next, user.id);
      return next;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => {
      const next = prev.filter(item => item.product.id !== productId);
      if (user) saveCartToDb(next, user.id);
      return next;
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => {
      const next = prev.map(item => item.product.id === productId ? { ...item, quantity } : item);
      if (user) saveCartToDb(next, user.id);
      return next;
    });
  };

  const handleToggleSelection = (productId: string) => {
    setCart(prev => {
      const next = prev.map(item => item.product.id === productId ? { ...item, selected: !item.selected } : item);
      if (user) saveCartToDb(next, user.id);
      return next;
    });
  };

  const handleUserUpdate = (newUser: User | null) => {
    setUser(newUser);
    if (!newUser) {
      setCart([]); // Clear state for security on logout
      supabase.auth.signOut();
      navigateTo(AppView.LANDING);
    }
  };

  if (isSyncing) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
        <div className="relative">
          <div className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center animate-bounce mb-8 shadow-2xl">
            <div className="w-12 h-12 bg-white rounded-lg rotate-45" />
          </div>
          <Loader2 className="absolute -bottom-4 -right-4 text-amber-500 animate-spin" size={40} />
        </div>
        <h2 className="text-2xl font-black tracking-tighter text-black uppercase animate-pulse">Tanvir Elect</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Initializing Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-amber-500 selection:text-black pb-20">
      <Navbar 
        onLogoClick={() => navigateTo(AppView.LANDING)} 
        onShopClick={() => navigateTo(AppView.CATEGORIES)} 
        onSearch={(q) => { setSelectedCategory(q); navigateTo(AppView.SEARCH_RESULTS); }}
        onCartClick={() => navigateTo(AppView.CART)}
        onAccountClick={() => navigateTo(AppView.ACCOUNT)}
        onFeaturesClick={() => navigateTo(AppView.FEATURES)}
        onTechnicianClick={() => navigateTo(AppView.TECHNICIANS)}
        cartCount={cartCount}
        user={user}
      />
      
      <main className="pt-24 min-h-[70vh]">
        {currentView === AppView.LANDING && <Hero onGetStarted={() => navigateTo(AppView.CATEGORIES)} />}
        {currentView === AppView.CATEGORIES && <CategoryGrid categories={dbCategories} products={dbProducts} onCategoryClick={(c) => { setSelectedCategory(c); navigateTo(AppView.CATEGORY_DETAIL); }} onDiscountClick={() => navigateTo(AppView.DISCOUNTS)} />}
        {currentView === AppView.FEATURES && <Features onExplore={() => navigateTo(AppView.CATEGORIES)} />}
        {currentView === AppView.TECHNICIANS && <TechnicianSection technicians={dbTechnicians} />}
        {currentView === AppView.DISCOUNTS && <DiscountSection products={dbProducts} onBack={() => navigateTo(AppView.CATEGORIES)} onProductClick={(p) => { setSelectedProduct(p); navigateTo(AppView.PRODUCT_DETAIL); }} onAddToCart={handleAddToCart} />}
        {currentView === AppView.ACCOUNT && <Account user={user} onUpdate={handleUserUpdate} />}
        {(currentView === AppView.CATEGORY_DETAIL || currentView === AppView.SEARCH_RESULTS) && <CategoryDetail title={selectedCategory} allProducts={dbProducts} onBack={() => navigateTo(AppView.CATEGORIES)} onProductClick={(p) => { setSelectedProduct(p); navigateTo(AppView.PRODUCT_DETAIL); }} onAddToCart={handleAddToCart} isSearch={currentView === AppView.SEARCH_RESULTS} />}
        {currentView === AppView.PRODUCT_DETAIL && selectedProduct && <ProductDetail product={selectedProduct} onBack={() => navigateTo(AppView.CATEGORIES)} onAddToCart={handleAddToCart} />}
        {currentView === AppView.CART && <Cart items={cart} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} onToggleSelection={handleToggleSelection} onContinueShopping={() => navigateTo(AppView.CATEGORIES)} onCheckout={() => navigateTo(user ? AppView.CHECKOUT : AppView.ACCOUNT)} />}
        {currentView === AppView.CHECKOUT && <Checkout items={cart.filter(item => item.selected)} onBack={() => navigateTo(AppView.CART)} onCheckoutSubmit={(s, p) => { setCurrentOrder({ items: cart.filter(i => i.selected), subtotal: 0, deliveryCharge: 0, userId: user!.id, shippingInfo: s, paymentMethod: p, orderId: `TE-${Date.now()}`, orderDate: new Date().toLocaleDateString() }); navigateTo(AppView.PAYMENT); }} user={user} />}
        {currentView === AppView.PAYMENT && currentOrder && <Payment order={currentOrder} onBack={() => navigateTo(AppView.CHECKOUT)} onSuccess={() => { setCart(prev => prev.filter(i => !i.selected)); navigateTo(AppView.SUCCESS); }} />}
        {currentView === AppView.SUCCESS && currentOrder && <Success order={currentOrder} onReturnHome={() => navigateTo(AppView.LANDING)} />}
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-gray-200 mt-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter text-black uppercase">Tanvir Elect</h2>
            <p className="text-gray-500 mt-2">Quality Tech for the Revolution.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Facebook</a>
          </div>
          <div className="text-sm text-gray-400">© 2025 Tanvir Elect.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;

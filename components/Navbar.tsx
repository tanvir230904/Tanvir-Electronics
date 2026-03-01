
import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User as UserIcon, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  onLogoClick: () => void;
  onShopClick: () => void;
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onAccountClick: () => void;
  onFeaturesClick: () => void;
  onTechnicianClick: () => void;
  onComplainClick: () => void;
  onTechAIClick: () => void;
  cartCount: number;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onLogoClick, onShopClick, onSearch, onCartClick, 
  onAccountClick, onFeaturesClick, onTechnicianClick, onComplainClick, onTechAIClick, cartCount, user 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="w-full max-w-7xl bg-glass border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-sm relative">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          <span className="font-extrabold text-xl tracking-tighter text-black uppercase">TANVIR ELECT</span>
        </div>

        {/* Regular Menu */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600 ${isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}>
          <button onClick={onLogoClick} className="hover:text-black transition-colors">Home</button>
          <button onClick={onFeaturesClick} className="hover:text-black transition-colors">Features</button>
          <button onClick={onShopClick} className="hover:text-black transition-colors">Shop</button>
          <button onClick={onTechnicianClick} className="hover:text-black transition-colors">Support</button>
          <button onClick={onComplainClick} className="hover:text-black transition-colors">Complain</button>
          <button onClick={onTechAIClick} className="hover:text-black transition-colors flex items-center gap-1.5">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            AI Assistant
          </button>
          <button onClick={onAccountClick} className={`transition-colors ${user ? 'text-amber-600 font-bold' : 'hover:text-black'}`}>
            {user ? 'My Profile' : 'Sign Up'}
          </button>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <form 
            onSubmit={handleSearchSubmit}
            className="absolute inset-0 flex items-center px-6 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-1">
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors mr-1 text-black flex items-center justify-center"
              >
                <ArrowLeft size={18} />
              </button>
              <Search size={18} className="text-black mx-1" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search products from the internet..." 
                className="bg-transparent border-none outline-none w-full px-2 py-2 text-sm font-medium text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => {
                  if (searchQuery) {
                    setSearchQuery('');
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors text-black ml-1"
              >
                <X size={18} />
              </button>
            </div>
          </form>
        )}

        <div className={`flex items-center gap-2 sm:gap-4 ${isSearchOpen ? 'opacity-0' : ''}`}>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block text-black"
          >
            <Search size={20} />
          </button>
          
          <button 
            onClick={onAccountClick}
            className={`p-2 rounded-full transition-colors flex items-center justify-center border-2 ${user ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-transparent border-transparent hover:bg-black/5 text-black'}`}
          >
            <UserIcon size={20} />
          </button>

          <button 
            onClick={onCartClick}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors relative"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Cart ({cartCount})</span>
            {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 bg-amber-500 text-black w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black border-2 border-white sm:hidden">
                 {cartCount}
               </span>
            )}
          </button>
          <button className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors text-black">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import {
  Code2,
  Search,
  Heart,
  ShoppingBag,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useMarket, COUNTRIES } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';
import { Currency } from '../../types';

interface PublicHeaderProps {
  onOpenMobileMenu: () => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    country,
    setCurrency,
    cart,
    wishlist,
    currentView,
    setCurrentView,
    selectedProduct,
    setSelectedProduct,
    selectedCategorySlug,
    setSelectedCategorySlug,
    setIsCartOpen,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
  } = useMarket();

  const { customerUser, isCustomerAuthenticated, customerLogout } = useAuth();
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleNavClick = (view: string, categorySlug: string | null = null) => {
    setSelectedProduct(null);
    setSelectedCategorySlug(categorySlug);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedProduct(null);
      setCurrentView('browse');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all w-full max-w-full overflow-hidden">
      {/* 1. Announcement Trust Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-900 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-medium text-slate-200 text-[11px] sm:text-xs truncate">Production Verified Codebase</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">Instant ZIP Download & Lifetime Licenses</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
            <span className="hidden md:inline">24/7 Developer Support</span>
            <span>SSLCommerz & Razorpay Protected</span>
          </div>
        </div>
      </div>

      {/* 2. Main Public Header (Strict 3-zone contract, ZERO admin info) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 sm:gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105 shrink-0">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                Code<span className="text-indigo-600">Market</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Public Navigation Links (Single-line, no badges, quiet hover) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-slate-950 ${
              currentView === 'home' ? 'text-slate-950 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('browse')}
            className={`transition-colors hover:text-slate-950 ${
              currentView === 'browse' && !selectedCategorySlug ? 'text-slate-950 font-semibold' : ''
            }`}
          >
            Browse Code
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`transition-colors hover:text-slate-950 ${
              currentView === 'categories' ? 'text-slate-950 font-semibold' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => handleNavClick('offers')}
            className={`transition-colors hover:text-slate-950 ${
              currentView === 'offers' ? 'text-slate-950 font-semibold' : ''
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-slate-950 ${
              currentView === 'about' ? 'text-slate-950 font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('support')}
            className={`transition-colors hover:text-slate-950 ${
              currentView === 'support' ? 'text-slate-950 font-semibold' : ''
            }`}
          >
            Support
          </button>
        </nav>

        {/* Zone 3: Customer Actions (Search, Country, Wishlist, Cart, Account) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Search */}
          <div className="relative">
            <div className="hidden md:flex items-center relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search scripts, stacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 lg:w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-100/90 border border-slate-200/90 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:w-64 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </form>
            </div>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Country / Currency Selector (Bangladesh BDT vs India INR) */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              title="Select Country & Currency"
            >
              <span className="text-sm sm:text-base leading-none">{country.flag}</span>
              <span className="font-semibold tracking-tight text-[11px] sm:text-xs">{country.currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {isCurrencyDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Country / Currency
                </div>
                {(Object.keys(COUNTRIES) as Currency[]).map((cKey) => {
                  const item = COUNTRIES[cKey];
                  const isSelected = item.currency === country.currency;
                  return (
                    <button
                      key={cKey}
                      onClick={() => {
                        setCurrency(cKey);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                        isSelected
                          ? 'bg-indigo-50/70 text-indigo-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.flag}</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-mono text-slate-500 font-medium">
                        {item.currency} ({item.symbol})
                      </span>
                    </button>
                  );
                })}
                <div className="px-3 pt-2 pb-1 text-[10px] text-slate-400 border-t border-slate-100">
                  Auto gateway: {country.currency === 'BDT' ? 'SSLCommerz (bKash/Cards)' : 'Razorpay (UPI/Cards)'}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button: hidden on small screens (< sm), available in drawer */}
          <button
            onClick={() => handleNavClick('browse')}
            className="hidden sm:flex p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative transition-colors shrink-0"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Customer Account & Login Button */}
          <div className="relative shrink-0">
            {isCustomerAuthenticated && customerUser ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1 sm:gap-2 px-1.5 sm:pl-2 sm:pr-2.5 py-1 sm:py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] sm:text-[11px] flex items-center justify-center font-bold shrink-0">
                    {customerUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[65px] truncate hidden sm:inline">{customerUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500 hidden sm:block" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-xs border-b border-slate-100">
                      <p className="font-semibold text-slate-900 truncate">{customerUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{customerUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setCurrentView('account');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      My Purchases & Downloads
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setCurrentView('account');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      License Keys
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        customerLogout();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar if toggled */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-100">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search scripts, full-stack stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      )}
    </header>
  );
};

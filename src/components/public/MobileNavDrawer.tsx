import React from 'react';
import { X, Code2, Globe, Heart, ShoppingBag, User, LogOut, ChevronRight } from 'lucide-react';
import { useMarket, COUNTRIES } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';
import { Currency } from '../../types';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const {
    country,
    setCurrency,
    categories,
    setCurrentView,
    setSelectedCategorySlug,
    setSelectedProduct,
    wishlist,
    cart,
    setIsCartOpen,
    setIsAuthModalOpen,
  } = useMarket();

  const { customerUser, isCustomerAuthenticated, customerLogout } = useAuth();

  if (!isOpen) return null;

  const navigateTo = (view: string, categorySlug: string | null = null) => {
    setSelectedProduct(null);
    setSelectedCategorySlug(categorySlug);
    setCurrentView(view);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-slate-900 text-lg">
              Code<span className="text-indigo-600">Market</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Card */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          {isCustomerAuthenticated && customerUser ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{customerUser.name}</p>
                <p className="text-xs text-slate-500">{customerUser.email}</p>
              </div>
              <button
                onClick={() => {
                  customerLogout();
                  onClose();
                }}
                className="text-xs text-rose-600 font-medium hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-600">Welcome to CodeMarket</p>
              <button
                onClick={() => {
                  onClose();
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Customer Sign In
              </button>
            </div>
          )}
        </div>

        {/* Navigation items (Strictly Customer-facing, ZERO admin elements) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Explore Storefront
            </p>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('home')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('browse')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
              >
                Browse All Source Code
              </button>
              <button
                onClick={() => navigateTo('categories')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
              >
                Categories
              </button>
              <button
                onClick={() => navigateTo('offers')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
              >
                Pricing & Special Offers
              </button>
              <button
                onClick={() => navigateTo('about')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
              >
                About CodeMarket
              </button>
              <button
                onClick={() => navigateTo('support')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
              >
                Customer Support
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Top Categories
            </p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigateTo('browse', cat.slug)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  <span>{cat.name}</span>
                  <span className="text-slate-400 text-[11px] font-mono">{cat.productCount} scripts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customer Shortcuts */}
          {isCustomerAuthenticated && (
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                My Account
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => navigateTo('account')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50"
                >
                  <span>My Purchases & Downloads</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Country / Currency Selection */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Country & Currency
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(COUNTRIES) as Currency[]).map((cKey) => {
                const item = COUNTRIES[cKey];
                const isSelected = item.currency === country.currency;
                return (
                  <button
                    key={cKey}
                    onClick={() => {
                      setCurrency(cKey);
                    }}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs border transition-colors ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.currency}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              {country.name} · Checkout with {country.gateway}
            </p>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>© 2026 CodeMarket</span>
          <span>Verified Digital Code</span>
        </div>
      </div>
    </div>
  );
};

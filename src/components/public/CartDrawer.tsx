import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    country,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useMarket();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.prices[country.currency].current;
    const multiplier = item.selectedLicense === 'Extended Commercial' ? 2.5 : 1;
    return acc + Math.round(unitPrice * multiplier) * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon
    ? Math.round((rawSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Your Cart</h2>
            <span className="text-xs font-mono text-slate-500">
              ({cart.reduce((a, c) => a + c.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <p className="text-sm font-semibold text-slate-800 mb-1">Your cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Explore production-ready boilerplates and developer source code packages.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const unitPrice = item.product.prices[country.currency].current;
              const multiplier = item.selectedLicense === 'Extended Commercial' ? 2.5 : 1;
              const itemTotal = Math.round(unitPrice * multiplier) * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedLicense}`}
                  className="flex gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 object-cover rounded-lg shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.selectedLicense} License · {item.product.version}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                        {formatPrice(itemTotal)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-3">
            {/* Promo code form */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Promo '{appliedCoupon.code}' Applied ({appliedCoupon.discountPercent}% OFF)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-emerald-700 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. DEV20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total ({country.currency})</span>
                <span className="font-mono tabular-nums">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Checkout via {country.gateway} ({country.name})</span>
            </div>

            {/* Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

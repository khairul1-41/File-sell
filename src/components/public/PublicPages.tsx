import React from 'react';
import { ArrowLeft, Tag, ShieldCheck, Mail, MessageSquare, LifeBuoy, FileCode } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { ProductCard } from './ProductCard';

export const BrowsePage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategorySlug,
    setSelectedCategorySlug,
    searchQuery,
    setSearchQuery,
    formatPrice,
    country,
  } = useMarket();

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      !selectedCategorySlug ||
      p.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === selectedCategorySlug;

    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Digital Source Code
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Displaying production-ready source code with regional {country.currency} pricing for {country.name}.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategorySlug(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                !selectedCategorySlug
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              All Packages ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategorySlug(c.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategorySlug === c.slug
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Filtering for: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 hover:underline font-semibold cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-base font-bold text-slate-800 mb-1">No source code matching criteria</p>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategorySlug(null);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const OffersPage: React.FC = () => {
  const { coupons } = useMarket();

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Exclusive Developer Discounts
          </p>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Active Marketplace Coupons & Pricing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Apply these coupon codes during checkout with SSLCommerz (BDT) or Razorpay (INR).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons.filter((c) => c.isActive).map((c) => (
            <div key={c.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                  {c.code}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {c.discountPercent}% OFF
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Minimum spend: BDT ৳{c.minSpend.BDT.toLocaleString()} or INR ₹{c.minSpend.INR.toLocaleString()}.
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Valid until {c.validUntil} · Perpetual commercial license included
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
            Our Mission
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            About CodeMarket
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            CodeMarket is a dedicated source-code distribution marketplace for high-performance engineering teams, indie founders, and agency developers across Bangladesh, India, and global markets.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Unlike generic script marketplaces cluttered with deprecated code and mock templates, every codebase on CodeMarket undergoes rigorous automated and manual validation. We verify dependency security, build scripts, database schemas, and clean architectural separation.
          </p>
          <p>
            We take regional commerce seriously: through our certified partnerships with SSLCommerz (supporting bKash, Nagad, and local cards in Bangladesh) and Razorpay (supporting UPI and NetBanking in India), local builders can checkout instantly in their domestic currency with zero bank foreign transaction surcharges.
          </p>
        </div>
      </div>
    </div>
  );
};

export const SupportPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
            Dedicated Technical Support
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Submit a Technical Ticket
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Our engineering team assists with setup, environment configuration, and bug fixes within 24 hours.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Your support ticket has been received. Our team will contact your email.'); }} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Your Registered Email</label>
            <input
              type="email"
              required
              placeholder="developer@gmail.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Purchased Order Reference / License Key</label>
            <input
              type="text"
              required
              placeholder="e.g. CM-2026-10492 or CM-LIC-XXXX"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Describe Issue or Setup Question</label>
            <textarea
              rows={4}
              required
              placeholder="Describe error logs or Docker setup questions..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer"
          >
            Dispatch Ticket to Engineering Queue
          </button>
        </form>
      </div>
    </div>
  );
};

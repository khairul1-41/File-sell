import React from 'react';
import { Search, ShieldCheck, Download, Code, ArrowRight } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, setCurrentView, setSelectedCategorySlug, setSelectedProduct } = useMarket();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedProduct(null);
    setCurrentView('browse');
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setSelectedProduct(null);
    setCurrentView('browse');
  };

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 sm:pt-16 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-1">
        {/* Kicker */}
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 sm:mb-3">
          Verified Developer Marketplace · Production Ready
        </p>

        {/* Headline */}
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight break-words">
          Production Source Code for Founders & Engineers
        </h1>

        {/* Subhead */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          Inspect, customize, and deploy fully architected SaaS boilerplate platforms, AI pipelines, mobile apps, and multi-vendor marketplaces. Instant ZIP download with verified commercial licenses.
        </p>

        {/* Main Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-2xl focus-within:border-indigo-500 transition-all gap-1"
        >
          <div className="pl-2.5 sm:pl-3 text-slate-400 shrink-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            placeholder="Search Next.js, Flutter, AI agents, multi-vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none min-w-0"
          />
          <button
            type="submit"
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[38px] sm:min-h-[42px]"
          >
            <span>Search</span>
            <span className="hidden sm:inline">Code</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Popular Tech Filter Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-400">
          <span className="text-slate-500 font-medium text-[11px] sm:text-xs">Popular:</span>
          {['Next.js 15', 'AI Agent', 'Flutter 3.24', 'FastAPI', 'Tailwind', 'PostgreSQL'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px] sm:text-xs min-h-[32px] flex items-center"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Proof metrics / trust markers */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-2 sm:p-0">
            <p className="text-lg sm:text-2xl font-bold text-white tabular-nums">480+</p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Verified Scripts</p>
          </div>
          <div className="p-2 sm:p-0">
            <p className="text-lg sm:text-2xl font-bold text-white tabular-nums">1,240+</p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Commercial Deployments</p>
          </div>
          <div className="p-2 sm:p-0">
            <p className="text-lg sm:text-2xl font-bold text-white tabular-nums">100%</p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Clean Architecture</p>
          </div>
          <div className="p-2 sm:p-0">
            <p className="text-lg sm:text-2xl font-bold text-white tabular-nums">BDT & INR</p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Direct Local Gateways</p>
          </div>
        </div>
      </div>
    </section>
  );
};

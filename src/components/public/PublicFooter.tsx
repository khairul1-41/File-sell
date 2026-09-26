import React from 'react';
import { Code2, ShieldCheck, Heart } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const PublicFooter: React.FC = () => {
  const { setCurrentView, setSelectedCategorySlug, setSelectedProduct } = useMarket();

  const handleNav = (view: string, slug: string | null = null) => {
    setSelectedProduct(null);
    setSelectedCategorySlug(slug);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Code<span className="text-indigo-400">Market</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier marketplace for production digital source code, full-stack boilerplates, and developer architectures. Direct regional checkout for Bangladesh & India.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-slate-400">
              <span className="text-[11px]">Accepted Gateways:</span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-300 font-medium">
                SSLCommerz (bKash/Nagad)
              </span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-300 font-medium">
                Razorpay (UPI/Cards)
              </span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Source Code
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('browse', 'saas-boilerplates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SaaS Boilerplates
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('browse', 'ai-llm-systems')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI & LLM Orchestrators
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('browse', 'fintech-mobile-apps')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fintech & Mobile Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('browse', 'ecommerce-scripts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Multi-Vendor Scripts
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About CodeMarket
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing & Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('support')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technical Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('browse')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Commercial Licensing
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400">Refund Guarantee (30 Days)</span>
              </li>
              <li>
                <span className="text-slate-400">Verified Checksums</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CodeMarket Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Server Regions: Dhaka (BD) · Mumbai (IN)</span>
            <span>256-Bit SSL Protected Marketplace</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

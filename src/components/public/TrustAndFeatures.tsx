import React from 'react';
import { ShieldCheck, Zap, Lock, Code2, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export const TrustAndFeatures: React.FC = () => {
  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Why Choose CodeMarket */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Engineered For Scale
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Why High-Growth Teams Choose CodeMarket
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Save hundreds of engineering hours with verified architecture, modern stacks, and audited dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              100% Unobfuscated Source Code
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every package comes with full TypeScript, Dart, or Python source files. No compiled binaries, no vendor lock-in, and complete freedom to customize.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Local Payment Gateways Included
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Native checkout integrations with SSLCommerz (bKash, Nagad, Rocket in Bangladesh) and Razorpay (UPI, NetBanking, Cards in India) out of the box.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Lifetime Commercial License
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Single-time payment includes perpetual rights to ship for clients or launch commercial ventures without recurring platform royalties.
            </p>
          </div>
        </div>
      </div>

      {/* 2. How Purchasing Works */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
            Zero Friction Delivery
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            How Purchasing Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-10 leading-relaxed">
            From checkout to running on your local machine in under two minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400">01. SELECT</span>
              <h4 className="text-sm font-bold text-white">Choose Your Package</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test the live demo, verify technology dependencies, and select your target currency (BDT or INR).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400">02. CHECKOUT</span>
              <h4 className="text-sm font-bold text-white">Instant Local Payment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete purchase securely using SSLCommerz (bKash/Nagad) or Razorpay (UPI/Cards).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-400">03. DEPLOY</span>
              <h4 className="text-sm font-bold text-white">Instant ZIP & License</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive instant ZIP download access, unique license key, and step-by-step installation guides.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Secure Payment Section */}
      <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Certified Regional Payment Processing
          </h3>
          <p className="text-xs text-slate-600 max-w-xl">
            We partner directly with tier-1 payment infrastructure in South Asia. No foreign currency exchange fees or surprise bank charges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
            🇧🇩 SSLCommerz Certified
          </div>
          <div className="px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
            🇮🇳 Razorpay UPI Gateway
          </div>
          <div className="px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
            🔒 PCI-DSS Compliant
          </div>
        </div>
      </div>
    </div>
  );
};

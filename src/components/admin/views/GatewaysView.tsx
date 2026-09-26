import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Key, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useMarket } from '../../../context/MarketContext';

export const GatewaysView: React.FC = () => {
  const { gatewayConfig, updateGatewayConfig } = useMarket();
  const [sslSandbox, setSslSandbox] = useState(gatewayConfig.sslCommerz.isSandbox);
  const [razorpaySandbox, setRazorpaySandbox] = useState(gatewayConfig.razorpay.isSandbox);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGatewayConfig({
      sslCommerz: {
        ...gatewayConfig.sslCommerz,
        isSandbox: sslSandbox,
      },
      razorpay: {
        ...gatewayConfig.razorpay,
        isSandbox: razorpaySandbox,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Payment Gateways Configuration</h2>
          <p className="text-xs text-slate-400">
            Internal API credentials, webhooks, and sandbox/production toggles for regional checkout.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Gateway settings updated & audited!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SSLCommerz (Bangladesh) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇧🇩</span>
              <div>
                <h3 className="text-sm font-bold text-white">SSLCommerz (Bangladesh - BDT)</h3>
                <p className="text-[11px] text-slate-400">bKash, Nagad, Rocket & Cards</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sslSandbox}
                onChange={(e) => setSslSandbox(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-indigo-600"
              />
              <span className="text-xs text-slate-300 font-mono">Sandbox Mode</span>
            </label>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Store ID</label>
              <input
                type="text"
                readOnly
                value={gatewayConfig.sslCommerz.storeId}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Store Secret Password</label>
              <input
                type="password"
                readOnly
                value={gatewayConfig.sslCommerz.storePassword}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">IPN Notification Webhook</label>
              <input
                type="text"
                readOnly
                value={gatewayConfig.sslCommerz.ipnUrl}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 font-mono text-[11px]"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5 font-semibold">Active Channels:</span>
              <div className="flex flex-wrap gap-1.5">
                {gatewayConfig.sslCommerz.supportedMethods.map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Razorpay (India) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇮🇳</span>
              <div>
                <h3 className="text-sm font-bold text-white">Razorpay (India - INR)</h3>
                <p className="text-[11px] text-slate-400">UPI, NetBanking & Cards</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={razorpaySandbox}
                onChange={(e) => setRazorpaySandbox(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-indigo-600"
              />
              <span className="text-xs text-slate-300 font-mono">Test Sandbox</span>
            </label>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Key ID</label>
              <input
                type="text"
                readOnly
                value={gatewayConfig.razorpay.keyId}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Key Secret</label>
              <input
                type="password"
                readOnly
                value={gatewayConfig.razorpay.keySecret}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Webhook Signing Secret</label>
              <input
                type="text"
                readOnly
                value={gatewayConfig.razorpay.webhookSecret}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 font-mono text-[11px]"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5 font-semibold">Active Channels:</span>
              <div className="flex flex-wrap gap-1.5">
                {gatewayConfig.razorpay.supportedMethods.map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Save Gateway Environment Config
          </button>
        </div>
      </form>
    </div>
  );
};

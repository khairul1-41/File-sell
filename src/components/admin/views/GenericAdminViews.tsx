import React, { useState } from 'react';
import {
  Layers,
  Users,
  Download,
  Ticket,
  GitBranch,
  Star,
  LifeBuoy,
  BarChart3,
  Settings,
  Lock,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useMarket } from '../../../context/MarketContext';
import { Coupon } from '../../../types';

export const CategoriesAdminView: React.FC = () => {
  const { categories } = useMarket();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Marketplace Categories</h2>
          <p className="text-xs text-slate-400">Configure catalog taxonomy and package assignments.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{cat.name}</h3>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                {cat.productCount} scripts
              </span>
            </div>
            <p className="text-xs text-slate-400">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomersAdminView: React.FC = () => {
  const { orders } = useMarket();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Customer Accounts Directory</h2>
        <p className="text-xs text-slate-400">Registered purchasers, license allocations, and verified download counts.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
            <tr>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Region</th>
              <th className="py-3 px-4">Total Purchases</th>
              <th className="py-3 px-4">License Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-sans font-semibold text-white">{o.customerName}</td>
                <td className="py-3 px-4 text-slate-300">{o.customerEmail}</td>
                <td className="py-3 px-4 font-sans">{o.currency === 'BDT' ? '🇧🇩 Bangladesh' : '🇮🇳 India'}</td>
                <td className="py-3 px-4 text-slate-200">
                  {o.currency === 'BDT' ? '৳' : '₹'}{o.totalAmount.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DownloadsAdminView: React.FC = () => {
  const { downloadLogs } = useMarket();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Source Code Download Security Audit</h2>
        <p className="text-xs text-slate-400">Telemetry logs capturing IP address, timestamp, and user agents for every ZIP download.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300 font-mono">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Order Ref</th>
              <th className="py-3 px-4">Customer Email</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Client IP</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {downloadLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 text-slate-400 text-[11px]">{log.timestamp}</td>
                <td className="py-3 px-4 font-bold text-white">{log.orderNumber}</td>
                <td className="py-3 px-4 text-slate-300">{log.customerEmail}</td>
                <td className="py-3 px-4 text-slate-200 font-sans truncate max-w-[160px]">{log.productTitle}</td>
                <td className="py-3 px-4 text-slate-400">{log.ipAddress}</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CouponsAdminView: React.FC = () => {
  const { coupons, toggleCoupon, addCoupon } = useMarket();
  const [code, setCode] = useState('');
  const [percent, setPercent] = useState(15);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    addCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: percent,
      minSpend: { BDT: 2000, INR: 1500 },
      validUntil: '2026-12-31',
      usageCount: 0,
      maxUsage: 250,
      isActive: true,
    });
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Coupons & Promotional Discounts</h2>
          <p className="text-xs text-slate-400">Create discount codes applicable during regional checkout.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="New Code (e.g. FLASH30)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono uppercase"
        />
        <input
          type="number"
          min="5"
          max="80"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="w-20 px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
        />
        <span className="text-xs text-slate-400">% OFF</span>
        <button
          type="submit"
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg cursor-pointer"
        >
          Add Promo Code
        </button>
      </form>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300 font-mono">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
            <tr>
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Min Spend</th>
              <th className="py-3 px-4">Usage</th>
              <th className="py-3 px-4">Valid Until</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-indigo-400">{c.code}</td>
                <td className="py-3 px-4 text-white font-bold">{c.discountPercent}% OFF</td>
                <td className="py-3 px-4 text-slate-400">BDT ৳{c.minSpend.BDT} / INR ₹{c.minSpend.INR}</td>
                <td className="py-3 px-4 text-slate-300">{c.usageCount} / {c.maxUsage}</td>
                <td className="py-3 px-4 text-slate-400">{c.validUntil}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleCoupon(c.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      c.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {c.isActive ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AnalyticsAdminView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Financial & Marketplace Analytics</h2>
        <p className="text-xs text-slate-400">Country revenue distribution, conversion ratios, and gateway telemetry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Country Revenue Share</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>🇧🇩 Bangladesh (SSLCommerz)</span>
                <span className="font-mono font-bold">59%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[59%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>🇮🇳 India (Razorpay)</span>
                <span className="font-mono font-bold">41%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[41%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Checkout Conversion</h3>
          <p className="text-3xl font-extrabold text-white font-mono">4.82%</p>
          <p className="text-xs text-emerald-400 font-mono">+0.6% vs previous cycle</p>
          <p className="text-[11px] text-slate-500">Cart abandonment lowest on bKash & UPI channels.</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Settlement Health</h3>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">99.98%</p>
          <p className="text-xs text-slate-400">Zero unsettled chargebacks</p>
          <p className="text-[11px] text-slate-500">Automatic IPN reconciliation active for all orders.</p>
        </div>
      </div>
    </div>
  );
};

export const WebsiteSettingsAdminView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-white">Website & Marketplace Settings</h2>
        <p className="text-xs text-slate-400">Marketplace global metadata, banner alerts, and regional currency settings.</p>
      </div>

      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Marketplace Brand Name</label>
          <input
            type="text"
            readOnly
            value="CodeMarket"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Public Announcement Bar Notice</label>
          <input
            type="text"
            defaultValue="Production Verified Codebase · Instant ZIP Download & Lifetime License Keys"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Primary Support Email</label>
          <input
            type="email"
            defaultValue="support@codemarket.dev"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>

        <div className="pt-2">
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg cursor-pointer">
            Save Marketplace Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export const SecuritySettingsAdminView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-white">Security & Access Subsystem</h2>
        <p className="text-xs text-slate-400">Configure administrative session duration, IP allowlisting, and 2FA enforcement.</p>
      </div>

      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div>
            <p className="font-bold text-white">Mandatory Two-Factor Authentication (2FA)</p>
            <p className="text-[11px] text-slate-400">Require all staff with SUPER_ADMIN and ADMIN roles to enter TOTP code.</p>
          </div>
          <span className="text-emerald-400 font-bold font-mono">ENFORCED</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div>
            <p className="font-bold text-white">Public / Admin Separation Firewall</p>
            <p className="text-[11px] text-slate-400">Strictly blocks all admin headers, role text, and metrics on public routes.</p>
          </div>
          <span className="text-emerald-400 font-bold font-mono">ACTIVE (STRICT)</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div>
            <p className="font-bold text-white">Admin Session Inactivity Timeout</p>
            <p className="text-[11px] text-slate-400">Automatically logs out inactive administrators after 30 minutes.</p>
          </div>
          <span className="text-indigo-400 font-bold font-mono">30 MINUTES</span>
        </div>
      </div>
    </div>
  );
};

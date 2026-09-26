import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Download,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Package,
} from 'lucide-react';
import { useMarket } from '../../../context/MarketContext';
import { useAuth } from '../../../context/AuthContext';

export const DashboardView: React.FC = () => {
  const { orders, products, formatPrice, downloadLogs, auditLogs } = useMarket();
  const { adminUser } = useAuth();

  const totalBdtRevenue = orders
    .filter((o) => o.currency === 'BDT')
    .reduce((sum, o) => sum + o.totalAmount, 0) + 1420000;

  const totalInrRevenue = orders
    .filter((o) => o.currency === 'INR')
    .reduce((sum, o) => sum + o.totalAmount, 0) + 980000;

  const totalOrdersCount = orders.length + 1150;
  const totalDownloadsCount = downloadLogs.length + 3280;

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
              Operational Command Center
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <h1 className="text-xl font-bold text-white">
            System Metrics & Executive Overview
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Active Administrator: <span className="text-slate-200 font-semibold">{adminUser?.name}</span> ({adminUser?.role})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            System Load: <span className="text-emerald-400 font-semibold">0.14</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            TLS: <span className="text-emerald-400 font-semibold">Verified</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* BDT Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Bangladesh Revenue (BDT)</span>
            <span className="text-emerald-400 flex items-center text-[11px] font-semibold">
              +18.4% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            ৳{totalBdtRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            SSLCommerz · bKash, Nagad & Cards
          </p>
        </div>

        {/* INR Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>India Revenue (INR)</span>
            <span className="text-emerald-400 flex items-center text-[11px] font-semibold">
              +24.1% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            ₹{totalInrRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Razorpay · UPI, Cards & NetBanking
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Orders Paid</span>
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {totalOrdersCount.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            100% Digital license key dispatch
          </p>
        </div>

        {/* Total Downloads */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Source Code Downloads</span>
            <Download className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {totalDownloadsCount.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            Security audit logged with IP
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recent Customer Orders</h3>
            <span className="text-xs font-mono text-slate-400">Real-time ledger</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Gateway</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{ord.orderNumber}</td>
                    <td className="py-3 px-3 text-slate-300 truncate max-w-[140px]">
                      {ord.customerEmail}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {ord.gateway}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-200 font-bold tabular-nums">
                      {ord.currency === 'BDT' ? '৳' : '₹'}{ord.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {ord.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Top-Selling Packages & Activity (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">Top-Selling Packages</h3>
            <div className="space-y-3">
              {products.slice(0, 3).map((prod) => (
                <div key={prod.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-white truncate mb-1">
                    <span className="truncate">{prod.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{prod.version}</span>
                    <span className="text-emerald-400 font-bold">{prod.salesCount} sales</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">Security & Audit Activity</h3>
            <div className="space-y-2 text-xs">
              {auditLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="text-slate-400 border-l-2 border-indigo-500 pl-2.5 py-1">
                  <p className="text-[11px] font-mono text-slate-300 font-semibold">{log.action}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{log.timestamp} · {log.adminEmail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

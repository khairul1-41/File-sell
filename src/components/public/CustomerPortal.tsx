import React, { useState } from 'react';
import {
  Download,
  Key,
  FileCode,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarket } from '../../context/MarketContext';

export const CustomerPortal: React.FC = () => {
  const { customerUser, customerLogout } = useAuth();
  const { orders, recordDownload, setCurrentView, setSelectedProduct, products, formatPrice } = useMarket();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filter orders for the logged-in customer (or show all test orders matching their email or demo orders)
  const customerOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase() === (customerUser?.email || '').toLowerCase()
  );

  const displayOrders = customerOrders.length > 0 ? customerOrders : orders;

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (orderNumber: string, productId: string, title: string, key: string) => {
    recordDownload(orderNumber, productId);

    const content = `================================================
CodeMarket Digital Source Code Package
Order: ${orderNumber}
Product: ${title}
Licensed to: ${customerUser?.email || 'Verified Customer'}
Key: ${key}
Verification: Certified Authentic
================================================
Thank you for your purchase from CodeMarket.
Extract your production archive and review README.md.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-source.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* User Welcome Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 mb-8 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
              Customer Account Portal
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Welcome back, {customerUser?.name || 'Customer'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {customerUser?.email || 'customer@gmail.com'} · Perpetual licenses & instant access
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('browse');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Browse Marketplace
            </button>
            <button
              onClick={customerLogout}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Section: My Purchased Source Code */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Purchased Packages & Downloads ({displayOrders.length})
              </h2>
              <p className="text-xs text-slate-500">
                Direct ZIP archives with verified license keys. Download anytime.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4"
              >
                {/* Order Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{order.date}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      PAID via {order.gateway}
                    </span>
                  </div>

                  <div className="font-mono text-slate-900 font-bold tabular-nums">
                    Total: {formatPrice(order.totalAmount, order.currency)}
                  </div>
                </div>

                {/* Items in this order */}
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-indigo-600 shrink-0" />
                        <h3 className="text-sm font-bold text-slate-900 truncate">
                          {item.productTitle}
                        </h3>
                        <span className="font-mono text-[11px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                          {item.version}
                        </span>
                      </div>

                      {/* License Key Box */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-slate-500 font-medium">License:</span>
                        <code className="text-xs font-mono font-semibold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60 select-all">
                          {item.licenseKey}
                        </code>
                        <button
                          onClick={() => handleCopy(item.licenseKey)}
                          className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                          title="Copy license key"
                        >
                          {copiedKey === item.licenseKey ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedKey === item.licenseKey ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Downloaded <span className="font-mono font-semibold">{order.downloadCount}</span> times · Valid through <span className="font-mono">{order.downloadExpiry}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          handleDownload(order.orderNumber, item.productId, item.productTitle, item.licenseKey)
                        }
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download ZIP Package</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

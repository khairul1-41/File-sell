import React from 'react';
import { ShoppingBag, CheckCircle2, Clock, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { useMarket } from '../../../context/MarketContext';
import { Order } from '../../../types';

export const OrdersView: React.FC = () => {
  const { orders, updateOrderStatus } = useMarket();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Orders & Transaction Ledger</h2>
          <p className="text-xs text-slate-400">
            Real-time verification of customer payments via SSLCommerz and Razorpay.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            Total Orders: <strong className="text-white">{orders.length}</strong>
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Order Number</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Purchased Package</th>
                <th className="py-3 px-4">Gateway & Txn</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Downloads</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{ord.orderNumber}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{ord.date}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-200 font-sans">{ord.customerName}</p>
                    <p className="text-[11px] text-slate-400">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <p className="font-medium text-slate-200 truncate max-w-[180px]">
                      {ord.items[0]?.productTitle || 'Digital Code'}
                    </p>
                    <p className="text-[11px] text-indigo-400 font-mono">
                      {ord.items[0]?.licenseKey}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                      {ord.gateway}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[120px]">
                      {ord.transactionId}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-100 tabular-nums">
                    {ord.currency === 'BDT' ? '৳' : '₹'}{ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    {ord.downloadCount} dl
                  </td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={ord.paymentStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-[10px] rounded px-2 py-1 text-emerald-400 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="PAID">PAID</option>
                      <option value="PENDING">PENDING</option>
                      <option value="REFUNDED">REFUNDED</option>
                      <option value="FAILED">FAILED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

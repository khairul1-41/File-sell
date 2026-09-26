import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, LogIn } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';

export const AdminAccessDenied: React.FC = () => {
  const { setCurrentView } = useMarket();
  const { customerUser, adminLogout, customerLogout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase block mb-1">
          403 Forbidden · Security Guard
        </span>
        <h1 className="text-2xl font-extrabold text-white mb-3">
          ACCESS DENIED
        </h1>

        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Administrative authorization required. Your current account{' '}
          {customerUser ? (
            <span className="text-slate-300 font-semibold font-mono">({customerUser.email})</span>
          ) : (
            'session'
          )}{' '}
          does not possess verified cryptographic privileges to access the CodeMarket Admin Console.
        </p>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-left text-xs text-slate-500 font-mono mb-6 space-y-1">
          <div>INCIDENT_ID: SEC-{Date.now().toString(36).toUpperCase()}</div>
          <div>AUTH_SUBSYSTEM: STRICT_ROLE_BASED_ACCESS_CONTROL</div>
          <div>CLIENT_IP: 103.84.152.12</div>
          <div>STATUS: BLOCKED_AND_LOGGED</div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              setCurrentView('admin-login');
            }}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Go to Admin Login Console</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Storefront</span>
          </button>
        </div>
      </div>
    </div>
  );
};

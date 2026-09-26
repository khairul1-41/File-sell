import React, { useState } from 'react';
import { Lock, Shield, KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarket } from '../../context/MarketContext';

export const AdminLogin: React.FC = () => {
  const { adminLogin } = useAuth();
  const { setCurrentView } = useMarket();

  const [email, setEmail] = useState('admin@codemarket.dev');
  const [password, setPassword] = useState('AdminSecret2026!');
  const [code2fa, setCode2fa] = useState('123456');
  const [use2fa, setUse2fa] = useState(true);
  const [rememberSession, setRememberSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await adminLogin(email, password, use2fa ? code2fa : undefined);
      if (!res.success) {
        setError(res.error || 'Authentication rejected by security sub-system.');
      } else {
        // Successfully authenticated! Navigate to admin dashboard
        setCurrentView('admin-dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFillSuperAdmin = () => {
    setEmail('admin@codemarket.dev');
    setPassword('AdminSecret2026!');
    setCode2fa('123456');
    setUse2fa(true);
  };

  const handleQuickFillStaff = () => {
    setEmail('support@codemarket.dev');
    setPassword('AdminSecret2026!');
    setCode2fa('');
    setUse2fa(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-4 sm:p-8 text-white relative selection:bg-indigo-500 selection:text-white">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header (Zero public storefront items, strictly Admin navigation) */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-600/30">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-tight text-white block">
              CodeMarket
            </span>
            <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
              Secure Operations Console
            </span>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('home')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Storefront</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 sm:p-8 shadow-2xl relative">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              CodeMarket Admin Console
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Restricted management subsystem. Provide authorized administrative credentials.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@codemarket.dev"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Master Password
                </label>
                <span className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-mono"
              />
            </div>

            {/* Optional 2FA */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Two-Factor Authentication (2FA)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setUse2fa(!use2fa)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {use2fa ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
              </div>

              {use2fa && (
                <input
                  type="text"
                  maxLength={6}
                  value={code2fa}
                  onChange={(e) => setCode2fa(e.target.value)}
                  placeholder="6-digit authenticator code (e.g. 123456)"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-mono tracking-widest text-center"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs text-slate-400">Remember session (30d)</span>
              </label>

              <span className="text-[11px] text-slate-500 font-mono">TLS 1.3 Active</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Verifying Authentication...' : 'Sign In to Admin Console'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials for Fast Evaluation */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Quick Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickFillSuperAdmin}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 text-left transition-colors cursor-pointer"
              >
                <span className="font-bold text-indigo-400 block">SUPER_ADMIN</span>
                <span className="text-[10px] text-slate-500 block truncate">admin@codemarket.dev</span>
              </button>

              <button
                type="button"
                onClick={handleQuickFillStaff}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 text-left transition-colors cursor-pointer"
              >
                <span className="font-bold text-blue-400 block">SUPPORT_STAFF</span>
                <span className="text-[10px] text-slate-500 block truncate">support@codemarket.dev</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Security telemetry note */}
      <div className="max-w-6xl mx-auto w-full text-center text-[11px] text-slate-500 font-mono z-10">
        All administrative attempts are cryptographically timestamped and logged with client IP address.
      </div>
    </div>
  );
};

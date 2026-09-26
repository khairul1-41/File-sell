import React, { useState } from 'react';
import {
  Search,
  Bell,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronDown,
  User,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarket } from '../../context/MarketContext';

interface AdminTopBarProps {
  currentAdminTab: string;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ currentAdminTab }) => {
  const { adminUser, adminLogout } = useAuth();
  const { setCurrentView } = useMarket();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono uppercase">
            SUPER ADMIN
          </span>
        );
      case 'ADMIN':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono uppercase">
            ADMIN
          </span>
        );
      case 'SUPPORT_STAFF':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono uppercase">
            STAFF / SUPPORT
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider bg-slate-500/20 text-slate-300 border border-slate-500/30 font-mono uppercase">
            OPERATOR
          </span>
        );
    }
  };

  const handleLogout = () => {
    adminLogout();
    setCurrentView('admin-login');
  };

  const handleViewStorefront = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Breadcrumbs / Section Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">
          Admin Console /
        </span>
        <h2 className="text-sm font-bold text-white capitalize">
          {currentAdminTab.replace('-', ' ')}
        </h2>
      </div>

      {/* Center: Admin Search */}
      <div className="hidden md:flex items-center max-w-xs w-full relative">
        <input
          type="text"
          placeholder="Search orders, customers, licenses, logs..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Right: Security Status, Notifications, Role Badge & Profile */}
      <div className="flex items-center gap-3">
        {/* Security Status (Visible inside admin panel only) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security Guard Active</span>
        </div>

        {/* View Public Storefront Link */}
        <button
          onClick={handleViewStorefront}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Preview public marketplace"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Storefront</span>
        </button>

        {/* Notifications Drawer Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 relative transition-colors cursor-pointer"
            aria-label="Admin Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
          </button>

          {isNotificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in"
              onMouseLeave={() => setIsNotificationsOpen(false)}
            >
              <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white">System Notifications</span>
                <span className="text-[10px] font-mono text-slate-400">3 unread</span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto">
                <div className="p-3 hover:bg-slate-800/40 text-xs">
                  <p className="font-semibold text-slate-200">New Order Paid (SSLCommerz)</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Order CM-2026-10492 for BDT 7,800 received.</p>
                  <span className="text-[10px] text-slate-500 font-mono">10m ago</span>
                </div>
                <div className="p-3 hover:bg-slate-800/40 text-xs">
                  <p className="font-semibold text-slate-200">Package Download Recorded</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">CloudTenancy downloaded by tanvir.dev@gmail.com</p>
                  <span className="text-[10px] text-slate-500 font-mono">25m ago</span>
                </div>
                <div className="p-3 hover:bg-slate-800/40 text-xs">
                  <p className="font-semibold text-slate-200">Audit Log: Admin Session</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">2FA verified for admin@codemarket.dev</p>
                  <span className="text-[10px] text-slate-500 font-mono">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile & Role Badge */}
        {adminUser && (
          <div className="relative pl-2 border-l border-slate-800 flex items-center gap-2">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img
                src={adminUser.avatar}
                alt={adminUser.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-lg object-cover border border-slate-700"
              />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {adminUser.name}
                  </span>
                  {getRoleBadge(adminUser.role)}
                </div>
                <span className="text-[10px] text-slate-400 font-mono block -mt-0.5">
                  {adminUser.email}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 top-10 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">{adminUser.name}</p>
                  <p className="text-[11px] font-mono text-slate-400 truncate">{adminUser.email}</p>
                  <div className="mt-1.5">{getRoleBadge(adminUser.role)}</div>
                </div>
                <div className="px-3 py-2 text-[11px] text-slate-400 border-b border-slate-800">
                  <span>Last Login: </span>
                  <span className="font-mono text-slate-300">{adminUser.lastLogin}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout from Admin Console</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Logout Button */}
        <button
          onClick={handleLogout}
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
          title="Logout from Admin Console"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

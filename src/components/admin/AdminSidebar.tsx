import React from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Download,
  Ticket,
  CreditCard,
  Sliders,
  GitBranch,
  Star,
  LifeBuoy,
  BarChart3,
  Bell,
  ShieldCheck,
  FileText,
  Settings,
  Lock,
  Code2,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface AdminNavSection {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  requiredRole?: ('SUPER_ADMIN' | 'ADMIN' | 'SUPPORT_STAFF')[];
}

const SIDEBAR_ITEMS: AdminNavSection[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package, badge: '4' },
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: 'New' },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'gateways', label: 'Payment Gateways', icon: CreditCard, requiredRole: ['SUPER_ADMIN', 'ADMIN'] },
  { id: 'versions', label: 'Product Versions', icon: GitBranch },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'support', label: 'Support Queue', icon: LifeBuoy, badge: '2' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'staff', label: 'Staff & Roles', icon: ShieldCheck, requiredRole: ['SUPER_ADMIN'] },
  { id: 'audit-logs', label: 'Audit Logs', icon: FileText, requiredRole: ['SUPER_ADMIN', 'ADMIN'] },
  { id: 'website-settings', label: 'Website Settings', icon: Settings, requiredRole: ['SUPER_ADMIN', 'ADMIN'] },
  { id: 'security', label: 'Security Settings', icon: Lock, requiredRole: ['SUPER_ADMIN'] },
];

interface AdminSidebarProps {
  currentAdminTab: string;
  onSelectTab: (tabId: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentAdminTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { adminUser, hasRole } = useAuth();

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 w-64 select-none">
      {/* Brand Header */}
      <div className="h-16 border-b border-slate-800 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-tight block">
              CodeMarket
            </span>
            <span className="text-[10px] font-mono text-indigo-400 block -mt-0.5">
              Admin Subsystem
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            v2.6
          </span>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
          Operational Views
        </p>

        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentAdminTab === item.id;
          const isPermitted = !item.requiredRole || hasRole(item.requiredRole);

          if (!isPermitted) return null;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[38px] ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Admin Session Security Box in Sidebar Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span>Admin Guard</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            IP: 103.84.152.12 · 256-bit AES
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (>= 1024px) */}
      <aside className="hidden lg:flex w-64 border-r border-slate-800 h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet Slide-over Drawer (< 1024px) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer container */}
          <div className="relative z-10 shadow-2xl h-full animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

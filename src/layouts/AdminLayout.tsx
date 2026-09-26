import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminTopBar } from '../components/admin/AdminTopBar';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminAccessDenied } from '../components/admin/AdminAccessDenied';

// Admin Views
import { DashboardView } from '../components/admin/views/DashboardView';
import { ProductsView } from '../components/admin/views/ProductsView';
import { OrdersView } from '../components/admin/views/OrdersView';
import { GatewaysView } from '../components/admin/views/GatewaysView';
import { StaffRolesView } from '../components/admin/views/StaffRolesView';
import { AuditLogsView } from '../components/admin/views/AuditLogsView';
import {
  CategoriesAdminView,
  CustomersAdminView,
  DownloadsAdminView,
  CouponsAdminView,
  AnalyticsAdminView,
  WebsiteSettingsAdminView,
  SecuritySettingsAdminView,
} from '../components/admin/views/GenericAdminViews';

export const AdminLayout: React.FC = () => {
  const { adminUser, isAdminAuthenticated, customerUser } = useAuth();
  const { currentView, setCurrentView } = useMarket();
  const [currentAdminTab, setCurrentAdminTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // ACCESS CONTROL CHECK 1:
  // If user is currently trying to view admin-login, render AdminLogin view
  if (currentView === 'admin-login') {
    return <AdminLogin />;
  }

  // ACCESS CONTROL CHECK 2:
  // If user is logged in as a normal customer and is attempting to access admin dashboard,
  // RETURN: ACCESS DENIED (Strict security firewall)
  if (customerUser && !isAdminAuthenticated) {
    return <AdminAccessDenied />;
  }

  // ACCESS CONTROL CHECK 3:
  // If unauthenticated user tries to view admin dashboard, redirect to Admin Login
  if (!isAdminAuthenticated || !adminUser) {
    return <AdminLogin />;
  }

  // AUTHENTICATED ADMINISTRATOR: Render dedicated admin layout
  const renderAdminView = () => {
    switch (currentAdminTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'products':
        return <ProductsView />;
      case 'categories':
        return <CategoriesAdminView />;
      case 'orders':
        return <OrdersView />;
      case 'customers':
        return <CustomersAdminView />;
      case 'downloads':
        return <DownloadsAdminView />;
      case 'coupons':
        return <CouponsAdminView />;
      case 'gateways':
        return <GatewaysView />;
      case 'analytics':
        return <AnalyticsAdminView />;
      case 'staff':
        return <StaffRolesView />;
      case 'audit-logs':
        return <AuditLogsView />;
      case 'website-settings':
        return <WebsiteSettingsAdminView />;
      case 'security':
        return <SecuritySettingsAdminView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Left Admin Sidebar (Responsive drawer on mobile/tablet, persistent on desktop) */}
      <AdminSidebar
        currentAdminTab={currentAdminTab}
        onSelectTab={(tabId) => {
          setCurrentAdminTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Right Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Admin Bar with Role Badge, Mobile Hamburger, and Security Telemetry */}
        <AdminTopBar
          currentAdminTab={currentAdminTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Admin View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderAdminView()}
        </main>
      </div>
    </div>
  );
};

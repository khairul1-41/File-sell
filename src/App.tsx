/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketProvider, useMarket } from './context/MarketContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { CustomerLayout } from './layouts/CustomerLayout';

// Public Components
import { HeroSection } from './components/public/HeroSection';
import { CategoryGrid } from './components/public/CategoryGrid';
import { ProductCard } from './components/public/ProductCard';
import { ProductDetailPage } from './components/public/ProductDetailPage';
import { TrustAndFeatures } from './components/public/TrustAndFeatures';
import { CustomerReviewsSection } from './components/public/CustomerReviewsSection';
import { FAQSection } from './components/public/FAQSection';
import { CustomerPortal } from './components/public/CustomerPortal';
import { BrowsePage, OffersPage, AboutPage, SupportPage } from './components/public/PublicPages';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminAccessDenied } from './components/admin/AdminAccessDenied';

const MarketplaceApp: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedProduct,
    setSelectedProduct,
    products,
  } = useMarket();

  const { adminUser, isAdminAuthenticated, customerUser } = useAuth();

  // Handle URL changes & sync with path (/admin, /admin/login, /admin/dashboard, etc.)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        path === '/admin' ||
        path === '/admin/login' ||
        hash === '#/admin' ||
        hash === '#/admin/login' ||
        hash.startsWith('#/admin') ||
        search.includes('admin') ||
        search.includes('preview=admin')
      ) {
        if (hash === '#/admin/dashboard' || path === '/admin/dashboard') {
          setCurrentView('admin-dashboard');
        } else {
          setCurrentView('admin-login');
        }
      } else if (path === '/admin/dashboard' || hash === '#/admin/dashboard') {
        setCurrentView('admin-dashboard');
      } else if (path === '/account' || hash === '#/account') {
        setCurrentView('account');
      }
    };

    // Keyboard shortcut (Ctrl + Shift + A or Cmd + Shift + A) to toggle Admin Console preview
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentView(currentView.startsWith('admin') ? 'home' : 'admin-login');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setCurrentView, currentView]);

  // Update browser history/hash quietly for test navigation
  useEffect(() => {
    if (currentView === 'admin-login') {
      window.history.replaceState(null, '', '#/admin/login');
    } else if (currentView === 'admin-dashboard') {
      window.history.replaceState(null, '', '#/admin/dashboard');
    } else if (currentView === 'account') {
      window.history.replaceState(null, '', '#/account');
    } else if (currentView === 'home') {
      window.history.replaceState(null, '', '#/');
    }
  }, [currentView]);

  // ==========================================
  // ROUTING ROUTE BRANCH 1: ADMIN ENVIRONMENT
  // ==========================================
  if (currentView === 'admin-login' || currentView === 'admin-dashboard') {
    // If a normal customer attempts to access the admin dashboard:
    if (currentView === 'admin-dashboard' && customerUser && !isAdminAuthenticated) {
      return <AdminAccessDenied />;
    }

    // If not logged in as admin and trying to view dashboard, show AdminLogin:
    if (currentView === 'admin-dashboard' && !isAdminAuthenticated) {
      return <AdminLogin />;
    }

    // If on admin-login, render AdminLogin:
    if (currentView === 'admin-login') {
      // If already authenticated as admin, go straight to dashboard
      if (isAdminAuthenticated && adminUser) {
        return <AdminLayout />;
      }
      return <AdminLogin />;
    }

    // Authenticated admin accessing dashboard:
    return <AdminLayout />;
  }

  // ==========================================
  // ROUTING ROUTE BRANCH 2: CUSTOMER PORTAL
  // ==========================================
  if (currentView === 'account') {
    return (
      <CustomerLayout>
        <CustomerPortal />
      </CustomerLayout>
    );
  }

  // ==========================================
  // ROUTING ROUTE BRANCH 3: PUBLIC STOREFRONT
  // (Completely isolated, zero admin exposure)
  // ==========================================
  return (
    <PublicLayout>
      {/* 1. Single Product Detail View */}
      {currentView === 'product-detail' && selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null);
            setCurrentView('home');
          }}
        />
      ) : currentView === 'browse' ? (
        /* 2. Browse Catalog Page */
        <BrowsePage />
      ) : currentView === 'categories' ? (
        /* 3. Categories Hub */
        <div className="bg-slate-50 min-h-screen py-6">
          <CategoryGrid />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">All Verified Code Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : currentView === 'offers' ? (
        /* 4. Offers & Coupons Page */
        <OffersPage />
      ) : currentView === 'about' ? (
        /* 5. About Page */
        <AboutPage />
      ) : currentView === 'support' ? (
        /* 6. Support Page */
        <SupportPage />
      ) : (
        /* 7. Default Homepage (The 14-point Premium Marketplace hierarchy) */
        <div>
          {/* 3. Hero Section */}
          <HeroSection />

          {/* 5. Popular Categories */}
          <CategoryGrid />

          {/* 6. Featured Source Code Products */}
          <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                  Engineered & Audited
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Featured Source Code Packages
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setCurrentView('browse');
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                Browse all verified packages →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter((p) => p.featured).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>

          {/* 7. Trending Products */}
          <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
                High Velocity
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Trending Deployments
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter((p) => p.trending).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>

          {/* 8, 9, 10. Why Choose, How Purchasing Works & Secure Payment */}
          <TrustAndFeatures />

          {/* 11. Customer Reviews */}
          <CustomerReviewsSection />

          {/* 12. FAQ Section */}
          <FAQSection />
        </div>
      )}
    </PublicLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MarketProvider>
        <MarketplaceApp />
      </MarketProvider>
    </AuthProvider>
  );
}

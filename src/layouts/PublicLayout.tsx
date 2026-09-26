import React, { useState } from 'react';
import { PublicHeader } from '../components/public/PublicHeader';
import { MobileNavDrawer } from '../components/public/MobileNavDrawer';
import { PublicFooter } from '../components/public/PublicFooter';
import { CartDrawer } from '../components/public/CartDrawer';
import { CheckoutModal } from '../components/public/CheckoutModal';
import { CustomerAuthModal } from '../components/public/CustomerAuthModal';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Strict Public Customer Header - Zero Admin Privileges Expose */}
      <PublicHeader onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Public Footer */}
      <PublicFooter />

      {/* Customer Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <CustomerAuthModal />
    </div>
  );
};

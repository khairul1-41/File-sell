import React from 'react';
import { PublicHeader } from '../components/public/PublicHeader';
import { PublicFooter } from '../components/public/PublicFooter';
import { CartDrawer } from '../components/public/CartDrawer';
import { CheckoutModal } from '../components/public/CheckoutModal';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicHeader onOpenMobileMenu={() => {}} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, CustomerUser, AdminRole } from '../types';
import { INITIAL_STAFF } from '../data/mockData';

interface AuthContextType {
  // Admin Authentication State
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string, code2fa?: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  hasRole: (roles: AdminRole[]) => boolean;

  // Customer Authentication State
  customerUser: CustomerUser | null;
  isCustomerAuthenticated: boolean;
  customerLogin: (email: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  customerRegister: (name: string, email: string, country: 'BD' | 'IN') => Promise<{ success: boolean; error?: string }>;
  customerLogout: () => void;
  updateCustomerOrders: (order: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'codemarket_admin_session_v1';
const CUSTOMER_STORAGE_KEY = 'codemarket_customer_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(() => {
    try {
      const stored = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      // Default to guest/unauthenticated or standard customer if logged in
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [adminUser]);

  useEffect(() => {
    if (customerUser) {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerUser));
    } else {
      localStorage.removeItem(CUSTOMER_STORAGE_KEY);
    }
  }, [customerUser]);

  // Admin login logic
  const adminLogin = async (
    email: string,
    pass: string,
    code2fa?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const foundAdmin = INITIAL_STAFF.find((s) => s.email.toLowerCase() === trimmedEmail);

    if (!foundAdmin) {
      return { success: false, error: 'Invalid admin credentials or account not provisioned.' };
    }

    // Check password simulation (accepts 'AdminSecret2026!' or any password with length >= 6 for testing convenience)
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    if (foundAdmin.twoFactorEnabled && code2fa && code2fa.length !== 6 && code2fa !== '123456') {
      return { success: false, error: 'Invalid 2FA authentication token.' };
    }

    const updatedUser: AdminUser = {
      ...foundAdmin,
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setAdminUser(updatedUser);
    return { success: true };
  };

  const adminLogout = () => {
    setAdminUser(null);
  };

  const hasRole = (roles: AdminRole[]): boolean => {
    if (!adminUser) return false;
    return roles.includes(adminUser.role);
  };

  // Customer login logic (strictly separated from admin)
  const customerLogin = async (email: string, name?: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail.includes('@')) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    const newCustomer: CustomerUser = {
      id: `cust-${Date.now()}`,
      email: trimmedEmail,
      name: name || trimmedEmail.split('@')[0],
      country: 'BD',
      joinedDate: new Date().toISOString().substring(0, 10),
      orders: [],
    };

    setCustomerUser(newCustomer);
    return { success: true };
  };

  const customerRegister = async (
    name: string,
    email: string,
    country: 'BD' | 'IN'
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const newCust: CustomerUser = {
      id: `cust-${Date.now()}`,
      email: trimmedEmail,
      name: name || 'Customer',
      country,
      joinedDate: new Date().toISOString().substring(0, 10),
      orders: [],
    };

    setCustomerUser(newCust);
    return { success: true };
  };

  const customerLogout = () => {
    setCustomerUser(null);
  };

  const updateCustomerOrders = (order: any) => {
    if (customerUser) {
      setCustomerUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          orders: [order, ...prev.orders],
        };
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated: adminUser !== null,
        adminLogin,
        adminLogout,
        hasRole,
        customerUser,
        isCustomerAuthenticated: customerUser !== null,
        customerLogin,
        customerRegister,
        customerLogout,
        updateCustomerOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

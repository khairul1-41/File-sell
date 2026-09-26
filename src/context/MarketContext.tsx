import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Currency,
  CountryConfig,
  Product,
  Category,
  CartItem,
  Order,
  Coupon,
  PaymentGatewayConfig,
  Review,
  SupportTicket,
  AuditLog,
  DownloadLog,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_GATEWAY_CONFIG,
  INITIAL_REVIEWS,
  INITIAL_TICKETS,
  INITIAL_AUDIT_LOGS,
  INITIAL_DOWNLOAD_LOGS,
} from '../data/mockData';

export const COUNTRIES: Record<Currency, CountryConfig> = {
  BDT: {
    code: 'BD',
    name: 'Bangladesh',
    currency: 'BDT',
    flag: '🇧🇩',
    symbol: '৳',
    gateway: 'SSLCommerz',
    exchangeRateFromUSD: 120,
  },
  INR: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    flag: '🇮🇳',
    symbol: '₹',
    gateway: 'Razorpay',
    exchangeRateFromUSD: 86,
  },
};

interface MarketContextType {
  // Country & Currency
  country: CountryConfig;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number, customCurrency?: Currency) => string;

  // Catalog
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, license?: 'Commercial' | 'Extended Commercial') => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Promo / Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (c: Omit<Coupon, 'id'>) => void;
  toggleCoupon: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'downloadCount' | 'downloadExpiry'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['paymentStatus']) => void;

  // Navigation & View State
  currentView: string; // 'home' | 'browse' | 'categories' | 'offers' | 'about' | 'support' | 'product-detail' | 'account' | 'admin-login' | 'admin-dashboard'
  setCurrentView: (view: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Gateways & Operations
  gatewayConfig: PaymentGatewayConfig;
  updateGatewayConfig: (updates: Partial<PaymentGatewayConfig>) => void;
  reviews: Review[];
  tickets: SupportTicket[];
  auditLogs: AuditLog[];
  downloadLogs: DownloadLog[];
  recordDownload: (orderNumber: string, productId: string) => void;
  addAuditLog: (action: string, target: string, severity?: 'INFO' | 'WARNING' | 'CRITICAL') => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('BDT');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig>(INITIAL_GATEWAY_CONFIG);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [downloadLogs, setDownloadLogs] = useState<DownloadLog[]>(INITIAL_DOWNLOAD_LOGS);

  // Routing and modal triggers
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const country = COUNTRIES[currency];

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  const formatPrice = (amount: number, customCurrency?: Currency): string => {
    const activeCurrency = customCurrency || currency;
    const config = COUNTRIES[activeCurrency];
    return `${config.symbol}${amount.toLocaleString('en-US')}`;
  };

  const addToCart = (product: Product, license: 'Commercial' | 'Extended Commercial' = 'Commercial') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedLicense === license);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedLicense === license
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedLicense: license }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === trimmed && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired discount code.' };
    }

    const currentSubtotal = cart.reduce((acc, item) => {
      return acc + item.product.prices[currency].current * item.quantity;
    }, 0);

    const minRequired = found.minSpend[currency];
    if (currentSubtotal < minRequired) {
      return {
        success: false,
        message: `Coupon requires minimum spend of ${formatPrice(minRequired)}.`,
      };
    }

    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon '${found.code}' applied (${found.discountPercent}% discount)!`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (c: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...c,
      id: `coup-${Date.now()}`,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    addAuditLog('COUPON_CREATED', `Coupon: ${c.code}`, 'INFO');
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...p,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
    addAuditLog('PRODUCT_CREATED', `Title: ${p.title}`, 'INFO');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addAuditLog('PRODUCT_UPDATED', `Product ID: ${id}`, 'INFO');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditLog('PRODUCT_DELETED', `Product ID: ${id}`, 'WARNING');
  };

  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'downloadCount' | 'downloadExpiry'>
  ): Order => {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNum = `CM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      downloadCount: 0,
      downloadExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
    addAuditLog('ORDER_STATUS_CHANGED', `Order ${orderId} -> ${status}`, 'INFO');
  };

  const updateGatewayConfig = (updates: Partial<PaymentGatewayConfig>) => {
    setGatewayConfig((prev) => ({ ...prev, ...updates }));
    addAuditLog('GATEWAY_CONFIG_UPDATED', 'Payment Gateway Settings Modified', 'WARNING');
  };

  const recordDownload = (orderNumber: string, productId: string) => {
    const product = products.find((p) => p.id === productId);
    const order = orders.find((o) => o.orderNumber === orderNumber);

    const newLog: DownloadLog = {
      id: `dl-${Date.now()}`,
      orderNumber,
      productId,
      productTitle: product ? product.title : 'Digital Source Code',
      customerEmail: order ? order.customerEmail : 'anonymous@user.com',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '103.84.152.12',
      userAgent: navigator.userAgent,
      status: 'SUCCESS',
    };

    setDownloadLogs((prev) => [newLog, ...prev]);

    setOrders((prev) =>
      prev.map((o) =>
        o.orderNumber === orderNumber ? { ...o, downloadCount: o.downloadCount + 1 } : o
      )
    );
  };

  const addAuditLog = (action: string, target: string, severity: 'INFO' | 'WARNING' | 'CRITICAL' = 'INFO') => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminEmail: 'admin@codemarket.dev',
      action,
      target,
      ipAddress: '103.84.152.12',
      severity,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <MarketContext.Provider
      value={{
        country,
        setCurrency,
        formatPrice,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        selectedCategorySlug,
        setSelectedCategorySlug,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        gatewayConfig,
        updateGatewayConfig,
        reviews,
        tickets,
        auditLogs,
        downloadLogs,
        recordDownload,
        addAuditLog,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};

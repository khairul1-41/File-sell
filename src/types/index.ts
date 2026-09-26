export type Currency = 'BDT' | 'INR';

export interface CountryConfig {
  code: 'BD' | 'IN';
  name: string;
  currency: Currency;
  flag: string;
  symbol: string;
  gateway: 'SSLCommerz' | 'Razorpay';
  exchangeRateFromUSD: number; // 1 USD = 120 BDT or 86 INR
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  galleryImages: string[];
  technologies: string[];
  version: string;
  lastUpdated: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  featured: boolean;
  trending: boolean;
  prices: {
    BDT: {
      current: number;
      original: number;
    };
    INR: {
      current: number;
      original: number;
    };
  };
  demoUrl?: string;
  githubPreviewUrl?: string;
  features: string[];
  requirements: string[];
  whatsIncluded: string[];
  installationGuide: string;
  changelog: {
    version: string;
    date: string;
    changes: string[];
  }[];
  licenseType: 'Commercial' | 'Extended Commercial';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedLicense: 'Commercial' | 'Extended Commercial';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  items: {
    productId: string;
    productTitle: string;
    price: number;
    currency: Currency;
    version: string;
    licenseKey: string;
  }[];
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  currency: Currency;
  gateway: 'SSLCommerz' | 'Razorpay';
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  transactionId: string;
  downloadCount: number;
  downloadExpiry: string;
}

export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  country: 'BD' | 'IN';
  joinedDate: string;
  orders: Order[];
}

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT_STAFF';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar: string;
  lastLogin: string;
  twoFactorEnabled: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: {
    BDT: number;
    INR: number;
  };
  validUntil: string;
  usageCount: number;
  maxUsage: number;
  isActive: boolean;
}

export interface PaymentGatewayConfig {
  sslCommerz: {
    storeId: string;
    storePassword: string;
    isSandbox: boolean;
    ipnUrl: string;
    supportedMethods: string[];
  };
  razorpay: {
    keyId: string;
    keySecret: string;
    isSandbox: boolean;
    webhookSecret: string;
    supportedMethods: string[];
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  target: string;
  ipAddress: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface DownloadLog {
  id: string;
  orderNumber: string;
  productId: string;
  productTitle: string;
  customerEmail: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'REVOKED' | 'RATE_LIMITED';
}

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerEmail: string;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  lastReply: string;
  productTitle: string;
}

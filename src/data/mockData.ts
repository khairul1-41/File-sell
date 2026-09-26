import {
  Product,
  Category,
  Coupon,
  Order,
  Review,
  SupportTicket,
  AuditLog,
  DownloadLog,
  AdminUser,
  PaymentGatewayConfig,
} from '../types';

import imgSaas from '../assets/images/product_saas_platform_1790405017371.jpg';
import imgAi from '../assets/images/product_ai_workflow_1790405030678.jpg';
import imgFintech from '../assets/images/product_fintech_app_1790405042808.jpg';
import imgEcommerce from '../assets/images/product_ecommerce_code_1790405053465.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-saas',
    name: 'SaaS Boilerplates',
    slug: 'saas-boilerplates',
    description: 'Production-ready full-stack subscription platforms with multi-tenancy, billing, and auth.',
    iconName: 'Server',
    productCount: 14,
  },
  {
    id: 'cat-ai',
    name: 'AI & LLM Systems',
    slug: 'ai-llm-systems',
    description: 'Autonomous AI agent frameworks, RAG workflows, and prompt orchestrators.',
    iconName: 'Cpu',
    productCount: 9,
  },
  {
    id: 'cat-fintech',
    name: 'Fintech & Mobile Apps',
    slug: 'fintech-mobile-apps',
    description: 'Cross-platform Flutter & React Native wallets, payment modules, and banking apps.',
    iconName: 'Smartphone',
    productCount: 11,
  },
  {
    id: 'cat-ecommerce',
    name: 'E-Commerce Scripts',
    slug: 'ecommerce-scripts',
    description: 'High-performance multi-vendor marketplaces with inventory and localized checkout.',
    iconName: 'ShoppingBag',
    productCount: 16,
  },
  {
    id: 'cat-devtools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'CLI utilities, API rate-limiting engines, and developer monitoring tools.',
    iconName: 'Terminal',
    productCount: 8,
  },
  {
    id: 'cat-uikits',
    name: 'Tailwind & React UI Kits',
    slug: 'tailwind-react-ui-kits',
    description: 'Accessible component libraries, modern design systems, and responsive admin kits.',
    iconName: 'Layers',
    productCount: 12,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-saas-core',
    title: 'CloudTenancy - Enterprise Multi-Tenant SaaS Engine',
    slug: 'cloudtenancy-enterprise-saas-engine',
    category: 'SaaS Boilerplates',
    shortDescription: 'Modern multi-tenant Next.js 15, PostgreSQL, Stripe/Paddle/SSLCommerz subscription starter with organization teams.',
    fullDescription: 'CloudTenancy is an enterprise-grade multi-tenant foundation built for serious founders. Includes complete team workspaces, role-based access control (Owner, Admin, Member), customizable subdomains, automated database migrations, localized checkout (SSLCommerz for BD, Razorpay for IN), and ready-to-ship transactional email templates.',
    image: imgSaas,
    galleryImages: [imgSaas, imgAi, imgEcommerce],
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    version: 'v3.4.2',
    lastUpdated: '2026-09-18',
    rating: 4.95,
    reviewCount: 38,
    salesCount: 247,
    featured: true,
    trending: true,
    prices: {
      BDT: {
        current: 7800,
        original: 11500,
      },
      INR: {
        current: 5499,
        original: 7999,
      },
    },
    demoUrl: 'https://demo-saas.codemarket.dev',
    githubPreviewUrl: 'https://github.com/codemarket-verified/cloudtenancy-preview',
    features: [
      'Isolated tenant databases with row-level security',
      'Unified billing switcher: SSLCommerz (BDT) and Razorpay (INR) preconfigured',
      'Team invitation workflow with custom permission matrices',
      'Docker Compose setup for one-click VPS deployment',
      'Complete end-to-end automated testing suite with Playwright',
      'Dark and light mode system preference support',
    ],
    requirements: [
      'Node.js >= 20.x',
      'PostgreSQL >= 15.x',
      'Redis instance for task queues and caching',
      'Git for version control',
    ],
    whatsIncluded: [
      'Full TypeScript source code (unobfuscated)',
      'Database migration scripts & seed configurations',
      'Docker and Kubernetes deployment manifests',
      'Step-by-step 45-page technical documentation PDF',
      '6 months of direct GitHub repo access and version updates',
      'Commercial perpetual usage license',
    ],
    installationGuide: `1. Unzip the downloaded package
2. Run 'npm install' or 'pnpm install'
3. Copy .env.example to .env and configure your database URI
4. Execute 'npx prisma migrate dev' to initialize the schema
5. Run 'npm run dev' to boot the local server on http://localhost:3000
6. Build for production with 'npm run build' and start with 'npm start'`,
    changelog: [
      {
        version: 'v3.4.2',
        date: '2026-09-18',
        changes: ['Upgraded to Next.js 15.2 with App Router stability patches', 'Added SSLCommerz sandbox payment webhook handler', 'Optimized multi-tenant query caching by 35%'],
      },
      {
        version: 'v3.3.0',
        date: '2026-07-12',
        changes: ['Implemented Razorpay UPI automatic mandate reconciliation', 'Introduced dynamic audit log retention policies'],
      },
    ],
    licenseType: 'Commercial',
  },
  {
    id: 'prod-ai-flow',
    title: 'FlowGenius - Node-Based AI Agent & Workflow Builder',
    slug: 'flowgenius-node-ai-agent-workflow-builder',
    category: 'AI & LLM Systems',
    shortDescription: 'Visual canvas for constructing multi-step LLM chains, autonomous agents, RAG vector search, and webhooks.',
    fullDescription: 'FlowGenius allows teams to design, test, and expose complex AI agent pipelines without writing redundant glue code. Built on React Flow and FastAPI with streaming responses, tool calling, and local vector embeddings storage.',
    image: imgAi,
    galleryImages: [imgAi, imgSaas],
    technologies: ['React 19', 'FastAPI', 'Python 3.12', 'LangChain', 'ChromaDB', 'Tailwind CSS'],
    version: 'v2.1.0',
    lastUpdated: '2026-09-10',
    rating: 4.88,
    reviewCount: 29,
    salesCount: 182,
    featured: true,
    trending: true,
    prices: {
      BDT: {
        current: 6500,
        original: 9200,
      },
      INR: {
        current: 4599,
        original: 6499,
      },
    },
    demoUrl: 'https://demo-aiflow.codemarket.dev',
    features: [
      'Interactive visual drag-and-drop workflow canvas',
      'Built-in model routing for Gemini 2.5, OpenAI, and Claude 3.5',
      'Document chunking and automated vector ingestion engine',
      'Webhook listener triggers for external events',
      'Streaming WebSocket execution debugger',
    ],
    requirements: ['Python 3.11+', 'Node.js 18+', '2GB RAM minimum for local embeddings'],
    whatsIncluded: [
      'Complete React frontend and Python FastAPI backend',
      '15 pre-built agent templates (Support bot, Data extractor, Code reviewer)',
      'Comprehensive REST API Postman collection',
      'Commercial deployment license',
    ],
    installationGuide: `1. Clone backend and run 'pip install -r requirements.txt'
2. Start Python server with 'uvicorn main:app --reload'
3. In frontend folder run 'npm install' and 'npm run dev'
4. Access the studio at http://localhost:5173`,
    changelog: [
      {
        version: 'v2.1.0',
        date: '2026-09-10',
        changes: ['Integrated Gemini 2.5 Flash streaming API', 'Added custom Python code evaluation node with sandboxing'],
      },
    ],
    licenseType: 'Commercial',
  },
  {
    id: 'prod-fintech-pay',
    title: 'PaySphere - Cross-Platform Fintech Wallet & Payment App',
    slug: 'paysphere-fintech-wallet-payment-app',
    category: 'Fintech & Mobile Apps',
    shortDescription: 'Production-ready Flutter & React Native wallet app with QR payments, bank transfers, and biometric auth.',
    fullDescription: 'A secure, PCI-DSS oriented mobile banking and wallet solution. Ready-made flows for sending money, QR code payments, transaction statements, split bills, and KYC document uploads. Pre-integrated with Razorpay UPI and bKash / Nagad payment gateways.',
    image: imgFintech,
    galleryImages: [imgFintech, imgEcommerce],
    technologies: ['Flutter 3.24', 'Dart', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'bKash API'],
    version: 'v4.0.1',
    lastUpdated: '2026-09-22',
    rating: 4.92,
    reviewCount: 46,
    salesCount: 312,
    featured: true,
    trending: false,
    prices: {
      BDT: {
        current: 8900,
        original: 13000,
      },
      INR: {
        current: 6200,
        original: 9100,
      },
    },
    demoUrl: 'https://demo-wallet.codemarket.dev',
    features: [
      'FaceID and Fingerprint biometric authentication',
      'QR Code merchant payment scanner and generator',
      'Instant bKash, Nagad, and Razorpay UPI checkout integration',
      'Downloadable PDF transaction statements',
      'Encrypted client-side storage for sensitive session tokens',
    ],
    requirements: ['Flutter SDK 3.24+', 'Android Studio / Xcode for compiling iOS', 'Node.js 20+ backend'],
    whatsIncluded: [
      'Full Flutter mobile app code (iOS and Android)',
      'Express.js backend with MongoDB schemas',
      'Figma design system file with 80+ mobile screens',
      'Direct developer setup documentation',
    ],
    installationGuide: `1. Open Flutter project in VS Code or Android Studio
2. Run 'flutter pub get'
3. Set your backend URL in lib/config/app_config.dart
4. Boot the server and run 'flutter run' on device or emulator`,
    changelog: [
      {
        version: 'v4.0.1',
        date: '2026-09-22',
        changes: ['Enhanced SSLCommerz payment callback verification', 'Fixed biometric prompt cancellation bug on Android 15'],
      },
    ],
    licenseType: 'Commercial',
  },
  {
    id: 'prod-multi-vendor',
    title: 'BazaarPro - Multi-Vendor Marketplace Platform',
    slug: 'bazaarpro-multivendor-marketplace-platform',
    category: 'E-Commerce Scripts',
    shortDescription: 'Scalable multi-vendor e-commerce script with merchant dashboards, commission management, and real-time inventory.',
    fullDescription: 'BazaarPro is a complete marketplace operating system. Allows multiple sellers to register, set up storefronts, manage products, fulfill orders, and receive payouts. Customers enjoy lightning-fast search, localized currency display (BDT & INR), cart, wishlist, and secure gateway checkout.',
    image: imgEcommerce,
    galleryImages: [imgEcommerce, imgSaas],
    technologies: ['React 19', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redis', 'SSLCommerz', 'Razorpay'],
    version: 'v5.2.0',
    lastUpdated: '2026-08-30',
    rating: 4.86,
    reviewCount: 52,
    salesCount: 420,
    featured: false,
    trending: true,
    prices: {
      BDT: {
        current: 7200,
        original: 9900,
      },
      INR: {
        current: 4999,
        original: 6999,
      },
    },
    demoUrl: 'https://demo-bazaar.codemarket.dev',
    features: [
      'Dedicated vendor onboarding portal with approval workflows',
      'Automatic commission calculation and payout balance tracking',
      'Country-specific currency switcher (Bangladesh BDT / India INR)',
      'Product variant matrix (Sizes, colors, technical licenses)',
      'Exportable CSV financial reports for tax and audit compliance',
    ],
    requirements: ['Node.js 20+', 'PostgreSQL 14+', 'SMTP email account for order notifications'],
    whatsIncluded: [
      'Customer storefront source code',
      'Vendor management portal source code',
      'Admin supervisory dashboard source code',
      'Backend REST API server',
      'Full database schema and seed data',
    ],
    installationGuide: `1. Extract archive and run 'npm install' across server and client
2. Configure DATABASE_URL and payment gateway secrets in .env
3. Run database migrations: 'npm run db:migrate'
4. Launch development servers with 'npm run dev'`,
    changelog: [
      {
        version: 'v5.2.0',
        date: '2026-08-30',
        changes: ['Integrated automated coupon application engine', 'Added support for localized city and delivery zone tariffs'],
      },
    ],
    licenseType: 'Commercial',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-dev20',
    code: 'DEV20',
    discountPercent: 20,
    minSpend: {
      BDT: 3000,
      INR: 2000,
    },
    validUntil: '2026-12-31',
    usageCount: 142,
    maxUsage: 500,
    isActive: true,
  },
  {
    id: 'coup-launch50',
    code: 'LAUNCH50',
    discountPercent: 50,
    minSpend: {
      BDT: 5000,
      INR: 3500,
    },
    validUntil: '2026-11-30',
    usageCount: 48,
    maxUsage: 100,
    isActive: true,
  },
  {
    id: 'coup-welcome10',
    code: 'WELCOME10',
    discountPercent: 10,
    minSpend: {
      BDT: 1000,
      INR: 800,
    },
    validUntil: '2027-01-01',
    usageCount: 310,
    maxUsage: 1000,
    isActive: true,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10492',
    orderNumber: 'CM-2026-10492',
    date: '2026-09-24 16:32',
    customerEmail: 'tanvir.dev@gmail.com',
    customerName: 'Tanvir Hossain',
    customerPhone: '+880 1712 345678',
    items: [
      {
        productId: 'prod-saas-core',
        productTitle: 'CloudTenancy - Enterprise Multi-Tenant SaaS Engine',
        price: 7800,
        currency: 'BDT',
        version: 'v3.4.2',
        licenseKey: 'CM-LIC-8942-XF92-BD90',
      },
    ],
    totalAmount: 7800,
    discountAmount: 0,
    currency: 'BDT',
    gateway: 'SSLCommerz',
    paymentStatus: 'PAID',
    transactionId: 'SSL-TXN-902341890',
    downloadCount: 2,
    downloadExpiry: '2027-09-24',
  },
  {
    id: 'ord-10491',
    orderNumber: 'CM-2026-10491',
    date: '2026-09-23 11:14',
    customerEmail: 'aravind.tech@outlook.com',
    customerName: 'Aravind Sharma',
    customerPhone: '+91 98765 43210',
    items: [
      {
        productId: 'prod-ai-flow',
        productTitle: 'FlowGenius - Node-Based AI Agent & Workflow Builder',
        price: 3679,
        currency: 'INR',
        version: 'v2.1.0',
        licenseKey: 'CM-LIC-4412-KJ88-IN11',
      },
    ],
    totalAmount: 3679,
    discountAmount: 920,
    couponCode: 'DEV20',
    currency: 'INR',
    gateway: 'Razorpay',
    paymentStatus: 'PAID',
    transactionId: 'pay_Nz9823h89ad',
    downloadCount: 1,
    downloadExpiry: '2027-09-23',
  },
  {
    id: 'ord-10490',
    orderNumber: 'CM-2026-10490',
    date: '2026-09-22 09:40',
    customerEmail: 'zubair.ahmed@dhakacode.com',
    customerName: 'Zubair Ahmed',
    customerPhone: '+880 1819 987654',
    items: [
      {
        productId: 'prod-fintech-pay',
        productTitle: 'PaySphere - Cross-Platform Fintech Wallet & Payment App',
        price: 8900,
        currency: 'BDT',
        version: 'v4.0.1',
        licenseKey: 'CM-LIC-7721-QQ44-BD33',
      },
    ],
    totalAmount: 8900,
    discountAmount: 0,
    currency: 'BDT',
    gateway: 'SSLCommerz',
    paymentStatus: 'PAID',
    transactionId: 'SSL-TXN-881273921',
    downloadCount: 3,
    downloadExpiry: '2027-09-22',
  },
];

export const INITIAL_STAFF: AdminUser[] = [
  {
    id: 'admin-01',
    email: 'admin@codemarket.dev',
    name: 'Chief Security Officer',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-25 22:15',
    twoFactorEnabled: true,
  },
  {
    id: 'admin-02',
    email: 'operations@codemarket.dev',
    name: 'Rahim Chowdhury',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-25 18:30',
    twoFactorEnabled: true,
  },
  {
    id: 'admin-03',
    email: 'support@codemarket.dev',
    name: 'Priya Patel',
    role: 'SUPPORT_STAFF',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-24 14:10',
    twoFactorEnabled: false,
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-901',
    timestamp: '2026-09-25 22:15:02',
    adminEmail: 'admin@codemarket.dev',
    action: 'ADMIN_SESSION_AUTHORIZED',
    target: 'Auth Subsystem (2FA Verified)',
    ipAddress: '103.84.152.12',
    severity: 'INFO',
  },
  {
    id: 'audit-900',
    timestamp: '2026-09-25 19:42:18',
    adminEmail: 'operations@codemarket.dev',
    action: 'PRODUCT_PRICE_UPDATED',
    target: 'CloudTenancy (BDT: 7800, INR: 5499)',
    ipAddress: '115.127.48.91',
    severity: 'INFO',
  },
  {
    id: 'audit-899',
    timestamp: '2026-09-24 11:05:44',
    adminEmail: 'admin@codemarket.dev',
    action: 'PAYMENT_GATEWAY_WEBHOOK_ROTATED',
    target: 'Razorpay Secret Key',
    ipAddress: '103.84.152.12',
    severity: 'WARNING',
  },
  {
    id: 'audit-898',
    timestamp: '2026-09-23 15:20:11',
    adminEmail: 'support@codemarket.dev',
    action: 'LICENSE_RESET_GRANTED',
    target: 'Order CM-2026-10490 (Customer: Zubair Ahmed)',
    ipAddress: '122.170.82.14',
    severity: 'INFO',
  },
];

export const INITIAL_DOWNLOAD_LOGS: DownloadLog[] = [
  {
    id: 'dl-401',
    orderNumber: 'CM-2026-10492',
    productId: 'prod-saas-core',
    productTitle: 'CloudTenancy - Enterprise Multi-Tenant SaaS Engine',
    customerEmail: 'tanvir.dev@gmail.com',
    timestamp: '2026-09-24 16:45:10',
    ipAddress: '103.205.180.4',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'SUCCESS',
  },
  {
    id: 'dl-400',
    orderNumber: 'CM-2026-10491',
    productId: 'prod-ai-flow',
    productTitle: 'FlowGenius - Node-Based AI Agent & Workflow Builder',
    customerEmail: 'aravind.tech@outlook.com',
    timestamp: '2026-09-23 11:25:34',
    ipAddress: '49.206.12.98',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'SUCCESS',
  },
  {
    id: 'dl-399',
    orderNumber: 'CM-2026-10490',
    productId: 'prod-fintech-pay',
    productTitle: 'PaySphere - Cross-Platform Fintech Wallet & Payment App',
    customerEmail: 'zubair.ahmed@dhakacode.com',
    timestamp: '2026-09-22 09:55:00',
    ipAddress: '103.114.99.20',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    status: 'SUCCESS',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-saas-core',
    productTitle: 'CloudTenancy - Enterprise Multi-Tenant SaaS Engine',
    author: 'Kazi Farhan',
    rating: 5,
    date: '2026-09-19',
    comment: 'The multi-tenant architecture saved us at least 3 months of engineering. The SSLCommerz webhook handled bKash and credit cards without a single hitch in Bangladesh.',
    verifiedPurchase: true,
    status: 'APPROVED',
  },
  {
    id: 'rev-02',
    productId: 'prod-ai-flow',
    productTitle: 'FlowGenius - Node-Based AI Agent & Workflow Builder',
    author: 'Rohit Verma',
    rating: 5,
    date: '2026-09-12',
    comment: 'Top quality clean React code with node streaming. Razorpay checkout in INR was instant and our license key worked right out of the zip download.',
    verifiedPurchase: true,
    status: 'APPROVED',
  },
  {
    id: 'rev-03',
    productId: 'prod-fintech-pay',
    productTitle: 'PaySphere - Cross-Platform Fintech Wallet & Payment App',
    author: 'Mahmudul Hasan',
    rating: 5,
    date: '2026-09-23',
    comment: 'Extremely clean Flutter project structure. The state management with riverpod is well documented and easy to customize for our fintech venture.',
    verifiedPurchase: true,
    status: 'APPROVED',
  },
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-101',
    ticketNumber: 'SUP-8921',
    customerEmail: 'tanvir.dev@gmail.com',
    subject: 'Question on Docker compose database migrations',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    createdAt: '2026-09-24 18:00',
    lastReply: 'Support team replied with verified command sequence.',
    productTitle: 'CloudTenancy - Enterprise Multi-Tenant SaaS Engine',
  },
  {
    id: 'tkt-102',
    ticketNumber: 'SUP-8922',
    customerEmail: 'aravind.tech@outlook.com',
    subject: 'Adding custom Ollama local endpoint to FlowGenius',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-25 10:15',
    lastReply: 'Staff reviewing sample config snippet.',
    productTitle: 'FlowGenius - Node-Based AI Agent & Workflow Builder',
  },
];

export const INITIAL_GATEWAY_CONFIG: PaymentGatewayConfig = {
  sslCommerz: {
    storeId: 'codemarket_live_bd01',
    storePassword: '************************',
    isSandbox: true,
    ipnUrl: 'https://api.codemarket.dev/v1/payments/sslcommerz/ipn',
    supportedMethods: ['bKash', 'Nagad', 'Rocket', 'Upay', 'Visa', 'Mastercard', 'City Bank Amex'],
  },
  razorpay: {
    keyId: 'rzp_live_98234812a',
    keySecret: '************************',
    isSandbox: true,
    webhookSecret: 'whsec_90823412abcdef',
    supportedMethods: ['UPI (GPay / PhonePe / Paytm)', 'Credit / Debit Cards', 'Net Banking', 'CRED'],
  },
};

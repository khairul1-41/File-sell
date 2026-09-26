import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Download,
  Copy,
  Check,
  CreditCard,
  Smartphone,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    country,
    formatPrice,
    appliedCoupon,
    createOrder,
    recordDownload,
    setCurrentView,
  } = useMarket();

  const { customerUser, customerLogin } = useAuth();

  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'SUCCESS'>('DETAILS');
  const [customerName, setCustomerName] = useState(customerUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(customerUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(
    country.code === 'BD' ? '+880 1712 345678' : '+91 98765 43210'
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    country.code === 'BD' ? 'bKash' : 'UPI'
  );
  const [upiId, setUpiId] = useState('developer@okaxis');
  const [bkashNumber, setBkashNumber] = useState('01712345678');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isKeyCopied, setIsKeyCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isCheckoutOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.prices[country.currency].current;
    const multiplier = item.selectedLicense === 'Extended Commercial' ? 2.5 : 1;
    return acc + Math.round(unitPrice * multiplier) * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon
    ? Math.round((rawSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) return;
    if (!customerUser) {
      customerLogin(customerEmail, customerName);
    }
    setStep('PAYMENT');
  };

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Generate simulated order
      const randomKey1 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const randomKey2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const licenseKey = `CM-LIC-${randomKey1}-${randomKey2}-${country.code}26`;

      const orderItems = cart.map((item) => {
        const unitPrice = item.product.prices[country.currency].current;
        const multiplier = item.selectedLicense === 'Extended Commercial' ? 2.5 : 1;
        return {
          productId: item.product.id,
          productTitle: item.product.title,
          price: Math.round(unitPrice * multiplier) * item.quantity,
          currency: country.currency,
          version: item.product.version,
          licenseKey,
        };
      });

      const order = createOrder({
        customerEmail,
        customerName,
        customerPhone,
        items: orderItems,
        totalAmount: finalTotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        currency: country.currency,
        gateway: country.gateway,
        paymentStatus: 'PAID',
        transactionId:
          country.code === 'BD'
            ? `SSL-TXN-${Date.now().toString().slice(-9)}`
            : `pay_${Date.now().toString(36)}`,
      });

      setIsProcessing(false);
      setCompletedOrder(order);
      setStep('SUCCESS');
    }, 1200);
  };

  const handleDownloadZip = (orderNumber: string, productId: string, title: string) => {
    recordDownload(orderNumber, productId);
    setIsDownloaded(true);

    // Create a simulated downloadable text/zip file
    const content = `================================================
CodeMarket Digital Source Code Package
Order: ${orderNumber}
Product: ${title}
Licensed to: ${customerEmail}
Key: ${completedOrder?.items[0]?.licenseKey || 'CM-LIC-VERIFIED'}
Verification: Authentic & Certified
================================================
Thank you for your purchase from CodeMarket.
Extract your production archive and review README.md.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-source.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLicenseKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setIsKeyCopied(true);
    setTimeout(() => setIsKeyCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isProcessing) setIsCheckoutOpen(false);
        }}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {step === 'SUCCESS' ? 'Order Confirmed & Delivered' : 'Secure Digital Checkout'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {country.name} · Local Gateway: {country.gateway}
              </p>
            </div>
          </div>
          {step !== 'SUCCESS' && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: CUSTOMER DETAILS */}
          {step === 'DETAILS' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-4">
                <div className="flex justify-between text-xs text-slate-700 font-medium mb-1">
                  <span>Cart Items ({cart.length})</span>
                  <span className="font-mono tabular-nums font-bold">{formatPrice(finalTotal)}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Instant source code delivery to your email upon payment.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hossain / Aravind Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="developer@company.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  License keys and download verification links will be dispatched here.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number ({country.name})
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to {country.gateway} Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GATEWAY PAYMENT (SSLCOMMERZ OR RAZORPAY) */}
          {step === 'PAYMENT' && (
            <div className="space-y-5">
              {/* Gateway Banner */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {country.gateway} Secure Gateway
                  </span>
                  <span className="text-[11px] text-slate-500">
                    256-bit Bank Grade SSL Encryption
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-950 font-mono tabular-nums block">
                    {formatPrice(finalTotal)}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    Zero gateway surcharge
                  </span>
                </div>
              </div>

              {/* Bangladesh SSLCommerz Options */}
              {country.code === 'BD' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    Select Bangladesh Payment Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['bKash', 'Nagad', 'Cards / Visa', 'Rocket', 'City Touch', 'Islami Bank'].map(
                      (m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                            paymentMethod === m
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {m}
                        </button>
                      )
                    )}
                  </div>

                  {paymentMethod === 'bKash' && (
                    <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-pink-900">bKash Online Checkout</p>
                      <input
                        type="text"
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3 py-2 text-xs bg-white border border-pink-300 rounded-lg text-slate-900"
                      />
                      <p className="text-[10px] text-pink-700">
                        A simulated OTP / PIN confirmation will be processed safely.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Cards / Visa' && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-slate-800">Visa / Mastercard / Amex</p>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* India Razorpay Options */}
              {country.code === 'IN' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    Select India Payment Method (Razorpay):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['UPI', 'Cards', 'NetBanking', 'CRED', 'Paytm', 'EMI'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          paymentMethod === m
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-indigo-950">
                        Instant UPI Payment (GPay / PhonePe / BHIM)
                      </p>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis"
                        className="w-full px-3 py-2 text-xs bg-white border border-indigo-300 rounded-lg text-slate-900 font-mono"
                      />
                      <p className="text-[10px] text-indigo-700">
                        Accept prompt on your UPI mobile app.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('DETAILS')}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePayNow}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span>Verifying {country.gateway} Transaction...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay {formatPrice(finalTotal)} Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED & INSTANT DELIVERY */}
          {step === 'SUCCESS' && completedOrder && (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">Payment Confirmed!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Order <span className="font-mono font-semibold text-slate-800">{completedOrder.orderNumber}</span> verified via {completedOrder.gateway}.
                </p>
              </div>

              {/* License Key Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Digital License Key:</span>
                  <button
                    onClick={() => handleCopyLicenseKey(completedOrder.items[0]?.licenseKey)}
                    className="flex items-center gap-1 text-[11px] text-indigo-600 font-semibold hover:underline cursor-pointer"
                  >
                    {isKeyCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isKeyCopied ? 'Copied' : 'Copy Key'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs font-semibold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200 truncate">
                  {completedOrder.items[0]?.licenseKey}
                </div>
                <p className="text-[10px] text-slate-400">
                  This key grants perpetual commercial deployment rights. Keep this safe.
                </p>
              </div>

              {/* Instant Download Action */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    handleDownloadZip(
                      completedOrder.orderNumber,
                      completedOrder.items[0]?.productId,
                      completedOrder.items[0]?.productTitle
                    )
                  }
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isDownloaded ? 'Downloaded! Click to Download Again (.zip)' : 'Download Source Code Package (.zip)'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCurrentView('account');
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  View In Customer Portal & Download History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

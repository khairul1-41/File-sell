import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  ExternalLink,
  ShoppingBag,
  Heart,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  Download,
  Terminal,
  Clock,
  Layers,
  HelpCircle,
  MessageSquare,
  Copy,
  Check,
} from 'lucide-react';
import { Product } from '../../types';
import { useMarket } from '../../context/MarketContext';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const {
    country,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    products,
    reviews,
  } = useMarket();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'features' | 'installation' | 'included' | 'changelog' | 'license' | 'reviews' | 'faq'
  >('overview');
  const [selectedLicense, setSelectedLicense] = useState<'Commercial' | 'Extended Commercial'>('Commercial');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const currentPrice = product.prices[country.currency].current;
  const originalPrice = product.prices[country.currency].original;
  const multiplier = selectedLicense === 'Extended Commercial' ? 2.5 : 1;
  const finalPrice = Math.round(currentPrice * multiplier);

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const allImages = [product.image, ...(product.galleryImages || [])];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(product.installationGuide);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-6 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </button>

        {/* Top Product Hero (Gallery + Sticky Purchase Module) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Gallery & Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-16/10 bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 relative shadow-sm">
              <img
                src={allImages[activeImageIndex] || product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white border border-white/10">
                {product.category}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-indigo-600 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technology Stack Badges */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Core Technology Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                  <span>Version {product.version}</span>
                  <span>Updated {product.lastUpdated}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="tabular-nums">{product.rating}</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-600">{product.reviewCount} customer reviews</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-emerald-600 font-medium">{product.salesCount} purchases</span>
                </div>
              </div>

              {/* License Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select License Agreement:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedLicense('Commercial')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedLicense === 'Commercial'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900">Commercial</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Use in 1 end product, unlimited internal devs</p>
                  </button>

                  <button
                    onClick={() => setSelectedLicense('Extended Commercial')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedLicense === 'Extended Commercial'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900">Extended Commercial</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Resellable SaaS & unlimited clients</p>
                  </button>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tabular-nums">
                      {formatPrice(finalPrice)}
                    </span>
                    {originalPrice > currentPrice && selectedLicense === 'Commercial' && (
                      <span className="ml-2 text-sm text-slate-400 line-through tabular-nums">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {country.name} ({country.currency})
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Local payment available via <span className="font-semibold text-slate-700">{country.gateway}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => addToCart(product, selectedLicense)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart & Checkout</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo Sandbox</span>
                    </a>
                  )}

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`py-2.5 px-3 border font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant ZIP Download & Unique License Key</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Verified 100% Unobfuscated TypeScript/Dart Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>6 Months Technical Updates & Direct Author Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections (Tabbed Navigation) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs mb-16">
          {/* Tab Bar */}
          <div className="border-b border-slate-200 bg-slate-50/50 flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features & Architecture' },
              { id: 'installation', label: 'Setup & Installation' },
              { id: 'included', label: "What's Included" },
              { id: 'changelog', label: 'Changelog' },
              { id: 'reviews', label: `Reviews (${productReviews.length})` },
              { id: 'license', label: 'License Terms' },
              { id: 'faq', label: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-900 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="prose max-w-none text-slate-700 space-y-4 text-sm leading-relaxed">
                <h3 className="text-lg font-bold text-slate-900">Project Overview</h3>
                <p>{product.fullDescription}</p>
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    System Requirements
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    {product.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Key Engineering Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Step-by-Step Installation Guide</h3>
                  <button
                    onClick={handleCopyInstall}
                    className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy Commands'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <pre>{product.installationGuide}</pre>
                </div>
              </div>
            )}

            {activeTab === 'included' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">What's Inside The Download Package</h3>
                <ul className="space-y-2">
                  {product.whatsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                      <FileCode className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'changelog' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Version History & Release Notes</h3>
                <div className="space-y-4">
                  {product.changelog.map((cl, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="font-bold text-indigo-600">{cl.version}</span>
                        <span className="text-slate-400">{cl.date}</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                        {cl.changes.map((change, cIdx) => (
                          <li key={cIdx}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Customer Feedback & Reviews</h3>
                    <p className="text-xs text-slate-500">Only verified purchasers can submit reviews.</p>
                  </div>
                </div>

                {productReviews.length > 0 ? (
                  <div className="space-y-4">
                    {productReviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500 text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No reviews yet for this version.</p>
                )}
              </div>
            )}

            {activeTab === 'license' && (
              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <h3 className="text-lg font-bold text-slate-900">Commercial License Terms</h3>
                <p>
                  The Standard Commercial License grants you a non-exclusive, worldwide, and perpetual right to utilize the source code to create an unlimited number of internal or client applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-emerald-950">
                    <p className="font-bold mb-2">What is Allowed:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Use for personal and commercial client products</li>
                      <li>Modify, fork, or combine with other libraries</li>
                      <li>Deploy on any cloud provider (AWS, GCP, Vercel, VPS)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 text-rose-950">
                    <p className="font-bold mb-2">What is Prohibited:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Re-distribute or re-sell the raw source code as a template</li>
                      <li>Make the source repository public without license validation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4 text-xs text-slate-700">
                <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">When do I get access to the code?</p>
                    <p className="text-slate-600">Instantly upon payment confirmation. A direct ZIP download button is shown on the receipt, and the download link is saved to your account forever.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Which payment methods are accepted in Bangladesh & India?</p>
                    <p className="text-slate-600">In Bangladesh, we support bKash, Nagad, Rocket, and local debit/credit cards via SSLCommerz. In India, we support UPI (Google Pay, PhonePe, Paytm), NetBanking, and credit/debit cards via Razorpay.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Related Source Code Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Star, ExternalLink, ShoppingBag, Eye, Heart, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { useMarket } from '../../context/MarketContext';

interface ProductCardProps {
  product: Product;
  onOpenDemo?: (demoUrl: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDemo }) => {
  const {
    country,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    setCurrentView,
  } = useMarket();

  const isWishlisted = wishlist.includes(product.id);
  const currentPrice = product.prices[country.currency].current;
  const originalPrice = product.prices[country.currency].original;
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'Commercial');
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenDemo && product.demoUrl) {
      onOpenDemo(product.demoUrl);
    } else if (product.demoUrl) {
      window.open(product.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* 1. Large Preview Image */}
      <div className="relative aspect-16/10 bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Top Badges: Category & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-white/90 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            {product.category}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-slate-900/60 text-white/80 hover:bg-slate-900 hover:text-white'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay: Version & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded">
              {product.version}
            </span>
            <span className="text-[11px] text-slate-300">Updated {product.lastUpdated}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md font-semibold text-amber-300 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="tabular-nums">{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-snug">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {product.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
            {product.technologies.length > 4 && (
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                +{product.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* 3. Pricing and Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-xs text-slate-400 line-through tabular-nums">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">
                Inclusive of commercial license & updates
              </p>
            </div>

            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md tabular-nums">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Action Button Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {product.demoUrl ? (
              <button
                type="button"
                onClick={handleDemoClick}
                className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Open Live Preview"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCardClick}
                className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCardClick}
              className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

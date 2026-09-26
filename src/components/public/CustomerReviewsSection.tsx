import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const CustomerReviewsSection: React.FC = () => {
  const { reviews } = useMarket();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          Verified Feedback
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Trusted by 1,200+ Developers & Founders
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Read uncensored feedback from software engineers who shipped products with our source code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {rev.verifiedPurchase && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">{rev.author}</span>
              <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

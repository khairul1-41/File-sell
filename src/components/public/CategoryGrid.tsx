import React from 'react';
import { Server, Cpu, Smartphone, ShoppingBag, Terminal, Layers, ArrowRight } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { Category } from '../../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  Cpu,
  Smartphone,
  ShoppingBag,
  Terminal,
  Layers,
};

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategorySlug, setCurrentView, setSelectedProduct } = useMarket();

  const handleCategorySelect = (category: Category) => {
    setSelectedProduct(null);
    setSelectedCategorySlug(category.slug);
    setCurrentView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Curated Categories
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Browse by Engineering Domain
          </h2>
        </div>
        <button
          onClick={() => {
            setSelectedCategorySlug(null);
            setCurrentView('categories');
          }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors group cursor-pointer"
        >
          <span>View all 16 domains</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Layers;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat)}
              className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md transition-all text-left group flex flex-col justify-between h-36 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  {cat.productCount} packages
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

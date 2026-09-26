import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Star, ExternalLink, X, Check } from 'lucide-react';
import { useMarket } from '../../../context/MarketContext';
import { Product } from '../../../types';

export const ProductsView: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, formatPrice } = useMarket();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SaaS Boilerplates');
  const [bdtPrice, setBdtPrice] = useState(6500);
  const [inrPrice, setInrPrice] = useState(4500);
  const [version, setVersion] = useState('v1.0.0');
  const [technologies, setTechnologies] = useState('React, Node.js, PostgreSQL');
  const [shortDescription, setShortDescription] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addProduct({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category,
      shortDescription: shortDescription || 'High-performance production source code package with complete documentation.',
      fullDescription: 'Comprehensive full-stack enterprise codebase designed for commercial scalability and high traffic workloads.',
      image: products[0]?.image || '',
      galleryImages: [],
      technologies: technologies.split(',').map((t) => t.trim()),
      version,
      lastUpdated: new Date().toISOString().substring(0, 10),
      rating: 5.0,
      reviewCount: 1,
      salesCount: 0,
      featured: true,
      trending: false,
      prices: {
        BDT: { current: bdtPrice, original: Math.round(bdtPrice * 1.3) },
        INR: { current: inrPrice, original: Math.round(inrPrice * 1.3) },
      },
      features: ['Full unobfuscated code', 'Database migration schemas', 'SSLCommerz & Razorpay support'],
      requirements: ['Node.js >= 20.x'],
      whatsIncluded: ['Full source files', 'Documentation PDF'],
      installationGuide: 'npm install\nnpm run dev',
      changelog: [{ version, date: new Date().toISOString().substring(0, 10), changes: ['Initial verified release'] }],
      licenseType: 'Commercial',
    });

    setIsAddModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Product Catalog & Code Packages</h2>
          <p className="text-xs text-slate-400">
            Manage listings, country prices (BDT & INR), release versions, and license options.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Source Code Package</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4 text-center">Sales</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-lg border border-slate-800"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate max-w-[200px]">{p.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono truncate max-w-[200px]">
                          {p.technologies.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{p.category}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{p.version}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                    ৳{p.prices.BDT.current.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400 tabular-nums">
                    ₹{p.prices.INR.current.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-200">{p.salesCount}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 z-10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Digital Source Code Package</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. NextGen - AI Multi-Tenant SaaS Boilerplate"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="SaaS Boilerplates">SaaS Boilerplates</option>
                    <option value="AI & LLM Systems">AI & LLM Systems</option>
                    <option value="Fintech & Mobile Apps">Fintech & Mobile Apps</option>
                    <option value="E-Commerce Scripts">E-Commerce Scripts</option>
                    <option value="Developer Tools">Developer Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Release Version</label>
                  <input
                    type="text"
                    required
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="v1.0.0"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (Bangladesh BDT ৳)</label>
                  <input
                    type="number"
                    required
                    value={bdtPrice}
                    onChange={(e) => setBdtPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (India INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={inrPrice}
                    onChange={(e) => setInrPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="Next.js 15, TypeScript, Tailwind, PostgreSQL"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Key architecture summary for developers..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

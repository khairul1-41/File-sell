import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Do I get access to the complete source code or just a compiled build?',
    a: 'You receive 100% complete, unobfuscated source code with full repository history, TypeScript definitions, database migration scripts, and documentation files.',
  },
  {
    q: 'How does payment processing work for Bangladesh and India?',
    a: 'For buyers in Bangladesh, payments are natively processed in BDT via SSLCommerz supporting bKash, Nagad, Rocket, and domestic bank cards. For buyers in India, payments are processed in INR via Razorpay supporting UPI (Google Pay, PhonePe, Paytm), NetBanking, and credit/debit cards.',
  },
  {
    q: 'Can I use the purchased source code in client commercial projects?',
    a: 'Yes. Our Standard Commercial License allows you to deploy the code in an unlimited number of client installations or single commercial SaaS businesses without recurring fees.',
  },
  {
    q: 'What happens if I encounter an issue setting up the repository?',
    a: 'Every package includes comprehensive documentation, sample environment variables, and Docker Compose configurations. If you encounter any bugs, our technical support ticket system offers direct response within 24 hours.',
  },
  {
    q: 'Are future version updates included with my purchase?',
    a: 'Yes! Every purchase comes with 6 months of continuous semantic version updates, bug fixes, and security patches downloadable directly from your customer account.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200/80">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          Support & Clarity
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/90 bg-white overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { REVIEWS, BAKERY_FAQS } from '../data/cakes';

export const ReviewsAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
              Client Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1C]">
              Celebrated Moments &amp; Gatherings
            </h2>
            <div className="flex items-center justify-center gap-1 text-[#C5A059] pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-semibold text-[#241E1C] ml-2 font-mono tabular-nums">
                4.98 / 5.0 (820+ Celebrations)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-[#EAE3D6] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C524B] leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1]">
                  <div className="text-xs font-semibold text-[#241E1C]">{rev.author}</div>
                  <div className="text-[11px] text-[#8C827A] flex items-center gap-1">
                    <span>{rev.occasion}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
              Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#241E1C]">
              Baking, Ordering &amp; Delivery Logistics
            </h3>
          </div>

          <div className="space-y-3">
            {BAKERY_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#EAE3D6] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-medium text-xs sm:text-sm text-[#241E1C] hover:text-[#9E3E2F] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8C827A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8C827A] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-[#6B615A] leading-relaxed border-t border-[#F5ECE8] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

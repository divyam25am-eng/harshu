import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import heroSignatureCakeImg from '../assets/images/hero_signature_cake_1791195521402.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCustomStudioClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCustomStudioClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
              Artisanal Pâtisserie &amp; Bespoke Cake Studio
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#241E1C] leading-[1.1] tracking-tight [text-wrap:balance]">
              Handcrafted celebration cakes, baked with French technique &amp; wild botanicals.
            </h1>

            <p className="text-base sm:text-lg text-[#5C524B] leading-relaxed max-w-xl font-normal">
              Layered with Normandy churned butter, single-origin Valrhona chocolate, and fresh California fruit reductions. Designed to make your gatherings unforgettable.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#241E1C] hover:bg-[#3D3531] text-[#FAF7F2] text-sm font-medium tracking-wide rounded-md transition-all shadow-sm flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Browse Signature Cakes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onCustomStudioClick}
                className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F3EFEA] text-[#241E1C] border border-[#D9CEBF] text-sm font-medium tracking-wide rounded-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#9E3E2F]" />
                <span>Build Custom Cake</span>
              </button>
            </div>

            {/* Clean unboxed proof markers */}
            <div className="pt-6 border-t border-[#EAE3D6] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#6B615A]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F]" />
                <span>Freshly Baked Every Morning</span>
              </div>
              <span aria-hidden="true" className="text-[#D9CEBF]">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F]" />
                <span>100% Organic Flours &amp; Berries</span>
              </div>
              <span aria-hidden="true" className="text-[#D9CEBF]">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F]" />
                <span>White-Glove Temperature Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 lg:aspect-4/3 bg-[#EFE9DF]">
              <img
                src={heroSignatureCakeImg}
                alt="Artisanal layered celebration cake with fresh figs, blackberries, rosemary botanicals and 24k gold leaf"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle luxury caption overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#241E1C]/85 via-[#241E1C]/40 to-transparent p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-[#EBDDD4] font-medium">
                  Atelier Centerpiece
                </div>
                <div className="text-lg sm:text-xl font-serif mt-1">
                  The Grand Botanical Two-Tier
                </div>
                <div className="text-xs text-[#EAE3D6] mt-0.5">
                  Madagascar bourbon vanilla, hand-crushed blackberry compote, organic figs &amp; 24k gold leaf
                </div>
              </div>
            </div>

            {/* Floating Quality Note */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FAF7F2] border border-[#E0D8CB] p-4 rounded-xl shadow-lg items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-[#F5ECE8] text-[#9E3E2F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#241E1C]">
                <span className="font-semibold block text-sm">48-Hour Order Lead Time</span>
                <span className="text-[#6B615A]">Every cake is baked freshly to order on the day of your event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

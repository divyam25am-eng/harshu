import React from 'react';
import { Package, Calendar, Award, ArrowRight, Check } from 'lucide-react';
import heroSignatureCakeImg from '../assets/images/hero_signature_cake_1791195521402.jpg';
import { CakeItem } from '../types/cake';

interface TastingBoxSectionProps {
  onSelectTastingBox: () => void;
  onOpenConsultation: () => void;
}

export const TastingBoxSection: React.FC<TastingBoxSectionProps> = ({
  onSelectTastingBox,
  onOpenConsultation,
}) => {
  return (
    <section id="tasting-box" className="py-16 sm:py-24 bg-[#F5ECE8]/50 border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E0D8CB] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Visual Representation */}
          <div className="lg:col-span-5 relative bg-[#241E1C] min-h-[320px] lg:min-h-full">
            <img
              src={heroSignatureCakeImg}
              alt="Artisanal Wedding Cake Tasting Flight Box"
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241E1C] via-[#241E1C]/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-widest text-[#EBDDD4] font-medium">
                Wedding &amp; Celebration Tasting Flight
              </span>
              <h3 className="text-2xl font-serif mt-1">
                Five Curated Signature Slices
              </h3>
              <p className="text-xs text-[#D9CEBF] mt-1">
                Sample our most requested sponge, buttercream, and fruit reductions from the comfort of home.
              </p>
            </div>
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
                Planning a Wedding or Gala?
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1C]">
                The Atelier Cake Tasting Box
              </h2>
              <p className="text-sm text-[#5C524B] leading-relaxed">
                Tasting is the sweetest part of event planning. Each box includes 5 generous slices of our signature creations, a flavor notes booklet, and a $40 credit applied toward any tiered celebration cake order over $200.
              </p>

              {/* Flavor lineup */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C524B]">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F] mt-1.5 shrink-0" />
                  <span><strong>Velvet Noir:</strong> 70% Valrhona Dark Ganache</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F] mt-1.5 shrink-0" />
                  <span><strong>Pistachio Framboise:</strong> Bronte Nut &amp; Coulis</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F] mt-1.5 shrink-0" />
                  <span><strong>Earl Grey Lavender:</strong> Bergamot Blossom</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F] mt-1.5 shrink-0" />
                  <span><strong>Citron Amande:</strong> Amalfi Lemon &amp; Marcona</span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-6 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#8C827A]">Box Price (Includes $40 Tiered Credit)</div>
                <div className="text-2xl font-serif font-semibold text-[#241E1C] font-mono tabular-nums">
                  $42.00
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-3 border border-[#D9CEBF] text-xs font-medium text-[#241E1C] hover:bg-[#FAF7F2] rounded-md transition-colors whitespace-nowrap"
                >
                  Book Consultation
                </button>
                <button
                  onClick={onSelectTastingBox}
                  className="px-6 py-3 bg-[#9E3E2F] hover:bg-[#863326] text-white text-xs font-medium tracking-wider uppercase rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Order Tasting Box</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

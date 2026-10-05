import React from 'react';
import cakePistachioRaspberryImg from '../assets/images/cake_pistachio_raspberry_1791195542066.jpg';

export const StorySection: React.FC = () => {
  return (
    <section id="our-craft" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Atelier Framing */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E0D8CB] aspect-4/5 bg-[#EFE9DF]">
              <img
                src={cakePistachioRaspberryImg}
                alt="Pastry Chef crafting layered botanical gateau"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Chef Quote Card */}
            <div className="mt-4 p-5 bg-white border border-[#E0D8CB] rounded-xl shadow-xs">
              <blockquote className="text-xs sm:text-sm italic font-serif text-[#241E1C] leading-relaxed">
                &ldquo;A celebration cake is never just sugar and flour. It is the sensory centerpiece of the most cherished hours of our lives. We treat every crumb with reverence.&rdquo;
              </blockquote>
              <div className="mt-2 text-xs font-semibold text-[#9E3E2F]">
                Chef Margot Devalier
              </div>
              <div className="text-[11px] text-[#8C827A]">
                Founder &amp; Maître Pâtissier
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
              The Atelier Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#241E1C] [text-wrap:balance]">
              Uncompromising French technique rooted in seasonal botanical purity.
            </h2>

            <p className="text-sm sm:text-base text-[#5C524B] leading-relaxed">
              Founded in 2021 in San Francisco, Velvet &amp; Crumb was born out of a desire to break away from overly sweet, hyper-artificial celebration cakes. We build our recipes around balanced acidities, delicate floral infusions, and true ingredient depth.
            </p>

            {/* Three Pillar Points */}
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#EAE3D6] space-y-1">
                <h4 className="text-sm font-semibold text-[#241E1C]">
                  01. Normandy AOP Cultured Butter
                </h4>
                <p className="text-xs text-[#6B615A] leading-relaxed">
                  We exclusively use cultured butter with 84% butterfat from Normandy. It yields a light Swiss meringue buttercream that melts instantly on the tongue without greasiness.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EAE3D6] space-y-1">
                <h4 className="text-sm font-semibold text-[#241E1C]">
                  02. Single-Origin Valrhona Cacao
                </h4>
                <p className="text-xs text-[#6B615A] leading-relaxed">
                  Our chocolate cakes and ganaches are crafted using Valrhona Guanaja 70% and Caraïbe 66% beans, providing complex aromas of dried fruit and warm spices without excess sugar.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EAE3D6] space-y-1">
                <h4 className="text-sm font-semibold text-[#241E1C]">
                  03. Hand-Harvested Organic Botanicals
                </h4>
                <p className="text-xs text-[#6B615A] leading-relaxed">
                  Every edible bloom, lavender sprig, and fig is sourced directly from certified organic pesticide-free Northern California farms on the morning of decoration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

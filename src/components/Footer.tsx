import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCustomStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCustomStudio,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#241E1C] text-[#FAF7F2] border-t border-[#382E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-serif tracking-wide text-[#FAF7F2]">
              Velvet &amp; Crumb
            </span>
            <p className="text-xs text-[#B8A796] leading-relaxed max-w-sm">
              Artisanal celebration cakes and botanical gateaux baked daily in San Francisco. Honoring classic French pâtisserie with unbleached organic flours, Normandy churned butter, and single-origin Valrhona chocolate.
            </p>
            <div className="text-[11px] text-[#8C7D73]">
              Atelier: 428 Artisan Way, Suite 100, San Francisco, CA 94107
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D9CEBF]">
              The Atelier
            </div>
            <ul className="space-y-2 text-xs text-[#B8A796]">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors"
                >
                  Signature Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomStudio}
                  className="hover:text-white transition-colors"
                >
                  Custom Cake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tasting-box')}
                  className="hover:text-white transition-colors"
                >
                  Wedding Tasting Flights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-craft')}
                  className="hover:text-white transition-colors"
                >
                  Our Craft &amp; Ingredients
                </button>
              </li>
            </ul>
          </div>

          {/* Service & Care */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D9CEBF]">
              Customer Care
            </div>
            <ul className="space-y-2 text-xs text-[#B8A796]">
              <li>
                <button
                  onClick={() => onNavigate('atelier')}
                  className="hover:text-white transition-colors"
                >
                  Pickup &amp; Delivery Radius
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('atelier')}
                  className="hover:text-white transition-colors"
                >
                  Cake Storage &amp; Cutting Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('atelier')}
                  className="hover:text-white transition-colors"
                >
                  Dietary &amp; Allergen Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('atelier')}
                  className="hover:text-white transition-colors"
                >
                  Event Catering Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter: Seasonal Flavors */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D9CEBF]">
              Seasonal Flavor Releases
            </div>
            <p className="text-xs text-[#B8A796] leading-relaxed">
              Subscribe for early access to our seasonal holiday collections, limited botanical gateaux, and pastry tasting dates.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#332A26] rounded-lg border border-[#4D3F38] text-xs text-[#D9CEBF] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>You are now subscribed to our seasonal letters.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#2E2623] border border-[#4A3D36] rounded-md text-white placeholder-[#8C7D73] focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to seasonal newsletter"
                  className="px-4 py-2 bg-[#9E3E2F] hover:bg-[#863326] text-white text-xs font-medium rounded-md transition-colors shrink-0 flex items-center justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Bottom Legal / Copyright */}
        <div className="pt-8 border-t border-[#382E2A] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7D73] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Velvet &amp; Crumb Pâtisserie LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Organic Certified Workstation</span>
            <span aria-hidden="true">·</span>
            <span>Food Safety Audited</span>
            <span aria-hidden="true">·</span>
            <span>San Francisco, California</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Clock, MapPin } from 'lucide-react';
import { CartItem } from '../types/cake';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenCustomStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onNavigate,
  onOpenCustomStudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Notification Banner */}
      <div className="bg-[#241E1C] text-[#FAF7F2] text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-4">
        <span>Handcrafted daily in our San Francisco Atelier</span>
        <span className="hidden md:inline text-[#D9CEBF]" aria-hidden="true">·</span>
        <span className="hidden md:inline">Complimentary chilled delivery on orders over $150</span>
        <span className="hidden md:inline text-[#D9CEBF]" aria-hidden="true">·</span>
        <span className="hidden sm:inline">48-Hour notice for bespoke bakes</span>
      </div>

      {/* Main Top Bar: Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-2xl sm:text-3xl font-serif font-normal tracking-wide text-[#241E1C] hover:opacity-90 transition-opacity text-left"
            >
              Velvet &amp; Crumb
            </button>
          </div>

          {/* Zone 2: Clean 4–6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-[#5C524B]">
            <button
              onClick={() => handleNavClick('collection')}
              className="hover:text-[#241E1C] transition-colors relative py-1 hover:border-b-2 hover:border-[#9E3E2F]"
            >
              Cakes &amp; Menu
            </button>
            <button
              onClick={onOpenCustomStudio}
              className="hover:text-[#241E1C] transition-colors relative py-1 hover:border-b-2 hover:border-[#9E3E2F]"
            >
              Custom Cake Studio
            </button>
            <button
              onClick={() => handleNavClick('tasting-box')}
              className="hover:text-[#241E1C] transition-colors relative py-1 hover:border-b-2 hover:border-[#9E3E2F]"
            >
              Tasting Box
            </button>
            <button
              onClick={() => handleNavClick('our-craft')}
              className="hover:text-[#241E1C] transition-colors relative py-1 hover:border-b-2 hover:border-[#9E3E2F]"
            >
              Our Craft
            </button>
            <button
              onClick={() => handleNavClick('atelier')}
              className="hover:text-[#241E1C] transition-colors relative py-1 hover:border-b-2 hover:border-[#9E3E2F]"
            >
              Visit Atelier
            </button>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenCustomStudio}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wider uppercase text-[#FAF7F2] bg-[#9E3E2F] hover:bg-[#863326] rounded-md transition-colors shadow-xs whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Design Cake</span>
            </button>

            {/* Shopping Bag Button with Tabular Badge */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Bag with ${totalItemsCount} items`}
              className="relative p-2.5 text-[#241E1C] hover:bg-[#EFE9DF] rounded-full transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider text-[#5C524B]">
                Bag
              </span>
              {totalItemsCount > 0 && (
                <span className="bg-[#9E3E2F] text-white text-[11px] font-semibold font-mono w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#241E1C] hover:bg-[#EFE9DF] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EAE3D6] px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => handleNavClick('collection')}
              className="block w-full text-left py-2 text-base font-medium text-[#241E1C] border-b border-[#EFE9DF]"
            >
              Cakes &amp; Menu
            </button>
            <button
              onClick={() => {
                onOpenCustomStudio();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-medium text-[#9E3E2F] border-b border-[#EFE9DF] flex items-center justify-between"
            >
              <span>Custom Cake Studio</span>
              <span className="text-xs uppercase tracking-wider bg-[#F5ECE8] px-2 py-0.5 rounded text-[#9E3E2F]">Interactive</span>
            </button>
            <button
              onClick={() => handleNavClick('tasting-box')}
              className="block w-full text-left py-2 text-base font-medium text-[#241E1C] border-b border-[#EFE9DF]"
            >
              Tasting Box &amp; Consultations
            </button>
            <button
              onClick={() => handleNavClick('our-craft')}
              className="block w-full text-left py-2 text-base font-medium text-[#241E1C] border-b border-[#EFE9DF]"
            >
              Our Craft &amp; Ingredients
            </button>
            <button
              onClick={() => handleNavClick('atelier')}
              className="block w-full text-left py-2 text-base font-medium text-[#241E1C]"
            >
              Visit Atelier &amp; Contact
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenCustomStudio();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#9E3E2F] rounded-md uppercase tracking-wider"
              >
                Design a Custom Cake
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

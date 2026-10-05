import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter } from 'lucide-react';
import { CakeItem, CakeCategory, DietaryTag } from '../types/cake';
import { CAKE_CATALOG } from '../data/cakes';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  onSelectCake: (cake: CakeItem) => void;
  onQuickAddCake: (cake: CakeItem) => void;
  onOpenCustomStudio: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectCake,
  onQuickAddCake,
  onOpenCustomStudio,
}) => {
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);

  const categories: { id: CakeCategory; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'signature', label: 'Signature Gateaux' },
    { id: 'wedding', label: 'Wedding & Tiered' },
    { id: 'dietary', label: 'Gluten-Free & Vegan' },
    { id: 'tasting', label: 'Tasting Flights' },
  ];

  const dietaryFilterOptions: DietaryTag[] = [
    'Gluten-Free',
    'Vegan',
    'Nut-Free',
    'Organic Ingredients',
  ];

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCakes = useMemo(() => {
    return CAKE_CATALOG.filter((cake) => {
      // Category filter
      if (activeCategory !== 'all' && cake.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = cake.name.toLowerCase().includes(query);
        const matchesDesc = cake.description.toLowerCase().includes(query);
        const matchesFlavors = cake.flavorNotes.some((fn) =>
          fn.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesFlavors) {
          return false;
        }
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const hasAllSelectedDietary = selectedDietary.every((tag) =>
          cake.dietaryTags.includes(tag)
        );
        if (!hasAllSelectedDietary) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

  return (
    <section id="collection" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
            The Patisserie Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#241E1C] [text-wrap:balance]">
            Signature Celebration Gateaux
          </h2>
          <p className="text-sm sm:text-base text-[#6B615A] leading-relaxed">
            Baked to order using traditional French methods. Every cake is accompanied by a complimentary custom inscribed chocolate plaque.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Interactive Category Segmented Bar (Clickable tabs) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-lg overflow-x-auto max-w-full w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-white text-[#241E1C] shadow-xs'
                      : 'text-[#6B615A] hover:text-[#241E1C]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search flavors, chocolate, berries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-xs border border-[#D9CEBF] rounded-lg text-[#241E1C] placeholder-[#8C827A] focus:outline-none focus:ring-1 focus:ring-[#9E3E2F] focus:border-[#9E3E2F]"
              />
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-[#8C827A] hover:text-[#241E1C]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Dietary Filters Sub-row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#6B615A]">
            <span className="flex items-center gap-1 text-[#8C827A] font-medium mr-1">
              <Filter className="w-3.5 h-3.5" />
              Dietary:
            </span>
            {dietaryFilterOptions.map((tag) => {
              const isSelected = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#9E3E2F] text-white border-[#9E3E2F]'
                      : 'bg-white text-[#5C524B] border-[#D9CEBF] hover:border-[#8C827A]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {selectedDietary.length > 0 && (
              <button
                onClick={() => setSelectedDietary([])}
                className="text-xs text-[#9E3E2F] hover:underline ml-2"
              >
                Reset filters
              </button>
            )}
            <div className="ml-auto text-xs text-[#8C827A] font-mono tabular-nums">
              Showing {filteredCakes.length} creations
            </div>
          </div>
        </div>

        {/* Product Grid: 3-column desktop */}
        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCakes.map((cake) => (
              <ProductCard
                key={cake.id}
                cake={cake}
                onSelect={onSelectCake}
                onQuickAdd={onQuickAddCake}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#EAE3D6] p-12 text-center space-y-4">
            <p className="text-base text-[#5C524B]">
              No cakes matched your current search and dietary criteria.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDietary([]);
                  setActiveCategory('all');
                }}
                className="px-4 py-2 text-xs font-medium text-[#241E1C] bg-[#FAF7F2] border border-[#D9CEBF] rounded-md hover:bg-[#EFE9DF]"
              >
                Clear all filters
              </button>
              <button
                onClick={onOpenCustomStudio}
                className="px-4 py-2 text-xs font-medium text-white bg-[#9E3E2F] rounded-md hover:bg-[#863326]"
              >
                Design a Custom Cake
              </button>
            </div>
          </div>
        )}

        {/* Custom Cake Studio Callout Banner */}
        <div className="bg-[#FFFFFF] border border-[#EAE3D6] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-wider text-[#9E3E2F] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Looking for something uniquely yours?</span>
            </div>
            <h3 className="text-2xl font-serif text-[#241E1C]">
              Interactive Custom Cake Atelier
            </h3>
            <p className="text-xs sm:text-sm text-[#6B615A] max-w-xl">
              Choose your sponge flavor, artisanal fillings, Swiss buttercream texture, pressed florals, and live piped inscription with immediate 3D-style preview.
            </p>
          </div>
          <button
            onClick={onOpenCustomStudio}
            className="px-6 py-3 bg-[#9E3E2F] hover:bg-[#863326] text-white text-xs font-medium tracking-wider uppercase rounded-md shadow-xs transition-colors shrink-0 whitespace-nowrap"
          >
            Launch Cake Studio
          </button>
        </div>
      </div>
    </section>
  );
};

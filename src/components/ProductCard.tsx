import React, { useState } from 'react';
import { Star, Eye, Plus, Check } from 'lucide-react';
import { CakeItem } from '../types/cake';

interface ProductCardProps {
  cake: CakeItem;
  onSelect: (cake: CakeItem) => void;
  onQuickAdd: (cake: CakeItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  cake,
  onSelect,
  onQuickAdd,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(cake);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={() => onSelect(cake)}
      className="group bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#EAE3D6] hover:border-[#D9CEBF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-[#F3EFEA] overflow-hidden">
        {/* Placeholder / Fallback Gradient */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#EFE9DF] animate-pulse flex items-center justify-center">
            <span className="text-xs text-[#8C827A] font-medium tracking-wide">Pâtisserie Atelier</span>
          </div>
        )}

        <img
          src={cake.image}
          alt={cake.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Quiet status marker (at most 1 subtle indicator) */}
        {cake.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#241E1C] px-2.5 py-1 rounded text-[11px] font-medium tracking-wide uppercase border border-[#E0D8CB]">
            Signature
          </div>
        )}
        {cake.isSeasonal && !cake.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#9E3E2F] px-2.5 py-1 rounded text-[11px] font-medium tracking-wide uppercase border border-[#E0D8CB]">
            Seasonal
          </div>
        )}

        {/* Quick View Overlay on Desktop */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(cake);
            }}
            className="px-3.5 py-2 bg-white text-[#241E1C] text-xs font-medium rounded shadow-sm hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Customize &amp; Order</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata clean unboxed row */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C827A] tracking-wider uppercase mb-1.5">
            <span>{cake.category}</span>
            <span aria-hidden="true">·</span>
            <span>{cake.leadNoticeDays}-day lead notice</span>
          </div>

          <h3 className="text-xl font-serif font-normal text-[#241E1C] group-hover:text-[#9E3E2F] transition-colors">
            {cake.name}
          </h3>

          {cake.frenchTitle && (
            <p className="text-xs italic text-[#7A6F68] font-serif mt-0.5 line-clamp-1">
              {cake.frenchTitle}
            </p>
          )}

          <p className="text-xs text-[#5C524B] line-clamp-2 mt-2 leading-relaxed">
            {cake.description}
          </p>

          {/* Flavor notes preview */}
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[#70645D]">
            {cake.flavorNotes.slice(0, 3).map((note, idx) => (
              <span key={idx} className="after:content-['·'] last:after:content-none after:ml-2">
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#8C827A]">From</div>
            <div className="text-lg font-medium text-[#241E1C] font-mono tabular-nums">
              ${cake.basePrice}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAddClick}
              aria-label={`Quick add ${cake.name} to cart`}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                addedAnimation
                  ? 'bg-[#2E6F40] text-white'
                  : 'bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#241E1C] border border-[#D9CEBF]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#9E3E2F]" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

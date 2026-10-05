import React, { useState } from 'react';
import { X, Check, Clock, Users, ShieldAlert, Sparkles } from 'lucide-react';
import { CakeItem, CartItem } from '../types/cake';

interface ProductModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  cake,
  onClose,
  onAddToCart,
}) => {
  if (!cake) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [inscription, setInscription] = useState('');
  const [hasCandleKit, setHasCandleKit] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedSize = cake.sizes[selectedSizeIndex] || cake.sizes[0];
  const unitPrice = cake.basePrice + selectedSize.priceDelta + (hasCandleKit ? 4 : 0);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const newItem: CartItem = {
      cartItemId: `${cake.id}-${Date.now()}`,
      cakeId: cake.id,
      name: cake.name,
      frenchTitle: cake.frenchTitle,
      image: cake.image,
      sizeLabel: selectedSize.label,
      servings: selectedSize.servings,
      unitPrice,
      quantity,
      inscription: inscription.trim() ? inscription.trim() : undefined,
      hasCandleKit,
      specialNotes: specialNotes.trim() ? specialNotes.trim() : undefined,
    };

    onAddToCart(newItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#E0D8CB] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#241E1C] border border-[#E0D8CB] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Image & Highlights */}
          <div className="md:col-span-5 bg-[#FAF7F2] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE3D6]">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-xs bg-[#EFE9DF]">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8C827A] font-medium">
                  Chef&apos;s Tasting Notes
                </div>
                <div className="mt-2 space-y-1.5">
                  {cake.flavorNotes.map((note, i) => (
                    <div key={i} className="text-xs text-[#5C524B] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E3E2F]" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preparation time & dietary notes */}
            <div className="pt-4 border-t border-[#EAE3D6] space-y-2 text-xs text-[#6B615A]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E3E2F]" />
                <span>Requires {cake.leadNoticeDays} days advance notice</span>
              </div>
              <div className="flex flex-wrap gap-1 text-[11px] text-[#7A6F68]">
                <span>Dietary:</span>
                {cake.dietaryTags.map((tag, idx) => (
                  <span key={idx} className="after:content-[','] last:after:content-none font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Customization Options */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#9E3E2F] font-semibold">
                {cake.category} collection
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#241E1C] mt-1">
                {cake.name}
              </h2>
              {cake.frenchTitle && (
                <p className="text-xs italic text-[#7A6F68] font-serif mt-0.5">
                  {cake.frenchTitle}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#5C524B] mt-2 leading-relaxed">
                {cake.description}
              </p>
            </div>

            {/* Size Options */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                Select Size &amp; Guest Count
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {cake.sizes.map((sz, index) => {
                  const isSelected = selectedSizeIndex === index;
                  const itemPrice = cake.basePrice + sz.priceDelta;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedSizeIndex(index)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-[#9E3E2F] bg-[#FAF7F2] ring-1 ring-[#9E3E2F]'
                          : 'border-[#D9CEBF] hover:border-[#8C827A] bg-white'
                      }`}
                    >
                      <div className="text-xs font-medium text-[#241E1C]">{sz.label}</div>
                      <div className="text-[11px] text-[#6B615A] mt-0.5 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#8C827A]" />
                        <span>{sz.servings}</span>
                      </div>
                      <div className="text-xs font-semibold text-[#241E1C] font-mono tabular-nums mt-1.5">
                        ${itemPrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complimentary Inscription */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                  Chocolate Plaque Inscription
                </label>
                <span className="text-[11px] text-[#2E6F40] font-medium">Complimentary</span>
              </div>
              <input
                type="text"
                maxLength={45}
                placeholder="e.g. Happy 30th Birthday Elena!"
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F] text-[#241E1C] placeholder-[#8C827A]"
              />
              <div className="text-[11px] text-[#8C827A]">
                Piped in organic dark chocolate script (max 45 characters). Leave blank if none.
              </div>
            </div>

            {/* Celebration Candle Kit Add-on */}
            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6] flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCandleKit}
                  onChange={(e) => setHasCandleKit(e.target.checked)}
                  className="rounded text-[#9E3E2F] focus:ring-[#9E3E2F] w-4 h-4"
                />
                <div>
                  <div className="text-xs font-medium text-[#241E1C]">
                    Artisan Gold Slim Candle Set (Pack of 12)
                  </div>
                  <div className="text-[11px] text-[#6B615A]">
                    Includes matches and strike plate
                  </div>
                </div>
              </label>
              <div className="text-xs font-semibold text-[#241E1C] font-mono tabular-nums">
                +$4.00
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                Allergies or Special Notes
              </label>
              <input
                type="text"
                placeholder="e.g., Serve at 7 PM; allergy warning"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F] text-[#241E1C] placeholder-[#8C827A]"
              />
            </div>

            {/* Quantity and Add to Bag Row */}
            <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#D9CEBF] rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs text-[#241E1C] hover:bg-[#FAF7F2] transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-medium font-mono tabular-nums text-[#241E1C]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs text-[#241E1C] hover:bg-[#FAF7F2] transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-[#2E6F40] text-white'
                    : 'bg-[#9E3E2F] hover:bg-[#863326] text-white shadow-xs'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Add to Bag · ${totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

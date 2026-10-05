import React, { useState } from 'react';
import { X, Sparkles, Check, Info, RefreshCw, Layers, Palette, Cake as CakeIcon } from 'lucide-react';
import { CUSTOM_BUILDER_OPTIONS } from '../data/cakes';
import { CustomCakeConfig, CartItem } from '../types/cake';

interface CustomCakeStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomCakeStudio: React.FC<CustomCakeStudioProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  // Builder State
  const [selectedTier, setSelectedTier] = useState<'single' | 'two-tier'>('single');
  const [selectedSizeId, setSelectedSizeId] = useState('8-inch');
  const [selectedSpongeId, setSelectedSpongeId] = useState('vanilla-bourbon');
  const [selectedFillingId, setSelectedFillingId] = useState('raspberry-coulis');
  const [selectedFinishId, setSelectedFinishId] = useState('smooth-velvet');
  const [selectedColorId, setSelectedColorId] = useState('ivory');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'edible-florals',
    'gold-leaf',
  ]);
  const [inscription, setInscription] = useState('Happy Celebration');
  const [candles, setCandles] = useState(true);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Available sizes for the chosen tier
  const availableSizes = CUSTOM_BUILDER_OPTIONS.sizes.filter(
    (s) => s.tier === selectedTier
  );

  // Fallback if current size is not in tier
  const currentSizeObj =
    availableSizes.find((s) => s.id === selectedSizeId) || availableSizes[0];

  const currentSponge = CUSTOM_BUILDER_OPTIONS.sponges.find(
    (s) => s.id === selectedSpongeId
  )!;
  const currentFilling = CUSTOM_BUILDER_OPTIONS.fillings.find(
    (f) => f.id === selectedFillingId
  )!;
  const currentFinish = CUSTOM_BUILDER_OPTIONS.finishes.find(
    (f) => f.id === selectedFinishId
  )!;
  const currentColor = CUSTOM_BUILDER_OPTIONS.finishColors.find(
    (c) => c.id === selectedColorId
  )!;

  // Calculate dynamic price
  const baseSizePrice = currentSizeObj ? currentSizeObj.price : 105;
  const spongeExtra = currentSponge.price;
  const fillingExtra = currentFilling.price;
  const finishExtra = currentFinish.price;
  const toppingsExtra = selectedToppings.reduce((sum, topId) => {
    const t = CUSTOM_BUILDER_OPTIONS.toppings.find((x) => x.id === topId);
    return sum + (t ? t.price : 0);
  }, 0);
  const candleExtra = candles ? 4 : 0;

  const totalPrice =
    baseSizePrice +
    spongeExtra +
    fillingExtra +
    finishExtra +
    toppingsExtra +
    candleExtra;

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((t) => t !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddCustomCake = () => {
    const customConfig: CustomCakeConfig = {
      tier: selectedTier,
      size: currentSizeObj.label,
      spongeFlavor: currentSponge.name,
      fillingCream: currentFilling.name,
      outerFinish: currentFinish.name,
      finishColor: currentColor.name,
      toppings: selectedToppings.map(
        (tId) => CUSTOM_BUILDER_OPTIONS.toppings.find((t) => t.id === tId)?.name || tId
      ),
      inscriptionText: inscription.trim(),
      cakeBoardColor: 'Warm Marble',
      candlesIncluded: candles,
      dietaryRequirements: dietaryNotes,
      totalPrice,
    };

    const cartItem: CartItem = {
      cartItemId: `custom-cake-${Date.now()}`,
      name: `Bespoke ${selectedTier === 'two-tier' ? 'Two-Tier' : 'Single Tier'} Atelier Cake`,
      frenchTitle: 'Création Sur Mesure',
      image:
        selectedTier === 'two-tier'
          ? '/src/assets/images/hero_signature_cake_1791195521402.jpg'
          : '/src/assets/images/cake_earl_grey_lavender_1791195565216.jpg',
      sizeLabel: currentSizeObj.label,
      servings: currentSizeObj.label.split('(')[1]?.replace(')', '') || '12–16 guests',
      unitPrice: totalPrice,
      quantity: 1,
      inscription: inscription.trim() || undefined,
      hasCandleKit: candles,
      specialNotes: dietaryNotes.trim() || undefined,
      customConfig,
    };

    onAddToCart(cartItem);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-[#D9CEBF] shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D8CB] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9E3E2F]" />
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#241E1C]">
                Bespoke Cake Atelier
              </h2>
              <div className="text-xs text-[#8C827A]">
                Craft your one-of-a-kind celebration cake with live interactive preview
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Studio"
            className="p-2 text-[#5C524B] hover:text-[#241E1C] hover:bg-[#FAF7F2] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split Screen */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Interactive Visual Simulation */}
          <div className="lg:col-span-5 bg-[#F4EFE6] p-6 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#E0D8CB]">
            <div className="w-full text-center">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8C827A]">
                Interactive Visual Render
              </span>
            </div>

            {/* SVG Visual Layered Cake Simulation */}
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center py-6">
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full drop-shadow-xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cake Stand / Pedestal */}
                <ellipse cx="160" cy="285" rx="110" ry="18" fill="#E2D9CC" />
                <path d="M 140 285 L 145 305 L 175 305 L 180 285 Z" fill="#D4C9BA" />
                <ellipse cx="160" cy="305" rx="40" ry="7" fill="#C5BAAA" />

                {/* Cake Board Base */}
                <ellipse cx="160" cy="275" rx="98" ry="15" fill="#EAE3D6" stroke="#D1C4B2" strokeWidth="1" />

                {/* Bottom Tier / Single Tier */}
                <g>
                  {/* Cylinder Body */}
                  <path
                    d="M 80 210 C 80 225, 240 225, 240 210 L 240 265 C 240 280, 80 280, 80 265 Z"
                    fill={currentColor.hex}
                    stroke="#B8A796"
                    strokeWidth="1.2"
                  />
                  {/* Semi-naked crumb stripes if semi-naked selected */}
                  {selectedFinishId === 'rustic-semi-naked' && (
                    <>
                      <path d="M 85 228 C 120 236, 200 236, 235 228" stroke="#A67C52" strokeWidth="2.5" strokeDasharray="10,6" opacity="0.6" fill="none" />
                      <path d="M 85 248 C 120 256, 200 256, 235 248" stroke="#A67C52" strokeWidth="2.5" strokeDasharray="14,8" opacity="0.6" fill="none" />
                    </>
                  )}
                  {/* Palette knife stucco ripples */}
                  {selectedFinishId === 'textured-palette' && (
                    <g opacity="0.25" stroke="#4A3D34" strokeWidth="1.5">
                      <path d="M 90 220 Q 120 225, 140 218 T 190 225" fill="none" />
                      <path d="M 110 240 Q 150 245, 170 238 T 225 245" fill="none" />
                      <path d="M 95 255 Q 140 260, 180 252" fill="none" />
                    </g>
                  )}
                  {/* Vintage Lambeth ruffles */}
                  {selectedFinishId === 'lambeth-vintage' && (
                    <g stroke="#9E3E2F" strokeWidth="1.5" fill="none" opacity="0.7">
                      <path d="M 82 225 Q 98 238, 114 225 Q 130 238, 146 225 Q 162 238, 178 225 Q 194 238, 210 225 Q 226 238, 238 225" />
                      <path d="M 82 260 Q 98 273, 114 260 Q 130 273, 146 260 Q 162 273, 178 260 Q 194 273, 210 260 Q 226 273, 238 260" />
                    </g>
                  )}
                  {/* Top Ellipse of Bottom Tier */}
                  <ellipse
                    cx="160"
                    cy="210"
                    rx="80"
                    ry="15"
                    fill={currentColor.hex}
                    stroke="#B8A796"
                    strokeWidth="1.2"
                  />
                </g>

                {/* If Two-Tier: Upper Tier */}
                {selectedTier === 'two-tier' && (
                  <g>
                    {/* Top Tier Cylinder Body */}
                    <path
                      d="M 105 145 C 105 157, 215 157, 215 145 L 215 198 C 215 210, 105 210, 105 198 Z"
                      fill={currentColor.hex}
                      stroke="#B8A796"
                      strokeWidth="1.2"
                    />
                    {selectedFinishId === 'rustic-semi-naked' && (
                      <path d="M 110 170 C 140 178, 180 178, 210 170" stroke="#A67C52" strokeWidth="2.5" strokeDasharray="12,6" opacity="0.6" fill="none" />
                    )}
                    {selectedFinishId === 'lambeth-vintage' && (
                      <g stroke="#9E3E2F" strokeWidth="1.5" fill="none" opacity="0.7">
                        <path d="M 107 155 Q 120 166, 134 155 Q 148 166, 162 155 Q 176 166, 190 155 Q 204 166, 213 155" />
                        <path d="M 107 195 Q 120 206, 134 195 Q 148 206, 162 195 Q 176 206, 190 195 Q 204 206, 213 195" />
                      </g>
                    )}
                    {/* Top Tier Top Ellipse */}
                    <ellipse
                      cx="160"
                      cy="145"
                      rx="55"
                      ry="11"
                      fill={currentColor.hex}
                      stroke="#B8A796"
                      strokeWidth="1.2"
                    />
                  </g>
                )}

                {/* Toppings Visuals on the Top Tier / Cake Peak */}
                {/* 1. Gold Leaf */}
                {selectedToppings.includes('gold-leaf') && (
                  <g fill="#D4AF37" opacity="0.9">
                    <polygon points="140,140 144,142 142,146 138,143" />
                    <polygon points="175,142 180,145 178,150 172,146" />
                    <polygon points="155,148 159,150 157,153 153,151" />
                    <polygon points="120,205 125,208 122,213 118,209" />
                    <polygon points="190,208 196,211 192,216 187,212" />
                  </g>
                )}

                {/* 2. Edible Florals */}
                {selectedToppings.includes('edible-florals') && (
                  <g>
                    {/* Purple pansy / cornflowers */}
                    <circle cx="145" cy={selectedTier === 'two-tier' ? 142 : 206} r="4" fill="#88498F" />
                    <circle cx="150" cy={selectedTier === 'two-tier' ? 140 : 204} r="3" fill="#B388B9" />
                    <circle cx="178" cy={selectedTier === 'two-tier' ? 144 : 208} r="4" fill="#C95D63" />
                    <circle cx="184" cy={selectedTier === 'two-tier' ? 143 : 207} r="3" fill="#F09B8E" />
                    {/* Green leaf sprig */}
                    <path d={selectedTier === 'two-tier' ? 'M 135 145 Q 128 140, 130 135' : 'M 135 210 Q 128 205, 130 200'} stroke="#4F6D48" strokeWidth="2" fill="none" />
                  </g>
                )}

                {/* 3. Fresh Figs & Berries */}
                {selectedToppings.includes('fresh-figs-berries') && (
                  <g>
                    {/* Fig wedge */}
                    <path
                      d={selectedTier === 'two-tier' ? 'M 152 135 Q 165 125, 168 143 Z' : 'M 152 198 Q 165 188, 168 206 Z'}
                      fill="#5C253B"
                      stroke="#863255"
                    />
                    {/* Blackberry cluster */}
                    <circle cx="138" cy={selectedTier === 'two-tier' ? 143 : 206} r="3" fill="#201525" />
                    <circle cx="141" cy={selectedTier === 'two-tier' ? 141 : 204} r="2.5" fill="#201525" />
                  </g>
                )}

                {/* 4. French Macarons */}
                {selectedToppings.includes('french-macarons') && (
                  <g>
                    <ellipse cx="166" cy={selectedTier === 'two-tier' ? 140 : 204} rx="6" ry="3.5" fill="#E6A15C" />
                    <ellipse cx="174" cy={selectedTier === 'two-tier' ? 143 : 207} rx="5" ry="3" fill="#9FB89A" />
                  </g>
                )}

                {/* 5. Chocolate Shards */}
                {selectedToppings.includes('chocolate-curls') && (
                  <g fill="#2D1C15">
                    <polygon points={selectedTier === 'two-tier' ? '158,125 163,142 155,142' : '158,188 163,205 155,205'} />
                    <polygon points={selectedTier === 'two-tier' ? '164,128 170,144 163,144' : '164,191 170,207 163,207'} />
                  </g>
                )}

                {/* Inscription Plaque on Bottom Front */}
                {inscription.trim() && (
                  <g>
                    <rect
                      x="105"
                      y="238"
                      width="110"
                      height="22"
                      rx="4"
                      fill="#241E1C"
                      stroke="#C5A059"
                      strokeWidth="1"
                    />
                    <text
                      x="160"
                      y="253"
                      textAnchor="middle"
                      fill="#F7F3EB"
                      fontSize="9"
                      fontFamily="Cormorant Garamond, serif"
                      fontStyle="italic"
                    >
                      {inscription.length > 20 ? `${inscription.slice(0, 19)}…` : inscription}
                    </text>
                  </g>
                )}

                {/* Gold Candle if selected */}
                {candles && (
                  <g>
                    <rect x="159" y={selectedTier === 'two-tier' ? 116 : 178} width="2" height="18" fill="#D4AF37" />
                    <path
                      d={selectedTier === 'two-tier' ? 'M 160 114 Q 162 108, 160 106 Q 158 108, 160 114 Z' : 'M 160 176 Q 162 170, 160 168 Q 158 170, 160 176 Z'}
                      fill="#FBBF24"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Cake Configuration Summary Box */}
            <div className="w-full bg-white rounded-xl p-4 border border-[#E0D8CB] space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#EFE9DF]">
                <span className="text-[#8C827A] uppercase tracking-wider text-[10px] font-semibold">
                  Specification
                </span>
                <span className="font-mono font-medium text-[#241E1C]">
                  {currentSizeObj.label}
                </span>
              </div>
              <div className="space-y-1 text-[#5C524B]">
                <div className="flex justify-between">
                  <span>Sponge:</span>
                  <span className="font-medium text-[#241E1C]">{currentSponge.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Filling:</span>
                  <span className="font-medium text-[#241E1C]">{currentFilling.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Finish:</span>
                  <span className="font-medium text-[#241E1C]">{currentFinish.name} ({currentColor.name})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Customizer Options */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Step 1: Tier Architecture */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                1. Tier Architecture
              </label>
              <div className="grid grid-cols-2 gap-3">
                {CUSTOM_BUILDER_OPTIONS.tiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id as 'single' | 'two-tier');
                      const firstAvailable = CUSTOM_BUILDER_OPTIONS.sizes.find(
                        (s) => s.tier === tier.id
                      );
                      if (firstAvailable) setSelectedSizeId(firstAvailable.id);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedTier === tier.id
                        ? 'border-[#9E3E2F] bg-white ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#241E1C]">{tier.name}</div>
                    <div className="text-[11px] text-[#6B615A] mt-0.5">{tier.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size & Servings */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                2. Cake Diameter &amp; Servings
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableSizes.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSizeId(sz.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                      selectedSizeId === sz.id
                        ? 'border-[#9E3E2F] bg-white ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <span className="text-xs text-[#241E1C] font-medium">{sz.label}</span>
                    <span className="text-xs font-mono font-semibold text-[#241E1C] tabular-nums">
                      ${sz.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sponge Flavor */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                3. Artisanal Sponge Flavor
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CUSTOM_BUILDER_OPTIONS.sponges.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSelectedSpongeId(sp.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedSpongeId === sp.id
                        ? 'border-[#9E3E2F] bg-white ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-[#241E1C]">{sp.name}</span>
                      {sp.price > 0 && (
                        <span className="text-[11px] text-[#8C827A] font-mono tabular-nums">
                          +${sp.price}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#6B615A] mt-0.5 line-clamp-1">
                      {sp.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Filling & Crémeux */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                4. Layer Filling &amp; Crémeux
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CUSTOM_BUILDER_OPTIONS.fillings.map((fil) => (
                  <button
                    key={fil.id}
                    type="button"
                    onClick={() => setSelectedFillingId(fil.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedFillingId === fil.id
                        ? 'border-[#9E3E2F] bg-white ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-[#241E1C]">{fil.name}</span>
                      {fil.price > 0 && (
                        <span className="text-[11px] text-[#8C827A] font-mono tabular-nums">
                          +${fil.price}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#6B615A] mt-0.5 line-clamp-1">
                      {fil.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Exterior Finish Texture & Color */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                5. Outer Frosting Texture &amp; Palette
              </label>

              {/* Textures */}
              <div className="grid grid-cols-2 gap-2">
                {CUSTOM_BUILDER_OPTIONS.finishes.map((fin) => (
                  <button
                    key={fin.id}
                    type="button"
                    onClick={() => setSelectedFinishId(fin.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedFinishId === fin.id
                        ? 'border-[#9E3E2F] bg-white ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-[#241E1C]">{fin.name}</span>
                      {fin.price > 0 && (
                        <span className="text-[11px] text-[#8C827A] font-mono tabular-nums">
                          +${fin.price}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Colors */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-[#6B615A] mr-2">Buttercream Tone:</span>
                {CUSTOM_BUILDER_OPTIONS.finishColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColorId(color.id)}
                    title={color.name}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColorId === color.id
                        ? 'ring-2 ring-[#9E3E2F] scale-110 border-white'
                        : 'border-[#D9CEBF] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
                <span className="text-xs font-medium text-[#241E1C] ml-2">
                  {currentColor.name}
                </span>
              </div>
            </div>

            {/* Step 6: Botanicals & Toppings */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                6. Botanical &amp; Confectionery Toppings
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CUSTOM_BUILDER_OPTIONS.toppings.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#9E3E2F] bg-white ring-1 ring-[#9E3E2F]'
                          : 'border-[#D9CEBF] bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-white text-[10px] ${
                            isChecked ? 'bg-[#9E3E2F]' : 'border border-[#B8A796]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs text-[#241E1C]">{top.name}</span>
                      </div>
                      <span className="text-xs font-mono text-[#8C827A] tabular-nums">
                        +${top.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 7: Inscription Plaque */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                7. Plaque Inscription (Live Preview on Cake)
              </label>
              <input
                type="text"
                maxLength={40}
                placeholder="e.g. Happy 30th Birthday Sophia!"
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
              />
            </div>

            {/* Candle set & notes */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E0D8CB]">
              <label className="flex items-center gap-2 text-xs text-[#241E1C] cursor-pointer">
                <input
                  type="checkbox"
                  checked={candles}
                  onChange={(e) => setCandles(e.target.checked)}
                  className="rounded text-[#9E3E2F] focus:ring-[#9E3E2F]"
                />
                <span>Include Golden Celebration Candle Kit (+$4)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Bar: Real-time Price and Add to Bag */}
        <div className="px-6 py-4 bg-white border-t border-[#E0D8CB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#8C827A] uppercase tracking-wider">
              Estimated Total
            </div>
            <div className="text-2xl font-serif font-bold text-[#241E1C] font-mono tabular-nums">
              ${totalPrice.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#6B615A] hover:text-[#241E1C] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCustomCake}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-lg text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xs ${
                addedAnimation
                  ? 'bg-[#2E6F40] text-white'
                  : 'bg-[#9E3E2F] hover:bg-[#863326] text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Custom Cake Added!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Add Bespoke Cake to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

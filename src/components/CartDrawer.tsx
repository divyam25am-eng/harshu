import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Store, Calendar, Clock, AlertCircle } from 'lucide-react';
import { CartItem } from '../types/cake';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  deliveryMethod: 'pickup' | 'delivery';
  setDeliveryMethod: (method: 'pickup' | 'delivery') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  deliveryMethod,
  setDeliveryMethod,
  selectedDate,
  setSelectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeDeliveryThreshold = 150;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  // Time slots for pickup or delivery
  const timeSlots = [
    '09:00 AM – 11:00 AM',
    '11:00 AM – 01:00 PM',
    '01:00 PM – 03:00 PM',
    '03:00 PM – 05:00 PM',
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E0D8CB] shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="p-5 bg-white border-b border-[#E0D8CB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9E3E2F]" />
              <h2 className="text-lg font-serif text-[#241E1C]">Your Pastry Bag</h2>
              <span className="text-xs text-[#8C827A] font-mono tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-1.5 text-[#5C524B] hover:text-[#241E1C] rounded-full hover:bg-[#FAF7F2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-[#F5ECE8] px-5 py-3 border-b border-[#EAE3D6] text-xs">
            {amountNeededForFree > 0 ? (
              <div className="space-y-1">
                <div className="text-[#5C524B]">
                  Add <strong className="text-[#9E3E2F] font-mono">${amountNeededForFree.toFixed(2)}</strong> more for complimentary delivery
                </div>
                <div className="w-full bg-[#E5DACB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#9E3E2F] h-full transition-all duration-300"
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-[#2E6F40] font-medium flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>You qualify for complimentary temperature delivery!</span>
              </div>
            )}
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DF] text-[#8C827A] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <p className="text-base font-serif text-[#241E1C]">Your bag is currently empty</p>
                <p className="text-xs text-[#6B615A] max-w-xs mx-auto">
                  Explore our handcrafted signature cakes or build your custom gateau in the atelier studio.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-[#241E1C] text-white text-xs font-medium tracking-wider uppercase rounded-md"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-xl p-4 border border-[#EAE3D6] shadow-xs flex gap-3 relative"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#EFE9DF] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#241E1C] line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label="Remove item"
                        className="text-[#8C827A] hover:text-[#9E3E2F] transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#6B615A]">
                      {item.sizeLabel} ({item.servings})
                    </div>

                    {/* Inscription preview */}
                    {item.inscription && (
                      <div className="text-[11px] text-[#5C524B] italic bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EAE3D6] inline-block">
                        Plaque: &ldquo;{item.inscription}&rdquo;
                      </div>
                    )}

                    {/* Candle kit */}
                    {item.hasCandleKit && (
                      <div className="text-[10px] text-[#C5A059] font-medium">
                        + Gold Candle Kit
                      </div>
                    )}

                    {/* Stepper & Price */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#D9CEBF] rounded bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="px-2 py-0.5 text-xs text-[#241E1C] hover:bg-[#EAE3D6]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono tabular-nums text-[#241E1C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="px-2 py-0.5 text-xs text-[#241E1C] hover:bg-[#EAE3D6]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-semibold text-[#241E1C] font-mono tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Delivery / Pickup Preferences */}
            {items.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-[#EAE3D6] space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                  Fulfillment Method
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#9E3E2F] bg-[#FAF7F2] text-[#9E3E2F] ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] text-[#5C524B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Atelier Pickup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'border-[#9E3E2F] bg-[#FAF7F2] text-[#9E3E2F] ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] text-[#5C524B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>White-Glove Van</span>
                  </button>
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] text-[#6B615A] mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8C827A]" />
                      <span>Fulfillment Date</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#D9CEBF] rounded-lg bg-[#FAF7F2] text-[#241E1C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6B615A] mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C827A]" />
                      <span>Time Window</span>
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#D9CEBF] rounded-lg bg-[#FAF7F2] text-[#241E1C]"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>
                          {ts}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#8C827A] pt-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#9E3E2F] shrink-0" />
                  <span>Freshly baked on morning of delivery / pickup</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E0D8CB] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C524B]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#241E1C]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5C524B]">
                  <span>Fulfillment ({deliveryMethod === 'pickup' ? 'In-Store' : 'Van Delivery'})</span>
                  <span className="font-mono tabular-nums text-[#241E1C]">
                    {deliveryMethod === 'pickup'
                      ? 'Free'
                      : subtotal >= freeDeliveryThreshold
                      ? 'Complimentary'
                      : '$18.00'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EFE9DF] flex justify-between text-sm font-semibold text-[#241E1C]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    $
                    {(
                      subtotal +
                      (deliveryMethod === 'delivery' && subtotal < freeDeliveryThreshold ? 18 : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#9E3E2F] hover:bg-[#863326] text-white text-xs font-medium tracking-wider uppercase rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

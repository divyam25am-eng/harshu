import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Lock, Printer, ArrowRight, Store, Truck, Clock } from 'lucide-react';
import { CartItem, DeliveryDetails, PlacedOrder } from '../types/cake';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryMethod: 'pickup' | 'delivery';
  selectedDate: string;
  selectedTimeSlot: string;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryMethod,
  selectedDate,
  selectedTimeSlot,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Customer Contact Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [postalCode, setPostalCode] = useState('94107');
  const [specialNote, setSpecialNote] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash_pickup'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Final Placed Order details
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' && subtotal < 150 ? 18 : 0;
  const tax = subtotal * 0.085;
  const grandTotal = subtotal + deliveryFee + tax;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    if (deliveryMethod === 'delivery' && !address) return;
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `VC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: PlacedOrder = {
      orderNumber,
      placedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items,
      subtotal,
      deliveryFee,
      tax,
      total: grandTotal,
      deliveryDetails: {
        method: deliveryMethod,
        pickupLocation: '428 Artisan Way, Suite 100, San Francisco',
        date: selectedDate || 'In 48 Hours',
        timeSlot: selectedTimeSlot,
        recipientName: name,
        recipientEmail: email,
        recipientPhone: phone,
        addressLine1: address,
        apartment,
        postalCode,
        orderNote: specialNote,
        paymentMethod,
      },
      status: 'Received',
    };

    setPlacedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#E0D8CB] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE3D6] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9E3E2F] font-semibold">
              Secure Atelier Checkout
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#241E1C]">
              {step === 'confirmed' ? 'Order Confirmed' : 'Complete Your Celebration Order'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full hover:bg-white text-[#5C524B] hover:text-[#241E1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#EAE3D6] flex items-center gap-3 text-xs">
            <span
              className={`font-semibold ${
                step === 'details' ? 'text-[#9E3E2F]' : 'text-[#2E6F40]'
              }`}
            >
              1. Guest &amp; Fulfillment
            </span>
            <span className="text-[#D9CEBF]">/</span>
            <span
              className={`font-semibold ${
                step === 'payment' ? 'text-[#9E3E2F]' : 'text-[#8C827A]'
              }`}
            >
              2. Payment &amp; Confirmation
            </span>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#6B615A] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Genevieve Laurent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B615A] mb-1">Email (for bakery updates) *</label>
                    <input
                      type="email"
                      required
                      placeholder="genevieve@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B615A] mb-1">
                    Mobile Phone (for delivery coordination) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(415) 555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                  />
                </div>
              </div>

              {/* Delivery Address if Delivery selected */}
              {deliveryMethod === 'delivery' ? (
                <div className="space-y-3 pt-3 border-t border-[#F0EBE1]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                    White-Glove Delivery Address
                  </h4>
                  <div>
                    <label className="block text-[11px] text-[#6B615A] mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="742 Evergreen Terrace"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#6B615A] mb-1">Suite / Apt</label>
                      <input
                        type="text"
                        placeholder="Apt 4B"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B615A] mb-1">Postal Code *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6] text-xs text-[#5C524B]">
                  <strong>Pickup Atelier:</strong> 428 Artisan Way, Suite 100, San Francisco, CA. Free 15-minute customer stalls right in front.
                </div>
              )}

              {/* Special Note */}
              <div className="pt-2">
                <label className="block text-[11px] text-[#6B615A] mb-1">
                  Delivery / Preparation Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Gate code, surprise party delivery timing, etc."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg"
                />
              </div>

              {/* Navigation button */}
              <div className="pt-4 border-t border-[#EAE3D6] flex justify-between items-center">
                <div className="text-xs text-[#6B615A]">
                  Grand Total:{' '}
                  <strong className="text-[#241E1C] font-mono text-sm">
                    ${grandTotal.toFixed(2)}
                  </strong>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9E3E2F] hover:bg-[#863326] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#241E1C]">
                  Select Payment Method
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#9E3E2F] bg-[#FAF7F2] text-[#9E3E2F] ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] text-[#5C524B]'
                    }`}
                  >
                    Credit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#9E3E2F] bg-[#FAF7F2] text-[#9E3E2F] ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] text-[#5C524B]'
                    }`}
                  >
                    Apple Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_pickup')}
                    className={`p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      paymentMethod === 'cash_pickup'
                        ? 'border-[#9E3E2F] bg-[#FAF7F2] text-[#9E3E2F] ring-1 ring-[#9E3E2F]'
                        : 'border-[#D9CEBF] text-[#5C524B]'
                    }`}
                  >
                    Pay at Atelier
                  </button>
                </div>
              </div>

              {/* Simulated Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D6] space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#6B615A] mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg bg-white"
                      />
                      <CreditCard className="w-4 h-4 text-[#8C827A] absolute right-3 top-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#6B615A] mb-1">Expiration</label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B615A] mb-1">CVC Security Code</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#6B615A] pt-1">
                    <Lock className="w-3.5 h-3.5 text-[#2E6F40]" />
                    <span>256-bit encrypted checkout. No charges until day of baking.</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-6 text-center bg-[#FAF7F2] rounded-xl border border-[#EAE3D6] space-y-2">
                  <p className="text-xs text-[#5C524B]">
                    Click &ldquo;Confirm &amp; Place Order&rdquo; below to authenticate with Apple Pay Touch ID / Face ID.
                  </p>
                </div>
              )}

              {paymentMethod === 'cash_pickup' && (
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D6] text-xs text-[#5C524B]">
                  You can settle by Credit Card, Debit, or Cash upon collecting your cake at our San Francisco atelier counter.
                </div>
              )}

              {/* Order Total Breakdown */}
              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#EAE3D6] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B615A]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B615A]">
                  <span>Fulfillment ({deliveryMethod}):</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B615A]">
                  <span>Estimated Tax (8.5%):</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#F0EBE1] flex justify-between text-sm font-semibold text-[#241E1C]">
                  <span>Total Due:</span>
                  <span className="font-mono tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#EAE3D6] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 text-xs text-[#6B615A] hover:text-[#241E1C]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#9E3E2F] hover:bg-[#863326] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize &amp; Place Order (${grandTotal.toFixed(2)})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmed */}
          {step === 'confirmed' && placedOrder && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#EBF4EC] text-[#2E6F40] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="text-2xl font-serif text-[#241E1C]">
                  Merci Beaucoup, {placedOrder.deliveryDetails.recipientName}!
                </h4>
                <p className="text-xs text-[#6B615A] max-w-sm mx-auto">
                  Your cake reservation has been accepted into our morning baking schedule.
                </p>
                <div className="inline-block px-3 py-1 bg-[#FAF7F2] border border-[#D9CEBF] rounded font-mono text-xs font-semibold text-[#241E1C]">
                  Order #{placedOrder.orderNumber}
                </div>
              </div>

              {/* Live Order Tracker Stepper */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D6] space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C827A]">
                  Bakery Order Progression
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-[#2E6F40] text-white mx-auto flex items-center justify-center text-[8px]">✓</div>
                    <div className="font-semibold text-[#241E1C]">Confirmed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-[#9E3E2F] text-white mx-auto flex items-center justify-center text-[8px]">2</div>
                    <div className="font-medium text-[#9E3E2F]">Baking Queue</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-[#D9CEBF] text-white mx-auto flex items-center justify-center text-[8px]">3</div>
                    <div className="text-[#8C827A]">Decorating</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-[#D9CEBF] text-white mx-auto flex items-center justify-center text-[8px]">4</div>
                    <div className="text-[#8C827A]">{placedOrder.deliveryDetails.method === 'pickup' ? 'Ready' : 'Dispatch'}</div>
                  </div>
                </div>
              </div>

              {/* Receipt Summary */}
              <div className="border border-[#EAE3D6] rounded-xl p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#F0EBE1]">
                  <span className="font-semibold text-[#241E1C]">Scheduled Fulfillment</span>
                  <span className="text-[#5C524B]">
                    {placedOrder.deliveryDetails.date} ({placedOrder.deliveryDetails.timeSlot})
                  </span>
                </div>

                <div className="space-y-2">
                  {placedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-[#241E1C]">
                          {it.quantity}x {it.name}
                        </div>
                        <div className="text-[11px] text-[#8C827A]">
                          {it.sizeLabel} {it.inscription ? `· Inscribed: "${it.inscription}"` : ''}
                        </div>
                      </div>
                      <div className="font-mono tabular-nums text-[#241E1C]">
                        ${(it.unitPrice * it.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] flex justify-between font-semibold text-sm text-[#241E1C]">
                  <span>Total Paid</span>
                  <span className="font-mono tabular-nums">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 border border-[#D9CEBF] text-xs font-medium text-[#241E1C] hover:bg-[#FAF7F2] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#241E1C] text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-[#3D3531] transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

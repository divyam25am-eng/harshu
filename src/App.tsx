import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ProductModal } from './components/ProductModal';
import { CustomCakeStudio } from './components/CustomCakeStudio';
import { TastingBoxSection } from './components/TastingBoxSection';
import { StorySection } from './components/StorySection';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { AtelierContact } from './components/AtelierContact';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CakeItem, CartItem, PlacedOrder } from './types/cake';
import { CAKE_CATALOG } from './data/cakes';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velvet_crumb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState(false);
  const [selectedCakeForModal, setSelectedCakeForModal] = useState<CakeItem | null>(null);

  // Delivery & Fulfillment preferences
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedDate, setSelectedDate] = useState(() => {
    // 2 days in the future for bakery lead time
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM – 01:00 PM');

  // Toast feedback
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    subMessage?: string;
  }>({
    isVisible: false,
    message: '',
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('velvet_crumb_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cartItems]);

  const showToast = (message: string, subMessage?: string) => {
    setToast({ isVisible: true, message, subMessage });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.cakeId === item.cakeId &&
          i.sizeLabel === item.sizeLabel &&
          i.inscription === item.inscription &&
          i.hasCandleKit === item.hasCandleKit
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });

    showToast(`Added to your pastry bag`, `${item.name} (${item.sizeLabel})`);
  };

  const handleQuickAddCake = (cake: CakeItem) => {
    const defaultSize = cake.sizes[0];
    const item: CartItem = {
      cartItemId: `${cake.id}-${Date.now()}`,
      cakeId: cake.id,
      name: cake.name,
      frenchTitle: cake.frenchTitle,
      image: cake.image,
      sizeLabel: defaultSize.label,
      servings: defaultSize.servings,
      unitPrice: cake.basePrice,
      quantity: 1,
    };
    handleAddToCart(item);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    // Clear cart upon successful reservation
    setCartItems([]);
    showToast(`Order #${order.orderNumber} Confirmed!`, `Merci beaucoup, ${order.deliveryDetails.recipientName}`);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tasting Box Quick Select
  const handleSelectTastingBox = () => {
    const tastingCake = CAKE_CATALOG.find((c) => c.category === 'tasting');
    if (tastingCake) {
      setSelectedCakeForModal(tastingCake);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241E1C] selection:bg-[#EBDDD4] selection:text-[#4A251E]">
      {/* 3-Zone Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <div id="hero">
          <HeroSection
            onExploreClick={() => scrollToSection('collection')}
            onCustomStudioClick={() => setIsCustomStudioOpen(true)}
          />
        </div>

        <MenuSection
          onSelectCake={(cake) => setSelectedCakeForModal(cake)}
          onQuickAddCake={handleQuickAddCake}
          onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
        />

        <TastingBoxSection
          onSelectTastingBox={handleSelectTastingBox}
          onOpenConsultation={() => scrollToSection('atelier')}
        />

        <StorySection />

        <ReviewsAndFaq />

        <AtelierContact />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductModal
        cake={selectedCakeForModal}
        onClose={() => setSelectedCakeForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CustomCakeStudio
        isOpen={isCustomStudioOpen}
        onClose={() => setIsCustomStudioOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        deliveryMethod={deliveryMethod}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Toast Feedback */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        subMessage={toast.subMessage}
        onOpenBag={() => {
          setToast((prev) => ({ ...prev, isVisible: false }));
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}

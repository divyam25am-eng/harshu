export type CakeCategory =
  | 'all'
  | 'signature'
  | 'wedding'
  | 'dietary'
  | 'petite'
  | 'tasting';

export type DietaryTag =
  | 'Gluten-Free'
  | 'Vegan'
  | 'Nut-Free'
  | 'Dairy-Free'
  | 'Halal-Friendly'
  | 'Organic Ingredients';

export interface CakeSizeOption {
  label: string;
  diameter: string;
  servings: string;
  priceDelta: number; // relative to base price
}

export interface CakeItem {
  id: string;
  name: string;
  frenchTitle?: string;
  category: 'signature' | 'wedding' | 'dietary' | 'petite' | 'tasting';
  basePrice: number;
  description: string;
  story: string;
  flavorNotes: string[];
  ingredients: string[];
  dietaryTags: DietaryTag[];
  sizes: CakeSizeOption[];
  image: string;
  leadNoticeDays: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isSeasonal?: boolean;
}

export interface CustomCakeConfig {
  tier: 'single' | 'two-tier';
  size: string;
  spongeFlavor: string;
  fillingCream: string;
  outerFinish: string;
  finishColor: string;
  toppings: string[];
  inscriptionText: string;
  cakeBoardColor: string;
  candlesIncluded: boolean;
  dietaryRequirements: string;
  totalPrice: number;
}

export interface CartItem {
  cartItemId: string;
  cakeId?: string;
  name: string;
  frenchTitle?: string;
  image: string;
  sizeLabel: string;
  servings: string;
  unitPrice: number;
  quantity: number;
  inscription?: string;
  hasCandleKit?: boolean;
  specialNotes?: string;
  customConfig?: CustomCakeConfig;
}

export interface DeliveryDetails {
  method: 'pickup' | 'delivery';
  pickupLocation: string;
  date: string;
  timeSlot: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  addressLine1?: string;
  apartment?: string;
  city?: string;
  postalCode?: string;
  orderNote?: string;
  paymentMethod: 'card' | 'apple_pay' | 'cash_pickup';
}

export interface PlacedOrder {
  orderNumber: string;
  placedAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryDetails: DeliveryDetails;
  status: 'Received' | 'In Baking Schedule' | 'Finishing & Decorating' | 'Ready for Pickup';
}

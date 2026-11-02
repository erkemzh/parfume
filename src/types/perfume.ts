export type OlfactoryFamily = 'woody' | 'oriental' | 'floral' | 'fresh' | 'gourmand';

export type PerfumeSeason = 'winter' | 'spring' | 'summer' | 'autumn';

export type TimeOfDay = 'day' | 'evening' | 'versatile';

export type FormatType = 'sample_2ml' | 'sample_5ml' | 'travel_10ml' | 'bottle_50ml' | 'bottle_100ml' | 'tester_100ml';

export interface PerfumeNote {
  name: string;
  category: 'citrus' | 'floral' | 'woody' | 'oriental' | 'spicy' | 'gourmand' | 'leather' | 'musk';
  icon: string;
}

export interface PerfumeFormat {
  id: FormatType;
  label: string;
  ml: number;
  price: number;
  inStock: number;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  perfumer: string;
  family: OlfactoryFamily;
  familyRu: string;
  collection: 'bestsellers' | 'season' | 'niche' | 'samples';
  price: number; // Base price for default format
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Parfum';
  year: number;
  gender: 'Унисекс' | 'Для неё' | 'Для него';
  description: string;
  notes: {
    top: PerfumeNote[];
    heart: PerfumeNote[];
    base: PerfumeNote[];
  };
  accords: Record<string, number>; // Chord name -> 0..100
  performance: {
    longevityHours: number; // e.g. 12
    longevityScore: number; // 1-10
    sillageScore: number;   // 1-10
    sillageDescription: string; // e.g. "Заметный, окутывающий шлейф"
  };
  season: PerfumeSeason[];
  timeOfDay: TimeOfDay;
  mood: {
    whenToWear: string;
    impression: string;
    style: string;
  };
  formats: PerfumeFormat[];
  similarPerfumeIds: string[];
  totalBulkMlStock: number; // Remaining bulk ml for decanting
  createdAt?: string;
}

export interface CartItem {
  id: string;
  type: 'single';
  perfume: Perfume;
  format: PerfumeFormat;
  quantity: number;
}

export interface DiscoverySetItem {
  id: string;
  type: 'discovery_set';
  title: string;
  vials: { perfume: Perfume; ml: number }[];
  customBoxName?: string;
  price: number;
  quantity: number;
}

export type OrderItem = CartItem | DiscoverySetItem;

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: OrderItem[];
  freeSample?: {
    name: string;
    brand: string;
  };
  giftWrapping: boolean;
  giftCardMessage?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'новый' | 'в обработке' | 'отправлен' | 'доставлен';
}

export interface QuizAnswer {
  questionId: number;
  optionIndex: number;
  traits: {
    familyPreference?: OlfactoryFamily;
    accords?: string[];
    sillage?: number;
    season?: PerfumeSeason;
  };
}

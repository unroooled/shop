export type PageView =
  | 'shop-cute-drops'
  | 'custom-orders'
  | 'past-projects'
  | 'our-story'
  | 'contact-and-dm';

export type ProductCategory =
  | 'all'
  | 'custom badges'
  | 'keychains'
  | 'fridge magnets'
  | 'lip balm cases';

export interface ClayProduct {
  id: string;
  name: string;
  price: number;
  category: Exclude<ProductCategory, 'all'>;
  description: string;
  image: string;
  badgeText?: string;
  badgeTone?: 'yellow' | 'lilac' | 'pink';
  chipIcon: string;
  chipText: string;
  footerIcon: string;
  footerText: string;
  dimensions: string;
  hardware: string;
  stockLeft: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  note?: string;
  isCustom?: boolean;
  meta?: string;
}

export interface PastProject {
  id: string;
  batchCode: string;
  title: string;
  summary: string;
  fullStory: string;
  category: 'weddings & events' | 'brand mascots' | 'pet portraits' | 'desk totems';
  image: string;
  pieceCount: string;
  glaze: string;
  turnaround: string;
  rotationClass: string;
  batchColorClass: string;
}

export interface CommissionTicket {
  id: string;
  name: string;
  instagramHandle: string;
  vibe: string;
  hardware: string;
  details: string;
  createdAt: string;
  estimatedPrice: number;
}

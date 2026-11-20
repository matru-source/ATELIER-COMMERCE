export type ProductCategory = 
  | 'All'
  | 'Clothing'
  | 'Bags'
  | 'Footwear'
  | 'Accessories'
  | 'Lifestyle'
  | 'Home Objects';

export interface ProductVariantColor {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Clothing' | 'Bags' | 'Footwear' | 'Accessories' | 'Lifestyle' | 'Home Objects';
  price: number; // in INR
  originalPrice?: number;
  badge?: 'NEW' | 'LIMITED' | 'ICONIC' | 'SIGNATURE' | 'ARCHIVE';
  description: string;
  longDescription: string;
  images: string[];
  secondaryImage: string;
  colors: ProductVariantColor[];
  sizes: string[];
  materials: string[];
  careInstructions: string[];
  details: string[];
  inStock: boolean;
  featured?: boolean;
  isNewArrival?: boolean;
  collectionId?: string;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  curatorNote: string;
  productCount: number;
  season: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductVariantColor;
  selectedSize: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  minSpend?: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type DeliveryMethod = 'standard' | 'express';

export type PaymentMethodType = 'upi' | 'card' | 'cod' | 'apple-pay';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethodType;
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate: string;
  trackingNumber: string;
  carrier: string;
}

export interface FilterState {
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  selectedColors: string[];
  selectedSizes: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';
  inStockOnly: boolean;
}

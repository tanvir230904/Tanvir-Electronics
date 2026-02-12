
export interface Category {
  id: string;
  name: string;
  productCount: number;
  imageUrl: string;
  icon: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  discountPrice?: string;
  category: string;
  description: string;
  detailedDescription?: string;
  imageUrl: string;
  images?: string[];
  sourceUrl?: string;
  features?: string[];
  specs?: Record<string, string>;
  reviews: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  createdAt: string;
}

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  phone: string;
  email: string;
  facebookUrl: string;
  imageUrl: string;
  rating: number;
  completedJobs: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

export enum AppView {
  LANDING = 'landing',
  CATEGORIES = 'categories',
  CATEGORY_DETAIL = 'category_detail',
  SEARCH_RESULTS = 'search_results',
  PRODUCT_DETAIL = 'product_detail',
  CART = 'cart',
  CHECKOUT = 'checkout',
  PAYMENT = 'payment',
  SUCCESS = 'success',
  DISCOUNTS = 'discounts',
  ACCOUNT = 'account',
  FEATURES = 'features',
  TECHNICIANS = 'technicians'
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'paypal' | 'bank';

export interface OrderDetails {
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  userId: string;
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes: string;
  };
  paymentMethod: PaymentMethod;
  orderId: string;
  orderDate: string;
}

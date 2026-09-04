export type Role = 'customer' | 'admin';
export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'Cash on Delivery' | 'Demo Card Payment' | 'Demo UPI';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  brand: string;
  stock: number;
  sku: string;
  images: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  createdAt: string;
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  role: Role;
  active: boolean;
  createdAt: string;
}


export interface CartItem { productId: string; quantity: number; }
export interface WishlistItem { productId: string; }
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}
export interface OrderItem { productId: string; name: string; price: number; quantity: number; image: string; }
export interface CustomerInfo { fullName: string; email: string; phone: string; address: string; city: string; state: string; postalCode: string; country: string; }
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}

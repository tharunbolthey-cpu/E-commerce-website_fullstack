import type { CartItem, Category, Order, Product, Review, User, WishlistItem } from '@/types';
import { categories as defaultCategories } from '@/data/categories';
import { products as defaultProducts } from '@/data/products';
import { seedOrders, seedReviews, seedUsers } from '@/data/seed';

export const STORAGE_KEYS = { users:'atelier_users', currentUser:'atelier_current_user', products:'atelier_products', categories:'atelier_categories', cart:'atelier_cart', wishlist:'atelier_wishlist', orders:'atelier_orders', reviews:'atelier_reviews' } as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}
function write<T>(key: string, value: T) { if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value)); }

export const getUsers = () => read<User[]>(STORAGE_KEYS.users, seedUsers);
export const saveUsers = (value: User[]) => write(STORAGE_KEYS.users, value);
export const getCurrentUser = () => read<User | null>(STORAGE_KEYS.currentUser, null);
export const saveCurrentUser = (value: User | null) => value ? write(STORAGE_KEYS.currentUser, value) : localStorage.removeItem(STORAGE_KEYS.currentUser);
export const logoutUser = () => { if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEYS.currentUser); };
export const getProducts = () => read<Product[]>(STORAGE_KEYS.products, defaultProducts);
export const saveProducts = (value: Product[]) => write(STORAGE_KEYS.products, value);
export const getCategories = () => read<Category[]>(STORAGE_KEYS.categories, defaultCategories);
export const saveCategories = (value: Category[]) => write(STORAGE_KEYS.categories, value);
export const getCart = () => read<CartItem[]>(STORAGE_KEYS.cart, []);
export const saveCart = (value: CartItem[]) => write(STORAGE_KEYS.cart, value);
export const getWishlist = () => read<WishlistItem[]>(STORAGE_KEYS.wishlist, []);
export const saveWishlist = (value: WishlistItem[]) => write(STORAGE_KEYS.wishlist, value);
export const getOrders = () => read<Order[]>(STORAGE_KEYS.orders, seedOrders);
export const saveOrders = (value: Order[]) => write(STORAGE_KEYS.orders, value);
export const getReviews = () => read<Review[]>(STORAGE_KEYS.reviews, seedReviews);
export const saveReviews = (value: Review[]) => write(STORAGE_KEYS.reviews, value);

export function initializeStorage() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.users)) saveUsers(seedUsers);
  if (!localStorage.getItem(STORAGE_KEYS.products)) saveProducts(defaultProducts);
  if (!localStorage.getItem(STORAGE_KEYS.categories)) saveCategories(defaultCategories);
  if (!localStorage.getItem(STORAGE_KEYS.orders)) saveOrders(seedOrders);
  if (!localStorage.getItem(STORAGE_KEYS.reviews)) saveReviews(seedReviews);
  if (!localStorage.getItem(STORAGE_KEYS.cart)) saveCart([]);
  if (!localStorage.getItem(STORAGE_KEYS.wishlist)) saveWishlist([]);
}

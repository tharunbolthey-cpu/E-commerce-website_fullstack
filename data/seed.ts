import type { Order, Review, User } from '@/types';
import { products } from './products';
import { categories } from './categories';

export const seedUsers: User[] = [
  { id: 'u001', name: 'Alex Morgan', email: 'alex@example.com', password: 'demo123', phone: '+91 90000 00001', address: '12 Park Avenue', city: 'Hyderabad', state: 'Telangana', postalCode: '500001', country: 'India', role: 'customer', active: true, createdAt: '2026-01-08T10:00:00Z' },
  { id: 'u002', name: 'Maya Chen', email: 'maya@example.com', password: 'demo123', phone: '+91 90000 00002', address: '45 Lake Road', city: 'Bengaluru', state: 'Karnataka', postalCode: '560001', country: 'India', role: 'customer', active: true, createdAt: '2026-02-11T10:00:00Z' },
  { id: 'u003', name: 'Noah Patel', email: 'noah@example.com', password: 'demo123', phone: '+91 90000 00003', address: '9 Residency Lane', city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', country: 'India', role: 'customer', active: true, createdAt: '2026-03-15T10:00:00Z' },
  { id: 'u004', name: 'Sara Williams', email: 'sara@example.com', password: 'demo123', phone: '+91 90000 00004', address: '77 Garden Street', city: 'Chennai', state: 'Tamil Nadu', postalCode: '600001', country: 'India', role: 'customer', active: true, createdAt: '2026-04-19T10:00:00Z' },
  { id: 'admin001', name: 'Atelier Admin', email: 'admin@atelier.demo', password: 'admin123', phone: '+91 90000 00099', address: 'Atelier HQ', city: 'Hyderabad', state: 'Telangana', postalCode: '500032', country: 'India', role: 'admin', active: true, createdAt: '2026-01-01T10:00:00Z' },
];

export const seedReviews: Review[] = products.slice(0, 8).map((p, i) => ({
  id: `r00${i + 1}`,
  productId: p.id,
  userId: seedUsers[i % 4].id,
  userName: seedUsers[i % 4].name,
  rating: 4 + (i % 2),
  title: i % 2 ? 'Beautifully made' : 'Exactly what I wanted',
  comment: 'The finish feels premium and the product arrived exactly as described. A very polished experience from start to finish.',
  createdAt: `2026-08-${10 + i}T10:00:00Z`,
}));

export const seedOrders: Order[] = [
  {
    id: 'ORD-1001', userId: 'u001', items: [{ productId: products[0].id, name: products[0].name, price: products[0].price, quantity: 1, image: products[0].images[0] }], subtotal: products[0].price, discount: 0, shipping: 0, tax: Math.round(products[0].price * .05), total: Math.round(products[0].price * 1.05),
    customer: { fullName: 'Alex Morgan', email: 'alex@example.com', phone: '+91 90000 00001', address: '12 Park Avenue', city: 'Hyderabad', state: 'Telangana', postalCode: '500001', country: 'India' }, paymentMethod: 'Demo Card Payment', status: 'Delivered', createdAt: '2026-08-08T10:00:00Z'
  },
  {
    id: 'ORD-1002', userId: 'u002', items: [{ productId: products[6].id, name: products[6].name, price: products[6].price, quantity: 1, image: products[6].images[0] }], subtotal: products[6].price, discount: 10, shipping: 0, tax: Math.round((products[6].price-10) * .05), total: Math.round((products[6].price-10) * 1.05),
    customer: { fullName: 'Maya Chen', email: 'maya@example.com', phone: '+91 90000 00002', address: '45 Lake Road', city: 'Bengaluru', state: 'Karnataka', postalCode: '560001', country: 'India' }, paymentMethod: 'Cash on Delivery', status: 'Processing', createdAt: '2026-08-17T10:00:00Z'
  }
];

export { products, categories };

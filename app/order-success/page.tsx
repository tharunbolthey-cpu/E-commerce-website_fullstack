'use client';

import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';

export default function Success() {
  const {
    orders,
    currentUser,
  } = useApp();

  const id =
    typeof window !== 'undefined'
      ? localStorage.getItem(
          'atelier_last_order'
        )
      : null;

  const order =
    orders.find((o) => o.id === id) ||
    orders.find(
      (o) => o.userId === currentUser?.id
    );

  return (
    <div className="container section">
      <div className="empty">
        <div className="empty-icon">
          ✓
        </div>

        <div className="eyebrow">
          Order confirmed
        </div>

        <h1 className="h1">
          Thank you for shopping thoughtfully.
        </h1>

        {order && (
          <p className="muted">
            Order <strong>{order.id}</strong> · ₹
            {order.total.toLocaleString('en-IN')}
          </p>
        )}

        <div
          className="hero-actions"
          style={{ justifyContent: 'center' }}
        >
          <Link
            className="btn btn-primary"
            href="/orders"
          >
            View orders
          </Link>

          <Link
            className="btn btn-outline"
            href="/products"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
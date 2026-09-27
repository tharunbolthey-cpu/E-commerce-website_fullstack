'use client';

import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';
import { ProductGrid } from '@/components/ProductGrid';

export default function Wishlist() {
  const {
    wishlist,
    products,
  } = useApp();

  const list = products.filter((p: any) =>
    wishlist.some(
      (w: any) =>
        String(w.productId) ===
          String(p.id) ||
        String(w.productId) ===
          String(p._id)
    )
  );

  return (
    <div className="container section">
      <div className="page-top">
        <div className="eyebrow">
          Saved for later
        </div>

        <h1 className="h1">
          Wishlist
        </h1>
      </div>

      {list.length ? (
        <ProductGrid products={list} />
      ) : (
        <div className="empty">
          <div className="empty-icon">
            ♡
          </div>

          <h2>
            No products in your wishlist.
          </h2>

          <p className="muted">
            Save pieces you want to come back
            to.
          </p>

          <Link
            className="btn btn-primary"
            href="/products"
          >
            Browse products
          </Link>
        </div>
      )}
    </div>
  );
}
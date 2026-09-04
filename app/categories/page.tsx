'use client';

import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';

export default function CategoriesPage() {
  const {
    categories,
    products,
  } = useApp();

  return (
    <div className="container">
      <div className="page-top">
        <div className="eyebrow">Browse</div>

        <h1 className="h1">Categories</h1>

        <p className="muted">
          Explore the collection by what you are looking for.
        </p>
      </div>

      <div className="grid grid-3">
        {categories.map((c) => (
          <Link
            className="category-card"
            href={`/categories/${c.slug}`}
            key={c.id}
          >
            <img
              src={c.image}
              alt={c.name}
            />

            <div className="category-card-content">
              <h3>{c.name}</h3>

              <div
                style={{
                  fontSize: 12,
                  color: '#ddd',
                }}
              >
                {
                  products.filter(
                    (p) => p.category === c.name
                  ).length
                }{' '}
                products
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
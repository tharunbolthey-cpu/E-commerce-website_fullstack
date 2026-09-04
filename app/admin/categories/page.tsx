'use client';

import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';

export default function AdminCategories() {
  const {
    categories,
    products,
    deleteCategory,
  } = useApp();

  return (
    <div>
      <div className="toolbar">
        <span className="muted">
          {categories.length} categories
        </span>

        <Link
          className="btn btn-primary"
          href="/admin/categories/add"
        >
          + Add category
        </Link>
      </div>

      <div className="grid grid-3">
        {categories.map((c) => (
          <div
            className="card padded"
            key={c.id}
          >
            <img
              src={c.image}
              alt={c.name}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                borderRadius: 12,
              }}
            />

            <h3>{c.name}</h3>

            <p className="muted">
              {products.filter(
                (p) => p.category === c.name
              ).length}{' '}
              products
            </p>

            <div className="admin-actions">
              <Link
                className="btn btn-outline"
                href={`/admin/categories/${c.id}/edit`}
              >
                Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => deleteCategory(c.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
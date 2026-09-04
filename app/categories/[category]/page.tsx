'use client';

import { use } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { ProductGrid } from '@/components/ProductGrid';

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  const {
    categories,
    products,
  } = useApp();

  const cat = categories.find(
    (c) => c.slug === category
  );

  const list = products.filter(
    (p) =>
      p.category.toLowerCase() ===
      cat?.name.toLowerCase()
  );

  if (!cat)
    return (
      <div className="container section">
        <div className="empty">
          <h2>Category not found</h2>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="page-top">
        <div className="eyebrow">Category</div>

        <h1 className="h1">{cat.name}</h1>

        <p className="muted">
          {cat.description}
        </p>
      </div>

      <ProductGrid products={list} />
    </div>
  );
}
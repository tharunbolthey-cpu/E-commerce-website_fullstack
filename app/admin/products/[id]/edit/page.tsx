'use client';

import { use } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { ProductForm } from '@/components/admin/ProductForm';

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { products } = useApp();

  const p = products.find(
    (x: any) =>
      String(x._id || x.id || '') === String(id)
  );

  if (!p)
    return (
      <div className="empty">
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="card padded">
      <div className="eyebrow">Catalog</div>

      <h2 className="h2">Edit product</h2>

      <ProductForm initial={p} />
    </div>
  );
}


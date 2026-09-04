'use client';

import { use } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { CategoryForm } from '@/components/admin/CategoryForm';

export default function EditCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { categories } = useApp();

  const c = categories.find((x) => x.id === id);

  if (!c)
    return (
      <div className="empty">
        <h2>Category not found</h2>
      </div>
    );

  return (
    <div
      className="card padded"
      style={{ maxWidth: 700 }}
    >
      <div className="eyebrow">Catalog</div>

      <h2 className="h2">Edit category</h2>

      <CategoryForm initial={c} />
    </div>
  );
}
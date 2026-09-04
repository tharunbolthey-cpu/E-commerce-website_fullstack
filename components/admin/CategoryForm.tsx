'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/types';
import { useApp } from '../providers/AppProvider';

export function CategoryForm({
  initial,
}: {
  initial?: Category;
}) {
  const {
    addCategory,
    updateCategory,
  } = useApp();

  const router = useRouter();

  const [form, setForm] =
    useState<Category>(
      initial || {
        id: `c-${Date.now()}`,
        name: '',
        slug: '',
        image:
          'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80',
        description: '',
      }
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        initial
          ? updateCategory(form)
          : addCategory(form);

        router.push(
          '/admin/categories'
        );
      }}
    >
      <div className="field">
        <label className="label">
          Name
        </label>

        <input
          className="input"
          required
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: e.target.value
                .toLowerCase()
                .replace(
                  /[^a-z0-9]+/g,
                  '-'
                )
                .replace(
                  /^-|-$/g,
                  ''
                ),
            })
          }
        />
      </div>

      <div className="field">
        <label className="label">
          Image URL
        </label>

        <input
          className="input"
          required
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label className="label">
          Description
        </label>

        <textarea
          className="textarea"
          required
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />
      </div>

      <button className="btn btn-primary">
        {initial
          ? 'Save category'
          : 'Create category'}
      </button>
    </form>
  );
}
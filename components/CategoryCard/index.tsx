import Link from 'next/link';
import type { Category } from '@/types';

export function CategoryCard({
  category,
  count = 0,
}: {
  category: Category;
  count?: number;
}) {
  return (
    <Link
      className="category-card"
      href={`/categories/${category.slug}`}
    >
      <img
        src={category.image}
        alt={category.name}
      />

      <div className="category-card-content">
        <h3>{category.name}</h3>

        <div
          style={{
            fontSize: 12,
            color: '#ddd',
          }}
        >
          {count} products
        </div>
      </div>
    </Link>
  );
}
import type { Product } from '@/types';

import { ProductCard } from '../ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">
          ⌕
        </div>

        <h3>
          No products found
        </h3>

        <p className="muted">
          Try another search or
          adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(
        (product, index) => {
          const productId =
            String(
              (product as any)
                ._id ||
                product.id ||
                `product-${index}`
            );

          return (
            <ProductCard
              key={productId}
              product={product}
            />
          );
        }
      )}
    </div>
  );
}
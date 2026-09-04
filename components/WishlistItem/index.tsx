import type { Product } from '@/types';
import Link from 'next/link';

export function WishlistItem({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="card padded">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: 12,
            width: '100%',
          }}
        />

        <h3>{product.name}</h3>
      </Link>
    </div>
  );
}
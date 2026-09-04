import type { Product } from '@/types';
import { QuantitySelector } from '../QuantitySelector';

export function CartItem({
  product,
  quantity,
  onQuantity,
  onRemove,
}: {
  product: Product;
  quantity: number;
  onQuantity: (value: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="cart-item">
      <div className="cart-thumb">
        <img
          src={product.images[0]}
          alt={product.name}
        />
      </div>

      <div>
        <strong>
          {product.name}
        </strong>

        <div className="muted">
          ₹{product.price.toLocaleString('en-IN')}
        </div>

        <QuantitySelector
          value={quantity}
          max={product.stock}
          onChange={onQuantity}
        />
      </div>

      <button
        className="btn btn-danger"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
}
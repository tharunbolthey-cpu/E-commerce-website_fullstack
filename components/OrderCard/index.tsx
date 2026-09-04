import type { Order } from '@/types';
import Link from 'next/link';
import { OrderStatus } from '../OrderStatus';

export function OrderCard({
  order,
}: {
  order: Order;
}) {
  return (
    <article className="card order-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div>
          <strong>{order.id}</strong>

          <div className="muted">
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </div>
        </div>

        <OrderStatus
          status={order.status}
        />
      </div>

      <div className="summary-row">
        <span>
          {order.items.length} item(s)
        </span>

        <strong>
          ₹{order.total.toLocaleString('en-IN')}
        </strong>
      </div>

      <Link
        className="btn btn-outline"
        href={`/orders/${order.id}`}
      >
        View details
      </Link>
    </article>
  );
}
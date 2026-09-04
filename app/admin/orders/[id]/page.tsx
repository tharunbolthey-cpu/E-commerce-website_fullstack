'use client';

import { use } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';
import type { OrderStatus } from '@/types';

const statuses: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export default function AdminOrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    orders,
    updateOrder,
  } = useApp();

  const o = orders.find((x) => x.id === id);

  if (!o)
    return (
      <div className="empty">
        <h2>Order not found</h2>
      </div>
    );

  return (
    <div className="card padded">
      <div className="eyebrow">Order</div>

      <h2 className="h2">{o.id}</h2>

      <div
        className="field"
        style={{ maxWidth: 300 }}
      >
        <label className="label">Status</label>

        <select
          className="select"
          value={o.status}
          onChange={(e) =>
            updateOrder(o.id, {
              status: e.target.value as OrderStatus,
            })
          }
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <h3>Customer</h3>

      <p className="muted">
        {o.customer.fullName}
        <br />
        {o.customer.email} · {o.customer.phone}
        <br />
        {o.customer.address}, {o.customer.city},{' '}
        {o.customer.state} {o.customer.postalCode}
      </p>

      <h3>Items</h3>

      {o.items.map((i) => (
        <div
          className="summary-row"
          key={i.productId}
        >
          <span>
            {i.name} × {i.quantity}
          </span>

          <strong>
            ₹
            {(i.price * i.quantity).toLocaleString(
              'en-IN'
            )}
          </strong>
        </div>
      ))}

      <div className="summary-row summary-total">
        <span>Total</span>

        <span>
          ₹{o.total.toLocaleString('en-IN')}
        </span>
      </div>

      <Link
        className="btn btn-outline"
        href="/admin/orders"
      >
        Back
      </Link>
    </div>
  );
}
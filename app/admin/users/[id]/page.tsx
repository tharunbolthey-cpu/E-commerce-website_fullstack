'use client';

import { use } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import Link from 'next/link';

export default function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    users,
    orders,
  } = useApp();

  const u = users.find((x) => x.id === id);

  if (!u)
    return (
      <div className="empty">
        <h2>User not found</h2>
      </div>
    );

  return (
    <div className="card padded">
      <div
        className="avatar"
        style={{ margin: 0 }}
      >
        {u.name[0]}
      </div>

      <h2 className="h2">{u.name}</h2>

      <p className="muted">
        {u.email}
        <br />
        {u.phone}
        <br />
        {u.address}, {u.city}, {u.state}{' '}
        {u.postalCode}
      </p>

      <p>
        <strong>Role:</strong> {u.role} ·{' '}
        <strong>Status:</strong>{' '}
        {u.active ? 'Active' : 'Inactive'}
      </p>

      <h3>Orders</h3>

      {orders
        .filter((o) => o.userId === u.id)
        .map((o) => (
          <div
            className="summary-row"
            key={o.id}
          >
            <Link href={`/admin/orders/${o.id}`}>
              {o.id}
            </Link>

            <span>
              ₹{o.total.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';

export default function Orders() {
  const {
    orders,
    currentUser,
  } = useApp();

  if (!currentUser)
    return (
      <div className="container section">
        <div className="empty">
          <h2>Sign in to view orders.</h2>

          <Link
            className="btn btn-primary"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    );

  const list = orders.filter(
    (o) => o.userId === currentUser.id
  );

  return (
    <div className="container section">
      <div className="page-top">
        <div className="eyebrow">Account</div>

        <h1 className="h1">
          Your orders
        </h1>
      </div>

      {list.length ? (
        list.map((o) => (
          <div
            className="order-card card"
            key={o.id}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 15,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <strong>{o.id}</strong>

                <div className="muted">
                  {new Date(
                    o.createdAt
                  ).toLocaleDateString()}
                </div>
              </div>

              <span
                className={`status ${o.status.toLowerCase()}`}
              >
                {o.status}
              </span>
            </div>

            <div style={{ marginTop: 15 }}>
              {o.items.map((i) => (
                <div
                  key={i.productId}
                  className="summary-row"
                >
                  <span>
                    {i.name} × {i.quantity}
                  </span>

                  <span>
                    ₹
                    {(
                      i.price * i.quantity
                    ).toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <strong>
                Total ₹
                {o.total.toLocaleString(
                  'en-IN'
                )}
              </strong>

              <Link
                className="btn btn-outline"
                href={`/orders/${o.id}`}
              >
                View details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="empty">
          <h2>
            You haven't placed any orders yet.
          </h2>

          <Link
            className="btn btn-primary"
            href="/products"
          >
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
}
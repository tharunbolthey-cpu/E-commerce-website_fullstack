'use client';

import { use } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { orders } = useApp();

  const o = orders.find((x) => x.id === id);

  if (!o)
    return (
      <div className="container section">
        <div className="empty">
          <h2>Order not found</h2>

          <Link
            className="btn btn-primary"
            href="/orders"
          >
            Back to orders
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link href="/orders">Orders</Link> / {o.id}
      </div>

      <div className="page-top">
        <div className="eyebrow">
          Order detail
        </div>

        <h1 className="h1">{o.id}</h1>

        <span
          className={`status ${o.status.toLowerCase()}`}
        >
          {o.status}
        </span>
      </div>

      <div className="cart-layout">
        <div className="card padded">
          <h3>Items</h3>

          {o.items.map((i) => (
            <div
              className="cart-item"
              key={i.productId}
            >
              <div className="cart-thumb">
                <img
                  src={i.image}
                  alt={i.name}
                />
              </div>

              <div>
                <strong>{i.name}</strong>

                <div className="muted">
                  ₹
                  {i.price.toLocaleString(
                    'en-IN'
                  )}{' '}
                  × {i.quantity}
                </div>
              </div>

              <strong>
                ₹
                {(
                  i.price * i.quantity
                ).toLocaleString('en-IN')}
              </strong>
            </div>
          ))}

          <h3 style={{ marginTop: 25 }}>
            Delivery
          </h3>

          <p className="muted">
            {o.customer.fullName}
            <br />
            {o.customer.address}
            <br />
            {o.customer.city},{' '}
            {o.customer.state}{' '}
            {o.customer.postalCode}
            <br />
            {o.customer.country}
          </p>
        </div>

        <aside className="card summary">
          <h3>Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹
              {o.subtotal.toLocaleString(
                'en-IN'
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Discount</span>

            <span>
              -₹
              {o.discount.toLocaleString(
                'en-IN'
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <span>
              {o.shipping
                ? '₹' + o.shipping
                : 'Free'}
            </span>
          </div>

          <div className="summary-row">
            <span>Tax</span>

            <span>
              ₹
              {o.tax.toLocaleString(
                'en-IN'
              )}
            </span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>

            <span>
              ₹
              {o.total.toLocaleString(
                'en-IN'
              )}
            </span>
          </div>

          <p
            className="muted"
            style={{ fontSize: 12 }}
          >
            Payment: {o.paymentMethod}
          </p>
        </aside>
      </div>
    </div>
  );
}
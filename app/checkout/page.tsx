'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/providers/AppProvider';
import type {
  CustomerInfo,
  PaymentMethod,
} from '@/types';

export default function Checkout() {
  const {
    cart,
    products,
    currentUser,
    createOrder,
    clearCart,
  } = useApp();

  const router = useRouter();

  const items = cart
    .map((i) => ({
      line: i,
      p: products.find((p) => p.id === i.productId),
    }))
    .filter((x) => x.p);

  const subtotal = items.reduce(
    (a, x) => a + x.p!.price * x.line.quantity,
    0
  );

  const discount = items.reduce(
    (a, x) =>
      a +
      (x.p!.originalPrice - x.p!.price) *
        x.line.quantity,
    0
  );

  const shipping = subtotal >= 1500 ? 0 : 99;

  const tax = Math.round(
    (subtotal - discount) * 0.05
  );

  const total =
    subtotal - discount + shipping + tax;

  const [customer, setCustomer] =
    useState<CustomerInfo>({
      fullName: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      postalCode:
        currentUser?.postalCode || '',
      country: currentUser?.country || 'India',
    });

  const [payment, setPayment] =
    useState<PaymentMethod>(
      'Cash on Delivery'
    );

  const set = (
    k: keyof CustomerInfo,
    v: string
  ) =>
    setCustomer((c) => ({
      ...c,
      [k]: v,
    }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      router.push('/login?next=/checkout');
      return;
    }

    const order = {
      id: `ORD-${Date.now()
        .toString()
        .slice(-6)}`,
      userId: currentUser.id,
      items: items.map((x) => ({
        productId: x.p!.id,
        name: x.p!.name,
        price: x.p!.price,
        quantity: x.line.quantity,
        image: x.p!.images[0],
      })),
      subtotal,
      discount,
      shipping,
      tax,
      total,
      customer,
      paymentMethod: payment,
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
    };

    createOrder(order);
    clearCart();

    localStorage.setItem(
      'atelier_last_order',
      order.id
    );

    router.push('/order-success');
  };

  if (!items.length)
    return (
      <div className="container section">
        <div className="empty">
          <h2>Your bag is empty.</h2>

          <Link
            className="btn btn-primary"
            href="/products"
          >
            Shop products
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container section">
      <div className="page-top">
        <div className="eyebrow">
          Final step
        </div>

        <h1 className="h1">Checkout</h1>

        <p className="muted">
          Demo checkout only — no real payment is
          processed.
        </p>
      </div>

      <form onSubmit={submit}>
        <div className="checkout-layout">
          <div className="card padded">
            <h3>Customer information</h3>

            <div className="form-row">
              <div className="field">
                <label className="label">
                  Full name
                </label>

                <input
                  className="input"
                  required
                  value={customer.fullName}
                  onChange={(e) =>
                    set(
                      'fullName',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="field">
                <label className="label">
                  Email
                </label>

                <input
                  className="input"
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) =>
                    set(
                      'email',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label className="label">
                  Phone
                </label>

                <input
                  className="input"
                  required
                  value={customer.phone}
                  onChange={(e) =>
                    set(
                      'phone',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="field">
                <label className="label">
                  Country
                </label>

                <input
                  className="input"
                  required
                  value={customer.country}
                  onChange={(e) =>
                    set(
                      'country',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                Address
              </label>

              <input
                className="input"
                required
                value={customer.address}
                onChange={(e) =>
                  set(
                    'address',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label className="label">
                  City
                </label>

                <input
                  className="input"
                  required
                  value={customer.city}
                  onChange={(e) =>
                    set(
                      'city',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="field">
                <label className="label">
                  State
                </label>

                <input
                  className="input"
                  required
                  value={customer.state}
                  onChange={(e) =>
                    set(
                      'state',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                Postal code
              </label>

              <input
                className="input"
                required
                value={customer.postalCode}
                onChange={(e) =>
                  set(
                    'postalCode',
                    e.target.value
                  )
                }
              />
            </div>

            <h3 style={{ marginTop: 28 }}>
              Payment method
            </h3>

            <div className="grid grid-3">
              {(
                [
                  'Cash on Delivery',
                  'Demo Card Payment',
                  'Demo UPI',
                ] as PaymentMethod[]
              ).map((m) => (
                <label
                  className="card padded"
                  key={m}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={
                      payment === m
                    }
                    onChange={() =>
                      setPayment(m)
                    }
                  />{' '}
                  {m}
                </label>
              ))}
            </div>
          </div>

          <aside className="card summary">
            <h3>Summary</h3>

            {items.map((x) => (
              <div
                className="summary-row"
                key={x.p!.id}
              >
                <span>
                  {x.p!.name} ×{' '}
                  {x.line.quantity}
                </span>

                <span>
                  ₹
                  {(
                    x.p!.price *
                    x.line.quantity
                  ).toLocaleString(
                    'en-IN'
                  )}
                </span>
              </div>
            ))}

            <div className="summary-row">
              <span>Discount</span>

              <span>
                -₹
                {discount.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <span>
                {shipping
                  ? '₹' + shipping
                  : 'Free'}
              </span>
            </div>

            <div className="summary-row">
              <span>Tax</span>

              <span>
                ₹
                {tax.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>

              <span>
                ₹
                {total.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <button
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: 14,
              }}
            >
              Place demo order
            </button>
          </aside>
        </div>
      </form>
    </div>
  );
}
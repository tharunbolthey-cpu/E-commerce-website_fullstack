'use client';

import Link from 'next/link';

import { useApp } from '@/components/providers/AppProvider';

export default function Cart() {
  const {
    cart,
    products,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useApp();

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (
    image: string | undefined
  ): string => {
    if (!image) {
      return '';
    }

    const value = String(image).trim();

    if (!value) {
      return '';
    }

    /*
     * Already complete URL.
     */
    if (
      value.startsWith('http://') ||
      value.startsWith('https://')
    ) {
      return value;
    }

    /*
     * Multer stores:
     *
     * /uploads/file.jpg
     *
     * Convert it to:
     *
     * http://localhost:5000/uploads/file.jpg
     */
    if (value.startsWith('/')) {
      return `http://localhost:5000${value}`;
    }

    return `http://localhost:5000/${value}`;
  };

  /* =========================================================
     CART PRODUCTS
  ========================================================= */

  const items = cart
    .map((item) => {
      const product =
        products.find(
          (product) =>
            String(
              (product as any)._id ||
              product.id
            ) ===
            String(item.productId)
        );

      return {
        line: item,
        p: product,
      };
    })
    .filter(
      (
        item
      ): item is {
        line: typeof item.line;
        p: NonNullable<
          typeof item.p
        >;
      } => Boolean(item.p)
    );

  /* =========================================================
     TOTALS
  ========================================================= */

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.p.price || 0) *
        item.line.quantity,
    0
  );

  const discount = items.reduce(
    (total, item) =>
      total +
      Math.max(
        0,
        Number(
          item.p.originalPrice || 0
        ) -
          Number(
            item.p.price || 0
          )
      ) *
        item.line.quantity,
    0
  );

  const shipping =
    subtotal >= 1500 ||
    subtotal === 0
      ? 0
      : 99;

  const tax = Math.round(
    subtotal * 0.05
  );

  const total =
    subtotal +
    shipping +
    tax;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="container section">
      <div className="page-top">
        <div className="eyebrow">
          Your selection
        </div>

        <h1 className="h1">
          Shopping bag
        </h1>
      </div>

      {!items.length ? (
        <div className="empty">
          <div className="empty-icon">
            ◴
          </div>

          <h2>
            Your cart is empty.
          </h2>

          <p className="muted">
            Find something considered
            for your next everyday.
          </p>

          <Link
            className="btn btn-primary"
            href="/products"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">

          {/* =================================================
              CART ITEMS
          ================================================= */}

          <div className="card">
            {items.map(
              ({ line, p }) => {
                const productId =
                  String(
                    (p as any)._id ||
                    p.id
                  );

                const imageUrl =
                  p.images &&
                  p.images.length > 0
                    ? getImageUrl(
                        p.images[0]
                      )
                    : '';

                return (
                  <div
                    className="cart-item"
                    key={productId}
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="cart-thumb">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={p.name}
                          style={{
                            width:
                              '100%',
                            height:
                              '100%',
                            objectFit:
                              'cover',
                            display:
                              'block',
                          }}
                          onError={(
                            event
                          ) => {
                            event.currentTarget.style.display =
                              'none';
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width:
                              '100%',
                            height:
                              '100%',
                            minHeight:
                              120,
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'center',
                            background:
                              '#f3f3f3',
                            color:
                              '#777',
                            fontSize:
                              13,
                          }}
                        >
                          No image
                        </div>
                      )}
                    </div>

                    {/* PRODUCT INFORMATION */}

                    <div>
                      <Link
                        href={`/products/${productId}`}
                      >
                        <strong>
                          {p.name}
                        </strong>
                      </Link>

                      <div className="muted">
                        ₹
                        {Number(
                          p.price || 0
                        ).toLocaleString(
                          'en-IN'
                        )}
                      </div>

                      <div
                        className="quantity"
                        style={{
                          marginTop: 8,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              productId,
                              line.quantity -
                                1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {
                            line.quantity
                          }
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              productId,
                              line.quantity +
                                1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* PRICE */}

                    <div
                      style={{
                        textAlign:
                          'right',
                      }}
                    >
                      <strong>
                        ₹
                        {(
                          Number(
                            p.price || 0
                          ) *
                          line.quantity
                        ).toLocaleString(
                          'en-IN'
                        )}
                      </strong>

                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{
                          marginTop: 8,
                        }}
                        onClick={() =>
                          removeFromCart(
                            productId
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              }
            )}

            <div
              style={{
                padding: 18,
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={clearCart}
              >
                Clear bag
              </button>
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <aside className="card summary">
            <h3>
              Order summary
            </h3>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Discount
              </span>

              <span>
                -₹
                {discount.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Shipping
              </span>

              <span>
                {shipping
                  ? `₹${shipping}`
                  : 'Free'}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Tax
              </span>

              <span>
                ₹
                {tax.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <div className="summary-row summary-total">
              <span>
                Total
              </span>

              <span>
                ₹
                {total.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            <Link
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: 14,
              }}
              href="/checkout"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}   
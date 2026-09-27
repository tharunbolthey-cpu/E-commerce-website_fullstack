'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useApp } from
  '@/components/providers/AppProvider';

const API_URL =
  'http://localhost:5000';

export default function AdminProducts() {
  const {
    products,
    deleteProduct,
    refresh,
  } = useApp();

  const [q, setQ] =
    useState('');

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const list =
    products.filter((p: any) =>
      `${p.name || ''} ${
        p.brand || ''
      } ${
        p.category || ''
      }`
        .toLowerCase()
        .includes(
          q.toLowerCase()
        )
    );

  /* =========================================================
     GET MONGODB ID
  ========================================================= */

  const getProductId = (
    product: any
  ): string => {
    return String(
      product?._id ||
        product?.id ||
        ''
    );
  };

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (
    image: string
  ): string => {
    if (!image) {
      return '';
    }

    if (
      image.startsWith(
        'http://'
      ) ||
      image.startsWith(
        'https://'
      )
    ) {
      return image;
    }

    const cleanImage =
      image
        .replace(
          /^\/uploads\//,
          ''
        )
        .replace(
          /^uploads\//,
          ''
        );

    return `${API_URL}/uploads/${cleanImage}`;
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (
  product: any
) => {
  const productId = getProductId(product);

  console.log(
    'Product being deleted:',
    product
  );

  console.log(
    'MongoDB _id:',
    product?._id
  );

  console.log(
    'Delete ID:',
    productId
  );

  if (!productId) {
    alert(
      'Product MongoDB ID is missing.'
    );

    return;
  }

  const confirmed =
    window.confirm(
      `Delete ${product.name}?`
    );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingId(productId);

    /*
     * Use the existing AppProvider deleteProduct().
     *
     * It deletes from MongoDB and immediately
     * removes the product from the frontend state.
     */
    await deleteProduct(productId);

    alert(
      'Product deleted successfully.'
    );
  } catch (error) {
    console.error(
      'Delete product error:',
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : 'Failed to delete product.'
    );
  } finally {
    setDeletingId(null);
  }
};
  return (
    <div>
      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="toolbar">
        <input
          className="input"
          style={{
            maxWidth: 420,
          }}
          placeholder="Search products..."
          value={q}
          onChange={(e) =>
            setQ(
              e.target.value
            )
          }
        />

        <Link
          className="btn btn-primary"
          href="/admin/products/add"
        >
          + Add product
        </Link>
      </div>

      {/* =====================================================
          PRODUCTS TABLE
      ===================================================== */}

      <div className="card table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>
                Product
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Stock
              </th>

              <th>
                Flags
              </th>

              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {list.map(
              (
                p: any,
                index
              ) => {
                const productId =
                  getProductId(
                    p
                  );

                const image =
                  p.images &&
                  p.images.length >
                    0
                    ? getImageUrl(
                        p.images[0]
                      )
                    : '';

                return (
                  <tr
                    key={
                      productId ||
                      `product-${index}`
                    }
                  >
                    {/* PRODUCT */}

                    <td>
                      <div
                        style={{
                          display:
                            'flex',
                          gap: 10,
                          alignItems:
                            'center',
                        }}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={
                              p.name ||
                              'Product'
                            }
                            width="48"
                            height="48"
                            style={{
                              objectFit:
                                'cover',
                              borderRadius:
                                8,
                            }}
                            onError={(
                              e
                            ) => {
                              (
                                e.currentTarget
                                  .style
                              ).display =
                                'none';
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius:
                                8,
                              background:
                                '#f1f1f1',
                              display:
                                'flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'center',
                              fontSize: 11,
                              color:
                                '#777',
                            }}
                          >
                            No image
                          </div>
                        )}

                        <strong>
                          {p.name}
                        </strong>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td>
                      {p.category}
                    </td>

                    {/* PRICE */}

                    <td>
                      ₹
                      {Number(
                        p.price ||
                          0
                      ).toLocaleString(
                        'en-IN'
                      )}
                    </td>

                    {/* STOCK */}

                    <td>
                      {p.stock}
                    </td>

                    {/* FLAGS */}

                    <td>
                      {[
                        p.featured &&
                          'Featured',

                        p.bestseller &&
                          'Best',

                        p.newArrival &&
                          'New',
                      ]
                        .filter(
                          Boolean
                        )
                        .join(
                          ' · '
                        ) ||
                        '—'}
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="admin-actions">
                        <Link
                          className="btn btn-outline"
                          href={`/admin/products/${productId}/edit`}
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="btn btn-danger"
                          disabled={
                            deletingId ===
                            productId
                          }
                          onClick={() =>
                            handleDelete(
                              p
                            )
                          }
                        >
                          {deletingId ===
                          productId
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}

            {list.length ===
              0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign:
                      'center',
                    padding: 30,
                  }}
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
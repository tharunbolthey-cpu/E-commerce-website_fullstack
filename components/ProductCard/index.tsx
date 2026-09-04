'use client';

import Link from 'next/link';

import type { Product } from '@/types';

import { useApp } from '../providers/AppProvider';

interface ProductCardProps {
  product: Product;
}

/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (image: string) => {
  if (!image) {
    return '';
  }

  // Already a complete URL
  if (
    image.startsWith('http://') ||
    image.startsWith('https://')
  ) {
    return image;
  }

  // MongoDB + Multer image
  const cleanImage = image
    .replace(/^\/+/, '')
    .replace(/^uploads[\\/]+/, '');

  return `http://localhost:5000/uploads/${cleanImage}`;
};
  /*
   * If MongoDB stores only:
   *
   * product-123.jpg
   *
   * use:
   *
   * http://localhost:5000/uploads/product-123.jpg
   */


/* =========================================================
   PRODUCT CARD
========================================================= */

export function ProductCard({
  product,
}: ProductCardProps) {
  const {
    toggleWishlist,
    isWishlisted,
    addToCart,
  } = useApp();

  /*
   * AppProvider normalizes MongoDB _id
   * into id.
   *
   * Keep _id fallback for safety.
   */
  const productId = String(
    (product as any)._id ||
      product.id ||
      ''
  );

  const imageUrl =
    product.images &&
    product.images.length > 0
      ? getImageUrl(product.images[0])
      : '';

  if (!productId) {
    return null;
  }

  return (
    <article className="product-card">

      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}

      <div className="product-media">

        <Link
          href={`/products/${productId}`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={
                product.name ||
                'Product'
              }
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(event) => {
                console.error(
                  'Product image failed:',
                  imageUrl
                );

                event.currentTarget.style.display =
                  'none';
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                minHeight: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f3f3',
                color: '#777',
                fontSize: 13,
              }}
            >
              No image
            </div>
          )}
        </Link>

        {/* DISCOUNT */}

        {product.discount > 0 && (
          <span className="product-tag">
            -{product.discount}%
          </span>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          className="icon-btn wish-float"
          onClick={() =>
            toggleWishlist(productId)
          }
          aria-label="Toggle wishlist"
        >
          {isWishlisted(productId)
            ? '♥'
            : '♡'}
        </button>

      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div className="product-info">

        <div className="product-brand">
          {product.brand}
        </div>

        <Link
          href={`/products/${productId}`}
          className="product-name"
        >
          {product.name}
        </Link>

        {/* PRICE */}

        <div className="product-price">

          <span className="price">
            ₹
            {Number(
              product.price || 0
            ).toLocaleString('en-IN')}
          </span>

          {Number(
            product.originalPrice || 0
          ) >
            Number(
              product.price || 0
            ) && (
            <span className="old-price">
              ₹
              {Number(
                product.originalPrice || 0
              ).toLocaleString('en-IN')}
            </span>
          )}

        </div>

        {/* RATING */}

        <div className="rating">
          ★ {product.rating || 0} ·{' '}
          {product.reviewCount || 0}{' '}
          reviews
        </div>

        {/* ADD TO CART */}

        <button
          type="button"
          className="btn btn-outline"
          style={{
            width: '100%',
            marginTop: 12,
          }}
          disabled={product.stock <= 0}
          onClick={() =>
            addToCart(productId)
          }
        >
          {product.stock > 0
            ? 'Add to bag'
            : 'Out of stock'}
        </button>

      </div>

    </article>
  );
}
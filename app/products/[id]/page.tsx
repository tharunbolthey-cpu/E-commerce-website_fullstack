'use client';

import { use, useState } from 'react';
import Link from 'next/link';

import { useApp } from '@/components/providers/AppProvider';
import { RatingStars } from '@/components/RatingStars';

/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (
  image: string | undefined
): string => {
  if (!image) {
    return '';
  }

  /*
   * Already a complete URL.
   */
  if (
    image.startsWith('http://') ||
    image.startsWith('https://')
  ) {
    return image;
  }

  /*
   * Remove leading slash.
   *
   * /uploads/product.jpg
   * ->
   * uploads/product.jpg
   */
  const cleanImage = image.replace(/^\/+/, '');

  /*
   * uploads/product.jpg
   */
  if (cleanImage.startsWith('uploads/')) {
    return `http://localhost:5000/${cleanImage}`;
  }

  /*
   * product.jpg
   */
  return `http://localhost:5000/uploads/${cleanImage}`;
};

/* =========================================================
   PRODUCT DETAILS
========================================================= */

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    products,
    reviews,
    addToCart,
    toggleWishlist,
    isWishlisted,
    currentUser,
    addReview,
    deleteReview,
  } = useApp();

  /* =======================================================
     PRODUCT
  ======================================================= */

  const product = products.find(
    (p) =>
      String(
        (p as any)._id || p.id
      ) === String(id)
  );

  const [image, setImage] =
    useState(0);

  const [qty, setQty] =
    useState(1);

  const [message, setMessage] =
    useState('');

  const [reviewText, setReviewText] =
    useState('');

  const [reviewTitle, setReviewTitle] =
    useState('');

  const [reviewRating, setReviewRating] =
    useState(5);

  /* =======================================================
     PRODUCT NOT FOUND
  ======================================================= */

  if (!product) {
    return (
      <div className="container section">
        <div className="empty">

          <h2>
            Product not found
          </h2>

          <Link
            className="btn btn-primary"
            href="/products"
          >
            Back to shop
          </Link>

        </div>
      </div>
    );
  }

  /* =======================================================
     REVIEWS
  ======================================================= */

  const productReviews =
    reviews.filter(
      (r) =>
        String(r.productId) ===
        String(id)
    );

  /* =======================================================
     SUBMIT REVIEW
  ======================================================= */

  const submitReview = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!currentUser) {
      setMessage(
        'Please sign in to leave a review.'
      );
      return;
    }

    addReview({
      id: `r-${Date.now()}`,
      productId: String(id),
      userId: currentUser.id,
      userName: currentUser.name,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewText,
      createdAt:
        new Date().toISOString(),
    });

    setReviewText('');
    setReviewTitle('');
    setReviewRating(5);

    setMessage(
      'Review added.'
    );
  };

  /* =======================================================
     CURRENT IMAGE
  ======================================================= */

  const currentImage =
    product.images &&
    product.images.length > 0
      ? getImageUrl(
          product.images[image]
        )
      : '';

  return (
    <div className="container section">

      {/* ===================================================
          BREADCRUMB
      =================================================== */}

      <div className="breadcrumb">

        <Link href="/products">
          Products
        </Link>

        {' / '}

        {product.name}

      </div>

      {/* ===================================================
          PRODUCT DETAILS
      =================================================== */}

      <div className="detail-grid">

        {/* =================================================
            GALLERY
        ================================================= */}

        <div className="gallery">

          <div className="thumbs">

            {product.images &&
              product.images.map(
                (src, i) => {

                  const imageUrl =
                    getImageUrl(src);

                  return (
                    <button
                      type="button"
                      className={`thumb ${
                        image === i
                          ? 'active'
                          : ''
                      }`}
                      key={`${src}-${i}`}
                      onClick={() =>
                        setImage(i)
                      }
                    >
                      <img
                        src={imageUrl}
                        alt={`${product.name} ${
                          i + 1
                        }`}
                      />
                    </button>
                  );
                }
              )}

          </div>

          <div className="main-image">

            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
              />
            ) : (
              <div>
                No image
              </div>
            )}

          </div>

        </div>

        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}

        <div>

          <div className="eyebrow">
            {product.brand} ·{' '}
            {product.category}
          </div>

          <h1 className="h1">
            {product.name}
          </h1>

          <div className="rating">

            <RatingStars
              rating={product.rating}
            />

            {' · '}

            {product.reviewCount}{' '}
            reviews

          </div>

          <p
            className="muted"
            style={{
              lineHeight: 1.8,
            }}
          >
            {product.description}
          </p>

          {/* PRICE */}

          <div className="detail-price">

            ₹
            {product.price.toLocaleString(
              'en-IN'
            )}

            {product.originalPrice >
              product.price && (
              <span className="old-price">
                ₹
                {product.originalPrice.toLocaleString(
                  'en-IN'
                )}
              </span>
            )}

          </div>

          {/* PRODUCT META */}

          <div className="detail-meta">

            <span className="chip">
              {product.stock > 0
                ? `${product.stock} in stock`
                : 'Out of stock'}
            </span>

            <span className="chip">
              SKU {product.sku}
            </span>

            <span className="chip">
              {product.discount}% saving
            </span>

          </div>

          {/* =================================================
              QUANTITY + CART + WISHLIST
          ================================================= */}

          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >

            <div className="quantity">

              <button
                type="button"
                onClick={() =>
                  setQty(
                    Math.max(
                      1,
                      qty - 1
                    )
                  )
                }
              >
                −
              </button>

              <span>
                {qty}
              </span>

              <button
                type="button"
                disabled={
                  product.stock <= 0
                }
                onClick={() =>
                  setQty(
                    Math.min(
                      product.stock,
                      qty + 1
                    )
                  )
                }
              >
                +
              </button>

            </div>

            <button
              type="button"
              className="btn btn-primary"
              disabled={
                product.stock <= 0
              }
              onClick={() => {
                addToCart(
                  product.id,
                  qty
                );

                setMessage(
                  'Added to bag.'
                );
              }}
            >
              {product.stock > 0
                ? 'Add to bag'
                : 'Out of stock'}
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() =>
                toggleWishlist(
                  product.id
                )
              }
            >
              {isWishlisted(
                product.id
              )
                ? '♥ Saved'
                : '♡ Save'}
            </button>

          </div>

          {/* MESSAGE */}

          {message && (
            <div
              className="alert alert-success"
              style={{
                marginTop: 14,
              }}
            >
              {message}
            </div>
          )}

          {/* =================================================
              SPECIFICATIONS
          ================================================= */}

          {Object.keys(
            product.specifications || {}
          ).length > 0 && (

            <div className="spec-list">

              {Object.entries(
                product.specifications || {}
              ).map(([key, value]) => (

                <div
                  className="spec"
                  key={key}
                >

                  <strong>
                    {key}
                  </strong>

                  <div className="muted">
                    {String(value)}
                  </div>

                </div>

              ))}

            </div>

          )}

          {/* =================================================
              SHIPPING
          ================================================= */}

          <div className="card padded">

            <strong>
              Shipping & returns
            </strong>

            <p
              className="muted"
              style={{
                lineHeight: 1.7,
              }}
            >
              Complimentary delivery over
              ₹1500. Returns are accepted within
              14 days for eligible items. This is
              a demo storefront; no real payment
              is processed.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          CUSTOMER REVIEWS
      ===================================================== */}

      <section className="section-sm">

        <div className="section-head">

          <div>

            <div className="eyebrow">
              Community notes
            </div>

            <h2 className="h2">
              Customer reviews
            </h2>

          </div>

        </div>

        <div className="grid grid-2">

          {productReviews.map(
            (review) => (

              <div
                className="card padded"
                key={review.id}
              >

                <RatingStars
                  rating={review.rating}
                />

                <h3>
                  {review.title}
                </h3>

                <p className="muted">
                  {review.comment}
                </p>

                <strong>
                  {review.userName}
                </strong>

                {currentUser?.id ===
                  review.userId && (

                  <div
                    className="admin-actions"
                    style={{
                      marginTop: 12,
                    }}
                  >

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        deleteReview(
                          review.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )}

              </div>

            )
          )}

          {!productReviews.length && (
            <div className="empty">
              <p>
                No reviews yet.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          WRITE REVIEW
      ===================================================== */}

      <section className="section-sm">

        <div className="card padded">

          <div className="eyebrow">
            Write a review
          </div>

          <h2 className="h2">
            Share your experience
          </h2>

          <form
            onSubmit={submitReview}
          >

            <div className="form-row">

              <div className="field">

                <label className="label">
                  Title
                </label>

                <input
                  className="input"
                  required
                  value={reviewTitle}
                  onChange={(e) =>
                    setReviewTitle(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="field">

                <label className="label">
                  Rating
                </label>

                <select
                  className="select"
                  value={reviewRating}
                  onChange={(e) =>
                    setReviewRating(
                      Number(
                        e.target.value
                      )
                    )
                  }
                >

                  <option value="5">
                    5 stars
                  </option>

                  <option value="4">
                    4 stars
                  </option>

                  <option value="3">
                    3 stars
                  </option>

                  <option value="2">
                    2 stars
                  </option>

                  <option value="1">
                    1 star
                  </option>

                </select>

              </div>

            </div>

            <div className="field">

              <label className="label">
                Comment
              </label>

              <textarea
                className="textarea"
                required
                value={reviewText}
                onChange={(e) =>
                  setReviewText(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Publish review
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}
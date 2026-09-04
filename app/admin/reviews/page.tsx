'use client';

import { useState } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { RatingStars } from '@/components/RatingStars';

export default function AdminReviews() {
  const {
    reviews,
    products,
    deleteReview,
  } = useApp();

  const [q, setQ] = useState('');

  const list = reviews.filter((r) =>
    `${r.userName} ${r.title} ${r.comment}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="toolbar">
        <input
          className="input"
          style={{ maxWidth: 420 }}
          placeholder="Search reviews..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="grid grid-2">
        {list.map((r) => (
          <div
            className="card padded"
            key={r.id}
          >
            <RatingStars rating={r.rating} />

            <h3>{r.title}</h3>

            <div className="muted">
              {products.find(
                (p) => p.id === r.productId
              )?.name}
            </div>

            <p className="muted">
              {r.comment}
            </p>

            <strong>{r.userName}</strong>

            <div>
              <button
                className="btn btn-danger"
                style={{ marginTop: 12 }}
                onClick={() => deleteReview(r.id)}
              >
                Delete review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
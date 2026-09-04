'use client';

import { useState } from 'react';

export function ReviewForm({
  onSubmit,
}: {
  onSubmit: (
    title: string,
    comment: string,
    rating: number
  ) => void;
}) {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit(
          title,
          comment,
          rating
        );

        setTitle('');
        setComment('');
      }}
    >
      <div className="field">
        <label className="label">
          Title
        </label>

        <input
          className="input"
          required
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div className="field">
        <label className="label">
          Rating
        </label>

        <select
          className="select"
          value={rating}
          onChange={(e) =>
            setRating(
              Number(e.target.value)
            )
          }
        >
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>

      <div className="field">
        <label className="label">
          Comment
        </label>

        <textarea
          className="textarea"
          required
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />
      </div>

      <button className="btn btn-primary">
        Publish review
      </button>
    </form>
  );
}
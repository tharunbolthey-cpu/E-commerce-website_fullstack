import type { Review } from '@/types';
import { RatingStars } from '../RatingStars';

export function ReviewCard({
  review,
}: {
  review: Review;
}) {
  return (
    <article className="card padded">
      <RatingStars
        rating={review.rating}
      />

      <h3>{review.title}</h3>

      <p className="muted">
        {review.comment}
      </p>

      <strong>
        {review.userName}
      </strong>
    </article>
  );
}
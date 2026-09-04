export function RatingStars({
  rating,
}: {
  rating: number;
}) {
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            opacity:
              n <= Math.round(rating)
                ? 1
                : 0.25,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
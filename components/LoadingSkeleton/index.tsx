export function LoadingSkeleton() {
  return (
    <div
      className="card"
      style={{
        height: 180,
        opacity: 0.55,
      }}
      aria-label="Loading"
    />
  );
}
export function EmptyState({
  title,
  message,
}: {
  title: string;
  message?: string;
}) {
  return (
    <div className="empty">
      <div className="empty-icon">
        ○
      </div>

      <h2>
        {title}
      </h2>

      {message && (
        <p className="muted">
          {message}
        </p>
      )}
    </div>
  );
}
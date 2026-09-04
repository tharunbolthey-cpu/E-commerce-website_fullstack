export function Toast({
  message,
}: {
  message: string;
}) {
  return (
    <div
      role="status"
      className="alert alert-success"
      style={{
        position: 'fixed',
        right: 18,
        bottom: 80,
        zIndex: 150,
        boxShadow: 'var(--shadow)',
      }}
    >
      {message}
    </div>
  );
}
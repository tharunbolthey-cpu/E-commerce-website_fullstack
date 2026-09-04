export function ErrorState({
  message = 'Something went wrong.',
}: {
  message?: string;
}) {
  return (
    <div className="alert alert-error">
      {message}
    </div>
  );
}
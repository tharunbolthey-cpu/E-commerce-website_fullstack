export function FilterPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="card padded filter-panel">
      {children}
    </aside>
  );
}
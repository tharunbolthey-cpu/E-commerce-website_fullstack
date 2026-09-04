export function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      <option value="newest">
        Newest
      </option>

      <option value="low">
        Price low to high
      </option>

      <option value="high">
        Price high to low
      </option>

      <option value="rating">
        Highest rated
      </option>

      <option value="popular">
        Most popular
      </option>
    </select>
  );
}
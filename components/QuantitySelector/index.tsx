export function QuantitySelector({
  value,
  onChange,
  max = 99,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        onClick={() =>
          onChange(Math.max(1, value - 1))
        }
      >
        −
      </button>

      <span>{value}</span>

      <button
        type="button"
        onClick={() =>
          onChange(Math.min(max, value + 1))
        }
      >
        +
      </button>
    </div>
  );
}
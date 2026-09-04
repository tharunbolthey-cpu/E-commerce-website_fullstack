import type { OrderStatus } from '@/types';

export function OrderStatus({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <span
      className={`status ${status.toLowerCase()}`}
    >
      {status}
    </span>
  );
}
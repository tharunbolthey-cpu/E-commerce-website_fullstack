'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import type { OrderStatus } from '@/types';

const statuses: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export default function AdminOrders() {
  const {
    orders,
    updateOrder,
  } = useApp();

  const [status, setStatus] = useState('All');

  const list = orders.filter(
    (o) => status === 'All' || o.status === status
  );

  return (
    <div>
      <div className="toolbar">
        <span className="muted">
          {list.length} orders
        </span>

        <select
          className="select"
          style={{ width: 'auto' }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>

          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="card table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {list.map((o) => (
              <tr key={o.id}>
                <td>
                  <strong>{o.id}</strong>

                  <div className="muted">
                    {new Date(
                      o.createdAt
                    ).toLocaleDateString()}
                  </div>
                </td>

                <td>
                  {o.customer.fullName}
                </td>

                <td>
                  ₹{o.total.toLocaleString('en-IN')}
                </td>

                <td>
                  <span
                    className={`status ${o.status.toLowerCase()}`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>
                  <select
                    className="select"
                    value={o.status}
                    onChange={(e) =>
                      updateOrder(o.id, {
                        status:
                          e.target.value as OrderStatus,
                      })
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <Link
                    className="btn btn-outline"
                    href={`/admin/orders/${o.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
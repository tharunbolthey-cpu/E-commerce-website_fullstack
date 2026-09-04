'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/components/providers/AppProvider';

export default function AdminUsers() {
  const {
    users,
    updateUserAdmin,
    deleteUser,
  } = useApp();

  const [q, setQ] = useState('');

  const list = users.filter((u) =>
    `${u.name} ${u.email}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="toolbar">
        <input
          className="input"
          style={{ maxWidth: 420 }}
          placeholder="Search users..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="card table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>

                  <div className="muted">
                    {u.email}
                  </div>
                </td>

                <td>{u.role}</td>

                <td>
                  <span
                    className={`status ${
                      u.active
                        ? 'delivered'
                        : 'cancelled'
                    }`}
                  >
                    {u.active
                      ? 'Active'
                      : 'Inactive'}
                  </span>
                </td>

                <td>
                  {new Date(
                    u.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <div className="admin-actions">
                    <Link
                      className="btn btn-outline"
                      href={`/admin/users/${u.id}`}
                    >
                      View
                    </Link>

                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        updateUserAdmin({
                          ...u,
                          active: !u.active,
                        })
                      }
                    >
                      {u.active
                        ? 'Deactivate'
                        : 'Activate'}
                    </button>

                    {u.role !== 'admin' && (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteUser(u.id)
                        }
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
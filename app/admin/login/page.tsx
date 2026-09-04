'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/providers/AppProvider';

export default function AdminLogin() {
  const { login } = useApp();
  const router = useRouter();

  const [email, setEmail] = useState('admin@atelier.demo');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  return (
    <div className="container section">
      <div
        style={{ maxWidth: 480, margin: '0 auto' }}
        className="card padded"
      >
        <div className="eyebrow">Control studio</div>

        <h1 className="h1">Admin sign in</h1>

        <p className="muted">
          Demo credentials: admin@atelier.demo / admin123
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const u = login(email, password);

            if (!u || u.role !== 'admin') {
              setError('Use the demo admin credentials.');
              return;
            }

            router.push('/admin/dashboard');
          }}
        >
          <div className="field">
            <label className="label">Email</label>

            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">Password</label>

            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Enter dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
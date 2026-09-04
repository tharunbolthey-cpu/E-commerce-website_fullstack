'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/providers/AppProvider';

export default function Login() {
  const { login } = useApp();

  const router = useRouter();

  const [email, setEmail] =
    useState('alex@example.com');

  const [password, setPassword] =
    useState('demo123');

  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = login(email, password);

    if (!user) {
      setError(
        'Invalid email/password or inactive account.'
      );
      return;
    }

    router.push(
      user.role === 'admin'
        ? '/admin/dashboard'
        : '/profile'
    );
  };

  return (
    <div className="container section">
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
        }}
        className="card padded"
      >
        <div className="eyebrow">
          Welcome back
        </div>

        <h1 className="h1">
          Sign in
        </h1>

        <p className="muted">
          Demo customer: alex@example.com / demo123
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="field">
            <label className="label">
              Email
            </label>

            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="field">
            <label className="label">
              Password
            </label>

            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Sign in
          </button>
        </form>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 18,
            fontSize: 13,
          }}
        >
          <Link href="/forgot-password">
            Forgot password?
          </Link>

          <Link href="/register">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
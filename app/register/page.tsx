'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/providers/AppProvider';

export default function Register() {
  const { register } = useApp();

  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [error, setError] = useState('');

  const set = (
    k: string,
    v: string
  ) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  const submit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const r = register(form);

    if (!r.ok) {
      setError(r.message);
      return;
    }

    router.push('/profile');
  };

  return (
    <div className="container section">
      <div
        style={{
          maxWidth: 650,
          margin: '0 auto',
        }}
        className="card padded"
      >
        <div className="eyebrow">
          Join Atelier
        </div>

        <h1 className="h1">
          Create account
        </h1>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="form-row">
            <div className="field">
              <label className="label">
                Name
              </label>

              <input
                className="input"
                required
                value={form.name}
                onChange={(e) =>
                  set(
                    'name',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label className="label">
                Email
              </label>

              <input
                className="input"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  set(
                    'email',
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label className="label">
                Password
              </label>

              <input
                className="input"
                type="password"
                minLength={6}
                required
                value={form.password}
                onChange={(e) =>
                  set(
                    'password',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label className="label">
                Phone
              </label>

              <input
                className="input"
                required
                value={form.phone}
                onChange={(e) =>
                  set(
                    'phone',
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Address
            </label>

            <input
              className="input"
              required
              value={form.address}
              onChange={(e) =>
                set(
                  'address',
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-row">
            <div className="field">
              <label className="label">
                City
              </label>

              <input
                className="input"
                required
                value={form.city}
                onChange={(e) =>
                  set(
                    'city',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label className="label">
                State
              </label>

              <input
                className="input"
                required
                value={form.state}
                onChange={(e) =>
                  set(
                    'state',
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label className="label">
                Postal code
              </label>

              <input
                className="input"
                required
                value={form.postalCode}
                onChange={(e) =>
                  set(
                    'postalCode',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label className="label">
                Country
              </label>

              <input
                className="input"
                required
                value={form.country}
                onChange={(e) =>
                  set(
                    'country',
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <button className="btn btn-primary">
            Create account
          </button>
        </form>

        <p
          className="muted"
          style={{ fontSize: 13 }}
        >
          Already registered?{' '}
          <Link href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
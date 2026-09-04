'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/providers/AppProvider';

export default function EditProfile() {
  const {
    currentUser,
    updateUser,
  } = useApp();

  const router = useRouter();

  const [form, setForm] = useState(
    currentUser
      ? {
          name: currentUser.name,
          phone: currentUser.phone,
          address: currentUser.address,
          city: currentUser.city,
          state: currentUser.state,
          postalCode:
            currentUser.postalCode,
        }
      : {
          name: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
        }
  );

  if (!currentUser)
    return (
      <div className="container section">
        <div className="empty">
          <h2>Please sign in.</h2>
        </div>
      </div>
    );

  const set = (
    k: string,
    v: string
  ) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  return (
    <div className="container section">
      <div
        style={{
          maxWidth: 700,
          margin: '0 auto',
        }}
        className="card padded"
      >
        <div className="eyebrow">
          Account
        </div>

        <h1 className="h1">
          Edit profile
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(form);
            router.push('/profile');
          }}
        >
          <div className="form-row">
            <div className="field">
              <label className="label">
                Name
              </label>

              <input
                className="input"
                value={form.name}
                onChange={(e) =>
                  set(
                    'name',
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="field">
              <label className="label">
                Phone
              </label>

              <input
                className="input"
                value={form.phone}
                onChange={(e) =>
                  set(
                    'phone',
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Address
            </label>

            <input
              className="input"
              value={form.address}
              onChange={(e) =>
                set(
                  'address',
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="field">
              <label className="label">
                City
              </label>

              <input
                className="input"
                value={form.city}
                onChange={(e) =>
                  set(
                    'city',
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="field">
              <label className="label">
                State
              </label>

              <input
                className="input"
                value={form.state}
                onChange={(e) =>
                  set(
                    'state',
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Postal code
            </label>

            <input
              className="input"
              value={form.postalCode}
              onChange={(e) =>
                set(
                  'postalCode',
                  e.target.value
                )
              }
              required
            />
          </div>

          <button className="btn btn-primary">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
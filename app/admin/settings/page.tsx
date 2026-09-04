'use client';

import { useEffect, useState } from 'react';
import {
  useApp,
  type StoreSettings,
} from '@/components/providers/AppProvider';

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'ATELIER',
  currency: 'INR',
  lowStock: '10',
  emailNotifications: true,
  orderNotifications: true,
  reviewNotifications: true,
  maintenanceMode: false,
  showOutOfStock: false,
};

export default function AdminSettings() {
  const {
    settings,
    setSettings,
  } = useApp();

  const [form, setForm] =
    useState<StoreSettings>(
      DEFAULT_SETTINGS
    );

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    setForm({
      ...DEFAULT_SETTINGS,
      ...settings,
    });
  }, [settings]);

  const updateSetting = <
    K extends keyof StoreSettings
  >(
    key: K,
    value: StoreSettings[K]
  ) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    const updated: StoreSettings = {
      ...form,

      storeName:
        form.storeName.trim() ||
        'ATELIER',
    };

    setSettings(updated);

    setForm(updated);

    setSaved(true);
  };

  return (
    <div className="admin-settings">

      <div
        style={{
          marginBottom: 28,
        }}
      >
        <div className="eyebrow">
          Control studio
        </div>

        <h2 className="h2">
          Store settings
        </h2>

        <p className="muted">
          Manage your storefront
          configuration, currency,
          notifications and
          administrative preferences.
        </p>
      </div>

      {/* GENERAL */}

      <section
        className="card padded"
        style={{
          marginBottom: 18,
        }}
      >
        <div className="eyebrow">
          General
        </div>

        <h3
          style={{
            marginBottom: 20,
          }}
        >
          Store configuration
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
          }}
        >

          <div className="field">

            <label className="label">
              Store name
            </label>

            <input
              className="input"
              value={form.storeName}
              onChange={e =>
                updateSetting(
                  'storeName',
                  e.target.value
                )
              }
            />

          </div>

          <div className="field">

            <label className="label">
              Currency
            </label>

            <select
              className="input"
              value={form.currency}
              onChange={e =>
                updateSetting(
                  'currency',
                  e.target
                    .value as StoreSettings['currency']
                )
              }
            >
              <option value="INR">
                INR — ₹
              </option>

              <option value="USD">
                USD — $
              </option>

              <option value="EUR">
                EUR — €
              </option>
            </select>

          </div>

          <div className="field">

            <label className="label">
              Low-stock threshold
            </label>

            <input
              className="input"
              type="number"
              min="0"
              value={form.lowStock}
              onChange={e =>
                updateSetting(
                  'lowStock',
                  e.target.value
                )
              }
            />

          </div>

        </div>
      </section>

      {/* NOTIFICATIONS */}

      <section
        className="card padded"
        style={{
          marginBottom: 18,
        }}
      >
        <div className="eyebrow">
          Notifications
        </div>

        <h3
          style={{
            marginBottom: 20,
          }}
        >
          Admin alerts
        </h3>

        <div
          style={{
            display: 'grid',
            gap: 14,
          }}
        >

          <label
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div>
              <strong>
                Email notifications
              </strong>

              <div className="muted">
                Receive important
                store updates.
              </div>
            </div>

            <input
              type="checkbox"
              checked={
                form.emailNotifications
              }
              onChange={e =>
                updateSetting(
                  'emailNotifications',
                  e.target.checked
                )
              }
            />
          </label>

          <label
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div>
              <strong>
                New order alerts
              </strong>

              <div className="muted">
                Get notified whenever
                an order is placed.
              </div>
            </div>

            <input
              type="checkbox"
              checked={
                form.orderNotifications
              }
              onChange={e =>
                updateSetting(
                  'orderNotifications',
                  e.target.checked
                )
              }
            />
          </label>

          <label
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div>
              <strong>
                Review notifications
              </strong>

              <div className="muted">
                Receive alerts for new
                product reviews.
              </div>
            </div>

            <input
              type="checkbox"
              checked={
                form.reviewNotifications
              }
              onChange={e =>
                updateSetting(
                  'reviewNotifications',
                  e.target.checked
                )
              }
            />
          </label>

        </div>
      </section>

      {/* STOREFRONT */}

      <section
        className="card padded"
        style={{
          marginBottom: 18,
        }}
      >
        <div className="eyebrow">
          Storefront
        </div>

        <h3
          style={{
            marginBottom: 20,
          }}
        >
          Shopping experience
        </h3>

        <div
          style={{
            display: 'grid',
            gap: 14,
          }}
        >

          <label
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div>
              <strong>
                Show out-of-stock
                products
              </strong>

              <div className="muted">
                Keep unavailable
                products visible in
                the storefront.
              </div>
            </div>

            <input
              type="checkbox"
              checked={
                form.showOutOfStock
              }
              onChange={e =>
                updateSetting(
                  'showOutOfStock',
                  e.target.checked
                )
              }
            />
          </label>

          <label
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div>
              <strong>
                Maintenance mode
              </strong>

              <div className="muted">
                Temporarily disable
                storefront access.
              </div>
            </div>

            <input
              type="checkbox"
              checked={
                form.maintenanceMode
              }
              onChange={e =>
                updateSetting(
                  'maintenanceMode',
                  e.target.checked
                )
              }
            />
          </label>

        </div>
      </section>

      {/* SECURITY */}

      <section
        className="card padded"
        style={{
          marginBottom: 22,
        }}
      >
        <div className="eyebrow">
          Security
        </div>

        <h3
          style={{
            marginBottom: 8,
          }}
        >
          Administrative access
        </h3>

        <p
          className="muted"
          style={{
            marginBottom: 18,
          }}
        >
          Keep your administrator
          account protected and
          review access regularly.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >

          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              alert(
                'Password management demo'
              )
            }
          >
            Change password
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              alert(
                'Active sessions demo'
              )
            }
          >
            View active sessions
          </button>

        </div>
      </section>

      {/* SAVE */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
        }}
      >

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save changes
        </button>

        {saved && (
          <div className="alert alert-success">
            Settings saved successfully.
          </div>
        )}

      </div>

    </div>
  );
}
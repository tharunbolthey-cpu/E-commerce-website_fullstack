'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/components/providers/AppProvider';

const DEFAULT_STORE_NAME = 'ATELIER';

export default function AdminProfile() {
  const { currentUser } = useApp();

  const [storeName, setStoreName] =
    useState(DEFAULT_STORE_NAME);

  useEffect(() => {
    const loadStoreName = () => {
      try {
        const savedSettings =
          localStorage.getItem(
            'atelier-store-settings'
          );

        if (savedSettings) {
          const settings = JSON.parse(
            savedSettings
          );

          setStoreName(
            settings.storeName ||
              DEFAULT_STORE_NAME
          );
        }
      } catch (error) {
        console.error(
          'Unable to load store name:',
          error
        );
      }
    };

    loadStoreName();

    window.addEventListener(
      'atelier-store-settings-changed',
      loadStoreName
    );

    return () => {
      window.removeEventListener(
        'atelier-store-settings-changed',
        loadStoreName
      );
    };
  }, []);

  return (
    <div
      className="card padded"
      style={{ maxWidth: 720 }}
    >
      <div
        className="avatar"
        style={{ margin: 0 }}
      >
        {currentUser?.name?.[0] ||
          storeName[0]}
      </div>

      <div
        className="eyebrow"
        style={{ marginTop: 20 }}
      >
        {storeName}
      </div>

      <h2 className="h2">
        {currentUser?.name || 'Administrator'}
      </h2>

      <p className="muted">
        {currentUser?.email || 'Admin account'}
        <br />

        {currentUser?.phone || 'Store administrator'}
        <br />

        {currentUser?.address && (
          <>
            {currentUser.address}
            <br />
          </>
        )}

        {currentUser?.city &&
          `${currentUser.city}, `}

        {currentUser?.state}
      </p>

      <span className="chip">
        {storeName} Administrator
      </span>
    </div>
  );
}
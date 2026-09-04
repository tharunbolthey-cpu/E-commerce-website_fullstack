'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../providers/AppProvider';

export function ProtectedRoute({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const {
    ready,
    currentUser,
  } = useApp();

  const router = useRouter();

  useEffect(() => {
    if (
      ready &&
      (
        !currentUser ||
        (admin && currentUser.role !== 'admin')
      )
    ) {
      router.replace(
        admin
          ? '/admin/login'
          : '/login'
      );
    }
  }, [
    ready,
    currentUser,
    admin,
    router,
  ]);

  if (
    !ready ||
    !currentUser ||
    (admin && currentUser.role !== 'admin')
  ) {
    return (
      <div className="container section">
        <div className="empty">
          <h2>
            Checking your account…
          </h2>

          <p className="muted">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}
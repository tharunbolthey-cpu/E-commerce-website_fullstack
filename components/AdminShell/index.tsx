'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../providers/AppProvider';
import { ProtectedRoute } from '../ProtectedRoute';

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    currentUser,
    logout,
    storeName,
  } = useApp();

  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute admin>
      <div className="admin-shell">

        {/* SIDEBAR */}
        <aside className="admin-sidebar">

          <div className="admin-brand">
            {storeName}

            <br />

            <span
              style={{
                fontFamily: 'DM Sans',
                fontSize: 11,
                color: '#888',
                letterSpacing: '.14em',
              }}
            >
              CONTROL STUDIO
            </span>
          </div>

          <nav className="admin-nav">

            <Link href="/admin/dashboard">
              Dashboard
            </Link>

            <Link href="/admin/products">
              Products
            </Link>

            <Link href="/admin/categories">
              Categories
            </Link>

            <Link href="/admin/users">
              Users
            </Link>

            <Link href="/admin/orders">
              Orders
            </Link>

            <Link href="/admin/reviews">
              Reviews
            </Link>

            <Link href="/admin/settings">
              Settings
            </Link>

            <Link href="/admin/profile">
              Profile
            </Link>

            <Link href="/">
              View storefront
            </Link>

          </nav>

          <button
            type="button"
            className="btn btn-light"
            style={{
              width: '100%',
              marginTop: 18,
            }}
            onClick={logout}
          >
            Sign out
          </button>

        </aside>

        {/* RIGHT SIDE */}
        <section className="admin-main">

          <div className="admin-top">

            <div>

              <div className="eyebrow">
                Control studio
              </div>

              <h1 className="h2">
                Welcome, {storeName} Admin
              </h1>

              {currentUser && (
                <p className="muted">
                  Signed in as {currentUser.email}
                </p>
              )}

            </div>

            <Link
              className="btn btn-outline"
              href="/admin/products/add"
            >
              + Add product
            </Link>

          </div>

          {children}

        </section>

      </div>
    </ProtectedRoute>
  );
}
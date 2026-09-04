'use client';

import Link from 'next/link';

export function AdminHeader() {
  return (
    <div className="admin-top">
      <div>
        <div className="eyebrow">
          Control studio
        </div>

        <h2 className="h2">
          Administration
        </h2>
      </div>

      <Link
        className="btn btn-outline"
        href="/"
      >
        Storefront
      </Link>
    </div>
  );
}
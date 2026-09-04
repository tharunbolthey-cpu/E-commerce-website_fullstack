'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Forgot() {
  const [sent, setSent] = useState(false);

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
          Account recovery
        </div>

        <h1 className="h1">
          Forgot password?
        </h1>

        {sent ? (
          <div className="alert alert-success">
            Demo recovery complete. In a real application this
            would send a secure reset email.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="field">
              <label className="label">
                Email
              </label>

              <input
                className="input"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <button className="btn btn-primary">
              Send reset link
            </button>
          </form>
        )}

        <p>
          <Link href="/login">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
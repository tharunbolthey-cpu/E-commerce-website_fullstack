'use client';

import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div className="container section">
      <div className="page-top">
        <div className="eyebrow">
          Preferences
        </div>

        <h1 className="h1">
          Settings
        </h1>
      </div>

      <div
        className="card padded"
        style={{ maxWidth: 720 }}
      >
        <div className="summary-row">
          <div>
            <strong>
              Marketing emails
            </strong>

            <div className="muted">
              Receive occasional Atelier
              edits.
            </div>
          </div>

          <input
            type="checkbox"
            checked={email}
            onChange={(e) =>
              setEmail(e.target.checked)
            }
          />
        </div>

        <div className="summary-row">
          <div>
            <strong>
              Compact product cards
            </strong>

            <div className="muted">
              A demo display preference.
            </div>
          </div>

          <input
            type="checkbox"
            checked={compact}
            onChange={(e) =>
              setCompact(
                e.target.checked
              )
            }
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setSaved(true)}
        >
          Save preferences
        </button>

        {saved && (
          <div
            className="alert alert-success"
            style={{ marginTop: 15 }}
          >
            Preferences saved locally.
          </div>
        )}
      </div>
    </div>
  );
}
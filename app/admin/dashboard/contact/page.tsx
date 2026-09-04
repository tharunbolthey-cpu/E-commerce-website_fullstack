'use client';

import { useEffect, useState } from 'react';
import {
  Mail,
  Search,
  Eye,
  Trash2,
  Clock3,
  CheckCircle2,
} from 'lucide-react';

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'New' | 'Read';
  date: string;
};

const STORAGE_KEY = 'atelier-contact-messages';

export default function AdminContact() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);

  /* =====================================================
     LOAD ACTUAL CUSTOMER MESSAGES
  ===================================================== */

  const loadMessages = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        setMessages([]);
        return;
      }

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setMessages(parsed);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error(
        'Unable to load contact messages:',
        error
      );

      setMessages([]);
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadMessages();
    setLoaded(true);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        loadMessages();
      }
    };

    window.addEventListener(
      'storage',
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        'storage',
        handleStorageChange
      );
    };
  }, []);

  /* =====================================================
     REFRESH WHEN ADMIN PAGE BECOMES VISIBLE
  ===================================================== */

  useEffect(() => {
    const handleFocus = () => {
      loadMessages();
    };

    window.addEventListener(
      'focus',
      handleFocus
    );

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus
      );
    };
  }, []);

  /* =====================================================
     MARK AS READ
  ===================================================== */

  const markAsRead = (id: number) => {
    const updated = messages.map((message) =>
      message.id === id
        ? {
            ...message,
            status: 'Read' as const,
          }
        : message
    );

    setMessages(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const deleteMessage = (id: number) => {
    const updated = messages.filter(
      (message) => message.id !== id
    );

    setMessages(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredMessages = messages.filter(
    (message) => {
      const value = search.toLowerCase();

      return (
        message.name
          .toLowerCase()
          .includes(value) ||
        message.email
          .toLowerCase()
          .includes(value) ||
        message.message
          .toLowerCase()
          .includes(value)
      );
    }
  );

  const newMessages = messages.filter(
    (message) => message.status === 'New'
  ).length;

  const readMessages = messages.filter(
    (message) => message.status === 'Read'
  ).length;

  if (!loaded) {
    return (
      <div className="container section">
        <div className="card padded">
          Loading contact messages...
        </div>
      </div>
    );
  }

  return (
    <div className="container section">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-top">
        <div className="eyebrow">
          Admin
        </div>

        <h1 className="h1">
          Contact Messages
        </h1>

        <p className="muted">
          View actual customer problems submitted
          through the contact page.
        </p>
      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >

        <div className="card padded">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Mail size={21} />

            <div>
              <div className="muted">
                Total Messages
              </div>

              <h2
                style={{
                  margin: '4px 0 0',
                }}
              >
                {messages.length}
              </h2>
            </div>
          </div>
        </div>


        <div className="card padded">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Clock3 size={21} />

            <div>
              <div className="muted">
                New Messages
              </div>

              <h2
                style={{
                  margin: '4px 0 0',
                }}
              >
                {newMessages}
              </h2>
            </div>
          </div>
        </div>


        <div className="card padded">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <CheckCircle2 size={21} />

            <div>
              <div className="muted">
                Read Messages
              </div>

              <h2
                style={{
                  margin: '4px 0 0',
                }}
              >
                {readMessages}
              </h2>
            </div>
          </div>
        </div>

      </div>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        className="card padded"
        style={{
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Search size={19} />

          <input
            className="input"
            placeholder="Search customer name, email or problem..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              margin: 0,
            }}
          />
        </div>
      </div>


      {/* =================================================
          CUSTOMER MESSAGES
      ================================================= */}

      <div className="card">

        <div
          style={{
            padding: '20px 22px',
            borderBottom:
              '1px solid var(--border)',
          }}
        >
          <h2 style={{ margin: 0 }}>
            Customer Problems
          </h2>

          <p
            className="muted"
            style={{
              marginBottom: 0,
            }}
          >
            These are messages submitted by customers.
          </p>
        </div>


        <div
          style={{
            overflowX: 'auto',
          }}
        >

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >

            <thead>
              <tr>

                <th
                  style={{
                    textAlign: 'left',
                    padding: 16,
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: 16,
                  }}
                >
                  Email
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: 16,
                  }}
                >
                  Customer Problem
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: 16,
                  }}
                >
                  Status
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: 16,
                  }}
                >
                  Date
                </th>

                <th
                  style={{
                    textAlign: 'right',
                    padding: 16,
                  }}
                >
                  Actions
                </th>

              </tr>
            </thead>


            <tbody>

              {filteredMessages.map(
                (message) => (

                  <tr
                    key={message.id}
                    style={{
                      borderTop:
                        '1px solid var(--border)',
                    }}
                  >

                    <td
                      style={{
                        padding: 16,
                      }}
                    >
                      <strong>
                        {message.name}
                      </strong>
                    </td>


                    <td
                      style={{
                        padding: 16,
                      }}
                    >
                      <span className="muted">
                        {message.email}
                      </span>
                    </td>


                    <td
                      style={{
                        padding: 16,
                        maxWidth: 450,
                      }}
                    >
                      {message.message}
                    </td>


                    <td
                      style={{
                        padding: 16,
                      }}
                    >
                      <span
                        className={
                          message.status === 'New'
                            ? 'badge badge-warning'
                            : 'badge badge-success'
                        }
                      >
                        {message.status}
                      </span>
                    </td>


                    <td
                      style={{
                        padding: 16,
                      }}
                    >
                      <span className="muted">
                        {message.date}
                      </span>
                    </td>


                    <td
                      style={{
                        padding: 16,
                        textAlign: 'right',
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',
                          justifyContent:
                            'flex-end',
                          gap: 8,
                        }}
                      >

                        {message.status ===
                          'New' && (

                          <button
                            className="btn"
                            type="button"
                            onClick={() =>
                              markAsRead(
                                message.id
                              )
                            }
                            title="Mark as read"
                          >
                            <Eye size={16} />
                          </button>

                        )}


                        <button
                          className="btn"
                          type="button"
                          onClick={() =>
                            deleteMessage(
                              message.id
                            )
                          }
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}


              {filteredMessages.length ===
                0 && (

                <tr>

                  <td
                    colSpan={6}
                    style={{
                      padding: 60,
                      textAlign: 'center',
                    }}
                  >

                    <Mail
                      size={40}
                      style={{
                        marginBottom: 12,
                        opacity: 0.5,
                      }}
                    />

                    <div>
                      <strong>
                        No customer messages
                      </strong>
                    </div>

                    <div className="muted">
                      Submit a message from the
                      Contact page first.
                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
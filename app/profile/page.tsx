'use client';

import Link from 'next/link';

import { useApp } from '@/components/providers/AppProvider';

export default function Profile() {
  const {
    currentUser,
    orders,
    wishlist,
    logout,
  } = useApp();

  if (!currentUser) {
    return (
      <div className="container section">
        <div className="empty">
          <h2>
            You are not signed in.
          </h2>

          <Link
            className="btn btn-primary"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const myOrders = orders.filter(
    (order) => order.userId === currentUser.id
  );

  const activeOrders = myOrders.filter(
    (order) =>
      !['Delivered', 'Cancelled'].includes(
        order.status
      )
  );

  return (
    <div className="container section">
      <div className="profile-grid">

        {/* PROFILE SIDEBAR */}
        <aside className="card profile-side">

          <div className="avatar">
            {currentUser.name
              .slice(0, 1)
              .toUpperCase()}
          </div>

          <h2>
            {currentUser.name}
          </h2>

          <p className="muted">
            {currentUser.email}
          </p>

          <Link
            className="btn btn-primary"
            style={{
              width: '100%',
              marginTop: 12,
            }}
            href="/profile/edit"
          >
            Edit profile
          </Link>

          <Link
            className="btn btn-outline"
            style={{
              width: '100%',
              marginTop: 8,
            }}
            href="/orders"
          >
            My orders
          </Link>

          <Link
            className="btn btn-outline"
            style={{
              width: '100%',
              marginTop: 8,
            }}
            href="/wishlist"
          >
            My wishlist
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            style={{
              width: '100%',
              marginTop: 8,
            }}
            onClick={logout}
          >
            Sign out
          </button>
        </aside>

        {/* PROFILE CONTENT */}
        <section>

          <div
            className="page-top"
            style={{
              paddingTop: 0,
            }}
          >
            <div className="eyebrow">
              Your account
            </div>

            <h1 className="h1">
              Good to see you.
            </h1>

            <p className="muted">
              Manage your orders, wishlist and
              account information.
            </p>
          </div>

          {/* STATISTICS */}
          <div className="stat-grid">

            <div className="stat">
              <span className="muted">
                Orders
              </span>

              <strong>
                {myOrders.length}
              </strong>
            </div>

            <div className="stat">
              <span className="muted">
                Active orders
              </span>

              <strong>
                {activeOrders.length}
              </strong>
            </div>

            <div className="stat">
              <span className="muted">
                Wishlist
              </span>

              <strong>
                {wishlist.length}
              </strong>
            </div>

            <div className="stat">
              <span className="muted">
                Member since
              </span>

              <strong>
                {new Date(
                  currentUser.createdAt
                ).getFullYear()}
              </strong>
            </div>

          </div>

          {/* ACTIVE ORDERS */}
          <div
            className="card padded"
            style={{
              marginTop: 18,
            }}
          >
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  Tracking
                </div>

                <h3>
                  Active orders
                </h3>
              </div>

              <Link
                href="/orders"
                className="btn btn-outline"
              >
                View all
              </Link>
            </div>

            {activeOrders.length === 0 ? (
              <div className="empty">
                <h3>
                  No active orders
                </h3>

                <p className="muted">
                  Your current orders will
                  appear here.
                </p>
              </div>
            ) : (
              <div className="order-list">
                {activeOrders
                  .slice(0, 3)
                  .map((order) => (
                    <Link
                      key={order.id}
                      href={`/orders/${order.id}`}
                      className="order-row"
                    >
                      <div>
                        <strong>
                          Order #{order.id}
                        </strong>

                        <p className="muted">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <strong>
                          ₹
                          {order.total.toLocaleString(
                            'en-IN'
                          )}
                        </strong>

                        <span className="order-status">
                          {order.status}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div
            className="card padded"
            style={{
              marginTop: 18,
            }}
          >
            <div className="eyebrow">
              Quick access
            </div>

            <h3>
              Your shopping
            </h3>

            <div className="quick-actions">

              <Link
                href="/orders"
                className="quick-action"
              >
                <span className="quick-icon">
                  📦
                </span>

                <span>
                  <strong>
                    Track orders
                  </strong>

                  <small>
                    View order status and
                    delivery information
                  </small>
                </span>
              </Link>

              <Link
                href="/wishlist"
                className="quick-action"
              >
                <span className="quick-icon">
                  ♡
                </span>

                <span>
                  <strong>
                    Wishlist
                  </strong>

                  <small>
                    {wishlist.length} saved
                    products
                  </small>
                </span>
              </Link>

              <Link
                href="/products"
                className="quick-action"
              >
                <span className="quick-icon">
                  ◈
                </span>

                <span>
                  <strong>
                    Continue shopping
                  </strong>

                  <small>
                    Discover new products
                  </small>
                </span>
              </Link>

              <Link
                href="/contact"
                className="quick-action"
              >
                <span className="quick-icon">
                  ✉
                </span>

                <span>
                  <strong>
                    Contact support
                  </strong>

                  <small>
                    Ask our team for help
                  </small>
                </span>
              </Link>

            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div
            className="card padded"
            style={{
              marginTop: 18,
            }}
          >
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  Personal information
                </div>

                <h3>
                  Contact details
                </h3>
              </div>

              <Link
                href="/profile/edit"
                className="btn btn-outline"
              >
                Edit
              </Link>
            </div>

            <p className="muted">
              {currentUser.phone}
            </p>

            <p className="muted">
              {currentUser.address}
              <br />

              {currentUser.city},{' '}
              {currentUser.state}{' '}
              {currentUser.postalCode}

              <br />

              {currentUser.country}
            </p>
          </div>

        </section>
      </div>
    </div>
  );
}
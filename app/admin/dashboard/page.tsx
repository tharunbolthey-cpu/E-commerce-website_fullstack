'use client';

import Link from 'next/link';

import {
  Package,
  Users,
  ShoppingCart,
  IndianRupee,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  Mail,
} from 'lucide-react';

import { useApp } from '@/components/providers/AppProvider';


export default function Dashboard() {

  const {
    products,
    users,
    orders,
  } = useApp();


  /*
   * =========================================================
   * DASHBOARD CALCULATIONS
   * =========================================================
   */

  const revenue = orders.reduce(
    (total, order) => {
      return total + order.total;
    },
    0
  );


  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  ).length;


  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered'
  ).length;


  const lowStockProducts = products.filter(
    (product) => product.stock < 10
  ).length;


  const customerCount = users.filter(
    (user) => user.role === 'customer'
  ).length;


  /*
   * =========================================================
   * DASHBOARD
   * =========================================================
   */

  return (
    <main className="admin-dashboard-page">

      <div className="container">


        {/* =================================================
            PAGE HEADER
        ================================================== */}

        <section className="admin-dashboard-header">

          <div>

            <div className="eyebrow">
              ATELIER ADMIN
            </div>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back. Here's an overview
              of your store performance.
            </p>

          </div>


          <div className="admin-header-actions">

            <Link
              href="/admin/products/add"
              className="btn btn-primary"
            >
              <Plus size={17} />

              Add Product
            </Link>


            <Link
              href="/"
              className="btn btn-outline"
            >
              View Store
            </Link>

          </div>

        </section>


        {/* =================================================
            STAT CARDS
        ================================================== */}

        <section className="admin-dashboard-stats">


          {/* PRODUCTS */}

          <div className="admin-premium-stat">

            <div className="admin-stat-top">

              <div className="admin-stat-icon">
                <Package size={21} />
              </div>

              <span className="admin-stat-label">
                Products
              </span>

            </div>


            <strong className="admin-stat-number">
              {products.length}
            </strong>


            <Link
              href="/admin/products"
              className="admin-stat-link"
            >
              Manage products

              <ArrowRight size={15} />
            </Link>

          </div>


          {/* USERS */}

          <div className="admin-premium-stat">

            <div className="admin-stat-top">

              <div className="admin-stat-icon">
                <Users size={21} />
              </div>

              <span className="admin-stat-label">
                Customers
              </span>

            </div>


            <strong className="admin-stat-number">
              {customerCount}
            </strong>


            <Link
              href="/admin/users"
              className="admin-stat-link"
            >
              Manage customers

              <ArrowRight size={15} />
            </Link>

          </div>
          
          
          <Link
  href="/admin/dashboard/contact"
  className="admin-quick-action"
>
  <div className="quick-action-icon">
    <Mail size={19} />
  </div>

  <div>
    <strong>
      Contact messages
    </strong>

    <span>
      View customer messages and inquiries
    </span>
  </div>

  <ArrowRight size={17} />
</Link>


          {/* ORDERS */}

          <div className="admin-premium-stat">

            <div className="admin-stat-top">

              <div className="admin-stat-icon">
                <ShoppingCart size={21} />
              </div>

              <span className="admin-stat-label">
                Orders
              </span>

            </div>


            <strong className="admin-stat-number">
              {orders.length}
            </strong>


            <Link
              href="/admin/orders"
              className="admin-stat-link"
            >
              Manage orders

              <ArrowRight size={15} />
            </Link>

          </div>


          {/* REVENUE */}

          <div className="admin-premium-stat">

            <div className="admin-stat-top">

              <div className="admin-stat-icon">
                <IndianRupee size={21} />
              </div>

              <span className="admin-stat-label">
                Revenue
              </span>

            </div>


            <strong className="admin-stat-number revenue-number">
              ₹
              {revenue.toLocaleString(
                'en-IN'
              )}
            </strong>


            <span className="admin-stat-caption">
              Total order value
            </span>

          </div>

        </section>


        {/* =================================================
            ORDER HEALTH + QUICK ACTIONS
        ================================================== */}

        <section className="admin-dashboard-columns">


          {/* ORDER HEALTH */}

          <div className="admin-dashboard-card">

            <div className="admin-card-header">

              <div>

                <span className="admin-card-eyebrow">
                  STORE ACTIVITY
                </span>

                <h2>
                  Order health
                </h2>

              </div>

              <ShoppingCart
                size={21}
              />

            </div>


            <div className="order-health-list">


              {/* PENDING */}

              <div className="order-health-row">

                <div className="order-health-info">

                  <div className="order-health-icon pending">
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <strong>
                      Pending
                    </strong>

                    <span>
                      Orders waiting to be processed
                    </span>
                  </div>

                </div>


                <strong className="order-health-number">
                  {pendingOrders}
                </strong>

              </div>


              {/* DELIVERED */}

              <div className="order-health-row">

                <div className="order-health-info">

                  <div className="order-health-icon delivered">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <strong>
                      Delivered
                    </strong>

                    <span>
                      Successfully completed orders
                    </span>
                  </div>

                </div>


                <strong className="order-health-number">
                  {deliveredOrders}
                </strong>

              </div>


              {/* LOW STOCK */}

              <div className="order-health-row">

                <div className="order-health-info">

                  <div className="order-health-icon warning">
                    <AlertTriangle size={18} />
                  </div>

                  <div>
                    <strong>
                      Low stock
                    </strong>

                    <span>
                      Products with less than 10 units
                    </span>
                  </div>

                </div>


                <strong className="order-health-number">
                  {lowStockProducts}
                </strong>

              </div>

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="admin-dashboard-card">

            <div className="admin-card-header">

              <div>

                <span className="admin-card-eyebrow">
                  MANAGEMENT
                </span>

                <h2>
                  Quick actions
                </h2>

              </div>

              <Plus size={21} />

            </div>


            <div className="admin-quick-actions">


              <Link
                href="/admin/products/add"
                className="admin-quick-action primary"
              >

                <div className="quick-action-icon">
                  <Plus size={19} />
                </div>

                <div>

                  <strong>
                    Add product
                  </strong>

                  <span>
                    Create a new product listing
                  </span>

                </div>

                <ArrowRight
                  size={17}
                />

              </Link>


              <Link
                href="/admin/products"
                className="admin-quick-action"
              >

                <div className="quick-action-icon">
                  <Package size={19} />
                </div>

                <div>

                  <strong>
                    Manage products
                  </strong>

                  <span>
                    Edit inventory and pricing
                  </span>

                </div>

                <ArrowRight
                  size={17}
                />

              </Link>


              <Link
                href="/admin/orders"
                className="admin-quick-action"
              >

                <div className="quick-action-icon">
                  <ShoppingCart size={19} />
                </div>

                <div>

                  <strong>
                    Manage orders
                  </strong>

                  <span>
                    Review and update orders
                  </span>

                </div>

                <ArrowRight
                  size={17}
                />

              </Link>


              <Link
                href="/admin/users"
                className="admin-quick-action"
              >

                <div className="quick-action-icon">
                  <Users size={19} />
                </div>

                <div>

                  <strong>
                    Manage users
                  </strong>

                  <span>
                    View registered customers
                  </span>

                </div>

                <ArrowRight
                  size={17}
                />

              </Link>

            </div>

          </div>

        </section>


        {/* =================================================
            LOW STOCK NOTICE
        ================================================== */}

        {lowStockProducts > 0 && (

          <section className="admin-warning-card">

            <div className="admin-warning-icon">
              <AlertTriangle size={22} />
            </div>

            <div>

              <strong>
                Inventory attention required
              </strong>

              <p>
                You currently have{' '}
                <strong>
                  {lowStockProducts}
                </strong>{' '}
                product
                {lowStockProducts !== 1
                  ? 's'
                  : ''}{' '}
                with fewer than 10 units
                in stock.
              </p>

            </div>


            <Link
              href="/admin/products"
              className="btn btn-outline"
            >
              Review inventory
            </Link>

          </section>

        )}

      </div>

    </main>
  );
}
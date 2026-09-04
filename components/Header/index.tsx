'use client';

import Link from 'next/link';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

import { useApp } from '../providers/AppProvider';


export function Header() {
  const {
    cart,
    wishlist,
    currentUser,
    logout,
  } = useApp();

  const [menu, setMenu] = useState(false);

  const [storeName, setStoreName] =
    useState('ATELIER');

  const router = useRouter();

  const pathname = usePathname();


  /* =====================================================
     LOAD STORE SETTINGS
  ===================================================== */

  useEffect(() => {
    const loadStoreName = () => {
      try {
        const storedSettings =
          localStorage.getItem(
            'atelier-store-settings'
          );

        if (storedSettings) {
          const parsedSettings =
            JSON.parse(storedSettings);

          if (
            parsedSettings.storeName &&
            typeof parsedSettings.storeName === 'string'
          ) {
            setStoreName(
              parsedSettings.storeName
            );
          }
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


  /* =====================================================
     CART COUNT
  ===================================================== */

  const cartCount = cart.reduce(
    (
      total,
      item
    ) => total + item.quantity,
    0
  );


  /* =====================================================
     ADMIN
  ===================================================== */

  const isAdmin = true;


  /* =====================================================
     ACCOUNT
  ===================================================== */

  const goToAccount = () => {
    if (currentUser) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logout();

    setMenu(false);

    router.push('/');
  };


  return (
    <>
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      <div className="announcement">

        <span>
          COMPLIMENTARY SHIPPING
        </span>

        <span>
          ON ORDERS OVER ₹1500
        </span>

        <span>
          ·
        </span>

        <span>
          CURATED WITH INTENTION
        </span>

      </div>


      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="header">

        <div className="container header-row">


          {/* MOBILE MENU */}

          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() =>
              setMenu(!menu)
            }
            aria-label="Open menu"
          >
            {menu ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>


          {/* LOGO */}

          <Link
            href="/"
            className="logo"
          >
            {storeName}
          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav className="nav">

            <Link
              href="/"
              className={
                pathname === '/'
                  ? 'active'
                  : ''
              }
            >
              Home
            </Link>


            <Link
              href="/products"
              className={
                pathname?.startsWith(
                  '/products'
                )
                  ? 'active'
                  : ''
              }
            >
              Shop
            </Link>


            <Link
              href="/categories"
              className={
                pathname?.startsWith(
                  '/categories'
                )
                  ? 'active'
                  : ''
              }
            >
              Categories
            </Link>


            <Link
              href="/about"
              className={
                pathname?.startsWith(
                  '/about'
                )
                  ? 'active'
                  : ''
              }
            >
              About
            </Link>


            <Link
              href="/contact"
              className={
                pathname?.startsWith(
                  '/contact'
                )
                  ? 'active'
                  : ''
              }
            >
              Contact
            </Link>


            {/* ADMIN */}

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className={
                  pathname?.startsWith(
                    '/admin'
                  )
                    ? 'active admin-nav-link'
                    : 'admin-nav-link'
                }
              >

                <ShieldCheck
                  size={15}
                />

                Admin

              </Link>
            )}

          </nav>
          


          {/* HEADER ACTIONS */}

          <div className="header-actions">


            {/* SEARCH */}

            <Link
              href="/search"
              className="icon-btn desktop-only"
              aria-label="Search"
            >
              <Search size={20} />
            </Link>


            {/* WISHLIST */}

            <Link
              href="/wishlist"
              className="icon-btn badge-wrapper"
              aria-label="Wishlist"
            >

              <Heart size={20} />

              {wishlist.length > 0 && (
                <span className="badge">
                  {wishlist.length}
                </span>
              )}

            </Link>


            {/* CART */}

            <Link
              href="/cart"
              className="icon-btn badge-wrapper"
              aria-label="Cart"
            >

              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="badge">
                  {cartCount}
                </span>
              )}

            </Link>


            {/* ACCOUNT */}

            <button
              type="button"
              className="icon-btn desktop-only"
              aria-label="Account"
              onClick={goToAccount}
            >
              <User size={20} />
            </button>

          </div>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================== */}

        {menu && (

          <div className="mobile-menu">

            <div className="container mobile-menu-inner">

              <Link
                href="/"
                onClick={() =>
                  setMenu(false)
                }
              >
                Home
              </Link>


              <Link
                href="/products"
                onClick={() =>
                  setMenu(false)
                }
              >
                Shop All
              </Link>


              <Link
                href="/categories"
                onClick={() =>
                  setMenu(false)
                }
              >
                Categories
              </Link>


              <Link
                href="/new-arrivals"
                onClick={() =>
                  setMenu(false)
                }
              >
                New Arrivals
              </Link>


              <Link
                href="/collections"
                onClick={() =>
                  setMenu(false)
                }
              >
                Collections
              </Link>


              <Link
                href="/wishlist"
                onClick={() =>
                  setMenu(false)
                }
              >
                Wishlist
              </Link>


              <Link
                href="/orders"
                onClick={() =>
                  setMenu(false)
                }
              >
                My Orders
              </Link>


              <Link
                href={
                  currentUser
                    ? '/profile'
                    : '/login'
                }
                onClick={() =>
                  setMenu(false)
                }
              >
                {currentUser
                  ? 'My Profile'
                  : 'Sign In'}
              </Link>


              <Link
                href="/contact"
                onClick={() =>
                  setMenu(false)
                }
              >
                Contact
              </Link>


              {/* MOBILE ADMIN */}

              {isAdmin && (

                <Link
                  href="/admin/dashboard"
                  className="mobile-admin-link"
                  onClick={() =>
                    setMenu(false)
                  }
                >

                  <ShieldCheck
                    size={17}
                  />

                  Admin Dashboard

                </Link>

              )}


              {/* LOGOUT */}

              {currentUser && (

                <button
                  type="button"
                  className="mobile-logout"
                  onClick={
                    handleLogout
                  }
                >

                  <LogOut
                    size={17}
                  />

                  Sign Out

                </button>

              )}

            </div>

          </div>

        )}

      </header>

    </>
  );
}
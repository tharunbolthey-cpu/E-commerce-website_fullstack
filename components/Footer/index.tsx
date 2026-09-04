"use client";
import Link from 'next/link';


export function Footer() {

  return (
    <footer className="footer">

      {/* =================================================
          NEWSLETTER
      ================================================== */}

      <div className="footer-newsletter">

        <div className="container">

          <div className="footer-newsletter-content">

            <div>

              <div className="eyebrow">
                ATELIER JOURNAL
              </div>

              <h2>
                Discover what is next.
              </h2>

              <p>
                Sign up for new arrivals,
                curated collections and
                exclusive offers.
              </p>

            </div>


            <form
              className="footer-newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >

              <input
                type="email"
                placeholder="Your email address"
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>

      </div>


      {/* =================================================
          FOOTER CONTENT
      ================================================== */}

      <div className="container footer-grid">


        {/* BRAND */}

        <div className="footer-brand">

          <Link
            href="/"
            className="logo"
          >
            ATELIER
          </Link>

          <p>
            Quietly premium essentials
            for modern living.
          </p>

          <p className="footer-small">
            Thoughtfully selected products,
            refined design and a premium
            shopping experience.
          </p>

        </div>


        {/* SHOP */}

        <div className="footer-column">

          <strong>
            Shop
          </strong>

          <Link href="/products">
            All Products
          </Link>

          <Link href="/categories">
            Categories
          </Link>

         

         

         

         

        </div>


        {/* ACCOUNT */}

        <div className="footer-column">

          <strong>
            Account
          </strong>

          <Link href="/login">
            Sign In
          </Link>

          <Link href="/register">
            Create Account
          </Link>

          <Link href="/profile">
            My Profile
          </Link>

          <Link href="/orders">
            My Orders
          </Link>

          <Link href="/wishlist">
            Wishlist
          </Link>

          <Link href="/cart">
            Shopping Bag
          </Link>

        </div>


        {/* CUSTOMER */}

        <div className="footer-column">

          <strong>
            Customer Care
          </strong>

          <Link href="/contact">
            Contact Us
          </Link>

        

       

          

        

          <Link href="/settings">
            Settings
          </Link>

        </div>


        {/* COMPANY */}

        <div className="footer-column">

          <strong>
            Company
          </strong>

          <Link href="/about">
            About ATELIER
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms & Conditions
          </Link>

          <Link href="/refund-policy">
            Refund Policy
          </Link>

        </div>

      </div>


      {/* =================================================
          BOTTOM
      ================================================== */}

      <div className="footer-bottom">

        <div className="container footer-bottom-inner">

          <p>
            © {new Date().getFullYear()}
            {' '}
            ATELIER.
            All rights reserved.
          </p>

          <p>
            Premium commerce experience.
          </p>

        </div>

      </div>

    </footer>
  );
}
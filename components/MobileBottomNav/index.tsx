'use client';

import Link from 'next/link';
import { useApp } from '../providers/AppProvider';

export function MobileBottomNav() {
  const { cart, wishlist } = useApp();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bottom-nav">
      <Link href="/">
        <span>⌂</span>
        Home
      </Link>

      <Link href="/categories">
        <span>◈</span>
        Categories
      </Link>

      <Link href="/search">
        <span>⌕</span>
        Search
      </Link>

      <Link href="/wishlist">
        <span>♡</span>
        {wishlist.length}
      </Link>

      <Link href="/cart">
        <span>◴</span>
        {cartCount}
      </Link>

      <Link href="/profile">
        <span>◉</span>
        Profile
      </Link>
    </nav>
  );
}
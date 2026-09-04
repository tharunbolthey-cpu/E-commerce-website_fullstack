'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchBar() {
  const [q, setQ] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        router.push(
          `/search?q=${encodeURIComponent(q)}`
        );
      }}
    >
      <input
        className="input"
        value={q}
        onChange={(e) =>
          setQ(e.target.value)
        }
        placeholder="Search products..."
        aria-label="Search products"
      />
    </form>
  );
}
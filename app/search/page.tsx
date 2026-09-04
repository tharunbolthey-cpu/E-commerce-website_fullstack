'use client';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { ProductGrid } from '@/components/ProductGrid';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const { products } = useApp();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get('q') || '');
  }, []);

  const results = useMemo(
    () => products.filter((p) => `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q.toLowerCase())),
    [products, q],
  );

  return (
    <div className="container">
      <div className="page-top">
        <div className="eyebrow">Search</div>
        <h1 className="h1">Find your next favorite.</h1>
        <div style={{ maxWidth: 680 }}><input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, categories..." autoFocus /></div>
        <p className="muted">{results.length} results for “{q || 'everything'}”</p>
      </div>
      <ProductGrid products={results} />
    </div>
  );
}

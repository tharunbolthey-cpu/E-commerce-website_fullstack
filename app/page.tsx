'use client';

import Link from 'next/link';
import { useApp } from '@/components/providers/AppProvider';
import { ProductGrid } from '@/components/ProductGrid';

export default function Home() {
  const { products, categories, reviews } = useApp();

  return (
    <>
      <section className="hero container">
        <div className="hero-panel">
          <div className="hero-content">
            <div className="eyebrow" style={{ color: '#d7b77f' }}>The new everyday</div>
            <h1 className="display">Designed for a life well lived.</h1>
            <p>
              Discover a considered collection of fashion, home, beauty and technology — selected for quality, utility and quiet character.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-light" href="/products">Explore collection</Link>
              <Link className="btn" style={{ color: 'white', border: '1px solid rgba(255,255,255,.35)' }} href="/categories">Browse categories</Link>
            </div>
          </div>
        </div>
        <div className="promo-strip">
          <div className="promo-item"><strong>Complimentary delivery</strong><span className="muted">On orders over ₹1500</span></div>
          <div className="promo-item"><strong>Easy returns</strong><span className="muted">A simple 14-day return window</span></div>
          <div className="promo-item"><strong>Thoughtful support</strong><span className="muted">Real help when you need it</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow">Shop by mood</div><h2 className="h2">Curated categories</h2></div>
            <Link className="btn btn-outline" href="/categories">View all</Link>
          </div>
          <div className="grid grid-4">
            {categories.slice(0, 8).map((c) => (
              <Link className="category-card" href={`/categories/${c.slug}`} key={c.id}>
                <img src={c.image} alt={c.name} />
                <div className="category-card-content"><h3>{c.name}</h3><div style={{ fontSize: 12, color: '#ddd' }}>{c.description}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Selected for you</div><h2 className="h2">Featured pieces</h2></div><Link className="btn btn-outline" href="/products">Shop all</Link></div>
          <ProductGrid products={products.filter((p) => p.featured).slice(0, 8)} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="banner">
            <div><div className="eyebrow" style={{ color: '#d7b77f' }}>The Atelier edit</div><h2 className="h2" style={{ color: 'white' }}>Quiet luxury, practical by design.</h2><p>Build a wardrobe and home around pieces you will reach for again and again.</p></div>
            <Link className="btn btn-light" href="/products">Discover new arrivals</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">New in</div><h2 className="h2">Fresh arrivals</h2></div></div>
          <ProductGrid products={products.filter((p) => p.newArrival).slice(0, 8)} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Loved by customers</div><h2 className="h2">What people say</h2></div></div>
          <div className="grid grid-3">
            {reviews.slice(0, 3).map((r) => (
              <div className="card padded" key={r.id}><div style={{ color: 'var(--accent-dark)' }}>★★★★★</div><h3>{r.title}</h3><p className="muted" style={{ lineHeight: 1.7 }}>{r.comment}</p><strong>{r.userName}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="newsletter">
            <div><div className="eyebrow">Stay in the know</div><h2 className="h2">A quieter kind of newsletter.</h2><p className="muted">Occasional new arrivals, useful edits and considered offers. No noise.</p></div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field"><label className="label">Email address</label><input className="input" type="email" placeholder="you@example.com" required /></div>
              <button className="btn btn-primary">Join Atelier</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

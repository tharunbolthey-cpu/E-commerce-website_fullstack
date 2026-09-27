'use client';

import { useMemo, useState } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { ProductGrid } from '@/components/ProductGrid';

export default function ProductsPage() {
  const {
    products,
    categories,
  } = useApp();

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [sort, setSort] =
    useState('newest');
  const [min, setMin] = useState(0);
const [max, setMax] = useState(1000000);
  const [rating, setRating] = useState(0);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!q ||
          `${p.name} ${p.brand} ${p.category} ${p.description}`
            .toLowerCase()
            .includes(q.toLowerCase())) &&
        (!cat || p.category === cat) &&
        p.price >= min &&
        p.price <= max &&
        p.rating >= rating
    );

    if (sort === 'low')
      list.sort(
        (a, b) => a.price - b.price
      );

    if (sort === 'high')
      list.sort(
        (a, b) => b.price - a.price
      );

    if (sort === 'rating')
      list.sort(
        (a, b) => b.rating - a.rating
      );

    if (sort === 'popular')
      list.sort(
        (a, b) =>
          b.reviewCount - a.reviewCount
      );

    return list;
  }, [
    products,
    q,
    cat,
    sort,
    min,
    max,
    rating,
  ]);

  return (
    <div className="container">
      <div className="page-top">
        <div className="eyebrow">
          The collection
        </div>

        <h1 className="h1">
          All products
        </h1>

        <p className="muted">
          {filtered.length} pieces,
          thoughtfully selected.
        </p>
      </div>

      <div className="filters">
        <aside className="card padded filter-panel">
          <div className="filter-section">
            <h4>Search</h4>

            <input
              className="input"
              value={q}
              onChange={(e) =>
                setQ(e.target.value)
              }
              placeholder="Name, brand, category..."
            />
          </div>

          <div className="filter-section">
            <h4>Category</h4>

            <select
              className="select"
              value={cat}
              onChange={(e) =>
                setCat(e.target.value)
              }
            >
              <option value="">
                All categories
              </option>

              {categories.map((c) => (
                <option
                  key={c.id}
                  value={c.name}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h4>Price</h4>

            <div className="form-row">
              <input
                className="input"
                type="number"
                value={min}
                onChange={(e) =>
                  setMin(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <input
                className="input"
                type="number"
                value={max}
                onChange={(e) =>
                  setMax(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>
          </div>

          <div className="filter-section">
            <h4>Rating</h4>

            <select
              className="select"
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
            >
              <option value="0">
                Any rating
              </option>

              <option value="4">
                4+ stars
              </option>

              <option value="4.5">
                4.5+ stars
              </option>
            </select>
          </div>
        </aside>

        <section>
          <div className="toolbar">
            <div className="toolbar-group">
              <span className="muted">
                {filtered.length} results
              </span>
            </div>

            <select
              className="select"
              style={{ width: 'auto' }}
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option value="newest">
                Newest
              </option>

              <option value="low">
                Price low to high
              </option>

              <option value="high">
                Price high to low
              </option>

              <option value="rating">
                Highest rated
              </option>

              <option value="popular">
                Most popular
              </option>
            </select>
          </div>

          <ProductGrid
            products={filtered}
          />
        </section>
      </div>
    </div>
  );
}
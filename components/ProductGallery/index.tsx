'use client';

import { useState } from 'react';

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="thumbs">
        {images.map((src, i) => (
          <button
            className={`thumb ${
              active === i ? 'active' : ''
            }`}
            key={src + i}
            onClick={() => setActive(i)}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>

      <div className="main-image">
        <img
          src={images[active]}
          alt={name}
        />
      </div>
    </div>
  );
}
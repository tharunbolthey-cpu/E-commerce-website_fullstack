'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Product } from '@/types';

import { useApp } from '../providers/AppProvider';

export function ProductForm({
  initial,
}: {
  initial?: Product;
}) {
  const {
    categories,
    addProduct,
    updateProduct,
  } = useApp();

  const router = useRouter();

  const [images, setImages] = useState<File[]>(
    []
  );

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] =
    useState<Product>(
      initial || {
        id: `p-${Date.now()}`,

        name: '',

        slug: '',

        description: '',

        shortDescription: '',

        price: 0,

        originalPrice: 0,

        discount: 0,

        category:
          categories[0]?.name ||
          'Electronics',

        brand: 'Atelier',

        stock: 10,

        sku: `ATL-${Date.now()}`,

        /*
         * No URL image.
         * Images come from Multer.
         */
        images: [],

        rating: 4.5,

        reviewCount: 0,

        featured: false,

        bestseller: false,

        newArrival: true,

        createdAt:
          new Date().toISOString(),

        specifications: {
          Material:
            'Premium selected materials',

          Warranty: '1 year',
        },
      }
    );

  const set = (
    key: keyof Product,
    value: unknown
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      e.target.files || []
    );

    /*
     * Maximum 8 files
     */
    if (files.length > 8) {
      alert(
        'You can upload a maximum of 8 images.'
      );

      e.target.value = '';

      return;
    }

    /*
     * Maximum 5 MB per file
     */
    const invalidFile = files.find(
      (file) =>
        file.size >
        5 * 1024 * 1024
    );

    if (invalidFile) {
      alert(
        `${invalidFile.name} is larger than 5 MB.`
      );

      e.target.value = '';

      return;
    }

    setImages(files);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    /*
     * New product requires image
     */
    if (
      !initial &&
      images.length === 0
    ) {
      alert(
        'Please select at least one product image.'
      );

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append(
        'name',
        form.name
      );

      formData.append(
        'slug',
        form.slug ||
          form.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
      );

      formData.append(
        'description',
        form.description
      );

      formData.append(
        'shortDescription',
        form.shortDescription
      );

      formData.append(
        'price',
        String(form.price)
      );

      formData.append(
        'originalPrice',
        String(form.originalPrice)
      );

      formData.append(
        'discount',
        String(form.discount)
      );

      formData.append(
        'category',
        form.category
      );

      formData.append(
        'brand',
        form.brand
      );

      formData.append(
        'stock',
        String(form.stock)
      );

      formData.append(
        'sku',
        form.sku
      );

      formData.append(
        'rating',
        String(form.rating)
      );

      formData.append(
        'reviewCount',
        String(form.reviewCount)
      );

      formData.append(
        'featured',
        String(form.featured)
      );

      formData.append(
        'bestseller',
        String(form.bestseller)
      );

      formData.append(
        'newArrival',
        String(form.newArrival)
      );

      formData.append(
        'createdAt',
        form.createdAt
      );

      /*
       * Add selected files.
       *
       * Must match:
       *
       * upload.array('images', 8)
       */
      images.forEach((file) => {
        formData.append(
          'images',
          file
        );
      });

      /*
       * Your backend is running on PORT 5000.
       */
      const productId = initial
  ? String(
      (initial as any)._id ||
        (initial as any).id ||
        ''
    )
  : '';

if (initial && !productId) {
  throw new Error(
    'Product MongoDB ID is missing.'
  );
}

const url = initial
  ? `http://localhost:5000/api/products/${productId}`
  : 'http://localhost:5000/api/products';
      const response = await fetch(url, {
  method: initial ? 'PUT' : 'POST',
  body: formData,
});
      const contentType =
        response.headers.get(
          'content-type'
        );

      let data: any = null;

      if (
        contentType?.includes(
          'application/json'
        )
      ) {
        data =
          await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to save product.'
        );
      }

      /*
       * Keep your existing AppProvider methods.
       */
      if (data?.product) {
        if (initial) {
          updateProduct(
            data.product
          );
        } else {
          addProduct(
            data.product
          );
        }
      }

      router.push(
        '/admin/products'
      );

      router.refresh();
    } catch (error) {
      console.error(
        'Product submit error:',
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : 'Failed to save product.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      {/* =========================
          NAME / BRAND
      ========================= */}

      <div className="form-row">
        <div className="field">
          <label className="label">
            Name
          </label>

          <input
            className="input"
            required
            value={form.name}
            onChange={(e) =>
              set(
                'name',
                e.target.value
              )
            }
          />
        </div>

        <div className="field">
          <label className="label">
            Brand
          </label>

          <input
            className="input"
            required
            value={form.brand}
            onChange={(e) =>
              set(
                'brand',
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* =========================
          CATEGORY / SKU
      ========================= */}

      <div className="form-row">
        <div className="field">
          <label className="label">
            Category
          </label>

          <select
            className="select"
            value={form.category}
            onChange={(e) =>
              set(
                'category',
                e.target.value
              )
            }
          >
            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={
                    category.name
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="field">
          <label className="label">
            SKU
          </label>

          <input
            className="input"
            required
            value={form.sku}
            onChange={(e) =>
              set(
                'sku',
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* =========================
          PRICE
      ========================= */}

      <div className="form-row">
        <div className="field">
          <label className="label">
            Price
          </label>

          <input
            className="input"
            type="number"
            min="0"
            required
            value={form.price}
            onChange={(e) =>
              set(
                'price',
                Number(
                  e.target.value
                )
              )
            }
          />
        </div>

        <div className="field">
          <label className="label">
            Original price
          </label>

          <input
            className="input"
            type="number"
            min="0"
            required
            value={
              form.originalPrice
            }
            onChange={(e) =>
              set(
                'originalPrice',
                Number(
                  e.target.value
                )
              )
            }
          />
        </div>
      </div>

      {/* =========================
          STOCK / MULTER IMAGES
      ========================= */}

      <div className="form-row">
        <div className="field">
          <label className="label">
            Stock
          </label>

          <input
            className="input"
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={(e) =>
              set(
                'stock',
                Number(
                  e.target.value
                )
              )
            }
          />
        </div>

        <div className="field">
          <label className="label">
            Product Images
          </label>

          <input
            className="input"
            type="file"
            name="images"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            required={!initial}
            onChange={
              handleImages
            }
          />

          <small>
            Select up to 8 images.
            Maximum 5 MB per image.
          </small>

          {images.length > 0 && (
            <div
              style={{
                marginTop: 10,
              }}
            >
              <strong>
                Selected:
              </strong>

              {images.map(
                (
                  file,
                  index
                ) => (
                  <div
                    key={`${file.name}-${index}`}
                    style={{
                      marginTop: 5,
                    }}
                  >
                    {file.name}
                  </div>
                )
              )}
            </div>
          )}

          {initial &&
            images.length === 0 &&
            form.images?.length >
              0 && (
              <small>
                Existing images will
                be kept.
              </small>
            )}
        </div>
      </div>

      {/* =========================
          SHORT DESCRIPTION
      ========================= */}

      <div className="field">
        <label className="label">
          Short description
        </label>

        <input
          className="input"
          value={
            form.shortDescription
          }
          onChange={(e) =>
            set(
              'shortDescription',
              e.target.value
            )
          }
        />
      </div>

      {/* =========================
          DESCRIPTION
      ========================= */}

      <div className="field">
        <label className="label">
          Description
        </label>

        <textarea
          className="textarea"
          required
          value={
            form.description
          }
          onChange={(e) =>
            set(
              'description',
              e.target.value
            )
          }
        />
      </div>

      {/* =========================
          PRODUCT OPTIONS
      ========================= */}

      <div
        className="admin-actions"
        style={{
          marginBottom: 18,
        }}
      >
        {[
          [
            'featured',
            'Featured',
          ],
          [
            'bestseller',
            'Bestseller',
          ],
          [
            'newArrival',
            'New arrival',
          ],
        ].map(
          ([key, label]) => (
            <label
              className="chip"
              key={key}
            >
              <input
                type="checkbox"
                checked={Boolean(
                  form[
                    key as keyof Product
                  ]
                )}
                onChange={(e) =>
                  set(
                    key as keyof Product,
                    e.target.checked
                  )
                }
              />

              {' '}

              {label}
            </label>
          )
        )}
      </div>

      {/* =========================
          SUBMIT
      ========================= */}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={uploading}
      >
        {uploading
          ? 'Uploading...'
          : initial
            ? 'Save changes'
            : 'Create product'}
      </button>
    </form>
  );
}
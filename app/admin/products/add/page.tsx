import { ProductForm } from '@/components/admin/ProductForm';

export default function AddProduct() {
  
  return (
    <div className="card padded">
      <div className="eyebrow">
        Catalog
      </div>

      <h2 className="h2">
        Add product
      </h2>

      <ProductForm />
    </div>
  );
}
import { CategoryForm } from '@/components/admin/CategoryForm';

export default function AddCategory() {
  return (
    <div
      className="card padded"
      style={{ maxWidth: 700 }}
    >
      <div className="eyebrow">Catalog</div>

      <h2 className="h2">Add category</h2>

      <CategoryForm />
    </div>
  );
}
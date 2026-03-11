'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaTrash, FaPlus } from 'react-icons/fa';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });

      if (res.ok) {
        setNewCategory('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will fail if projects use this category.')) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Categories</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleAdd} className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Category
            </button>
          </form>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category: any) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4">{category.slug}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

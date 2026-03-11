'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    images: [] as string[]
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProject();
      await fetchCategories();
    };
    fetchData();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`);
      const data = await res.json();
      setFormData({
        title: data.title,
        category: data.category?._id || '',
        images: data.images || []
      });
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Filter for valid image types
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only JPEG, PNG, WebP, and GIF files are allowed.');
    }

    setNewImages(prev => [...prev, ...validFiles]);

    const previews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeExistingImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let uploadedImages = [...formData.images];

      if (newImages.length > 0) {
        const uploadPromises = newImages.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          const data = await res.json();
          
          if (!res.ok || !data.success) {
            throw new Error(data.error || 'Upload failed');
          }
          
          return data.url;
        });

        const newUrls = await Promise.all(uploadPromises);
        uploadedImages = [...uploadedImages, ...newUrls];
      }

      const res = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          images: uploadedImages
        })
      });

      if (res.ok) {
        alert('Project updated successfully!');
        // Clear cache and redirect
        window.location.href = '/admin/projects';
      } else {
        alert('Failed to update project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Images</label>
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      alt={`Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No images</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add New Images</label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Project'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/projects')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';

export default function NewProjectPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    images: [] as string[],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Filter for valid image types
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only JPEG, PNG, WebP, and GIF files are allowed.');
    }

    setImageFiles(prev => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const uploadedUrls: string[] = [];
    
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        
        if (res.ok && data.success) {
          uploadedUrls.push(data.url);
        } else {
          console.error('Upload failed for file:', file.name, data.error);
          alert(`Failed to upload ${file.name}: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
        alert(`Failed to upload ${file.name}: Network error`);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      // Upload images to Cloudinary
      const imageUrls = await uploadImages();
      
      if (imageUrls.length === 0) {
        alert('Failed to upload images');
        setLoading(false);
        setUploading(false);
        return;
      }

      // Create project with uploaded image URLs
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          images: imageUrls,
          description: formData.title,
          location: 'India',
          clientName: 'Client',
          year: new Date().getFullYear(),
        }),
      });

      if (res.ok) {
        alert('Project added successfully!');
        // Clear cache and redirect
        window.location.href = '/admin/projects';
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add project');
      }
    } catch (error) {
      alert('Failed to add project');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

        <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Modern Bedroom Design"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Images * (Multiple images allowed)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                multiple
                onChange={handleImageSelect}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Select multiple images (JPEG, PNG, WebP, GIF)
              </p>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Selected Images ({imagePreviews.length})
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {uploading ? 'Uploading Images...' : loading ? 'Adding...' : 'Add Project'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/projects')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { FaSave, FaUpload, FaEye, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import rich text editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditBlog() {
  const params = useParams();
  const blogId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Urban Design India',
    category: 'Interior Design',
    tags: '',
    isPublished: false,
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const categories = ['Interior Design', 'Home Decor', 'Architecture', 'Tips & Guides', 'Trends', 'Case Studies'];

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      if (response.ok) {
        const blog = await response.json();
        setFormData({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          featuredImage: blog.featuredImage,
          author: blog.author,
          category: blog.category,
          tags: blog.tags.join(', '),
          isPublished: blog.isPublished,
          isFeatured: blog.isFeatured,
          seoTitle: blog.seoTitle || blog.title,
          seoDescription: blog.seoDescription || blog.excerpt,
          seoKeywords: blog.seoKeywords || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      seoTitle: title
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, featuredImage: data.url });
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        alert('Blog updated successfully!');
        window.location.href = '/admin/blogs';
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a
              href="/admin/blogs"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="text-xl" />
            </a>
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <FaEye /> {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
            >
              <FaSave /> {saving ? 'Saving...' : 'Update Blog'}
            </button>
          </div>
        </div>

        {preview ? (
          // Preview Mode
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              {formData.featuredImage && (
                <Image
                  src={formData.featuredImage}
                  alt={formData.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {formData.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{formData.title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <span>By {formData.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          </div>
        ) : (
          // Edit Mode - Same form as create page but with update functionality
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Content</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                        placeholder="Enter blog title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="blog-url-slug"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Excerpt *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of the blog post..."
                        maxLength={300}
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.excerpt.length}/300 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content *
                      </label>
                      <div className="border border-gray-300 rounded-md">
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={(content) => setFormData({ ...formData, content })}
                          modules={quillModules}
                          style={{ minHeight: '400px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="SEO optimized title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SEO Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.seoDescription}
                        onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Meta description for search engines..."
                        maxLength={160}
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.seoDescription.length}/160 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SEO Keywords
                      </label>
                      <input
                        type="text"
                        value={formData.seoKeywords}
                        onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="keyword1, keyword2, keyword3..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Same as create page */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Publish</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                        Publish immediately
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                        Featured blog
                      </label>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="featured-image-upload"
                        disabled={uploading}
                      />
                      <label
                        htmlFor="featured-image-upload"
                        className={`cursor-pointer px-4 py-2 rounded-md flex items-center gap-2 ${
                          uploading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                      >
                        <FaUpload /> {uploading ? 'Uploading...' : 'Upload Image'}
                      </label>
                    </div>
                    
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Or paste image URL here"
                      required
                    />
                    
                    {formData.featuredImage && (
                      <div className="relative w-full h-32 border border-gray-300 rounded-md overflow-hidden">
                        <Image
                          src={formData.featuredImage}
                          alt="Featured image preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Categories & Tags */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Categories & Tags</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="tag1, tag2, tag3..."
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        Separate tags with commas
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
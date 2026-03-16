'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaStar, FaRegStar, FaYoutube } from 'react-icons/fa';

interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  views: number;
  createdAt: string;
}

const categories = ['Interior Design', 'Client Testimonial', 'Project Showcase', 'Design Tips', 'Behind the Scenes'];

export default function VideosAdmin() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    category: 'Interior Design',
    isActive: true,
    isFeatured: false,
    order: 0
  });

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch('/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingVideo ? `/api/videos/${editingVideo._id}` : '/api/videos';
      const method = editingVideo ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        await fetchVideos();
        resetForm();
        alert(editingVideo ? 'Video updated successfully!' : 'Video created successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save video');
      }
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Failed to save video');
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      category: video.category,
      isActive: video.isActive,
      isFeatured: video.isFeatured,
      order: video.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchVideos();
        alert('Video deleted successfully!');
      } else {
        alert('Failed to delete video');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video');
    }
  };

  const toggleActive = async (video: Video) => {
    try {
      const response = await fetch(`/api/videos/${video._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...video,
          isActive: !video.isActive
        }),
      });
      
      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Error toggling video status:', error);
    }
  };

  const toggleFeatured = async (video: Video) => {
    try {
      const response = await fetch(`/api/videos/${video._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...video,
          isFeatured: !video.isFeatured
        }),
      });
      
      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      youtubeUrl: '',
      category: 'Interior Design',
      isActive: true,
      isFeatured: false,
      order: 0
    });
    setEditingVideo(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Video Management</h1>
            <p className="text-gray-600">Manage YouTube videos for your website</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-accent text-white px-4 sm:px-6 py-3 rounded-lg hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaPlus /> Add Video
          </button>
        </div>

        {/* Video Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paste the full YouTube video URL
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    Active
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-accent text-white px-6 py-3 rounded-md hover:opacity-90"
                  >
                    {editingVideo ? 'Update Video' : 'Create Video'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-6 py-3 rounded-md hover:opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Videos List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Videos ({videos.length})</h2>
            
            {videos.length === 0 ? (
              <div className="text-center py-12">
                <FaYoutube className="mx-auto text-6xl text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No videos found</p>
                <p className="text-gray-400">Add your first video to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {videos.map((video) => (
                  <div key={video._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gray-100">
                      {video.thumbnailUrl && (
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <FaYoutube className="text-white text-3xl sm:text-4xl" />
                      </div>
                      {video.isFeatured && (
                        <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded text-xs font-bold">
                          FEATURED
                        </div>
                      )}
                      {!video.isActive && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          INACTIVE
                        </div>
                      )}
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
                        <span className="truncate">{video.category}</span>
                        <span>Order: {video.order}</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="flex-1 bg-blue-500 text-white px-2 sm:px-3 py-2 rounded text-xs sm:text-sm hover:bg-blue-600 flex items-center justify-center gap-1"
                        >
                          <FaEdit className="text-xs" /> <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => toggleActive(video)}
                          className={`px-2 sm:px-3 py-2 rounded text-xs sm:text-sm flex items-center justify-center ${
                            video.isActive 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-gray-500 hover:bg-gray-600 text-white'
                          }`}
                        >
                          {video.isActive ? <FaEye className="text-xs" /> : <FaEyeSlash className="text-xs" />}
                        </button>
                        <button
                          onClick={() => toggleFeatured(video)}
                          className={`px-2 sm:px-3 py-2 rounded text-xs sm:text-sm flex items-center justify-center ${
                            video.isFeatured 
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                          }`}
                        >
                          {video.isFeatured ? <FaStar className="text-xs" /> : <FaRegStar className="text-xs" />}
                        </button>
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="px-2 sm:px-3 py-2 bg-red-500 text-white rounded text-xs sm:text-sm hover:bg-red-600 flex items-center justify-center"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
}

interface VideoSectionProps {
  title?: string;
  subtitle?: string;
  category?: string;
  featuredOnly?: boolean;
  maxVideos?: number;
  showCategories?: boolean;
}

export default function VideoSection({
  title = "From Vision to Reality: Home Interior Success Stories",
  subtitle = "Watch our latest projects and client testimonials",
  category = 'all',
  featuredOnly = false,
  maxVideos = 6,
  showCategories = true
}: VideoSectionProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['all', 'Interior Design', 'Client Testimonial', 'Project Showcase', 'Design Tips', 'Behind the Scenes'];

  const fetchVideos = useCallback(async () => {
    try {
      let url = '/api/videos';
      const params = new URLSearchParams();
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      if (featuredOnly) {
        params.append('featured', 'true');
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        
        // Limit videos if specified
        if (maxVideos) {
          data = data.slice(0, maxVideos);
        }
        
        setVideos(data);
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, featuredOnly, maxVideos]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (youtubeUrl: string): string => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : '';
  };

  const openVideo = (video: Video, index: number) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setSelectedVideo(videos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevVideo = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setSelectedVideo(videos[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Category Filter */}
          {showCategories && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {cat === 'all' ? 'All Videos' : cat}
                </button>
              ))}
            </div>
          )}

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={video._id}
                className="group cursor-pointer"
                onClick={() => openVideo(video, index)}
              >
                <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  {/* Thumbnail */}
                  {video.thumbnailUrl && (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="text-accent text-xl ml-1" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {video.category}
                  </div>

                  {/* Featured Badge */}
                  {video.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="relative w-full max-w-6xl">
            {/* Close Button - Fixed position */}
            <button
              onClick={closeVideo}
              className="fixed top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white hover:text-red-400 transition-all duration-300 z-[60]"
            >
              <FaTimes className="text-lg sm:text-xl" />
            </button>

            {/* Navigation Buttons */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={prevVideo}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white hover:text-accent transition-all duration-300 z-10"
                >
                  <FaChevronLeft className="text-lg sm:text-xl" />
                </button>
                <button
                  onClick={nextVideo}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white hover:text-accent transition-all duration-300 z-10"
                >
                  <FaChevronRight className="text-lg sm:text-xl" />
                </button>
              </>
            )}

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={getEmbedUrl(selectedVideo.youtubeUrl)}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="mt-4 sm:mt-6 text-white text-center px-4">
              <h3 className="text-lg sm:text-2xl font-bold mb-2">{selectedVideo.title}</h3>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-400">
                {currentIndex + 1} of {videos.length} videos
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeVideo}
          />
        </div>
      )}
    </>
  );
}
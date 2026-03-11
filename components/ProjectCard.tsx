'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: string;
    images: string[];
    category: {
      name: string;
    };
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, currentImageIndex]);

  const openImageModal = (imageIndex: number = 0) => {
    setCurrentImageIndex(imageIndex);
    setSelectedImage(project.images[imageIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (currentImageIndex < project.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(project.images[newIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(project.images[newIndex]);
    }
  };

  return (
    <>
      <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden" onClick={() => openImageModal(0)}>
          {project.images && project.images.length > 0 ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4 bg-white">
          <p className="text-sm text-accent mb-2">{project.category.name}</p>
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[99999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-2xl transition z-[100000] shadow-lg"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          {/* Previous Button */}
          {project.images.length > 1 && currentImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-2xl hover:text-accent transition z-[100000] backdrop-blur-sm"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Next Button */}
          {project.images.length > 1 && currentImageIndex < project.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-2xl hover:text-accent transition z-[100000] backdrop-blur-sm"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full z-[99999]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Project Image"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Image Counter */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full z-[100000]">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          )}

          {/* Project Info */}
          <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg z-[100000]">
            <p className="text-sm text-amber-400">{project.category.name}</p>
            <h3 className="font-bold">{project.title}</h3>
          </div>
        </div>
      )}
    </>
  );
}

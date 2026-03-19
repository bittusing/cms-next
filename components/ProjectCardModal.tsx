'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProjectCardModalProps {
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

export default function ProjectCardModal({ project }: ProjectCardModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    if (currentImageIndex < project.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(project.images[newIndex]);
    }
  }, [currentImageIndex, project.images]);

  const prevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(project.images[newIndex]);
    }
  }, [currentImageIndex, project.images]);

  const openImageModal = (imageIndex: number = 0) => {
    setCurrentImageIndex(imageIndex);
    setSelectedImage(project.images[imageIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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
  }, [selectedImage, currentImageIndex, nextImage, prevImage]);

  return (
    <>
      <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden" onClick={() => openImageModal(0)}>
          {project.images && project.images.length > 0 ? (
            <>
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  View Gallery
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4 bg-white group-hover:bg-gradient-to-br group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-300">
          <p className="text-sm text-accent mb-2 group-hover:text-accent transition-colors duration-300">{project.category.name}</p>
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[99999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-6 right-6 w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-2xl transition z-[100000] shadow-lg"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          {/* Vertical Navigation on Left */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-[10000]">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                  setSelectedImage(project.images[index]);
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Previous Button */}
          {currentImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-20 top-1/2 -translate-y-1/2 w-14 h-14 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-2xl hover:text-accent transition z-[10000] backdrop-blur-sm"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Next Button */}
          {currentImageIndex < project.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-2xl hover:text-accent transition z-[10000] backdrop-blur-sm"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Image Container - Made Bigger */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[95vh]"
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-60 px-6 py-3 rounded-full text-lg font-medium">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </>
  );
}
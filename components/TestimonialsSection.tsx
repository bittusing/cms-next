'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Testimonial {
  _id: string;
  name: string;
  text: string;
  image?: string;
  rating: number;
  serviceType: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

interface TestimonialsSectionProps {
  serviceType?: string;
  showFeaturedOnly?: boolean;
  maxItems?: number;
}

export default function TestimonialsSection({ 
  serviceType = 'all', 
  showFeaturedOnly = false,
  maxItems = 6 
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, [serviceType]);

  const fetchTestimonials = async () => {
    try {
      let url = '/api/testimonials';
      const params = new URLSearchParams();
      
      if (serviceType !== 'all') {
        params.append('serviceType', serviceType);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        
        // Filter for featured only if requested
        if (showFeaturedOnly) {
          data = data.filter((t: Testimonial) => t.isFeatured);
        }
        
        // Limit items if specified
        if (maxItems) {
          data = data.slice(0, maxItems);
        }
        
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg sm:text-xl text-gray-600">Real feedback from our satisfied customers</p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {testimonial.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">&quot;{testimonial.text}&quot;</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-accent font-medium">{testimonial.serviceType}</span>
                {testimonial.isFeatured && (
                  <span className="bg-accent bg-opacity-20 text-accent text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      {testimonial.image && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <div className="flex items-center mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-4">&quot;{testimonial.text}&quot;</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-accent font-medium">{testimonial.serviceType}</span>
                      {testimonial.isFeatured && (
                        <span className="bg-accent bg-opacity-20 text-accent text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
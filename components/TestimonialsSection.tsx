'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const fetchTestimonials = useCallback(async () => {
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
  }, [serviceType, showFeaturedOnly, maxItems]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Auto-play functionality for 3+ testimonials
  useEffect(() => {
    if (testimonials.length >= 3 && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000); // Made faster - 3 seconds instead of 4

      return () => clearInterval(interval);
    }
  }, [testimonials.length, isAutoPlaying]);

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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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

        {/* Auto-Moving Carousel for 3+ testimonials */}
        {testimonials.length >= 3 ? (
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / Math.min(testimonials.length, 3))}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full group hover:bg-white">
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

            {/* Vertical Navigation on Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-10 -ml-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-4 h-4 bg-accent rounded-full scale-125' 
                      : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400 hover:scale-110'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
            >
              <FaChevronLeft className="text-accent" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
            >
              <FaChevronRight className="text-accent" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-accent' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Static Grid for less than 3 testimonials */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-white">
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
        )}
      </div>
    </section>
  );
}
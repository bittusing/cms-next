'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaPlay } from 'react-icons/fa';

interface Slide {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // Made faster - 4 seconds instead of 6
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-custom px-4 sm:px-6">
              <div className="max-w-4xl text-white">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-up">
                  {slide.title}
                  <span className="block text-accent">
                    Excellence
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed animate-fade-in-up animation-delay-200 pr-8 sm:pr-0">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
                  <Link
                    href="/portfolio"
                    className="group bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-2xl"
                  >
                    Explore Our Work
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Vertical Navigation - Hidden on Mobile/Tablet, visible on larger screens */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col space-y-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${
              index === current 
                ? 'w-4 h-4 bg-accent rounded-full scale-110' 
                : 'w-2.5 h-2.5 bg-white/50 rounded-full hover:bg-white/70 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-20 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <FaChevronRight className="text-xl" />
      </button> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${
              index === current 
                ? 'w-8 h-2 bg-accent rounded-full sm:w-12 sm:h-3' 
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70 sm:w-3 sm:h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Stats */}
      {/* <div className="absolute bottom-20 right-8 z-10 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-gray-300">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">15+</div>
              <div className="text-sm text-gray-300">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">98%</div>
              <div className="text-sm text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

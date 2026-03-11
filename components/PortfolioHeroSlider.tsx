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

export default function PortfolioHeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides || slides.length === 0) {
    return (
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop"
            alt="Portfolio"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container-custom text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-4 animate-fade-in-up">
              Our Portfolio
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200">
              Transforming Your 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Dream Spaces
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-fade-in-up animation-delay-400">
              Discover our exceptional portfolio of luxury interior designs that showcase our commitment to excellence and innovation.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
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
            <div className="container-custom">
              <div className="max-w-4xl text-white">
                <div className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-4 animate-fade-in-up">
                  Our Portfolio
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-fade-in-up animation-delay-400">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <FaChevronLeft className="text-lg" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <FaChevronRight className="text-lg" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${
              index === current 
                ? 'w-8 h-2 bg-amber-500 rounded-full' 
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
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
    }, 6000);
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
            <div className="container-custom">
              <div className="max-w-4xl text-white">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                  {slide.title}
                  <span className="block text-accent">
                    Excellence
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                  <Link
                    href="/portfolio"
                    className="group bg-accent text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center shadow-2xl"
                  >
                    Explore Our Work
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="group flex items-center text-white text-lg font-semibold hover:text-accent transition-colors">
                    <div className="w-12 h-12 rounded-full border-2 border-white group-hover:border-accent flex items-center justify-center mr-3 transition-colors">
                      <FaPlay className="ml-1" />
                    </div>
                    Watch Our Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${
              index === current 
                ? 'w-12 h-3 bg-accent rounded-full' 
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
            }`}
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

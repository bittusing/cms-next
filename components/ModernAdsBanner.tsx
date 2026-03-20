'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

interface Ad {
  _id: string;
  image: string;
  title: string;
  description: string;
  link?: string;
  buttonText?: string;
  isActive: boolean;
  isPublished: boolean;
}

export default function ModernAdsBanner() {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/ads-slider');
        if (response.ok) {
          const data = await response.json();
          setAds(data);
        }
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (!isVisible || ads.length === 0) return;

    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads.length, isVisible]);

  if (loading || !isVisible || ads.length === 0) return null;

  const currentAdData = ads[currentAd];

  return (
    <div className="fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-lg md:max-w-2xl px-2 sm:px-4">
      <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 rounded-lg sm:rounded-xl shadow-xl overflow-hidden border border-yellow-400 sm:border-2 transform transition-all duration-500 hover:scale-105">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 z-20 w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
        >
          <FaTimes className="text-xs sm:text-sm" />
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"></div>
        <div className="absolute -top-0.5 -left-0.5 sm:-top-1 sm:-left-1 w-2 h-2 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-bounce"></div>

        <div className="relative p-2 sm:p-4 md:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center">
            {/* Left Content */}
            <div className="text-white text-center sm:text-left">
              {/* Festival Header */}
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-1 sm:mb-2">
                <div className="text-yellow-300 text-sm sm:text-lg">🪔</div>
                <h3 className="text-xs sm:text-sm font-bold text-yellow-300">This Navratri,</h3>
                <div className="text-yellow-300 text-sm sm:text-lg">🪔</div>
              </div>

              {/* Main Title */}
              <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 leading-tight">
                DESIGN YOUR
              </h2>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-yellow-300 mb-0.5 sm:mb-1 leading-tight">
                DREAM HOME
              </h1>
              <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-yellow-100">
                THE RIGHT WAY
              </p>

              {/* Offer Badge */}
              <div className="bg-red-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md sm:rounded-lg mb-2 sm:mb-3 inline-block border border-yellow-400">
                <div className="text-xs sm:text-sm font-bold">FREE 3D INTERIOR DESIGN</div>
                <div className="text-xs">Worth ₹15,000*</div>
              </div>

              {/* Features - Hidden on mobile, shown on sm+ */}
              <div className="hidden sm:block space-y-1 mb-3">
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-yellow-300 text-sm" />
                  <span className="text-white text-sm">No Confusion</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-yellow-300 text-sm" />
                  <span className="text-white text-sm">No Surprises</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-yellow-300 text-sm" />
                  <span className="text-white text-sm">Just Perfect Interiors</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={currentAdData.link || '/contact'}
                className="inline-flex items-center bg-yellow-400 text-red-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book FREE Consultation
                <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right Image - Hidden on mobile, shown on sm+ */}
            <div className="relative hidden sm:block">
              <div className="relative h-32 sm:h-40 md:h-48 rounded-md sm:rounded-lg overflow-hidden">
                <Image
                  src={currentAdData.image}
                  alt={currentAdData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-sm sm:text-lg">🎉</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        {ads.length > 1 && (
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {ads.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentAd 
                    ? 'bg-yellow-400 w-4 sm:w-6' 
                    : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-yellow-400 pointer-events-none"></div>
      </div>
    </div>
  );
}
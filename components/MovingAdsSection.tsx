'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

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

export default function MovingAdsSection() {
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
          // Filter for only active and published ads (API already handles this)
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
    }, 4000);

    return () => clearInterval(timer);
  }, [ads.length, isVisible]);

  if (loading || !isVisible || ads.length === 0) return null;

  const currentAdData = ads[currentAd];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform transition-all duration-500 hover:scale-105">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Ad Content */}
        <div className="relative">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={currentAdData.image}
              alt={currentAdData.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {currentAdData.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {currentAdData.description}
            </p>
            
            {currentAdData.link && (
              <a
                href={currentAdData.link}
                className="inline-flex items-center bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {currentAdData.buttonText || 'Learn More'}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAd 
                  ? 'bg-accent w-6' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Premium Badge */}
        <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          PREMIUM
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[50] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/10 backdrop-blur-sm'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16">
              <Image
                src="/logo.png"
                alt="Urban Design India"
                fill
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'brightness-100' : 'brightness-100'
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-gray-800 hover:text-amber-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/portfolio" 
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-gray-800 hover:text-amber-600'
              }`}
            >
              Portfolio
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-gray-800 hover:text-amber-600'
              }`}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-gray-800 hover:text-amber-600'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/blogs" 
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-gray-800 hover:text-amber-600'
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full font-medium hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-2xl transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-gray-800'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
            <Link href="/" className="block py-3 text-gray-700 hover:text-amber-600 font-medium">
              Home
            </Link>
            <Link href="/portfolio" className="block py-3 text-gray-700 hover:text-amber-600 font-medium">
              Portfolio
            </Link>
            <Link href="/about" className="block py-3 text-gray-700 hover:text-amber-600 font-medium">
              About
            </Link>
            <Link href="/services" className="block py-3 text-gray-700 hover:text-amber-600 font-medium">
              Services
            </Link>
            <Link href="/blogs" className="block py-3 text-gray-700 hover:text-amber-600 font-medium">
              Blog
            </Link>
            <Link href="/contact" className="block py-3 text-gray-700 hover:text-amber-600 font-medium">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

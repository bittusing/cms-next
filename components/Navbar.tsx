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
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-white/95'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center">
            <div className="relative w-40 sm:w-56 h-16 sm:h-20">
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
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/portfolio" 
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              Portfolio
            </Link>
            <Link 
              href="/about" 
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/blogs" 
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/videos" 
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              Videos
            </Link>
            <Link 
              href="/faqs" 
              className="font-medium text-gray-900 hover:text-accent transition-colors"
            >
              FAQs
            </Link>
            <Link 
              href="/contact" 
              className="bg-accent text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Get A Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-900 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl border-t border-gray-100 z-50">
            <div className="px-4 py-2 space-y-1">
              <Link 
                href="/" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/portfolio" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                href="/about" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/services" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/blogs" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/videos" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Videos
              </Link>
              <Link 
                href="/faqs" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                href="/contact" 
                className="block py-3 px-4 text-gray-700 hover:text-accent hover:bg-gray-50 font-medium rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 pb-2">
                <Link 
                  href="/contact" 
                  className="block py-3 px-4 bg-accent text-white text-center rounded-lg font-medium hover:opacity-90 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Get A Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

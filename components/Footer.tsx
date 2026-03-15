'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface FooterSettings {
  companyName: string;
  companyDescription: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  copyrightText: string;
}

// Cache for footer settings to prevent multiple API calls
let footerCache: FooterSettings | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function Footer() {
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    const fetchFooterSettings = async () => {
      // Check if we have cached data that's still valid
      const now = Date.now();
      if (footerCache && (now - cacheTime) < CACHE_DURATION) {
        setFooterSettings(footerCache);
        return;
      }

      try {
        const res = await fetch('/api/footer-settings');
        if (res.ok) {
          const data = await res.json();
          footerCache = data;
          cacheTime = now;
          setFooterSettings(data);
        }
      } catch (error) {
        console.error('Failed to fetch footer settings:', error);
      }
    };

    fetchFooterSettings();
  }, []);

  // Fallback data if API fails
  const defaultSettings = {
    companyName: 'Urban Design India',
    companyDescription: 'We deliver expert construction and interior solutions backed by decades of experience.',
    logo: '/logo.png',
    phone: '+91 98765 43210',
    email: 'info@urbandesignindia.com',
    address: 'Mumbai, Maharashtra\nIndia - 400001',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    copyrightText: 'Urban Design India. All Rights Reserved'
  };

  const settings = footerSettings || defaultSettings;

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="relative w-48 h-20 mb-4">
              <Image
                src={settings.logo}
                alt={settings.companyName}
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {settings.companyDescription}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaPhone className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <a href={`tel:${settings.phone}`} className="hover:text-accent transition">
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <a href={`mailto:${settings.email}`} className="hover:text-accent transition">
                    {settings.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  {settings.address.split('\n').map((line: string, index: number) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-gray-300 hover:text-accent transition">
                Home
              </Link>
              <Link href="/portfolio" className="block text-gray-300 hover:text-accent transition">
                Portfolio
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-accent transition">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent transition">
                Services
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-accent transition">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Our Services</h3>
            <div className="space-y-2 text-sm">
              <Link href="/services" className="block text-gray-300 hover:text-accent transition">
                Residential Interior Design
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent transition">
                Commercial Interior Design
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent transition">
                Office Interior Design
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent transition">
                Modular Kitchen Design
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-accent transition">
                Furniture Design
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} {settings.copyrightText}
            </p>
            <div className="flex gap-4">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition"
                >
                  <FaFacebook />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition"
                >
                  <FaInstagram />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition"
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

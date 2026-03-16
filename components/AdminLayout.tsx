'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaImages, FaTags, FaEnvelope, FaSignOutAlt, FaAd, FaCog, FaEdit, FaCogs, FaPalette, FaQuestionCircle, FaComments, FaVideo, FaBars, FaTimes } from 'react-icons/fa';
import { MdViewCarousel } from 'react-icons/md';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session', {
          cache: 'no-store'
        });
        if (!res.ok) {
          router.push('/admin/login');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      }
    }
    
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const menuItems = [
    { href: '/admin', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/projects', icon: FaImages, label: 'Projects' },
    { href: '/admin/categories', icon: FaTags, label: 'Categories' },
    { href: '/admin/slider', icon: MdViewCarousel, label: 'Hero Slider' },
    { href: '/admin/ads-slider', icon: FaAd, label: 'Ads Slider' },
    { href: '/admin/videos', icon: FaVideo, label: 'Videos' },
    { href: '/admin/services', icon: FaCogs, label: 'Services' },
    { href: '/admin/blogs', icon: FaEdit, label: 'Blog Management' },
    { href: '/admin/testimonials', icon: FaComments, label: 'Testimonials' },
    { href: '/admin/faqs', icon: FaQuestionCircle, label: 'FAQs' },
    { href: '/admin/theme-settings', icon: FaPalette, label: 'Theme Settings' },
    { href: '/admin/contacts', icon: FaEnvelope, label: 'Contacts' },
    { href: '/admin/footer-settings', icon: FaCog, label: 'Footer Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Admin"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900 text-xl"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-700 mt-16 lg:mt-0">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Admin"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">Urban Design India</p>
            </div>
          </div>
        </div>
        <nav className="mt-6 pb-20 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-6 py-3 hover:bg-white hover:bg-opacity-10 transition-all duration-200 border-l-4 border-transparent hover:border-amber-500 ${
                pathname === item.href ? 'bg-white bg-opacity-10 border-amber-500 text-amber-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 text-lg" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <div className="border-t border-gray-700 mt-6 pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 hover:bg-red-600 hover:bg-opacity-20 transition-all duration-200 w-full text-left text-gray-300 hover:text-red-400"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 lg:ml-0">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}

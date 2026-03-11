'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { FaImages, FaTags, FaEnvelope, FaAd, FaCog } from 'react-icons/fa';
import { MdViewCarousel } from 'react-icons/md';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    unreadContacts: 0,
    sliders: 0,
    adsSliders: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, contactsRes, slidersRes, adsSlidersRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/contact'),
          fetch('/api/slider'),
          fetch('/api/ads-slider'),
        ]);

        const projects = await projectsRes.json();
        const contacts = await contactsRes.json();
        const sliders = await slidersRes.json();
        const adsSliders = await adsSlidersRes.json();

        setStats({
          projects: projects.length,
          contacts: contacts.length,
          unreadContacts: contacts.filter((c: any) => !c.isRead).length,
          sliders: sliders.length,
          adsSliders: adsSliders.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Manage Projects',
      description: 'Add, edit, or delete portfolio projects',
      href: '/admin/projects',
      icon: FaImages,
      color: 'bg-blue-500',
      count: stats.projects
    },
    {
      title: 'Hero Slider',
      description: 'Manage homepage hero slider content',
      href: '/admin/slider',
      icon: MdViewCarousel,
      color: 'bg-purple-500',
      count: stats.sliders
    },
    {
      title: 'Ads Slider',
      description: 'Manage promotional ads slider',
      href: '/admin/ads-slider',
      icon: FaAd,
      color: 'bg-green-500',
      count: stats.adsSliders
    },
    {
      title: 'Categories',
      description: 'Manage project categories',
      href: '/admin/categories',
      icon: FaTags,
      color: 'bg-yellow-500',
      count: 0
    },
    {
      title: 'Contacts',
      description: 'View and manage contact inquiries',
      href: '/admin/contacts',
      icon: FaEnvelope,
      color: 'bg-red-500',
      count: stats.unreadContacts
    },
    {
      title: 'Footer Settings',
      description: 'Manage footer content and social links',
      href: '/admin/footer-settings',
      icon: FaCog,
      color: 'bg-gray-500',
      count: 0
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.projects}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Hero Slides</h3>
            <p className="text-3xl font-bold text-green-600">{stats.sliders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Ads Slides</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.adsSliders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Unread Contacts</h3>
            <p className="text-3xl font-bold text-red-600">{stats.unreadContacts}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-gray-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className={`p-3 rounded-lg ${action.color} text-white mr-3`}>
                        <action.icon className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                        {action.count > 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {action.count} items
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>System ready for content management</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Hero slider and ads slider systems active</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span>Portfolio management ready</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function AdminTestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runTests() {
      try {
        // Test all APIs
        const tests = await Promise.allSettled([
          fetch('/api/test-admin').then(r => r.json()),
          fetch('/api/footer-settings').then(r => r.json()),
          fetch('/api/ads-slider').then(r => r.json()),
          fetch('/api/slider').then(r => r.json()),
        ]);

        setTestResults({
          adminTest: tests[0],
          footerSettings: tests[1],
          adsSlider: tests[2],
          slider: tests[3]
        });
      } catch (error) {
        console.error('Test failed:', error);
        setTestResults({ error: error });
      } finally {
        setLoading(false);
      }
    }

    runTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationTriangle className="text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">🔧 Admin Panel Verification</h1>
          <p className="text-blue-100">Complete system check for all admin features</p>
        </div>

        {/* Quick Access Links */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            🚀 Quick Access Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="/admin/slider" className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-1">🎠</div>
              <div className="text-sm font-medium">Hero Slider</div>
            </a>
            <a href="/admin/ads-slider" className="bg-green-50 hover:bg-green-100 p-3 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-1">📢</div>
              <div className="text-sm font-medium">Ads Slider</div>
            </a>
            <a href="/admin/footer-settings" className="bg-purple-50 hover:bg-purple-100 p-3 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-1">⚙️</div>
              <div className="text-sm font-medium">Footer Settings</div>
            </a>
            <a href="/admin/projects" className="bg-orange-50 hover:bg-orange-100 p-3 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-1">🖼️</div>
              <div className="text-sm font-medium">Projects</div>
            </a>
          </div>
        </div>

        {/* Feature Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              ✅ Implemented Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Hero Slider Management
                </span>
                <span className="text-xs text-green-600 font-medium">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Ads Slider System
                </span>
                <span className="text-xs text-green-600 font-medium">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Dynamic Footer
                </span>
                <span className="text-xs text-green-600 font-medium">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Image Upload System
                </span>
                <span className="text-xs text-green-600 font-medium">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Professional Admin UI
                </span>
                <span className="text-xs text-green-600 font-medium">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              🔗 Navigation Menu
            </h3>
            <div className="space-y-2">
              <a href="/admin" className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="mr-2">🏠</span> Dashboard
              </a>
              <a href="/admin/projects" className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="mr-2">🖼️</span> Projects
              </a>
              <a href="/admin/categories" className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="mr-2">🏷️</span> Categories
              </a>
              <a href="/admin/slider" className="flex items-center p-2 hover:bg-blue-50 rounded transition-colors font-medium text-blue-600">
                <span className="mr-2">🎠</span> Hero Slider ← NEW
              </a>
              <a href="/admin/ads-slider" className="flex items-center p-2 hover:bg-green-50 rounded transition-colors font-medium text-green-600">
                <span className="mr-2">📢</span> Ads Slider ← NEW
              </a>
              <a href="/admin/contacts" className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="mr-2">📧</span> Contacts
              </a>
              <a href="/admin/footer-settings" className="flex items-center p-2 hover:bg-purple-50 rounded transition-colors font-medium text-purple-600">
                <span className="mr-2">⚙️</span> Footer Settings ← NEW
              </a>
            </div>
          </div>
        </div>

        {/* API Test Results */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🔍 API Test Results</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-auto max-h-64">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-yellow-800">
            🚨 Having Issues? Try These Steps:
          </h3>
          <div className="space-y-2 text-sm text-yellow-700">
            <div>1. <strong>Restart Server:</strong> Stop (Ctrl+C) and run <code className="bg-yellow-100 px-1 rounded">npm run dev</code></div>
            <div>2. <strong>Clear Cache:</strong> Press Ctrl+Shift+R or use incognito mode</div>
            <div>3. <strong>Check URL:</strong> Make sure you're using http://localhost:3000 (not 3001)</div>
            <div>4. <strong>Login:</strong> Go to <a href="/admin/login" className="underline">/admin/login</a> with admin/admin123</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
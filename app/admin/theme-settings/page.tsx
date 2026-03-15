'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaPalette, FaUndo, FaEye } from 'react-icons/fa';

interface ThemeSettings {
  _id?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  isActive: boolean;
}

export default function ThemeSettingsAdmin() {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: '#1f2937',
    secondaryColor: '#f3f4f6',
    accentColor: '#f59e0b',
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchThemeSettings();
  }, []);

  const fetchThemeSettings = async () => {
    try {
      const response = await fetch('/api/theme-settings');
      if (response.ok) {
        const data = await response.json();
        setThemeSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch theme settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/theme-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(themeSettings)
      });

      if (response.ok) {
        alert('Theme settings saved successfully!');
        // Reload the page to apply new theme
        window.location.reload();
      } else {
        alert('Failed to save theme settings');
      }
    } catch (error) {
      console.error('Failed to save theme settings:', error);
      alert('Failed to save theme settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset to default colors?')) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/theme-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' })
      });

      if (response.ok) {
        const data = await response.json();
        setThemeSettings(data);
        alert('Theme settings reset to defaults!');
        // Reload the page to apply default theme
        window.location.reload();
      } else {
        alert('Failed to reset theme settings');
      }
    } catch (error) {
      console.error('Failed to reset theme settings:', error);
      alert('Failed to reset theme settings');
    } finally {
      setSaving(false);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      // Apply preview styles
      document.documentElement.style.setProperty('--color-primary', themeSettings.primaryColor);
      document.documentElement.style.setProperty('--color-secondary', themeSettings.secondaryColor);
      document.documentElement.style.setProperty('--color-accent', themeSettings.accentColor);
    } else {
      // Remove preview styles
      document.documentElement.style.removeProperty('--color-primary');
      document.documentElement.style.removeProperty('--color-secondary');
      document.documentElement.style.removeProperty('--color-accent');
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaPalette className="text-blue-600" />
            Theme Settings
          </h1>
          <div className="flex gap-2">
            <button
              onClick={togglePreview}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                previewMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <FaEye />
              {previewMode ? 'Exit Preview' : 'Preview'}
            </button>
            <button
              onClick={handleReset}
              disabled={saving}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2 disabled:opacity-50"
            >
              <FaUndo />
              Reset to Defaults
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Customize Website Colors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Color */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={themeSettings.primaryColor}
                  onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder="#1f2937"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used for headers, navigation, and main elements</p>
                </div>
              </div>
              <div 
                className="w-full h-12 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: themeSettings.primaryColor }}
              />
            </div>

            {/* Secondary Color */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={themeSettings.secondaryColor}
                  onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder="#f3f4f6"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used for backgrounds and subtle elements</p>
                </div>
              </div>
              <div 
                className="w-full h-12 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: themeSettings.secondaryColor }}
              />
            </div>

            {/* Accent Color */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Accent Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={themeSettings.accentColor}
                  onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder="#f59e0b"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used for buttons, links, and highlights</p>
                </div>
              </div>
              <div 
                className="w-full h-12 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: themeSettings.accentColor }}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                'Save Theme Settings'
              )}
            </button>
          </div>
        </div>

        {/* Color Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Color Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: themeSettings.primaryColor, color: 'white' }}>
              <h4 className="font-bold">Primary Color</h4>
              <p>This is how primary color looks with white text</p>
            </div>
            <div className="p-4 rounded-lg border-2" style={{ backgroundColor: themeSettings.secondaryColor }}>
              <h4 className="font-bold">Secondary Color</h4>
              <p>This is how secondary color looks as background</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: themeSettings.accentColor, color: 'white' }}>
              <h4 className="font-bold">Accent Color</h4>
              <p>This is how accent color looks with white text</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
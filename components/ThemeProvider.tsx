'use client';

import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const response = await fetch('/api/theme-settings');
        if (response.ok) {
          const themeSettings = await response.json();
          
          // Apply theme colors to CSS custom properties
          document.documentElement.style.setProperty('--color-primary', themeSettings.primaryColor);
          document.documentElement.style.setProperty('--color-secondary', themeSettings.secondaryColor);
          document.documentElement.style.setProperty('--color-accent', themeSettings.accentColor);
        }
      } catch (error) {
        console.error('Failed to load theme settings:', error);
      }
    };

    loadTheme();
  }, []);

  return <>{children}</>;
}
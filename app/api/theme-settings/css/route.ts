import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ThemeSettings from '@/models/ThemeSettings';

export async function GET() {
  try {
    await connectDB();
    let themeSettings = await ThemeSettings.findOne({ isActive: true });
    
    // Use default colors if no theme settings exist
    if (!themeSettings) {
      themeSettings = {
        primaryColor: '#1f2937',
        secondaryColor: '#f3f4f6',
        accentColor: '#f59e0b'
      };
    }
    
    const css = `
      :root {
        --color-primary: ${themeSettings.primaryColor};
        --color-secondary: ${themeSettings.secondaryColor};
        --color-accent: ${themeSettings.accentColor};
      }
      
      .bg-primary { background-color: var(--color-primary) !important; }
      .bg-secondary { background-color: var(--color-secondary) !important; }
      .bg-accent { background-color: var(--color-accent) !important; }
      .text-primary { color: var(--color-primary) !important; }
      .text-secondary { color: var(--color-secondary) !important; }
      .text-accent { color: var(--color-accent) !important; }
      .border-primary { border-color: var(--color-primary) !important; }
      .border-secondary { border-color: var(--color-secondary) !important; }
      .border-accent { border-color: var(--color-accent) !important; }
    `;
    
    return new NextResponse(css, {
      headers: {
        'Content-Type': 'text/css',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating theme CSS:', error);
    return new NextResponse('/* Error loading theme */', {
      headers: { 'Content-Type': 'text/css' },
      status: 500
    });
  }
}
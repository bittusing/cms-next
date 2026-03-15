import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ThemeSettings from '@/models/ThemeSettings';

export async function GET() {
  try {
    await connectDB();
    let themeSettings = await ThemeSettings.findOne({ isActive: true });
    
    // Create default theme settings if none exist
    if (!themeSettings) {
      themeSettings = new ThemeSettings({
        primaryColor: '#1f2937',
        secondaryColor: '#f3f4f6',
        accentColor: '#f59e0b',
        isActive: true
      });
      await themeSettings.save();
    }
    
    return NextResponse.json(themeSettings);
  } catch (error) {
    console.error('Error fetching theme settings:', error);
    return NextResponse.json({ error: 'Failed to fetch theme settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    let themeSettings = await ThemeSettings.findOne({ isActive: true });
    
    if (!themeSettings) {
      themeSettings = new ThemeSettings({
        ...body,
        isActive: true
      });
    } else {
      Object.assign(themeSettings, body);
    }
    
    await themeSettings.save();
    return NextResponse.json(themeSettings);
  } catch (error) {
    console.error('Error updating theme settings:', error);
    return NextResponse.json({ error: 'Failed to update theme settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { action } = await request.json();
    
    if (action === 'reset') {
      let themeSettings = await ThemeSettings.findOne({ isActive: true });
      
      if (!themeSettings) {
        themeSettings = new ThemeSettings();
      } else {
        themeSettings.primaryColor = '#1f2937';
        themeSettings.secondaryColor = '#f3f4f6';
        themeSettings.accentColor = '#f59e0b';
      }
      
      await themeSettings.save();
      return NextResponse.json(themeSettings);
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error resetting theme settings:', error);
    return NextResponse.json({ error: 'Failed to reset theme settings' }, { status: 500 });
  }
}
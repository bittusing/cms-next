import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FooterSettings from '@/models/FooterSettings';

export async function GET() {
  try {
    await connectDB();
    let footerSettings = await FooterSettings.findOne();
    
    // Create default settings if none exist
    if (!footerSettings) {
      footerSettings = new FooterSettings({});
      await footerSettings.save();
    }
    
    return NextResponse.json(footerSettings);
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json({ error: 'Failed to fetch footer settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    let footerSettings = await FooterSettings.findOne();
    
    if (!footerSettings) {
      footerSettings = new FooterSettings(body);
    } else {
      Object.assign(footerSettings, body);
    }
    
    await footerSettings.save();
    return NextResponse.json(footerSettings);
  } catch (error) {
    console.error('Error updating footer settings:', error);
    return NextResponse.json({ error: 'Failed to update footer settings' }, { status: 500 });
  }
}
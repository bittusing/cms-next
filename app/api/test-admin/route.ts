import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FooterSettings from '@/models/FooterSettings';
import AdsSlider from '@/models/AdsSlider';
import Slider from '@/models/Slider';

export async function GET() {
  try {
    await connectDB();
    
    // Test all models
    const footerSettings = await FooterSettings.findOne() || await new FooterSettings({}).save();
    const adsSliders = await AdsSlider.find();
    const sliders = await Slider.find();
    
    return NextResponse.json({
      success: true,
      data: {
        footerSettings: !!footerSettings,
        adsSliders: adsSliders.length,
        sliders: sliders.length,
        models: {
          FooterSettings: !!FooterSettings,
          AdsSlider: !!AdsSlider,
          Slider: !!Slider
        }
      }
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
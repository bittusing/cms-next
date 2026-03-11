import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdsSlider from '@/models/AdsSlider';

export async function GET() {
  try {
    await connectDB();
    const adsSliders = await AdsSlider.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(adsSliders);
  } catch (error) {
    console.error('Error fetching ads sliders:', error);
    return NextResponse.json({ error: 'Failed to fetch ads sliders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const adsSlider = new AdsSlider(body);
    await adsSlider.save();
    return NextResponse.json(adsSlider, { status: 201 });
  } catch (error) {
    console.error('Error creating ads slider:', error);
    return NextResponse.json({ error: 'Failed to create ads slider' }, { status: 500 });
  }
}
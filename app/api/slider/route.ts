import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Slider from '@/models/Slider';
import { verifyToken } from '@/utils/auth';
import { mockSliders } from '@/lib/mockData';

export async function GET() {
  try {
    await dbConnect();
    const sliders = await Slider.find().sort({ order: 1 });
    return NextResponse.json(sliders);
  } catch (error) {
    console.log('Using mock data - MongoDB not connected');
    return NextResponse.json(mockSliders);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const slider = await Slider.create(data);
    
    return NextResponse.json(slider, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
  }
}

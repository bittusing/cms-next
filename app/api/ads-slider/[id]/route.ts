import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdsSlider from '@/models/AdsSlider';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const adsSlider = await AdsSlider.findById(params.id);
    if (!adsSlider) {
      return NextResponse.json({ error: 'Ads slider not found' }, { status: 404 });
    }
    return NextResponse.json(adsSlider);
  } catch (error) {
    console.error('Error fetching ads slider:', error);
    return NextResponse.json({ error: 'Failed to fetch ads slider' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const adsSlider = await AdsSlider.findByIdAndUpdate(params.id, body, { new: true });
    if (!adsSlider) {
      return NextResponse.json({ error: 'Ads slider not found' }, { status: 404 });
    }
    return NextResponse.json(adsSlider);
  } catch (error) {
    console.error('Error updating ads slider:', error);
    return NextResponse.json({ error: 'Failed to update ads slider' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const adsSlider = await AdsSlider.findByIdAndDelete(params.id);
    if (!adsSlider) {
      return NextResponse.json({ error: 'Ads slider not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Ads slider deleted successfully' });
  } catch (error) {
    console.error('Error deleting ads slider:', error);
    return NextResponse.json({ error: 'Failed to delete ads slider' }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Handle publish toggle
    if (body.hasOwnProperty('isPublished')) {
      const adsSlider = await AdsSlider.findByIdAndUpdate(
        params.id, 
        { isPublished: body.isPublished }, 
        { new: true }
      );
      if (!adsSlider) {
        return NextResponse.json({ error: 'Ads slider not found' }, { status: 404 });
      }
      return NextResponse.json(adsSlider);
    }
    
    // Handle other partial updates
    const adsSlider = await AdsSlider.findByIdAndUpdate(params.id, body, { new: true });
    if (!adsSlider) {
      return NextResponse.json({ error: 'Ads slider not found' }, { status: 404 });
    }
    return NextResponse.json(adsSlider);
  } catch (error) {
    console.error('Error updating ads slider:', error);
    return NextResponse.json({ error: 'Failed to update ads slider' }, { status: 500 });
  }
}
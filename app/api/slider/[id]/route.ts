import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Slider from '@/models/Slider';
import { verifyToken } from '@/utils/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const slider = await Slider.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!slider) {
      return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
    }
    
    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update slider' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const slider = await Slider.findByIdAndDelete(params.id);
    
    if (!slider) {
      return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
  }
}

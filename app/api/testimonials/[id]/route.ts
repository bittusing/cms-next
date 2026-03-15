import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyToken } from '@/utils/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const testimonial = await Testimonial.findByIdAndDelete(params.id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    // Handle publish toggle
    if (body.hasOwnProperty('isPublished')) {
      const updateData: any = { isPublished: body.isPublished };
      if (body.isPublished) {
        updateData.approvedAt = new Date();
        // You can add approvedBy if you have admin user ID
      }
      
      const testimonial = await Testimonial.findByIdAndUpdate(
        params.id, 
        updateData, 
        { new: true }
      );
      
      if (!testimonial) {
        return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
      }
      return NextResponse.json(testimonial);
    }
    
    // Handle feature toggle
    if (body.hasOwnProperty('isFeatured')) {
      const testimonial = await Testimonial.findByIdAndUpdate(
        params.id, 
        { isFeatured: body.isFeatured }, 
        { new: true }
      );
      
      if (!testimonial) {
        return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
      }
      return NextResponse.json(testimonial);
    }
    
    // Handle other partial updates
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true });
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}
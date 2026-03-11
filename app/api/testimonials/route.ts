import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyToken } from '@/utils/auth';
import { mockTestimonials } from '@/lib/mockData';

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.log('Using mock data - MongoDB not connected');
    return NextResponse.json(mockTestimonials);
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
    const testimonial = await Testimonial.create(data);
    
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

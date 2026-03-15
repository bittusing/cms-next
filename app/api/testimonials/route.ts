import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyToken } from '@/utils/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const serviceType = searchParams.get('serviceType');
    
    let query: any = {};
    if (!isAdmin) {
      // For public API, only show published testimonials
      query.isPublished = true;
    }
    
    if (serviceType && serviceType !== 'all' && serviceType !== 'All') {
      query.serviceType = serviceType;
    }
    
    const testimonials = await Testimonial.find(query).sort({ isFeatured: -1, order: 1, createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Return empty array for better error handling
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const testimonial = await Testimonial.create(data);
    
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

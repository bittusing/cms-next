import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug, isPublished: true });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
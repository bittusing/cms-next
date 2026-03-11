import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { verifyToken } from '@/utils/auth';
import { slugify } from '@/utils/slugify';
import { mockCategories } from '@/lib/mockData';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.log('Using mock data - MongoDB not connected');
    return NextResponse.json(mockCategories);
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
    
    const slug = slugify(data.name);
    const category = await Category.create({ ...data, slug });
    
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

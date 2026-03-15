import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }
    
    const faqs = await FAQ.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { question: { $regex: query, $options: 'i' } },
            { answer: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).sort({ category: 1, order: 1 });
    
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error searching FAQs:', error);
    return NextResponse.json({ error: 'Failed to search FAQs' }, { status: 500 });
  }
}
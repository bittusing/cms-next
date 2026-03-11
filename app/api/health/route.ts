import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    const startTime = Date.now();
    await dbConnect();
    const endTime = Date.now();
    
    return NextResponse.json({ 
      status: 'ok',
      mongodb: 'connected',
      connectionTime: `${endTime - startTime}ms`
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error',
      mongodb: 'disconnected',
      error: error.message 
    }, { status: 500 });
  }
}

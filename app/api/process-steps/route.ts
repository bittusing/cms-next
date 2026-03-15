import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProcessStep from '@/models/ProcessStep';

export async function GET() {
  try {
    await connectDB();
    const processSteps = await ProcessStep.find({ isActive: true }).sort({ order: 1, stepNumber: 1 });
    return NextResponse.json(processSteps);
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return NextResponse.json({ error: 'Failed to fetch process steps' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const processStep = new ProcessStep(body);
    await processStep.save();
    return NextResponse.json(processStep, { status: 201 });
  } catch (error) {
    console.error('Error creating process step:', error);
    return NextResponse.json({ error: 'Failed to create process step' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProcessStep from '@/models/ProcessStep';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const processStep = await ProcessStep.findById(params.id);
    if (!processStep) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 });
    }
    return NextResponse.json(processStep);
  } catch (error) {
    console.error('Error fetching process step:', error);
    return NextResponse.json({ error: 'Failed to fetch process step' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const processStep = await ProcessStep.findByIdAndUpdate(params.id, body, { new: true });
    if (!processStep) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 });
    }
    return NextResponse.json(processStep);
  } catch (error) {
    console.error('Error updating process step:', error);
    return NextResponse.json({ error: 'Failed to update process step' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const processStep = await ProcessStep.findByIdAndDelete(params.id);
    if (!processStep) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Process step deleted successfully' });
  } catch (error) {
    console.error('Error deleting process step:', error);
    return NextResponse.json({ error: 'Failed to delete process step' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/utils/auth';
import { slugify } from '@/utils/slugify';
import { mockProjects } from '@/lib/mockData';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().populate('category').sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.log('Using mock data - MongoDB not connected');
    return NextResponse.json(mockProjects);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Temporarily disable auth check for debugging
    // const token = request.cookies.get('token')?.value;
    // if (!token || !verifyToken(token)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    await dbConnect();
    const data = await request.json();
    
    console.log('Creating project with data:', data);
    
    let slug = slugify(data.title);
    
    // Check if slug already exists and make it unique
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      const timestamp = Date.now();
      slug = `${slug}-${timestamp}`;
    }
    
    const projectData = { ...data, slug };
    
    console.log('Project data with slug:', projectData);
    
    const project = await Project.create(projectData);
    console.log('Project created successfully:', project._id);
    
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ 
      error: 'Failed to create project', 
      details: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/lib/models/Video';

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Helper function to generate YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query: any = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const videos = await Video.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, description, youtubeUrl, category, isActive, isFeatured, order } = body;
    
    // Validate required fields
    if (!title || !youtubeUrl) {
      return NextResponse.json(
        { error: 'Title and YouTube URL are required' },
        { status: 400 }
      );
    }
    
    // Extract video ID and generate thumbnail
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }
    
    const thumbnailUrl = getYouTubeThumbnail(videoId);
    
    const video = new Video({
      title,
      description,
      youtubeUrl,
      thumbnailUrl,
      category: category || 'Interior Design',
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured || false,
      order: order || 0
    });
    
    await video.save();
    
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
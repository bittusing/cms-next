import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { verifyPassword, generateToken } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple check for demo without MongoDB
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      const token = generateToken({ id: '1', email: 'admin@portfolio.com' });

      const response = NextResponse.json({ success: true, token });
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
      });

      return response;
    }

    // Try MongoDB if available
    try {
      await dbConnect();
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const isValid = await verifyPassword(password, admin.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = generateToken({ id: admin._id, email: admin.email });

      const response = NextResponse.json({ success: true, token });
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
      });

      return response;
    } catch (dbError) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

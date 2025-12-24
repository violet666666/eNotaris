import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { createSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan password diperlukan' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: 'User tidak aktif' },
        { status: 401 }
      );
    }

    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    const session = await createSession(user._id, userAgent, ipAddress);
    if (!session) {
      throw new Error('Gagal membuat session');
    }

    // Create response dengan cookie
    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: session.token,
        },
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

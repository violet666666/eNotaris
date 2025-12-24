import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { createSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password, passwordConfirm } = body;

    // Validasi
    if (!name || !email || !password || !passwordConfirm) {
      return NextResponse.json(
        { success: false, error: 'Semua field diperlukan' },
        { status: 400 }
      );
    }

    if (password !== passwordConfirm) {
      return NextResponse.json(
        { success: false, error: 'Password tidak cocok' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Cek email sudah terdaftar
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Buat user baru
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password, // TODO: Hash password dengan bcrypt
      role: 'user',
    });

    // Buat session
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    const session = await createSession(newUser._id, userAgent, ipAddress);

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
          token: session.token,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

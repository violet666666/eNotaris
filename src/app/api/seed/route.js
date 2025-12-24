import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@notaris.com' });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin sudah ada' },
        { status: 400 }
      );
    }

    // Create admin user
    const admin = await User.create({
      name: 'Administrator',
      email: 'admin@notaris.com',
      password: 'admin123', // TODO: Hash this
      role: 'admin',
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: admin,
        message: 'Admin user berhasil dibuat',
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

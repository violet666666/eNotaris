import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password');
    
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if email exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    const newUser = await User.create(body);
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
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

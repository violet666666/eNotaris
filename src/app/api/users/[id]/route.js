import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    // Remove password if empty
    if (!body.password) {
      delete body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

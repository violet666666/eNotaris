import { connectDB } from '@/lib/mongoose';
import MasterJenisPajak from '@/models/MasterJenisPajak';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const data = await MasterJenisPajak.find({}).sort({ nama: 1 });
    return NextResponse.json({ success: true, data });
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
    const data = await MasterJenisPajak.create(body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

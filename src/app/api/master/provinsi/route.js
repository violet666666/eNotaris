import { connectDB } from '@/lib/mongoose';
import MasterProvinsi from '@/models/MasterProvinsi';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const data = await MasterProvinsi.find({}).sort({ nama: 1 });
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
    const data = await MasterProvinsi.create(body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

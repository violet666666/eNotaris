import { connectDB } from '@/lib/mongoose';
import KasBankTransaksi from '@/models/KasBankTransaksi';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const kasBankId = searchParams.get('kasBankId');

    let query = {};
    if (kasBankId) {
      query.kasBankId = kasBankId;
    }

    const data = await KasBankTransaksi.find(query)
      .sort({ tanggal: -1 })
      .limit(100);

    return NextResponse.json({
      success: true,
      data,
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

    const newTransaksi = await KasBankTransaksi.create(body);
    return NextResponse.json(
      { success: true, data: newTransaksi },
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

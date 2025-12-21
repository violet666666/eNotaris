import { connectDB } from '@/lib/mongoose';
import Pelanggan from '@/models/Pelanggan';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');
    
    const pelanggan = await Pelanggan.find({}).limit(50);
    console.log('📊 Fetched pelanggan:', pelanggan.length);
    
    return NextResponse.json({ 
      success: true, 
      data: pelanggan,
      message: 'Data berhasil diambil'
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log('Creating new pelanggan...');
    await connectDB();
    
    const body = await request.json();
    console.log('📝 Body received:', body);

    const newPelanggan = await Pelanggan.create(body);
    console.log('✅ Pelanggan created:', newPelanggan);
    
    return NextResponse.json(
      { success: true, data: newPelanggan },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}

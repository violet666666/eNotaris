import { connectDB } from '@/lib/mongoose';
import LembarKerja from '@/models/LembarKerja';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('📌 Fetching Lembar Kerja...');
    await connectDB();
    console.log('✅ Connected to DB');
    
    const lembarKerja = await LembarKerja.find({}).sort({ createdAt: -1 }).limit(50);
    console.log('✅ Fetched lembar kerja:', lembarKerja.length);
    
    return NextResponse.json({ 
      success: true, 
      data: lembarKerja,
      count: lembarKerja.length,
    });
  } catch (error) {
    console.error('❌ Error in GET /api/lembar-kerja:', error);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log('📌 Creating new Lembar Kerja...');
    await connectDB();
    
    const body = await request.json();
    console.log('📝 Body received:', body);

    // Validasi required fields
    if (!body.noPesanan || !body.namePelanggan || !body.kategori) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'noPesanan, namePelanggan, dan kategori wajib diisi',
        },
        { status: 400 }
      );
    }

    const newLembarKerja = await LembarKerja.create(body);
    console.log('✅ Created:', newLembarKerja);
    
    return NextResponse.json(
      { success: true, data: newLembarKerja },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error in POST /api/lembar-kerja:', error);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

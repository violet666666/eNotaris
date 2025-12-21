import { connectDB } from '@/lib/mongoose';
import Tagihan from '@/models/Tagihan';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = {};
    if (status) {
      query.status = status;
    }

    const data = await Tagihan.find(query).sort({ tanggalTagihan: -1 }).limit(100);
    
    // Hitung statistik
    const totalTagihan = await Tagihan.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$jumlah' } } },
    ]);

    const totalBelumBayar = await Tagihan.aggregate([
      { $match: { ...query, status: 'Belum Bayar' } },
      { $group: { _id: null, total: { $sum: '$jumlah' } } },
    ]);

    return NextResponse.json({
      success: true,
      data,
      stats: {
        totalTagihan: totalTagihan[0]?.total || 0,
        totalBelumBayar: totalBelumBayar[0]?.total || 0,
      },
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

    // Generate nomor tagihan otomatis
    if (!body.noTagihan) {
      const lastTagihan = await Tagihan.findOne({}).sort({ createdAt: -1 });
      const lastNumber = lastTagihan ? parseInt(lastTagihan.noTagihan.substring(3)) : 0;
      body.noTagihan = `TAG${String(lastNumber + 1).padStart(5, '0')}`;
    }

    body.sisaBayar = body.jumlah;

    const newTagihan = await Tagihan.create(body);
    return NextResponse.json(
      { success: true, data: newTagihan },
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

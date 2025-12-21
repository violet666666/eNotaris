import { connectDB } from '@/lib/mongoose';
import Pembayaran from '@/models/Pembayaran';
import Tagihan from '@/models/Tagihan';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = {};
    if (startDate && endDate) {
      query.tanggalBayar = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const data = await Pembayaran.find(query).sort({ tanggalBayar: -1 }).limit(100);

    // Hitung total pembayaran
    const totalPembayaran = await Pembayaran.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$jumlahBayar' } } },
    ]);

    return NextResponse.json({
      success: true,
      data,
      stats: {
        totalPembayaran: totalPembayaran[0]?.total || 0,
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

    // Generate nomor pembayaran otomatis
    if (!body.noPembayaran) {
      const lastPembayaran = await Pembayaran.findOne({}).sort({ createdAt: -1 });
      const lastNumber = lastPembayaran ? parseInt(lastPembayaran.noPembayaran.substring(2)) : 0;
      body.noPembayaran = `BYR${String(lastNumber + 1).padStart(5, '0')}`;
    }

    const newPembayaran = await Pembayaran.create(body);

    // Update status tagihan
    const tagihan = await Tagihan.findById(body.tagihanId);
    if (tagihan) {
      tagihan.sisaBayar = tagihan.jumlah - body.jumlahBayar;
      if (tagihan.sisaBayar === 0) {
        tagihan.status = 'Lunas';
      } else if (tagihan.sisaBayar < tagihan.jumlah) {
        tagihan.status = 'Sebagian Bayar';
      }
      await tagihan.save();
    }

    return NextResponse.json(
      { success: true, data: newPembayaran },
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

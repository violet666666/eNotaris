import { connectDB } from '@/lib/mongodb';
import Pelanggan from '@/models/Pelanggan';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const pelanggan = await Pelanggan.findById(params.id).populate('kabkotaId');
    
    if (!pelanggan) {
      return Response.json(
        { error: 'Pelanggan tidak ditemukan' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: pelanggan,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const pelanggan = await Pelanggan.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    ).populate('kabkotaId');

    if (!pelanggan) {
      return Response.json(
        { error: 'Pelanggan tidak ditemukan' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: pelanggan,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const pelanggan = await Pelanggan.findByIdAndDelete(params.id);

    if (!pelanggan) {
      return Response.json(
        { error: 'Pelanggan tidak ditemukan' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Pelanggan berhasil dihapus',
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

import mongoose from 'mongoose';

const tagihanSchema = new mongoose.Schema(
  {
    noTagihan: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    lembarKerjaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LembarKerja',
    },
    noPesanan: {
      type: String,
      required: true,
    },
    namePelanggan: {
      type: String,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
      min: 0,
    },
    deskripsi: {
      type: String,
    },
    tanggalTagihan: {
      type: Date,
      default: Date.now,
    },
    tanggalJatuhTempo: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Belum Bayar', 'Sebagian Bayar', 'Lunas'],
      default: 'Belum Bayar',
    },
    sisaBayar: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, collection: 'tagihan' }
);

export default mongoose.models.Tagihan ||
  mongoose.model('Tagihan', tagihanSchema);

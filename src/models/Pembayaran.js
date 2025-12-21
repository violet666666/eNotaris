import mongoose from 'mongoose';

const pembayaranSchema = new mongoose.Schema(
  {
    noPembayaran: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tagihanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tagihan',
      required: true,
    },
    noTagihan: {
      type: String,
      required: true,
    },
    namePelanggan: {
      type: String,
      required: true,
    },
    jumlahBayar: {
      type: Number,
      required: true,
      min: 0,
    },
    metodePembayaran: {
      type: String,
      enum: ['Tunai', 'Transfer Bank', 'Cek', 'Giro'],
      required: true,
    },
    nomorReferensi: {
      type: String,
    },
    tanggalBayar: {
      type: Date,
      default: Date.now,
    },
    keterangan: {
      type: String,
    },
    operator: {
      type: String,
    },
  },
  { timestamps: true, collection: 'pembayaran' }
);

export default mongoose.models.Pembayaran ||
  mongoose.model('Pembayaran', pembayaranSchema);

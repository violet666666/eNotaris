import mongoose from 'mongoose';

const kasBankTransaksiSchema = new mongoose.Schema(
  {
    tanggal: {
      type: Date,
      default: Date.now,
    },
    nomorReferensi: {
      type: String,
      required: true,
    },
    kasBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MasterKasBank',
    },
    namaKasBank: {
      type: String,
      required: true,
    },
    tipeTransaksi: {
      type: String,
      enum: ['Masuk', 'Keluar'],
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    deskripsi: {
      type: String,
    },
    saldoSebelum: {
      type: Number,
    },
    saldoSesudah: {
      type: Number,
    },
  },
  { timestamps: true, collection: 'kas_bank_transaksi' }
);

export default mongoose.models.KasBankTransaksi ||
  mongoose.model('KasBankTransaksi', kasBankTransaksiSchema);

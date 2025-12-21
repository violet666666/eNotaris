import mongoose from 'mongoose';

const pelangganSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, 'Nama pelanggan diperlukan'],
    },
    kategori: {
      type: String,
      enum: ['Pribadi', 'Bank/Leasing', 'Perusahaan'],
      required: [true, 'Kategori diperlukan'],
    },
    noTelepon: {
      type: String,
      required: [true, 'Nomor telepon diperlukan'],
    },
    email: {
      type: String,
    },
    provinsi: {
      type: String,
      required: [true, 'Provinsi diperlukan'],
    },
    kabKota: {
      type: String,
      required: [true, 'Kabupaten/Kota diperlukan'],
    },
    alamat: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Pelanggan || mongoose.model('Pelanggan', pelangganSchema);

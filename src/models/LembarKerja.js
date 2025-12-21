import mongoose from 'mongoose';

const lembarKerjaSchema = new mongoose.Schema(
  {
    noPesanan: {
      type: String,
      required: [true, 'No Pesanan diperlukan'],
      unique: true,
      trim: true,
    },
    namePelanggan: {
      type: String,
      required: [true, 'Nama pelanggan diperlukan'],
    },
    kategori: {
      type: String,
      required: [true, 'Kategori diperlukan'],
      enum: ['Pribadi', 'Bank/Leasing', 'Perusahaan'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Persetujuan', 'Proses', 'Selesai', 'Batal'],
      default: 'Draft',
    },
    layanan: {
      type: String,
      default: '',
    },
    totalTagihan: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalDibayar: {
      type: Number,
      default: 0,
      min: 0,
    },
    sisaTagihan: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetSelesai: {
      type: Date,
    },
  },
  { 
    timestamps: true,
    collection: 'lembar_kerja' 
  }
);

// Pre-save middleware untuk hitung sisa tagihan
lembarKerjaSchema.pre('save', function(next) {
  this.sisaTagihan = this.totalTagihan - this.totalDibayar;
  next();
});

export default mongoose.models.LembarKerja ||
  mongoose.model('LembarKerja', lembarKerjaSchema);

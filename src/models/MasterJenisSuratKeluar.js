import mongoose from 'mongoose';

const jenisSuratKeluarSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: true,
      unique: true,
    },
    nama: {
      type: String,
      required: true,
      unique: true,
    },
    deskripsi: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MasterJenisSuratKeluar ||
  mongoose.model('MasterJenisSuratKeluar', jenisSuratKeluarSchema);

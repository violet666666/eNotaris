import mongoose from 'mongoose';

const jenisAktaSchema = new mongoose.Schema(
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

export default mongoose.models.MasterJenisAkta ||
  mongoose.model('MasterJenisAkta', jenisAktaSchema);

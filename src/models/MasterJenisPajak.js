import mongoose from 'mongoose';

const jenisPajakSchema = new mongoose.Schema(
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
    persentase: {
      type: Number,
      default: 0,
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

export default mongoose.models.MasterJenisPajak ||
  mongoose.model('MasterJenisPajak', jenisPajakSchema);

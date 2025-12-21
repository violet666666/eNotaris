import mongoose from 'mongoose';

const provinsiSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.models.MasterProvinsi ||
  mongoose.model('MasterProvinsi', provinsiSchema);

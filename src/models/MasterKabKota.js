import mongoose from 'mongoose';

const kabKotaSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: true,
      unique: true,
    },
    nama: {
      type: String,
      required: true,
    },
    provinsiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MasterProvinsi',
      required: true,
    },
    provinsiNama: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MasterKabKota ||
  mongoose.model('MasterKabKota', kabKotaSchema);

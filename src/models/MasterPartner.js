import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
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
    jenisPartner: {
      type: String,
      enum: ['Notaris', 'Partner', 'Vendor'],
      required: true,
    },
    noTelepon: {
      type: String,
    },
    email: {
      type: String,
    },
    alamat: {
      type: String,
    },
    provinsi: {
      type: String,
    },
    kabKota: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MasterPartner ||
  mongoose.model('MasterPartner', partnerSchema);

import mongoose from 'mongoose';

const kasBankSchema = new mongoose.Schema(
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
    jenis: {
      type: String,
      enum: ['Kas', 'Bank'],
      required: true,
    },
    nomorRekening: {
      type: String,
    },
    bankNama: {
      type: String,
    },
    atasNama: {
      type: String,
    },
    saldo: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MasterKasBank ||
  mongoose.model('MasterKasBank', kasBankSchema);

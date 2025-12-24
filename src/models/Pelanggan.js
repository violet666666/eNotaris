import mongoose from 'mongoose';

const pelangganSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, 'Nama pelanggan harus diisi'],
      trim: true,
    },
    email: {
      type: String,
      sparse: true,
      trim: true,
    },
    noTelepon: {
      type: String,
      required: true,
      trim: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    kabkotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MasterKabKota',
    },
    noKTP: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['aktif', 'nonaktif'],
      default: 'aktif',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pelanggan || mongoose.model('Pelanggan', pelangganSchema);

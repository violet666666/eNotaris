import mongoose from 'mongoose';

const templateAktaSchema = new mongoose.Schema(
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
    jenisAkta: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MasterTemplateAkta ||
  mongoose.model('MasterTemplateAkta', templateAktaSchema);

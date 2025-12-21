import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama user diperlukan'],
    },
    email: {
      type: String,
      required: [true, 'Email diperlukan'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password diperlukan'],
    },
    role: {
      type: String,
      enum: ['admin', 'staff', 'user'],
      default: 'user',
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);

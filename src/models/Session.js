import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    userAgent: String,
    ipAddress: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: 'sessions' }
);

export default mongoose.models.Session ||
  mongoose.model('Session', sessionSchema);

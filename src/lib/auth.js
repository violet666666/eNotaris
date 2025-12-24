import jwt from 'jsonwebtoken';
import User from '@/models/User';
import Session from '@/models/Session';
import { connectDB } from '@/lib/mongoose';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';
const JWT_EXPIRY = '7d'; // 7 days

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const createSession = async (userId, userAgent, ipAddress) => {
  try {
    await connectDB();
    
    const token = generateToken(userId);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const session = await Session.create({
      userId,
      token,
      expiresAt,
      userAgent,
      ipAddress,
    });

    return session;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
};

export const validateSession = async (token) => {
  try {
    await connectDB();
    
    const decoded = verifyToken(token);
    if (!decoded) return null;

    const session = await Session.findOne({
      token,
      isActive: true,
      expiresAt: { $gt: new Date() },
    }).populate('userId');

    return session;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
};

export const destroySession = async (token) => {
  try {
    await connectDB();
    await Session.updateOne({ token }, { isActive: false });
    return true;
  } catch (error) {
    console.error('Error destroying session:', error);
    return false;
  }
};

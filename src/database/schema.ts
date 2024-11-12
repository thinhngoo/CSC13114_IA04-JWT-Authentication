import mongoose from 'mongoose';
import type { Document } from 'mongoose';
import type { User } from '@/types/schema';

type UserDocument = User & Document;
export const UserSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

import './connection';
import mongoose from 'mongoose';

import { UserSchema } from './schema';
import type { Document } from 'mongoose';
import type { User } from '@/types/schema';

type UserDocument = User & Document;
export const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

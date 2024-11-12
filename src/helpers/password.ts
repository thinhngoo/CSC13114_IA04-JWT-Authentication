import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants/server';

export function compare(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function hash(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

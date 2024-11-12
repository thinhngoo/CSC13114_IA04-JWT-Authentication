import { z } from 'zod';
import type { ZodType } from 'zod';
import type { SignupFormData } from '@/constants/form';

export const UserValidation: ZodType<SignupFormData> = z.object({
  email: z.string({ message: 'Email is required' }).email('Email is invalid'),
  username: z
    .string({ message: 'Username is required' })
    .min(2, { message: 'Username must be at least 2 characters' })
    .regex(/^[a-zA-Z0-9._-]+$/, {
      message:
        'Only letters, numbers, underscores, dots, and hyphens are allowed',
    }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

import mongoose from 'mongoose';

(async () =>
  await mongoose
    .connect(process.env.DB_HOST || '')
    .then(() => {
      console.log('[MongoDB]: Database connected');
    })
    .catch(() => {
      console.error('[MongoDB]: Database connection failed');
    }))();

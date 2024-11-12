import { STATUS_CODE } from '@/constants/server';
import { UserModel } from '@/database';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      throw new Error('Unauthorized!');
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken || typeof decodedToken === 'string') {
      throw new Error('Invalid token!');
    }

    const id = (decodedToken as JwtPayload).id;
    if (!id) {
      throw new Error('Invalid token payload!');
    }

    const user = await UserModel.findById(id)
      .select('-password')
      .catch(() => {
        throw new Error('User not found!');
      });

    return new Response(JSON.stringify(user), {
      status: STATUS_CODE.OK,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(error as string, {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

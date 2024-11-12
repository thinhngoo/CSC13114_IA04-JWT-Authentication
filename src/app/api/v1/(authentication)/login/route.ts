import { cookies } from 'next/headers';
import { UserModel } from '@/database';
import { STATUS_CODE } from '@/constants/server';
import { password as passwordHelper } from '@/helpers';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
      return new Response(JSON.stringify('Please fill in all fields!'), {
        status: STATUS_CODE.BAD_REQUEST,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify('User not found!'), {
        status: STATUS_CODE.NOT_FOUND,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    if (!(await passwordHelper.compare(password, user.password))) {
      return new Response(JSON.stringify('Incorrect password!'), {
        status: STATUS_CODE.UNAUTHORIZED,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const cookieStore = await cookies();
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      },
    );
    cookieStore.set('token', token);
    cookieStore.set('user', JSON.stringify(user));

    return new Response(JSON.stringify('Login successful!'), {
      status: STATUS_CODE.OK,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Login failed!'), {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

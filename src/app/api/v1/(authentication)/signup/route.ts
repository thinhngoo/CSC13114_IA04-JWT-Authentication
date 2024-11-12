import { UserModel } from '@/database';
import { STATUS_CODE } from '@/constants/server';
import { UserValidation } from '@/libs/validation.service';
import { password as passwordHelper } from '@/helpers';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = UserValidation.safeParse(data);

    if (result.success) {
      const { username, email, password } = data;

      const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return new Response(JSON.stringify('Email already exists!'), {
            status: STATUS_CODE.BAD_REQUEST,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }

        if (existingUser.username === username) {
          return new Response(JSON.stringify('Username already exists!'), {
            status: STATUS_CODE.BAD_REQUEST,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      }

      await UserModel.create({
        username,
        email,
        password: await passwordHelper.hash(password),
      });

      return new Response(JSON.stringify('User created successfully!'), {
        status: STATUS_CODE.CREATED,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const validationErrors = Object.fromEntries(
      result.error?.issues?.map((issue) => [issue.path[0], issue.message]) ||
        [],
    );

    return new Response(JSON.stringify(validationErrors), {
      status: STATUS_CODE.BAD_REQUEST,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('User creation failed!'), {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

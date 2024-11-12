import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { STATUS_CODE } from '@/constants/server';

export function middleware(request: NextRequest) {
  const header = request.headers.get('Authorization');
  if (!header) {
    return new Response(JSON.stringify('Unauthorized!'), {
      status: STATUS_CODE.UNAUTHORIZED,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/v1/profile',
};

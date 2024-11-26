// /app/api/users/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Logout efetuado' }, {
    headers: {
      'Set-Cookie': 'token=; Path=/; HttpOnly; Max-Age=0;',
    },
  });
}

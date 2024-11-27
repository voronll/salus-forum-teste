// /app/api/users/profile/route.ts

import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt';
import { query } from '@/app/lib/db';

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('token=')[1];

  if (!token) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  try {
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const res = await query('SELECT username, email FROM users WHERE id = $1', [
      decodedToken.id,
    ]);

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar perfil do usuário' }, { status: 500 });
  }
}

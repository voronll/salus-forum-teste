// /app/api/users/session/route.ts

import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt';
import { query } from '@/app/lib/db';

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie');
  if (!cookie) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  try {
    const token = cookie.split('token=')[1];
    const payload = verifyToken(token); // Verifica o token
    const user = await query('SELECT username FROM users WHERE id = $1', [payload.userId]);

    if (!user.rows[0]) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

    return NextResponse.json({ username: user.rows[0].username });
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return NextResponse.json({ error: 'Sessão inválida ou expirada' }, { status: 401 });
  }
}

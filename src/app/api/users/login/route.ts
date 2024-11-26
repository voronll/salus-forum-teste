// /app/api/users/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { query } from '@/app/lib/db';
import { generateToken } from '@/app/lib/jwt';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const user = await query('SELECT id, username, password_hash FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }

    // Gera o token JWT
    const token = generateToken({ userId: user.rows[0].id });

    // Define o cookie com o token
    return NextResponse.json({ message: 'Login bem-sucedido' }, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; Max-Age=3600;`, // 1 hora
      },
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return NextResponse.json({ error: 'Erro no login' }, { status: 500 });
  }
}

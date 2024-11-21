// /app/api/users/register/route.ts

import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import { query } from '@/app/lib/db';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  try {
    // Verificar se o email já está em uso
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: 'Email já está em uso' }, { status: 400 });
    }

    // Criar o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o novo usuário no banco de dados
    const res = await query(
      'INSERT INTO users (username, email, password_hash, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}

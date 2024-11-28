import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const users = await query('SELECT id, username, email FROM users');
    
    if (users.rows.length === 0) {
      return NextResponse.json({ error: 'Nenhum usuário encontrado' }, { status: 404 });
    }

    return NextResponse.json({ users: users.rows });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

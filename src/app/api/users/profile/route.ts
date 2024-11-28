import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt';
import { query } from '@/app/lib/db';

interface DecodedToken {
  userId: string; // Mudança de 'id' para 'userId'
  [key: string]: any; // Caso existam outros campos
}

export async function GET(request: Request) {
  const cookies = request.headers.get('cookie');
  console.log('Cookies recebidos:', cookies);

  const token = cookies?.split('token=')[1];
  console.log('Token extraído:', token);

  if (!token) {
    console.log('Token não encontrado, retornando erro 401');
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  try {
    // Modificado para pegar 'userId' no token
    const decodedToken = verifyToken(token) as DecodedToken;
    console.log('Token decodificado:', decodedToken);

    // Verifica se o 'userId' existe no token
    if (!decodedToken?.userId) {
      console.log('Token inválido, userId não encontrado');
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const res = await query('SELECT username, email FROM users WHERE id = $1', [
      decodedToken.userId, // Mudança de 'id' para 'userId'
    ]);
    console.log('Resultado da consulta:', res);

    if (res.rows.length === 0) {
      console.log('Usuário não encontrado');
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar perfil do usuário' }, { status: 500 });
  }
}

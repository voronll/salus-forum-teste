import { NextResponse } from 'next/server';

import { query } from '../../lib/db';

// Rota para obter todos os posts
export async function GET() {
  try {
      const res = await query('SELECT * FROM posts');
      return NextResponse.json(res.rows); // Retorna os posts em formato JSON
  } catch (error) {
      console.error('Erro ao buscar os posts:', error); // Log do erro
      return NextResponse.json({ error: 'Erro ao buscar os posts.' }, { status: 500 });
  }
}

// Rota para criar um novo post
export async function POST(request) {
  const { title, content, user_id } = await request.json(); // Obtém dados do corpo da requisição

  try {
      const res = await query(
          'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
          [title, content, user_id]
      );
      return NextResponse.json(res.rows[0], { status: 201 }); // Retorna o post criado
  } catch (error) {
      console.error('Erro ao criar o post:', error); // Log do erro
      return NextResponse.json({ error: 'Erro ao criar o post.' }, { status: 500 });
  }
}
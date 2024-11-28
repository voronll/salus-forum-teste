import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

interface Post {
  title: string;
  content: string;
  author_id: number;
}

interface PostResponse {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
}

export async function GET() {
  try {
    console.log('Buscando posts...'); 
    const res = await query('SELECT * FROM posts');
    const posts: PostResponse[] = res.rows;
    console.log('Posts encontrados:', posts); 
    return NextResponse.json(posts); 
  } catch (error) {
    console.error('Erro ao buscar os posts:', error);
    return NextResponse.json({ error: 'Erro ao buscar os posts.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { title, content, author_id }: Post = await request.json();
  console.log('Dados recebidos para criar post:', { title, content, author_id });

  try {
    const res = await query(
      'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author_id]
    );
    const createdPost: PostResponse = res.rows[0];
    console.log('Post criado com sucesso:', createdPost); 
    return NextResponse.json(createdPost, { status: 201 }); 
  } catch (error) {
    console.error('Erro ao criar o post:', error);
    return NextResponse.json({ error: 'Erro ao criar o post.' }, { status: 500 });
  }
}

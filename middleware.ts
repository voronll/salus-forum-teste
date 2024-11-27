import { NextResponse } from 'next/server';
import { verifyToken } from './app/lib/jwt'; // Função para verificar JWT

export function middleware(request: Request) {
  const cookies = request.headers.get('cookie');

  // Busca o token no cookie de forma robusta
  const token = cookies?.match(/token=([^;]+)/)?.[1];

  // Validação do token
  if (!token || !verifyToken(token)) {
    // Redireciona para a página de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se tudo estiver ok, continua para a rota protegida
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard'], // Define as rotas protegidas
};

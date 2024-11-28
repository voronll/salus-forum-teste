import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt'; // Função para verificar JWT

export function middleware(request: Request) {
  // Captura os cookies da requisição
  const cookies = request.headers.get('cookie');
  console.log('Cookies recebidos:', cookies);

  // Busca o token no cookie de forma robusta
  const token = cookies?.match(/token=([^;]+)/)?.[1];
  console.log('Token extraído:', token);

  // Se o token não existir, ou a verificação falhar
  if (!token) {
    console.log('Token não encontrado, redirecionando para login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verifica a validade do token
  try {
    const decodedToken = verifyToken(token);
    console.log('Token decodificado:', decodedToken);

    // Se o token não for válido
    if (!decodedToken) {
      console.log('Token inválido, redirecionando para login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se tudo estiver ok, continua para a rota protegida
  console.log('Token válido, permitindo acesso à rota protegida');
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard'], // Define as rotas protegidas
};

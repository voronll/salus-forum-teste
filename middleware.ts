import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt'; 

export function middleware(request: Request) {
  const cookies = request.headers.get('cookie');
  console.log('Cookies recebidos:', cookies);


  const token = cookies?.match(/token=([^;]+)/)?.[1];
  console.log('Token extraído:', token);

  if (!token) {
    console.log('Token não encontrado, redirecionando para login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = verifyToken(token);
    console.log('Token decodificado:', decodedToken);

    if (!decodedToken) {
      console.log('Token inválido, redirecionando para login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log('Token válido, permitindo acesso à rota protegida');
  return NextResponse.next();
}

export const config = {
  matcher: ['/criar', '/profile', '/dashboard'], 
};

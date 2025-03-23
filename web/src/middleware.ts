import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que são públicas
const publicRoutes = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar o token a partir do cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Verificar se a rota requer autenticação

  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // Se for uma rota protegida e não houver token, redirecionar para o login
  if (!isPublicRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Se for uma rota de autenticação e o usuário já estiver autenticado, redirecionar para o dashboard
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar os caminhos em que o middleware será executado
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (ícone do site)
     * - outras rotas públicas (como API públicas)
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}; 
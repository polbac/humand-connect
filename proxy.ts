import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  const apiKeyHeader = request.headers.get('X-API-Key') || request.headers.get('x-api-key');

  let apiKey = '';

  if (apiKeyHeader) {
    apiKey = apiKeyHeader;
  } else if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.slice(7);
    } else if (authHeader.startsWith('Basic ')) {
      apiKey = authHeader.slice(6);
    } else {
      apiKey = authHeader;
    }
  }

  if (apiKey) {
    response.cookies.set('mcp_apiKey', apiKey, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};

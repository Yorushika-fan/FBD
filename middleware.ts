import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { auth } from '@/app/[locale]/auth';

// Create the locale middleware
const intlMiddleware = createMiddleware(routing);

// Combine both middlewares
export default auth((req) => intlMiddleware(req));

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/api/auth/:path*'],
};

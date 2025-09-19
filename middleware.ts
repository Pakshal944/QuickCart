import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isHome = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();
  const res = NextResponse.next();

  if (isHome(req)) {
    if (userId) {
      const firstName = (sessionClaims as any)?.firstName || '';
      res.cookies.set('qc_personalized', '1', { path: '/', httpOnly: false });
      res.cookies.set('qc_firstname', firstName, { path: '/', httpOnly: false });
    } else {
      res.cookies.set('qc_personalized', '0', { path: '/', httpOnly: false });
      res.cookies.set('qc_firstname', '', { path: '/', httpOnly: false });
    }
  }

  return res;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
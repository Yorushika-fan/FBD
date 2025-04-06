import type { NextAuthConfig } from 'next-auth';

export const authOptions: NextAuthConfig = {
  providers: [], // Add your providers here
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
};

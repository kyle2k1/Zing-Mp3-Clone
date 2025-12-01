import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { github, google, nextauth } from '@/libs/env';
import prisma from '@/libs/prismadb';

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
      allowDangerousEmailAccountLinking: true
    }),
    GoogleProvider({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
      allowDangerousEmailAccountLinking: true
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        });
        if (!user || !user?.hashedPassword) {
          return null;
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) {
          return null;
        }
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: nextauth.secret,
  pages: {
    signIn: '/', // Redirect to home page (login modal will be shown)
    error: '/' // Redirect errors to home page
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  events: {
    async signIn({ user, account, profile }) {
      // This runs AFTER PrismaAdapter has created/linked the user
      // Perfect place to set username for OAuth users
      if (account && (account.provider === 'google' || account.provider === 'github')) {
        if (user?.id && user?.email) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id }
            });

            // Set username if missing
            if (dbUser && !dbUser.username) {
              let username = '';
              if (account.provider === 'github' && profile && 'login' in profile) {
                username = (profile as any).login;
              } else if (account.provider === 'google' && user.email) {
                username = user.email.split('@')[0];
              }

              if (username) {
                // Ensure username is unique
                let uniqueUsername = username;
                let counter = 1;
                while (await prisma.user.findUnique({ where: { username: uniqueUsername } })) {
                  uniqueUsername = `${username}${counter}`;
                  counter++;
                }

                await prisma.user.update({
                  where: { id: user.id },
                  data: { username: uniqueUsername }
                });
              }
            }
          } catch (error) {
            console.error('Error setting username:', error);
            // Don't block sign in
          }
        }
      }
    }
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Sign in callback');
      console.log({ user, account, profile });

      // For OAuth providers, ensure email is provided
      if (account && (account.provider === 'google' || account.provider === 'github')) {
        if (!user?.email) {
          console.error('OAuth sign in failed: No email provided');
          return false;
        }
      }

      // With allowDangerousEmailAccountLinking: true, PrismaAdapter will automatically:
      // 1. Check if account with same provider + providerAccountId exists → uses that user
      // 2. If not, check if user with same email exists → links account to that user (email uniqueness)
      // 3. If not, creates new user and account
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Initial sign in - user object is available
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;

        // For CredentialsProvider, user object comes from authorize
        // For OAuth, get username from profile
        if (profile && 'username' in profile) {
          token.username = profile.username;
        } else if (user && 'username' in user) {
          token.username = (user as any).username;
        }
      }

      // Store OAuth access token if available
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        if (token.email) {
          session.user.email = token.email as string;
        }
        if (token.name) {
          session.user.name = token.name as string;
        }
        if (token.image) {
          session.user.image = token.image as string;
        }
        if (token.username) {
          (session.user as any).username = token.username;
        }
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development' // Enable debug in development
  /*   pages: {
    signIn: '/',
  }, */
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };

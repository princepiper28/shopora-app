// pages/api/auth/[...nextauth].ts

import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // JWT sessions (not database sessions) — the session itself
  // lives in a signed, httpOnly cookie rather than a DB table.
  // Simpler to set up, no session table needed, and is the
  // standard pairing with CredentialsProvider.
  session: {
    strategy: "jwt",
  },

  // Redirect unauthenticated visits to your existing /login page
  // instead of NextAuth's default built-in sign-in page.
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Deliberately vague — don't reveal whether the email
          // exists. NextAuth surfaces this as a generic
          // "CredentialsSignin" error either way.
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) {
          return null;
        }

        // Whatever is returned here becomes available in the JWT
        // callback below, then the session callback, then
        // useSession()'s session.user on the client.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt.toISOString(),
        };
      },
    }),
  ],

  callbacks: {
    // Runs whenever a JWT is created/updated. `user` is only
    // present on initial sign-in — persist what we need onto the
    // token so it's available on subsequent requests without
    // hitting the database again.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.createdAt = (user as { createdAt?: string }).createdAt;
      }
      return token;
    },

    // Runs whenever a session is checked (useSession, getSession,
    // getServerSession). Shapes what the client actually receives.
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; createdAt?: string }).id =
          token.id as string;
        (session.user as { id?: string; createdAt?: string }).createdAt =
          token.createdAt as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
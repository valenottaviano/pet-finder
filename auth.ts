import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";
import { getUserById, getUserByEmail } from "./data/user";

import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      // Handle OAuth providers
      if (account?.provider !== "credentials") return true;

      // Handle credentials provider
      if (credentials?.email && credentials?.password) {
        const dbUser = await getUserByEmail(credentials.email as string);
        if (!dbUser || !dbUser.password) return false;

        // Check if email is verified
        if (!dbUser.emailVerified) return false;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          dbUser.password
        );

        if (passwordsMatch) {
          // Update user object with database user data
          user.id = dbUser.id;
          user.email = dbUser.email;
          user.name = dbUser.name;
          user.image = dbUser.image;
          return true;
        }
      }

      return false;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as any;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = (existingUser as any).role;

      return token;
    },
  },
  ...authConfig,
});

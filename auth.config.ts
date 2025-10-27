import type { NextAuthConfig } from "next-auth";

export default {
  providers: [], // Empty - will be populated in auth.ts
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = nextUrl.pathname.startsWith("/auth");

      // Add your protected routes logic here
      if (!isLoggedIn && !isAuthRoute) {
        return false; // Redirect to login
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

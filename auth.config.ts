import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Return the credentials to be handled in the main auth.ts callbacks
          return { email, password };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

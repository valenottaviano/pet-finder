"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "¡Campos inválidos!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  // If user doesn't exist at all
  if (!existingUser || !existingUser.email) {
    return { error: "¡El email no existe!" };
  }

  // If user exists but hasn't verified their email
  if (!existingUser.emailVerified) {
    return {
      error: "Por favor verifica tu email primero",
      redirectTo: `/auth/verify-email?email=${encodeURIComponent(email)}`,
      showResendLink: true,
      email: email,
    };
  }

  // If user exists but hasn't set password (invited user)
  if (!existingUser.password) {
    return {
      error: "Por favor establece tu contraseña primero",
      redirectTo: `/auth/create-pass?email=${encodeURIComponent(email)}`,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "¡Credenciales inválidas!" };
        default:
          return { error: "¡Algo salió mal!" };
      }
    }

    throw error;
  }
};

"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  role: UserRole,
  callbackUrl?: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Campos inválidos" };
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Correo electrónico en uso." };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Generate verification token
  const { token, expires } = await generateVerificationToken(email, newUser.id);

  // Save the token to database
  await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
      userId: newUser.id,
    },
  });

  // Send verification email
  const emailResult = await sendVerificationEmail(email, token, name);

  // Build verification redirect URL with callbackUrl if provided
  const verifyUrl = callbackUrl
    ? `/auth/verify-email?email=${encodeURIComponent(
        email
      )}&callbackUrl=${encodeURIComponent(callbackUrl)}`
    : `/auth/verify-email?email=${encodeURIComponent(email)}`;

  if (!emailResult.success) {
    // If email fails, we should still allow the user to proceed but show a warning
    return {
      success:
        "¡Cuenta creada! Por favor revisa tu email para el código de verificación. Si no lo recibes, usa la opción de reenvío.",
      data: newUser.id,
      redirectTo: verifyUrl,
    };
  }

  //   revalidatePath("/admin");

  return {
    success:
      "¡Cuenta creada exitosamente! Por favor revisa tu email para el código de verificación.",
    data: newUser.id,
    redirectTo: verifyUrl,
  };
};

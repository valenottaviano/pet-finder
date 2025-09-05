"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { ChangeEmailSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateEmailChangeToken } from "@/lib/tokens";
import { sendEmailChangeVerification } from "@/lib/email-change-mail";
import {
  getEmailChangeTokenByUserId,
  deleteEmailChangeToken,
} from "@/data/email-change-token";
import { db } from "@/lib/db";

export const requestEmailChange = async (
  values: z.infer<typeof ChangeEmailSchema>
) => {
  const validatedFields = ChangeEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "¡Campos inválidos!" };
  }

  const { newEmail, currentPassword } = validatedFields.data;

  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  // Check if the new email is the same as current
  if (user.email === newEmail) {
    return { error: "El nuevo email debe ser diferente al actual" };
  }

  // Check if new email is already in use
  const existingUser = await getUserByEmail(newEmail);
  if (existingUser) {
    return { error: "Este email ya está en uso" };
  }

  // For users with password, verify current password
  if (user.password) {
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return { error: "Contraseña actual incorrecta" };
    }
  }

  // Delete any existing email change token
  const existingToken = await getEmailChangeTokenByUserId(user.id);
  if (existingToken) {
    await deleteEmailChangeToken(existingToken.id);
  }

  // Generate new token
  const { token, expires } = await generateEmailChangeToken(
    user.email!,
    newEmail,
    user.id
  );

  // Save token to database
  await db.emailChangeToken.create({
    data: {
      currentEmail: user.email!,
      newEmail,
      token,
      expires,
      userId: user.id,
    },
  });

  // Send verification email to new email address
  await sendEmailChangeVerification(newEmail, token, user.name || undefined);

  return {
    success: `Código de verificación enviado a ${newEmail}. Revisa tu bandeja de entrada.`,
  };
};

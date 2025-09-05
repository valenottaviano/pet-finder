"use server";

import * as z from "zod";
import { VerifyNewEmailSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import {
  getEmailChangeTokenByToken,
  deleteEmailChangeToken,
} from "@/data/email-change-token";
import { db } from "@/lib/db";

export const verifyEmailChange = async (
  values: z.infer<typeof VerifyNewEmailSchema>
) => {
  const validatedFields = VerifyNewEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "¡Campos inválidos!" };
  }

  const { newEmail, token } = validatedFields.data;

  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const existingToken = await getEmailChangeTokenByToken(token);
  if (!existingToken) {
    return { error: "¡Token inválido!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "¡El token ha expirado!" };
  }

  // Verify the token belongs to the current user and new email matches
  if (
    existingToken.userId !== session.user.id ||
    existingToken.newEmail !== newEmail
  ) {
    return { error: "¡Token inválido!" };
  }

  // Check if the new email is still available
  const existingUser = await getUserByEmail(newEmail);
  if (existingUser && existingUser.id !== session.user.id) {
    return { error: "Este email ya está en uso por otra cuenta" };
  }

  // Update user email
  await db.user.update({
    where: { id: session.user.id },
    data: {
      email: newEmail,
      emailVerified: new Date(), // Mark as verified since they confirmed via email
    },
  });

  // Delete the token
  await deleteEmailChangeToken(existingToken.id);

  // Return success with logout flag so client can handle signOut
  return {
    success: "¡Email actualizado exitosamente!",
    shouldLogout: true,
  };
};

"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import {
  getPasswordResetTokenByEmail,
  deletePasswordResetToken,
} from "@/data/password-reset-token";
import { db } from "@/lib/db";

// Rate limiting: track reset attempts per email
const resetAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 3; // Max 3 attempts per 15 minutes

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "¡Email inválido!" };
  }

  const { email } = validatedFields.data;

  // Rate limiting check
  const now = Date.now();
  const attempts = resetAttempts.get(email);

  if (attempts) {
    // Reset counter if window has passed
    if (now - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
      resetAttempts.delete(email);
    } else if (attempts.count >= MAX_ATTEMPTS) {
      return {
        error: "Demasiados intentos. Intenta nuevamente en 15 minutos.",
      };
    }
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    // Still update rate limiting even for non-existent emails to prevent enumeration
    const currentAttempts = resetAttempts.get(email) || {
      count: 0,
      lastAttempt: 0,
    };
    resetAttempts.set(email, {
      count: currentAttempts.count + 1,
      lastAttempt: now,
    });

    return { error: "¡Email no encontrado!" };
  }

  // Update rate limiting
  const currentAttempts = resetAttempts.get(email) || {
    count: 0,
    lastAttempt: 0,
  };
  resetAttempts.set(email, {
    count: currentAttempts.count + 1,
    lastAttempt: now,
  });

  // Check for existing token and delete it
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await deletePasswordResetToken(existingToken.id);
  }

  // Generate new token
  const { token, expires } = await generatePasswordResetToken(
    email,
    existingUser.id
  );

  // Save token to database
  await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
      userId: existingUser.id,
    },
  });

  // Send email
  await sendPasswordResetEmail(email, token, existingUser.name || undefined);

  return { success: "¡Email de recuperación enviado!" };
};

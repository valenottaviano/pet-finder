"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const verifyEmail = async (
  email: string,
  token: string,
  callbackUrl?: string
) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "¡Código de verificación inválido o expirado!" };
  }

  if (existingToken.email !== email) {
    return { error: "¡Código de verificación inválido!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "¡El código de verificación ha expirado!" };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "¡Usuario no encontrado!" };
  }

  if (user.emailVerified) {
    return { error: "¡El email ya está verificado!" };
  }

  // Update user's emailVerified field
  await db.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  // Delete the verification token
  await deleteVerificationToken(existingToken.id);

  // Use callbackUrl if provided, otherwise default to login
  const redirectTo = callbackUrl
    ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/auth/login";

  return {
    success: "¡Email verificado exitosamente!",
    redirectTo,
  };
};

export const resendVerificationCode = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "¡Usuario no encontrado!" };
  }

  if (user.emailVerified) {
    return { error: "¡El email ya está verificado!" };
  }

  // Check for existing recent tokens (rate limiting)
  const recentToken = await db.verificationToken.findFirst({
    where: {
      userId: user.id,
      createdAt: {
        gt: new Date(new Date().getTime() - 15 * 60 * 1000), // 15 minutes ago
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (recentToken) {
    const timeLeft = Math.ceil(
      (recentToken.createdAt.getTime() +
        15 * 60 * 1000 -
        new Date().getTime()) /
        60000
    );
    return {
      error: `Por favor espera ${timeLeft} minutos más antes de solicitar un nuevo código.`,
    };
  }

  // Delete any existing verification tokens for this user
  await db.verificationToken.deleteMany({
    where: { userId: user.id },
  });

  // Generate a new verification token
  const { token, expires } = await generateVerificationToken(email, user.id);

  // Save the token to database
  await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
      userId: user.id,
    },
  });

  // Send verification email
  const emailResult = await sendVerificationEmail(
    email,
    token,
    user.name || undefined
  );

  if (!emailResult.success) {
    return {
      error:
        "Error al enviar el email de verificación. Por favor intenta de nuevo.",
    };
  }

  return {
    success: "¡Código de verificación enviado a tu email!",
  };
};

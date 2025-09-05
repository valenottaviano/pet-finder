"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";

export const verifyEmail = async (email: string, token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid or expired verification code!" };
  }

  if (existingToken.email !== email) {
    return { error: "Invalid verification code!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Verification code has expired!" };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found!" };
  }

  if (user.emailVerified) {
    return { error: "Email is already verified!" };
  }

  // Update user's emailVerified field
  await db.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  // Delete the verification token
  await deleteVerificationToken(existingToken.id);

  return {
    success: "Email verified successfully!",
    redirectTo: "/auth/login",
  };
};

export const resendVerificationCode = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found!" };
  }

  if (user.emailVerified) {
    return { error: "Email is already verified!" };
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
      error: `Please wait ${timeLeft} more minutes before requesting a new code.`,
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

  // For now, we return the token directly (later you'll send it via email)
  return {
    success: `Verification code sent! Use this code: ${token}`,
  };
};

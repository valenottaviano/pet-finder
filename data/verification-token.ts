import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
        expires: {
          gt: new Date(), // Only get non-expired tokens
        },
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const deleteVerificationToken = async (id: string) => {
  try {
    await db.verificationToken.delete({
      where: { id },
    });
  } catch {
    return null;
  }
};

export const deleteExpiredTokens = async () => {
  try {
    await db.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    });
  } catch {
    return null;
  }
};

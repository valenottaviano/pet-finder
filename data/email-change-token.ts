import { db } from "@/lib/db";

export const getEmailChangeTokenByToken = async (token: string) => {
  try {
    const emailChangeToken = await db.emailChangeToken.findUnique({
      where: { token },
    });
    return emailChangeToken;
  } catch {
    return null;
  }
};

export const getEmailChangeTokenByUserId = async (userId: string) => {
  try {
    const emailChangeToken = await db.emailChangeToken.findFirst({
      where: { userId },
    });
    return emailChangeToken;
  } catch {
    return null;
  }
};

export const deleteEmailChangeToken = async (id: string) => {
  try {
    await db.emailChangeToken.delete({
      where: { id },
    });
  } catch {
    return null;
  }
};

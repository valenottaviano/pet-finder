import crypto from "crypto";

export const generateVerificationToken = async (
  email: string,
  userId: string
) => {
  const token = crypto.randomInt(100000, 999999).toString(); // 6-digit code
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

  return { token, expires, email, userId };
};

export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generatePasswordResetToken = async (
  email: string,
  userId: string
) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

  return { token, expires, email, userId };
};

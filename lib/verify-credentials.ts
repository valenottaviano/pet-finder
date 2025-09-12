"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export async function verifyCredentials(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    if (!user || !user.password) return null;

    // Check if email is verified
    if (!user.emailVerified) return null;

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        emailVerified: user.emailVerified,
      };
    }
  } catch (error) {
    console.error("Error verifying credentials:", error);
  }

  return null;
}

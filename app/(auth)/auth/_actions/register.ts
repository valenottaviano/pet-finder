"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  role: UserRole
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };
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

  //   revalidatePath("/admin");

  return {
    success: `Usuario creado exitosamente! Por favor verifica tu email con el código: ${token}`,
    data: newUser.id,
    redirectTo: `/auth/verify-email?email=${encodeURIComponent(email)}`,
  };
};

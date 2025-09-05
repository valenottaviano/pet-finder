"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

  //   revalidatePath("/admin");

  return {
    success: "Usuario creado exitosamente!",
    data: newUser.id,
    redirectTo: "/auth/login",
  };
};

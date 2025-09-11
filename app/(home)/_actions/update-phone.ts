"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { ChangePhoneSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const updatePhone = async (
  values: z.infer<typeof ChangePhoneSchema>
) => {
  const validatedFields = ChangePhoneSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "¡Campos inválidos!" };
  }

  const { phone, currentPassword } = validatedFields.data;

  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  // For users with password, verify current password
  if (user.password) {
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return { error: "Contraseña actual incorrecta" };
    }
  }

  // Check if the new phone is the same as current
  if (user.phone === phone) {
    return { error: "El nuevo teléfono debe ser diferente al actual" };
  }

  try {
    // Update user's phone number
    await db.user.update({
      where: { id: user.id },
      data: { phone: phone || null },
    });

    return {
      success: phone
        ? "Teléfono actualizado exitosamente"
        : "Teléfono eliminado exitosamente",
    };
  } catch (error) {
    console.error("Error updating phone:", error);
    return { error: "Error al actualizar el teléfono" };
  }
};

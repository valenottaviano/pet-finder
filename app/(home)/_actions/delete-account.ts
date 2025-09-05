"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleteAccount = async (confirmPassword: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    // For OAuth users (no password), we'll allow deletion without password verification
    if (user.password) {
      const bcrypt = await import("bcryptjs");
      const isPasswordValid = await bcrypt.compare(
        confirmPassword,
        user.password
      );

      if (!isPasswordValid) {
        return { error: "Contraseña incorrecta" };
      }
    }

    // Delete all related data first
    await db.verificationToken.deleteMany({
      where: { userId: user.id },
    });

    await db.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    await db.account.deleteMany({
      where: { userId: user.id },
    });

    // Finally delete the user
    await db.user.delete({
      where: { id: user.id },
    });

    // Don't sign out here - let the client handle it
    // The client will redirect to login after successful deletion
    return { success: "Cuenta eliminada exitosamente" };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { error: "Error al eliminar la cuenta" };
  }
};

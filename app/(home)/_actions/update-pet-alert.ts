"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { UpdatePetAlertSchema } from "@/schemas";
import * as z from "zod";

export const updatePetAlert = async (
  values: z.infer<typeof UpdatePetAlertSchema>
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const validatedFields = UpdatePetAlertSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error);
    return { error: "Campos inválidos!" };
  }

  const { alertId, status, description, latitude, longitude } =
    validatedFields.data;

  try {
    // Verificar que la alerta existe y la mascota pertenece al usuario
    const alert = await db.petAlertPost.findFirst({
      where: {
        id: alertId,
        pet: {
          userId: session.user.id,
        },
      },
    });

    if (!alert) {
      return { error: "Alerta no encontrada" };
    }

    // Actualizar la alerta
    await db.petAlertPost.update({
      where: {
        id: alertId,
      },
      data: {
        status,
        description,
        latitude,
        longitude,
      },
    });

    return { success: "Alerta actualizada exitosamente!" };
  } catch (error) {
    console.error("Error updating pet alert:", error);
    return { error: "Error al actualizar la alerta" };
  }
};

export const deletePetAlert = async (alertId: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  try {
    // Verificar que la alerta existe y la mascota pertenece al usuario
    const alert = await db.petAlertPost.findFirst({
      where: {
        id: alertId,
        pet: {
          userId: session.user.id,
        },
      },
    });

    if (!alert) {
      return { error: "Alerta no encontrada" };
    }

    // Eliminar la alerta
    await db.petAlertPost.delete({
      where: {
        id: alertId,
      },
    });

    return { success: "Alerta eliminada exitosamente!" };
  } catch (error) {
    console.error("Error deleting pet alert:", error);
    return { error: "Error al eliminar la alerta" };
  }
};

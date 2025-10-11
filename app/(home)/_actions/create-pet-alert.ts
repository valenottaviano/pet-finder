"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreatePetAlertSchema } from "@/schemas";
import * as z from "zod";

export const createPetAlert = async (
  values: z.infer<typeof CreatePetAlertSchema>
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const validatedFields = CreatePetAlertSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error);
    return { error: "Campos inválidos!" };
  }

  const { petId, status, description, latitude, longitude } =
    validatedFields.data;

  try {
    // Verificar que la mascota pertenece al usuario
    const pet = await db.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
    });

    if (!pet) {
      return { error: "Mascota no encontrada" };
    }

    // Crear la alerta
    const alert = await db.petAlertPost.create({
      data: {
        petId,
        status,
        description,
        latitude,
        longitude,
      },
    });

    return { success: "Alerta creada exitosamente!", alertId: alert.id };
  } catch (error) {
    console.error("Error creating pet alert:", error);
    return { error: "Error al crear la alerta" };
  }
};

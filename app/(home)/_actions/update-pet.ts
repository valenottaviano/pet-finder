"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreatePetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updatePet = async (
  petId: string,
  values: z.infer<typeof CreatePetSchema>
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const validatedFields = CreatePetSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error);
    return { error: "Campos inválidos!" };
  }

  const {
    name,
    type,
    sex,
    birthDate,
    breed,
    size,
    hairType,
    hairPattern,
    color,
    images,
  } = validatedFields.data;

  try {
    // First, verify that the pet belongs to the current user
    const existingPet = await db.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
    });

    if (!existingPet) {
      return { error: "Mascota no encontrada o no autorizada" };
    }

    // Update the pet
    const updatedPet = await db.pet.update({
      where: {
        id: petId,
      },
      data: {
        name,
        type,
        sex,
        birthDate: birthDate ? new Date(birthDate) : null,
        breed,
        size,
        hairType,
        hairPattern,
        color,
      },
    });

    // Handle images update
    if (images && images.length > 0) {
      // Delete existing photos
      await db.petPhoto.deleteMany({
        where: {
          petId: petId,
        },
      });

      // Create new photos
      await db.petPhoto.createMany({
        data: images.map((image, index) => ({
          url: image.url,
          publicId: image.key,
          isPrimary: index === 0,
          petId: petId,
        })),
      });
    }

    revalidatePath("/home");
    revalidatePath(`/pet/${petId}`);
    revalidatePath(`/p/${petId}`);

    return { success: "Mascota actualizada exitosamente!" };
  } catch (error) {
    console.error("Error updating pet:", error);
    return { error: "Error al actualizar la mascota" };
  }
};

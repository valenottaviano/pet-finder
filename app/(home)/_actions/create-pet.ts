"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreatePetSchema } from "@/schemas";
import { redirect } from "next/navigation";
import * as z from "zod";

export const createPet = async (values: z.infer<typeof CreatePetSchema>) => {
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

  console.log("Creating pet with data:", {
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
  });

  try {
    const pet = await db.pet.create({
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
        userId: session.user.id,
        photos:
          images && images.length > 0
            ? {
                create: images.map((image, index) => ({
                  url: image.url,
                  publicId: image.key,
                  isPrimary: index === 0, // First image is primary
                })),
              }
            : undefined,
      },
    });

    return { success: "Mascota creada exitosamente!" };
  } catch (error) {
    console.error("Error creating pet:", error);
    return { error: "Error al crear la mascota" };
  }
};

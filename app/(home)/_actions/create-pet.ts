"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreatePetSchema } from "@/schemas";
import { generateUniquePetCode } from "@/lib/pet-codes";
import { redirect } from "next/navigation";
import * as z from "zod";

export const createPet = async (values: z.infer<typeof CreatePetSchema>) => {
  const session = await auth();

  console.log("Session data:", {
    session: session,
    user: session?.user,
    userId: session?.user?.id,
  });

  if (!session?.user?.id) {
    console.error("No user session found");
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

  // Verificar si el usuario existe en la base de datos
  const userExists = await db.user.findUnique({
    where: { id: session.user.id },
  });

  console.log("User exists in database:", {
    userId: session.user.id,
    userExists: !!userExists,
    userEmail: userExists?.email,
  });

  if (!userExists) {
    console.error("User not found in database with ID:", session.user.id);
    return { error: "Usuario no encontrado" };
  }

  try {
    // Generate unique pet code with retry logic
    let petId: string;
    let retries = 0;
    const maxRetries = 3;

    do {
      petId = await generateUniquePetCode();
      retries++;

      // Double-check that the code is still available (race condition protection)
      const codeStillAvailable = await db.pet.findUnique({
        where: { id: petId },
        select: { id: true },
      });

      if (!codeStillAvailable) {
        console.log(`Pet code ${petId} confirmed as available`);
        break;
      }

      if (retries >= maxRetries) {
        console.error(
          `Failed to generate unique pet code after ${maxRetries} retries`
        );
        return {
          error:
            "Error generando código único para la mascota. Intenta nuevamente.",
        };
      }

      console.warn(
        `Pet code ${petId} was taken between generation and verification, retrying...`
      );
    } while (retries < maxRetries);

    console.log(`Creating pet with ID: ${petId}`);

    const pet = await db.pet.create({
      data: {
        id: petId, // Use our generated code
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

    console.log("Pet created successfully with ID:", petId);
    return {
      success: "Mascota creada exitosamente!",
      petId: petId, // Return the generated pet ID
    };
  } catch (error) {
    console.error("Error creating pet:", error);

    // Check if it's a unique constraint violation
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      console.error("Unique constraint violation - pet code already exists");
      return { error: "Error generando código único. Intenta nuevamente." };
    }

    return { error: "Error al crear la mascota" };
  }
};

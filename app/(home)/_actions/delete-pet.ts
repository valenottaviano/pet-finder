"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deletePet = async (petId: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

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

    // Delete the pet (this will cascade delete photos due to the schema)
    await db.pet.delete({
      where: {
        id: petId,
      },
    });

    revalidatePath("/home");

    return { success: "Mascota eliminada exitosamente!" };
  } catch (error) {
    console.error("Error deleting pet:", error);
    return { error: "Error al eliminar la mascota" };
  }
};

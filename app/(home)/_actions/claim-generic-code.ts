"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { isValidPetCode } from "@/lib/pet-codes";

/**
 * Claims a generic QR code for the current user
 * Marks the code as claimed and associates it with the user
 */
export async function claimGenericCode(code: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado. Debes iniciar sesión." };
  }

  // Validate code format
  if (!isValidPetCode(code)) {
    return { error: "Código inválido" };
  }

  try {
    // Check if code exists and is unclaimed
    const genericCode = await db.genericQRCode.findUnique({
      where: { id: code },
    });

    if (!genericCode) {
      return { error: "Código no encontrado" };
    }

    if (genericCode.claimed) {
      return {
        error: "Este código ya fue reclamado por otro usuario",
      };
    }

    // Check if a pet with this code already exists (shouldn't happen but safety check)
    const existingPet = await db.pet.findUnique({
      where: { id: code },
    });

    if (existingPet) {
      return {
        error: "Este código ya está asociado a una mascota",
      };
    }

    // Mark code as claimed in a transaction
    await db.genericQRCode.update({
      where: { id: code },
      data: {
        claimed: true,
        claimedAt: new Date(),
        claimedByUserId: session.user.id,
      },
    });

    return {
      success: "Código reclamado exitosamente",
      code,
    };
  } catch (error) {
    console.error("Error claiming generic code:", error);
    return {
      error: "Error al reclamar el código. Intenta nuevamente.",
    };
  }
}

/**
 * Checks if a code is a valid generic QR code that can be claimed
 */
export async function checkGenericCodeAvailability(code: string) {
  if (!isValidPetCode(code)) {
    return { available: false, reason: "invalid" };
  }

  try {
    // Check generic code
    const genericCode = await db.genericQRCode.findUnique({
      where: { id: code },
    });

    if (!genericCode) {
      return { available: false, reason: "not_found" };
    }

    if (genericCode.claimed) {
      return { available: false, reason: "already_claimed" };
    }

    // Check if pet exists
    const existingPet = await db.pet.findUnique({
      where: { id: code },
    });

    if (existingPet) {
      return { available: false, reason: "has_pet" };
    }

    return { available: true };
  } catch (error) {
    console.error("Error checking generic code availability:", error);
    return { available: false, reason: "error" };
  }
}

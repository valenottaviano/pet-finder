"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface CreateScanEventParams {
  petId: string;
  latitude: number;
  longitude: number;
  userAgent?: string;
  ipAddress?: string;
}

/**
 * Creates a new scan event for a pet
 */
export async function createScanEvent({
  petId,
  latitude,
  longitude,
  userAgent,
  ipAddress,
}: CreateScanEventParams) {
  try {
    // Validate coordinates
    if (!latitude || !longitude) {
      return { error: "Coordenadas requeridas" };
    }

    if (latitude < -90 || latitude > 90) {
      return { error: "Latitud inválida" };
    }

    if (longitude < -180 || longitude > 180) {
      return { error: "Longitud inválida" };
    }

    // Check if pet exists
    const pet = await db.pet.findUnique({
      where: { id: petId },
      select: { id: true, name: true },
    });

    if (!pet) {
      return { error: "Mascota no encontrada" };
    }

    // Create scan event
    const scanEvent = await db.scanEvent.create({
      data: {
        petId,
        latitude,
        longitude,
        userAgent: userAgent?.slice(0, 500), // Limit length
        ipAddress: ipAddress?.slice(0, 45), // IPv6 max length
      },
    });

    console.log(`Scan event created for pet ${pet.name} (${petId}):`, {
      id: scanEvent.id,
      coordinates: `${latitude}, ${longitude}`,
      timestamp: scanEvent.createdAt,
    });

    return { success: "Escaneo registrado correctamente", scanEvent };
  } catch (error) {
    console.error("Error creating scan event:", error);
    return { error: "Error al registrar el escaneo" };
  }
}

/**
 * Gets scan events for a pet (only if user owns the pet)
 */
export async function getPetScanEvents(petId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    // Verify user owns the pet
    const pet = await db.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
      select: { id: true, name: true },
    });

    if (!pet) {
      return { error: "Mascota no encontrada o no autorizada" };
    }

    // Get scan events
    const scanEvents = await db.scanEvent.findMany({
      where: { petId },
      orderBy: { createdAt: "desc" },
      take: 100, // Limit to last 100 scans
    });

    return { success: true, scanEvents, pet };
  } catch (error) {
    console.error("Error getting scan events:", error);
    return { error: "Error al obtener los escaneos" };
  }
}

/**
 * Gets scan statistics for a pet
 */
export async function getPetScanStats(petId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    // Verify user owns the pet
    const pet = await db.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
      select: { id: true, name: true },
    });

    if (!pet) {
      return { error: "Mascota no encontrada o no autorizada" };
    }

    // Get statistics
    const [totalScans, scansToday, scansThisWeek, scansThisMonth] =
      await Promise.all([
        // Total scans
        db.scanEvent.count({
          where: { petId },
        }),

        // Scans today
        db.scanEvent.count({
          where: {
            petId,
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),

        // Scans this week
        db.scanEvent.count({
          where: {
            petId,
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }),

        // Scans this month
        db.scanEvent.count({
          where: {
            petId,
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

    // Get latest scan
    const latestScan = await db.scanEvent.findFirst({
      where: { petId },
      orderBy: { createdAt: "desc" },
    });

    const stats = {
      totalScans,
      scansToday,
      scansThisWeek,
      scansThisMonth,
      latestScan,
    };

    return { success: true, stats, pet };
  } catch (error) {
    console.error("Error getting scan stats:", error);
    return { error: "Error al obtener las estadísticas" };
  }
}

"use server";

import { db } from "@/lib/db";

export const getPetScanEvents = async (petId: string) => {
  try {
    const scanEvents = await db.scanEvent.findMany({
      where: {
        petId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        userAgent: true,
        ipAddress: true,
        createdAt: true,
      },
    });

    return scanEvents;
  } catch (error) {
    console.error("Error fetching scan events:", error);
    return [];
  }
};

export const getPetScanStats = async (petId: string) => {
  try {
    const totalScans = await db.scanEvent.count({
      where: { petId },
    });

    const scansToday = await db.scanEvent.count({
      where: {
        petId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    const scansThisWeek = await db.scanEvent.count({
      where: {
        petId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    const lastScan = await db.scanEvent.findFirst({
      where: { petId },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    return {
      totalScans,
      scansToday,
      scansThisWeek,
      lastScan: lastScan?.createdAt,
    };
  } catch (error) {
    console.error("Error fetching scan stats:", error);
    return {
      totalScans: 0,
      scansToday: 0,
      scansThisWeek: 0,
      lastScan: null,
    };
  }
};

import { db } from "@/lib/db";

export const getPetAlerts = async (petId: string) => {
  try {
    const alerts = await db.petAlertPost.findMany({
      where: {
        petId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return alerts;
  } catch (error) {
    console.error("Error fetching pet alerts:", error);
    return [];
  }
};

export const getPetAlertById = async (alertId: string) => {
  try {
    const alert = await db.petAlertPost.findUnique({
      where: {
        id: alertId,
      },
      include: {
        pet: true,
      },
    });

    return alert;
  } catch (error) {
    console.error("Error fetching alert:", error);
    return null;
  }
};

export const getAllLostPetAlerts = async () => {
  try {
    const alerts = await db.petAlertPost.findMany({
      where: {
        status: "LOST",
      },
      include: {
        pet: {
          include: {
            photos: {
              where: {
                isPrimary: true,
              },
              take: 1,
            },
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return alerts;
  } catch (error) {
    console.error("Error fetching all lost pet alerts:", error);
    return [];
  }
};

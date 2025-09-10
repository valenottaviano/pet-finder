import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getUserPets = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const pets = await db.pet.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        photos: {
          orderBy: {
            isPrimary: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return pets;
  } catch (error) {
    console.error("Error fetching user pets:", error);
    return [];
  }
};

export const getPetById = async (petId: string) => {
  try {
    const pet = await db.pet.findUnique({
      where: {
        id: petId,
      },
      include: {
        photos: {
          orderBy: {
            isPrimary: "desc", // Primary photo first
          },
        },
        user: {
          select: {
            name: true,
            email: true, // We might want to show owner contact for lost pets
          },
        },
      },
    });

    return pet;
  } catch (error) {
    console.error("Error fetching pet:", error);
    return null;
  }
};

export const getAllPets = async () => {
  try {
    const pets = await db.pet.findMany({
      include: {
        photos: {
          where: {
            isPrimary: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return pets;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [];
  }
};

export const getUserPetById = async (petId: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  try {
    const pet = await db.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
      include: {
        photos: {
          orderBy: {
            isPrimary: "desc",
          },
        },
      },
    });

    return pet;
  } catch (error) {
    console.error("Error fetching user pet:", error);
    return null;
  }
};

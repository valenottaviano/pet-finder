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

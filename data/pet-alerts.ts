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

export const getForumPosts = async () => {
  try {
    const posts = await db.petAlertPost.findMany({
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
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    return [];
  }
};

export const getPostWithComments = async (postId: string) => {
  try {
    const post = await db.petAlertPost.findUnique({
      where: {
        id: postId,
      },
      include: {
        pet: {
          include: {
            photos: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error("Error fetching post with comments:", error);
    return null;
  }
};

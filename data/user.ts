import { db } from "@/lib/db";

/**
 * Retrieves a user from the database based on their email.
 * @param email - The email of the user.
 * @returns A promise that resolves to the user object if found, or null if not found.
 * @throws An error if the email is not provided.
 */
export const getUserByEmail = async (email: string) => {
  if (!email) throw new Error("Email is required");
  return await db.user.findUnique({
    where: { email },
  });
};

/**
 * Retrieves a user from the database based on their ID.
 * @param id - The ID of the user.
 * @returns A promise that resolves to the user object if found, or null if not found.
 * @throws An error if the ID is not provided.
 */
export const getUserById = async (id: any) => {
  if (!id) throw new Error("ID is required");
  return db.user.findUnique({
    where: { id },
  });
};

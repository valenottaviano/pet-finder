"use server";

import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export const checkUserHasPassword = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return { hasPassword: false };
  }

  const user = await getUserById(session.user.id);

  return { hasPassword: !!user?.password };
};

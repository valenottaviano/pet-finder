"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(500, "El comentario es muy largo"),
});

export async function addComment(postId: string, content: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Debes iniciar sesión para comentar" };
    }

    // Validar el contenido
    const validation = commentSchema.safeParse({ content });
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    // Verificar que el post existe
    const post = await db.petAlertPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return { error: "El post no existe" };
    }

    // Crear el comentario
    await db.comment.create({
      data: {
        content,
        postId,
        authorId: session.user.id,
      },
    });

    revalidatePath(`/forum/${postId}`);
    revalidatePath("/forum");

    return { success: true };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { error: "Error interno del servidor" };
  }
}

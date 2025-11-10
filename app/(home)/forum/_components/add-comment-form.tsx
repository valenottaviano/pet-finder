"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addComment } from "@/app/(home)/forum/_actions/add-comment";
import { useSession } from "next-auth/react";
import { MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(500, "El comentario es muy largo"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface AddCommentFormProps {
  postId: string;
}

export function AddCommentForm({ postId }: AddCommentFormProps) {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: CommentFormValues) => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        const result = await addComment(postId, data.content);

        if (result.error) {
          setError(result.error);
        } else {
          setSuccess(true);
          form.reset();
          // El revalidatePath en el server action debería actualizar la página
        }
      } catch (error) {
        setError("Error inesperado al agregar el comentario");
      }
    });
  };

  if (status === "loading") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Cargando...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              Debes iniciar sesión para comentar
            </p>
            <Button asChild>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Agregar Comentario</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu comentario</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe tu comentario aquí..."
                      className="min-h-[100px]"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600 bg-green-100 p-3 rounded-md">
                ¡Comentario agregado exitosamente!
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  "Publicar comentario"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

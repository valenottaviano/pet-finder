import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPostWithComments } from "@/data/pet-alerts";
import { AddCommentForm } from "@/app/(home)/forum/_components/add-comment-form";
import { MapPin, Clock, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ForumPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostWithComments(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/forum">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al foro
            </Link>
          </Button>
        </div>

        {/* Post principal */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant={post.status === "LOST" ? "destructive" : "default"}
                >
                  {post.status === "LOST" ? "Perdido" : "Encontrado"}
                </Badge>
                <Badge variant="outline">{post.pet.type}</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </div>
            </div>
            <CardTitle className="text-2xl">
              {post.status === "LOST" ? "Se perdió" : "Se encontró"}:{" "}
              {post.pet.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {post.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Descripción:</h3>
                    <p className="text-muted-foreground">{post.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Detalles de la mascota:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>Tipo: {post.pet.type}</li>
                      {post.pet.breed && <li>Raza: {post.pet.breed}</li>}
                      {post.pet.size && (
                        <li>Tamaño: {post.pet.size.toLowerCase()}</li>
                      )}
                      {post.pet.sex && (
                        <li>Sexo: {post.pet.sex.toLowerCase()}</li>
                      )}
                      {post.pet.color && <li>Color: {post.pet.color}</li>}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Contacto:</h4>
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      <p>{post.pet.user.name || "Usuario anónimo"}</p>
                      {post.pet.user.email && (
                        <p className="break-all">{post.pet.user.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {post.latitude && post.longitude && (
                  <div>
                    <h4 className="font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Ubicación:
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lat: {post.latitude.toFixed(6)}, Lng:{" "}
                      {post.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {post.pet.photos.map((photo, index) => (
                  <div key={photo.id} className="rounded-lg overflow-hidden">
                    <img
                      src={photo.url}
                      alt={`${post.pet.name} - foto ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección de comentarios */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <h2 className="text-xl font-semibold">
              Comentarios ({post.comments.length})
            </h2>
          </div>

          <Suspense fallback={<CommentSkeleton />}>
            <AddCommentForm postId={id} />
          </Suspense>

          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </div>
            ) : (
              post.comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.author.image || ""} />
                        <AvatarFallback>
                          {comment.author.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">
                            {comment.author.name || "Usuario anónimo"}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                              locale: es,
                            })}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-20 w-full" />
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

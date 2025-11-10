import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getForumPosts } from "@/data/pet-alerts";
import Link from "next/link";
import { MapPin, MessageSquare, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default async function ForumPage() {
  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Foro de Mascotas</h1>
          <p className="text-muted-foreground">
            Encuentra y comparte información sobre mascotas perdidas y
            encontradas
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <Button asChild>
            <Link href="/forum/new">Crear Alerta</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/home">Ir a Mis Mascotas</Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Todos
            </Button>
            <Button variant="outline" size="sm">
              Perdidos
            </Button>
            <Button variant="outline" size="sm">
              Encontrados
            </Button>
          </div>
        </div>

        <Suspense fallback={<ForumPostsSkeleton />}>
          <ForumPosts />
        </Suspense>
      </div>
    </div>
  );
}

async function ForumPosts() {
  const posts = await getForumPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No hay posts en el foro</h3>
        <p className="text-muted-foreground mb-4">
          Ve a "Mis Mascotas" para crear una alerta de mascota perdida o
          encontrada
        </p>
        <Button asChild>
          <Link href="/home">Ir a Mis Mascotas</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
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
            <CardTitle className="text-xl">
              {post.status === "LOST" ? "Se perdió" : "Se encontró"}:{" "}
              {post.pet.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                {post.description && (
                  <p className="text-muted-foreground mb-3">
                    {post.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>Raza: {post.pet.breed || "No especificada"}</span>
                  {post.pet.size && (
                    <span>• Tamaño: {post.pet.size.toLowerCase()}</span>
                  )}
                  {post.pet.color && <span>• Color: {post.pet.color}</span>}
                </div>
                {post.latitude && post.longitude && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Ubicación registrada</span>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                {post.pet.photos.length > 0 && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={post.pet.photos[0].url}
                      alt={post.pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Por: {post.pet.user.name || "Usuario anónimo"}</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post._count?.comments || 0} comentarios</span>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/forum/${post.id}`}>Ver detalles</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ForumPostsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="w-24 h-24 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

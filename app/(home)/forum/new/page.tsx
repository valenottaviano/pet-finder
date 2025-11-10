import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPets } from "@/data/pets";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateAlertForm } from "../_components/create-alert-form";

export default async function NewForumAlertPage() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  // Obtener las mascotas del usuario
  const pets = await getUserPets();

  if (pets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/forum">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al foro
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                No tienes mascotas registradas
              </CardTitle>
              <CardDescription className="text-center">
                Necesitas registrar al menos una mascota antes de poder crear
                una alerta
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Registra tu mascota primero y luego podrás crear alertas cuando
                sea necesario.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/forum">Volver al foro</Link>
                </Button>
                <Button asChild>
                  <Link href="/home/new">Registrar Mascota</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/home/forum">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al foro
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Crear Nueva Alerta
            </CardTitle>
            <CardDescription className="text-center">
              Crea una alerta de mascota perdida o encontrada para el foro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateAlertForm pets={pets} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

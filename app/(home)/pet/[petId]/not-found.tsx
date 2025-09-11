import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-gray-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Mascota no encontrada
              </h2>
              <p className="text-gray-600">
                La mascota que buscas no existe o no tienes permisos para
                editarla.
              </p>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/home">
                  <Home className="h-4 w-4 mr-2" />
                  Volver a Mis Mascotas
                </Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/new">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Crear Nueva Mascota
                </Link>
              </Button>

              <p className="text-xs text-gray-500">
                Solo puedes editar las mascotas que tú has registrado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

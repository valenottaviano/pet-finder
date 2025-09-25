import { getAllPets } from "@/data/pets";
import { PetCard } from "@/app/(home)/_components/pet-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";

export default async function PublicIndexPage() {
  const pets = await getAllPets();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Pet Finder</h1>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar Mascota
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Encuentra tu compañero perfecto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora los perfiles de mascotas en busca de hogar o ayuda a reunir
            mascotas perdidas con sus familias.
          </p>
        </div>

        {pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <Link key={pet.id} href={`/p/${pet.id}`}>
                <div className="transform transition-transform hover:scale-105">
                  <PetCard pet={pet} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay mascotas registradas aún
            </h3>
            <p className="text-gray-500 mb-6">
              Sé el primero en registrar tu mascota en Pet Finder
            </p>
            <Button asChild>
              <Link href="/auth/register">
                <Plus className="h-4 w-4 mr-2" />
                Registrar mi Mascota
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              &copy; 2025 Pet Finder. Conectando mascotas con sus familias.
            </p>
            <p className="text-sm">
              ¿Tienes una mascota perdida o en adopción?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline"
              >
                Regístrala aquí
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

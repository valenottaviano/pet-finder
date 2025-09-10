import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getUserPets } from "@/data/pets";
import { PetCard } from "../_components/pet-card";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (!session) redirect("/auth/login");

  const pets = await getUserPets();

  return (
    <main className="p-4 flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        <Link href="/home/profile" prefetch={false}>
          <Avatar className="cursor-pointer border-2 border-primary">
            {user?.image ? (
              <AvatarImage
                src={user.image}
                alt={user.name || user.email || "User"}
              />
            ) : (
              <AvatarFallback>
                {user?.name?.[0] || user?.email?.[0] || "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">¡Bienvenido a Pet Finder!</h1>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mis Mascotas</h2>
            <Link href="/new">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Crear Mascota
              </Button>
            </Link>
          </div>

          {pets.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-gray-500">
                Aún no has registrado ninguna mascota
              </div>
              <Link href="/new">
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Registrar mi primera mascota
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

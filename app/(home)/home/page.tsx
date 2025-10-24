import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Phone, AlertTriangle, Map } from "lucide-react";
import { getUserPets } from "@/data/pets";
import { getUserById } from "@/data/user";
import { getAllLostPetAlerts } from "@/data/pet-alerts";
import { PetCard, PetBubble } from "../_components/pet-card";
import { InteractiveScanMap } from "../_components/interactive-scan-map";
import { GlobalLostPetsMapWrapper } from "../_components/global-lost-pets-map-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) redirect("/auth/login");

  // Get full user data to check phone number
  const fullUserData = await getUserById(user.id!);
  const hasPhoneNumber = !!fullUserData?.phone;

  const pets = await getUserPets();

  // Get all lost pet alerts
  const lostPetAlerts = await getAllLostPetAlerts();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
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

            {/* Phone number warning */}
            {!hasPhoneNumber && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-medium">
                      Configurá tu número de teléfono para que otros usuarios puedan
                      contactarte por WhatsApp cuando encuentren a tu mascota.
                    </span>
                    <Link href="/home/profile">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Configurar teléfono
                      </Button>
                    </Link>
                  </div>
                </AlertDescription>
              </Alert>
            )}

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
                <>
                  {/* Mobile: burbujas scrollables */}
                  <div className="flex md:hidden overflow-x-auto py-2 -mx-2">
                    {pets.map((pet) => (
                      <PetBubble key={pet.id} pet={pet} />
                    ))}
                  </div>
                  {/* Desktop/tablet: scroll horizontal de tarjetas */}
                  <div className="hidden md:flex gap-4 overflow-x-auto py-2 -mx-2">
                    {pets.map((pet) => (
                      <div className="min-w-[320px] max-w-xs flex-shrink-0" key={pet.id}>
                        <PetCard pet={pet} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mapa Global de Mascotas Perdidas */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-red-600" />
                    <CardTitle>Mascotas Perdidas Cerca de Ti</CardTitle>
                  </div>
                  <CardDescription>
                    {lostPetAlerts.length > 0
                      ? `${lostPetAlerts.length} mascota${
                          lostPetAlerts.length !== 1 ? "s" : ""
                        } perdida${
                          lostPetAlerts.length !== 1 ? "s" : ""
                        } en tu zona. Haz clic en los marcadores para ver detalles y contactar al dueño.`
                      : "No hay mascotas perdidas reportadas en este momento."}
                  </CardDescription>
                </CardHeader>
                {lostPetAlerts.length > 0 && (
                  <CardContent>
                    <GlobalLostPetsMapWrapper alerts={lostPetAlerts} />
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Interactive Scan Map */}
            {pets.length > 0 && (
              <div className="mt-8">
                <InteractiveScanMap />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

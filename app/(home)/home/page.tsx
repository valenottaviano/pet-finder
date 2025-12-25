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

    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Hola, {user.name?.split(" ")[0] || "Usuario"}
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus mascotas y mantente alerta.
            </p>
         </div>
         
         <div className="hidden md:flex items-center gap-4">
             {/* Profile Avatar Trigger */}
             <Link href="/home/profile" prefetch={false}>
              <Avatar className="h-10 w-10 border border-border cursor-pointer transition-transform hover:scale-105">
                {user?.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name || user.email || "User"}
                  />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
         </div>
      </div>

      {/* Phone Number Warning */}
      {!hasPhoneNumber && (
        <Alert className="border-orange-200 bg-orange-50/50 dark:border-orange-900/50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-200 shadow-sm rounded-2xl">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="font-medium text-sm">
                Añade tu número para contacto directo en emergencias.
              </span>
              <Link href="/home/profile">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/50 border-orange-200 text-orange-700 hover:bg-white hover:text-orange-800 h-8 rounded-full text-xs font-semibold"
                >
                  <Phone className="h-3 w-3 mr-2" />
                  Configurar
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* My Pets Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Mis Mascotas</h2>
          <Link href="/new">
            <Button size="sm" className="rounded-full h-8 px-4 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Añadir
            </Button>
          </Link>
        </div>

        {pets.length === 0 ? (
          <Card className="border-dashed shadow-none bg-transparent">
             <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                   <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">No hay mascotas</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                  Registra a tu primera mascota para generar su código QR único.
                </p>
                <Link href="/new">
                  <Button variant="outline" size="sm">Registrar mascota</Button>
                </Link>
             </CardContent>
          </Card>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
             {pets.map((pet) => (
                <div className="min-w-[280px] sm:min-w-[320px] max-w-sm flex-shrink-0 transition-transform active:scale-[0.98] duration-200" key={pet.id}>
                  <PetCard pet={pet} />
                </div>
             ))}
          </div>
        )}
      </section>

      <div className="grid lg:grid-cols-1 gap-8">
         {/* <section>
            <div className="flex items-center gap-2 mb-4">
              <Map className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">Mascotas Perdidas</h2>
            </div>
             <Card className="overflow-hidden border shadow-sm rounded-3xl bg-card">
              <CardDescription className="px-6 pt-6 pb-2">
                  {lostPetAlerts.length > 0
                    ? `${lostPetAlerts.length} alertas activas en tu zona.`
                    : "No hay alertas activas en tu zona."}
              </CardDescription>
              {lostPetAlerts.length > 0 && (
                <div className="h-[400px] w-full">
                   <GlobalLostPetsMapWrapper alerts={lostPetAlerts} />
                </div>
              )}
             </Card>
         </section> */}
        
         {/* Scan History / Interactive Map */}
         {pets.length > 0 && (
           <section>
              <div className="flex items-center gap-2 mb-4">
                 <h2 className="text-xl font-semibold tracking-tight">Historial de Escaneos</h2>
              </div>
              <InteractiveScanMap />
           </section>
         )}
      </div>
    </div>
  );
}

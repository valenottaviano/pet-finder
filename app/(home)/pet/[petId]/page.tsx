import { getUserPetById } from "@/data/pets";
import { getPetAlerts } from "@/data/pet-alerts";
import { isValidPetCode } from "@/lib/pet-codes";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditPetForm } from "../../_components/edit-pet-form";
import { DeletePetButton } from "../../_components/delete-pet-button";
import { ArrowLeft, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CopyLinkButton } from "../../_components/copy-link-button";
import { QRCodeButton } from "../../_components/qr-code-button";
import { LostPetButton } from "../../_components/lost-pet-button";
import { PetScanEvents } from "../../_components/pet-scan-events";
import { PetAlertsList } from "../../_components/pet-alerts-list";

interface PageProps {
  params: Promise<{
    petId: string;
  }>;
}

const formatDate = (date: Date | null) => {
  if (!date) return "No especificada";
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const getPetTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    DOG: "Perro",
    CAT: "Gato",
    BIRD: "Pájaro",
    RABBIT: "Conejo",
    HAMSTER: "Hámster",
    FISH: "Pez",
    REPTILE: "Reptil",
    OTHER: "Otro",
  };
  return types[type] || type;
};

export default async function PetManagementPage({ params }: PageProps) {
  const { petId } = await params;

  // Validate pet code format - if it doesn't match, it's likely an old CUID
  if (!isValidPetCode(petId)) {
    notFound();
  }

  const pet = await getUserPetById(petId);

  if (!pet) {
    notFound();
  }

  // Obtener las alertas de la mascota
  const alerts = await getPetAlerts(petId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/home">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gestionar {pet.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{getPetTypeLabel(pet.type)}</Badge>
                  <span className="text-sm text-gray-500">
                    Registrado el {formatDate(pet.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/p/${pet.id}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Perfil Público
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Editar Información</CardTitle>
              </CardHeader>
              <CardContent>
                <EditPetForm pet={pet} />
              </CardContent>
            </Card>

            {/* Pet Alerts */}
            <PetAlertsList alerts={alerts} />

            {/* QR Scan Events */}
            <PetScanEvents petId={pet.id} petName={pet.name} />
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/p/${pet.id}`} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Perfil Público
                  </Link>
                </Button>

                <CopyLinkButton petId={pet.id} />

                <QRCodeButton petId={pet.id} petName={pet.name} />

                <LostPetButton petId={pet.id} petName={pet.name} />
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">
                  Zona de Peligro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Una vez que elimines esta mascota, no podrás recuperar su
                  información.
                </p>
                <DeletePetButton petId={pet.id} petName={pet.name} />
              </CardContent>
            </Card>

            {/* Pet Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fotos:</span>
                  <span className="font-medium">{pet.photos.length}/4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Creado:</span>
                  <span className="font-medium">
                    {formatDate(pet.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Actualizado:</span>
                  <span className="font-medium">
                    {formatDate(pet.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">URL Pública:</span>
                  <span className="font-medium text-xs break-all">
                    /p/{pet.id.slice(0, 8)}...
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getUserPetById } from "@/data/pets";
import { getPetAlerts } from "@/data/pet-alerts";
import { isValidPetCode } from "@/lib/pet-codes";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EditPetForm } from "../../_components/edit-pet-form";
import { DeletePetButton } from "../../_components/delete-pet-button";
import { ArrowLeft, ChevronRight, Eye, QrCode, Share2, AlertTriangle, ExternalLink, Siren } from "lucide-react";
import Link from "next/link";
import { CopyLinkButton } from "../../_components/copy-link-button";
import { QRCodeButton } from "../../_components/qr-code-button";
import { LostPetButton } from "../../_components/lost-pet-button";
import { PetScanEvents } from "../../_components/pet-scan-events";
import { PetAlertsList } from "../../_components/pet-alerts-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export default async function PetManagementPage({ params }: PageProps) {
  const { petId } = await params;

  if (!isValidPetCode(petId)) {
    notFound();
  }

  const pet = await getUserPetById(petId);

  if (!pet) {
    notFound();
  }

  const alerts = await getPetAlerts(petId);

  return (
    <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Settings-like Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Link href="/home" className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                 </Link>
                 <h1 className="text-xl font-semibold tracking-tight">Ajustes de Mascota</h1>
            </div>
            <Link href={`/p/${pet.id}`} target="_blank">
               <Button variant="ghost" size="sm" className="text-primary font-medium">
                  Ver Perfil
               </Button>
            </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Pet Identity (Avatar & Basic Stats) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="flex flex-col items-center p-8 bg-card rounded-3xl shadow-sm border border-border/50">
                    <Avatar className="h-32 w-32 shadow-xl mb-4 border-4 border-background">
                        {pet.photos.length > 0 ? (
                           <AvatarImage src={pet.photos[0].url} className="object-cover" />
                        ) : (
                           <AvatarFallback className="text-4xl bg-secondary">{pet.name[0]}</AvatarFallback>
                        )}
                    </Avatar>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">{pet.name}</h2>
                    <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">{pet.type === 'DOG' ? 'Perro' : pet.type}</p>
                    
                    <div className="mt-6 flex w-full gap-2">
                       <QRCodeButton petId={pet.id} petName={pet.name} />
                    </div>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                    <div className="p-4 border-b border-border/50">
                        <h3 className="font-semibold text-sm">Estado</h3>
                    </div>
                    <div className="p-4">
                       <LostPetButton petId={pet.id} petName={pet.name} />
                       <p className="text-xs text-muted-foreground mt-3 text-center px-4">
                          Activar esto notificará a la comunidad cercana.
                       </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Settings Groups */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Section: General Info (Form) */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground ml-4 mb-2 uppercase tracking-wider">Información</h3>
                    <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-6">
                        <EditPetForm pet={pet} />
                    </div>
                </section>

                {/* Section: Scan History */}
                <section>
                     <h3 className="text-sm font-medium text-muted-foreground ml-4 mb-2 uppercase tracking-wider">Actividad Recent</h3>
                     <PetScanEvents 
                        petId={pet.id} 
                        petName={pet.name} 
                        className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden"
                     />
                </section>

                 {/* Section: Danger Zone */}
                 <section>
                    <h3 className="text-sm font-medium text-destructive/80 ml-4 mb-2 uppercase tracking-wider">Zona de Peligro</h3>
                    <div className="bg-card rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 overflow-hidden">
                         <div className="p-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-destructive">Eliminar Mascota</h4>
                                <p className="text-xs text-muted-foreground">Esta acción es irreversible.</p>
                            </div>
                            <DeletePetButton petId={pet.id} petName={pet.name} className="w-auto" />
                         </div>
                    </div>
                 </section>

            </div>
        </div>
      </div>
    </div>
  );
}

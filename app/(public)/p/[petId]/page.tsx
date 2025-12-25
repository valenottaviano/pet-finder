import { getPetById } from "@/data/pets";
import { isValidPetCode, isGenericQRCode } from "@/lib/pet-codes";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Info, Mail, User, Phone, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { QRScanHandler } from "./qr-scan-handler";
import { GenericQRCodeClaim } from "./generic-qr-claim";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
  params: Promise<{
    petId: string;
  }>;
}

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { petId } = await params;
  const pet = await getPetById(petId);

  if (!pet) {
    return {
      title: "Mascota no encontrada - Pet Finder",
      description: "La mascota que buscas no existe.",
    };
  }

  const petType = getPetTypeLabel(pet.type);
  const description = `Conoce a ${pet.name}, un${
    pet.type === "DOG" ? "" : "a"
  } ${petType.toLowerCase()} ${pet.breed ? `de raza ${pet.breed}` : ""}. ${
    pet.color ? `Color: ${pet.color}.` : ""
  } Contacta con su dueño para más información.`;

  return {
    title: `${pet.name} - ${petType} en Pet Finder`,
    description,
    openGraph: {
      title: `${pet.name} - ${petType}`,
      description,
      images: pet.photos.length > 0 ? [pet.photos[0].url] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pet.name} - ${petType}`,
      description,
      images: pet.photos.length > 0 ? [pet.photos[0].url] : [],
    },
  };
}

const formatDate = (date: Date | null) => {
  if (!date) return "No especificada";
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatAge = (birthDate: Date | null) => {
  if (!birthDate) return null;

  const today = new Date();
  const birth = new Date(birthDate);
  const diffTime = Math.abs(today.getTime() - birth.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months > 0
      ? `${months} mes${months > 1 ? "es" : ""}`
      : "Menos de 1 mes";
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} año${years > 1 ? "s" : ""}`;
  }
};

const getSexLabel = (sex: string) => {
  const sexes: Record<string, string> = {
    MALE: "Macho",
    FEMALE: "Hembra",
    UNKNOWN: "No determinado",
  };
  return sexes[sex] || sex;
};

const getSizeLabel = (size: string | null) => {
  if (!size) return null;
  const sizes: Record<string, string> = {
    SMALL: "Pequeño",
    MEDIUM: "Mediano",
    LARGE: "Grande",
    EXTRA_LARGE: "Extra Grande",
  };
  return sizes[size] || size;
};

const getHairTypeLabel = (hairType: string | null) => {
  if (!hairType) return null;
  const hairTypes: Record<string, string> = {
    SHORT: "Corto",
    MEDIUM: "Mediano",
    LONG: "Largo",
    CURLY: "Rizado",
    HAIRLESS: "Sin pelo",
  };
  return hairTypes[hairType] || hairType;
};

const generateWhatsAppLink = (phone: string, petName: string) => {
  // Clean the phone number for WhatsApp (remove spaces and special chars except +)
  const cleanPhone = phone.replace(/\s/g, "");
  const message = encodeURIComponent(
    `Hola! Vi tu mascota ${petName} en Pet Finder y me gustaría contactarte.`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
};

const formatPhoneDisplay = (phone: string) => {
  // Remove +54 prefix and format for display
  const cleanPhone = phone.replace(/^\+54\s?/, "");
  return `+54 ${cleanPhone}`;
};

export default async function PublicPetPage({ params }: PageProps) {
  const { petId } = await params;

  // Validate pet code format - if it doesn't match, it's likely an old CUID
  if (!isValidPetCode(petId)) {
    notFound();
  }

  // Check if this is an unclaimed generic QR code
  const isGeneric = await isGenericQRCode(petId);

  if (isGeneric) {
    // Show claim page for generic QR codes
    return <GenericQRCodeClaim code={petId} />;
  }

  const pet = await getPetById(petId);

  if (!pet) {
    notFound();
  }

  const age = formatAge(pet.birthDate);
  const sizeLabel = getSizeLabel(pet.size);
  const hairTypeLabel = getHairTypeLabel(pet.hairType);
  const mainPhoto = pet.photos.length > 0 ? pet.photos[0].url : null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
       {/* Hero / Contact Poster Area */}
       <div className="relative w-full h-[50vh] md:h-[60vh] bg-muted overflow-hidden flex items-end justify-center">
            {mainPhoto ? (
               <Image 
                 src={mainPhoto} 
                 alt={pet.name} 
                 fill 
                 className="object-cover" 
                 priority 
               />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-secondary/30 w-full">
                    <Heart className="h-24 w-24 mb-4 opacity-20" />
                    <p className="text-xl font-medium opacity-50">Sin foto de perfil</p>
                </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
            
            <div className="absolute bottom-8 text-center space-y-2 z-10 w-full px-4">
                 <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground drop-shadow-sm">
                    {pet.name}
                 </h1>
                 <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    {getPetTypeLabel(pet.type)} • {pet.breed || 'Raza desconocida'}
                 </p>
            </div>
       </div>

       <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4 relative z-20 space-y-8">
           
           {/* Primary Actions */}
           <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                {pet.user.phone && (
                    <Button size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-green-500 hover:bg-green-600 text-white border-none" asChild>
                        <a href={generateWhatsAppLink(pet.user.phone, pet.name)} target="_blank" rel="noopener noreferrer">
                           <Phone className="mr-2 h-5 w-5" />
                           WhatsApp
                        </a>
                    </Button>
                )}
                <Button size="lg" variant="secondary" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg shadow-md hover:bg-secondary/80" asChild>
                     <a href={`mailto:${pet.user.email}`}>
                        <Mail className="mr-2 h-5 w-5" />
                        Enviar Email
                     </a>
                </Button>
           </div>

           {/* Info Grid (Bento) */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* Age */}
               <div className="bg-secondary/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                   <Calendar className="h-8 w-8 text-primary opacity-80" />
                   <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Edad</span>
                   <span className="text-xl font-bold">{age || 'Desconocida'}</span>
               </div>
               
               {/* Sex */}
               <div className="bg-secondary/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                   <div className="font-bold text-2xl text-primary">{pet.sex === 'MALE' ? '♂' : pet.sex === 'FEMALE' ? '♀' : '?'}</div>
                   <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Sexo</span>
                   <span className="text-xl font-bold">{getSexLabel(pet.sex)}</span>
               </div>

               {/* Size */}
               <div className="bg-secondary/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                   <Info className="h-8 w-8 text-primary opacity-80" />
                   <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tamaño</span>
                   <span className="text-xl font-bold">{getSizeLabel(pet.size) || 'N/A'}</span>
               </div>

               {/* Owner */}
               <div className="bg-secondary/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                   <Avatar className="h-10 w-10">
                        <AvatarFallback>{pet.user.name?.[0] || 'D'}</AvatarFallback>
                   </Avatar>
                   <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Dueño</span>
                   <span className="text-lg font-bold truncate max-w-full px-2">{pet.user.name?.split(' ')[0] || 'Usuario'}</span>
               </div>
           </div>
            
           {/* Detailed Characteristics */}
           {(pet.color || hairTypeLabel || pet.hairPattern) && (
             <div className="bg-secondary/20 rounded-3xl p-8 space-y-4">
                <h3 className="text-xl font-semibold tracking-tight">Características Físicas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {pet.color && (
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Color</span>
                            <span className="font-medium text-lg">{pet.color}</span>
                        </div>
                     )}
                     {hairTypeLabel && (
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Pelaje</span>
                            <span className="font-medium text-lg">{hairTypeLabel}</span>
                        </div>
                     )}
                     {pet.hairPattern && (
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Patrón</span>
                             <span className="font-medium text-lg">{pet.hairPattern}</span>
                        </div>
                     )}
                </div>
             </div>
           )}

            {/* Gallery (if more photos) */}
            {pet.photos.length > 1 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold tracking-tight px-2">Más Fotos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         {pet.photos.slice(1).map((photo) => (
                             <div key={photo.id} className="aspect-square relative rounded-2xl overflow-hidden bg-muted">
                                 <Image src={photo.url} alt="Foto de mascota" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                             </div>
                         ))}
                    </div>
                </div>
            )}
           
           <div className="flex justify-center pt-8 opacity-50">
               <div className="flex items-center gap-2">
                   <Badge variant="outline" className="text-xs font-normal">PetFinder ID: {pet.id.slice(0,8)}</Badge>
               </div>
           </div>

       </div>

      {/* QR Scan Handler (Invisible) */}
      <QRScanHandler petId={pet.id} petName={pet.name} />
    </div>
  );
}

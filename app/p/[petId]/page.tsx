import { getPetById } from "@/data/pets";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Info, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: {
    petId: string;
  };
}

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

export default async function PublicPetPage({ params }: PageProps) {
  const { petId } = await params;
  const pet = await getPetById(petId);

  if (!pet) {
    notFound();
  }

  const age = formatAge(pet.birthDate);
  const sizeLabel = getSizeLabel(pet.size);
  const hairTypeLabel = getHairTypeLabel(pet.hairType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              ← Pet Finder
            </Link>
            <Badge variant="secondary" className="text-sm">
              Perfil Público
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            {pet.photos.length > 0 ? (
              <>
                {/* Main Image */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={pet.photos[0].url}
                    alt={`Foto principal de ${pet.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Additional Images */}
                {pet.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {pet.photos.slice(1).map((photo, index) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square rounded-md overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={photo.url}
                          alt={`Foto ${index + 2} de ${pet.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Heart className="h-16 w-16 mx-auto mb-2" />
                  <p>Sin fotos disponibles</p>
                </div>
              </div>
            )}
          </div>

          {/* Pet Information */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  {pet.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tipo</p>
                    <Badge variant="outline">{getPetTypeLabel(pet.type)}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sexo</p>
                    <Badge variant="outline">{getSexLabel(pet.sex)}</Badge>
                  </div>
                </div>

                {age && (
                  <div>
                    <p className="text-sm text-gray-600">Edad</p>
                    <p className="font-medium">{age}</p>
                  </div>
                )}

                {pet.breed && (
                  <div>
                    <p className="text-sm text-gray-600">Raza</p>
                    <p className="font-medium">{pet.breed}</p>
                  </div>
                )}

                {sizeLabel && (
                  <div>
                    <p className="text-sm text-gray-600">Tamaño</p>
                    <Badge variant="outline">{sizeLabel}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Physical Characteristics */}
            {(pet.color || hairTypeLabel || pet.hairPattern) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Características Físicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pet.color && (
                    <div>
                      <p className="text-sm text-gray-600">Color</p>
                      <p className="font-medium">{pet.color}</p>
                    </div>
                  )}

                  {hairTypeLabel && (
                    <div>
                      <p className="text-sm text-gray-600">Tipo de pelo</p>
                      <Badge variant="outline">{hairTypeLabel}</Badge>
                    </div>
                  )}

                  {pet.hairPattern && (
                    <div>
                      <p className="text-sm text-gray-600">Patrón del pelo</p>
                      <p className="font-medium">{pet.hairPattern}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Owner Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Información del Dueño
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pet.user.name && (
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-medium">{pet.user.name}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">Contacto</p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`mailto:${pet.user.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contactar Dueño
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Registration Date */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Registrado el {formatDate(pet.createdAt)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

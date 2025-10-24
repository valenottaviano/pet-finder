"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check, Eye, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Pet {
  id: string;
  name: string;
  type: string;
  sex: string;
  breed?: string | null;
  size?: string | null;
  color?: string | null;
  birthDate?: Date | null;
  photos: {
    id: string;
    url: string;
    isPrimary: boolean;
  }[];
}

interface PetCardProps {
  pet: Pet;
}

const formatPetType = (type: string) => {
  const types: { [key: string]: string } = {
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

const formatSex = (sex: string) => {
  const sexes: { [key: string]: string } = {
    MALE: "Macho",
    FEMALE: "Hembra",
    UNKNOWN: "No determinado",
  };
  return sexes[sex] || sex;
};

const formatSize = (size: string | null) => {
  if (!size) return null;
  const sizes: { [key: string]: string } = {
    SMALL: "Pequeño",
    MEDIUM: "Mediano",
    LARGE: "Grande",
    EXTRA_LARGE: "Extra Grande",
  };
  return sizes[size] || size;
};

const calculateAge = (birthDate: Date | null) => {
  if (!birthDate) return null;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age === 0) {
    const months = monthDiff < 0 ? 12 + monthDiff : monthDiff;
    return months === 1 ? "1 mes" : `${months} meses`;
  }

  return age === 1 ? "1 año" : `${age} años`;
};


// PetBubble: versión mobile, burbuja circular scrollable
export const PetBubble = ({ pet }: PetCardProps) => {
  const primaryPhoto = pet.photos.find((photo) => photo.isPrimary) || pet.photos[0];
  return (
    <div className="flex flex-col items-center w-28 mx-2">
      <Link href={`/pet/${pet.id}`} className="group">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary group-hover:scale-105 transition-transform bg-gray-100">
          {primaryPhoto ? (
            <Image
              src={primaryPhoto.url}
              alt={pet.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Sin foto
            </div>
          )}
        </div>
      </Link>
      <span className="mt-3 text-sm text-center truncate w-full font-medium" title={pet.name}>
        {pet.name}
      </span>
    </div>
  );
};

// PetCard: versión desktop/tablet
export const PetCard = ({ pet }: PetCardProps) => {
  const [copied, setCopied] = useState(false);
  const primaryPhoto = pet.photos.find((photo) => photo.isPrimary) || pet.photos[0];
  const age = calculateAge(pet.birthDate || null);
  const size = formatSize(pet.size || null);

  const handleShare = async () => {
    const url = `${window.location.origin}/p/${pet.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pet.name} - ${formatPetType(pet.type)}`,
          text: `Conoce a ${pet.name}, un${
            pet.type === "DOG" ? "" : "a"
          } ${formatPetType(pet.type).toLowerCase()}`,
          url,
        });
      } catch (error) {
        handleCopy(url);
      }
    } else {
      handleCopy(url);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Enlace copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Error al copiar el enlace");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-[500px] flex flex-col">
      <div className="relative h-64 bg-gray-100">
        {primaryPhoto ? (
          <Image
            src={primaryPhoto.url}
            alt={pet.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span>Sin foto</span>
          </div>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg truncate" title={pet.name}>{pet.name}</h3>
            <Badge variant="secondary">{formatPetType(pet.type)}</Badge>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>Sexo: {formatSex(pet.sex) || <span className="text-gray-300">—</span>}</p>
            <p>Raza: {pet.breed || <span className="text-gray-300">—</span>}</p>
            <p>Edad: {age || <span className="text-gray-300">—</span>}</p>
            <p>Tamaño: {size || <span className="text-gray-300">—</span>}</p>
            <p>Color: {pet.color || <span className="text-gray-300">—</span>}</p>
          </div>
        </div>
        <div className="space-y-2 pt-4">
          {/* First row - Edit and View Profile */}
          <div className="flex gap-2">
            <Button variant="default" size="sm" asChild className="flex-1">
              <Link href={`/pet/${pet.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={`/p/${pet.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Perfil
              </Link>
            </Button>
          </div>

          {/* Second row - Share */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

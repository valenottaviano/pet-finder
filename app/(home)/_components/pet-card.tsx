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

export const PetCard = ({ pet }: PetCardProps) => {
  const [copied, setCopied] = useState(false);
  const primaryPhoto =
    pet.photos.find((photo) => photo.isPrimary) || pet.photos[0];
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
        // If share fails, fall back to copy
        handleCopy(url);
      }
    } else {
      // Fallback to copy for browsers without Web Share API
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
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

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{pet.name}</h3>
            <Badge variant="secondary">{formatPetType(pet.type)}</Badge>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>Sexo: {formatSex(pet.sex)}</p>
            {pet.breed && <p>Raza: {pet.breed}</p>}
            {age && <p>Edad: {age}</p>}
            {size && <p>Tamaño: {size}</p>}
            {pet.color && <p>Color: {pet.color}</p>}
          </div>

          <div className="space-y-2 pt-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

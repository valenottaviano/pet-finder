"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Check, Eye, Edit, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  className?: string; // Allow passing custom classes
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


// PetBubble: versión minimalista para listas rápidas
export const PetBubble = ({ pet, className }: PetCardProps) => {
  const primaryPhoto = pet.photos.find((photo) => photo.isPrimary) || pet.photos[0];
  return (
    <div className={cn("flex flex-col items-center w-28 mx-2 gap-2", className)}>
      <Link href={`/pet/${pet.id}`} className="group relative">
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-105">
          {primaryPhoto ? (
            <Image
              src={primaryPhoto.url}
              alt={pet.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted text-muted-foreground text-xs font-medium">
              {pet.name.charAt(0)}
            </div>
          )}
        </div>
      </Link>
      <span className="text-sm font-medium text-foreground/80 truncate w-full text-center">
        {pet.name}
      </span>
    </div>
  );
};

// PetCard: Diseño "Digital ID" inspirado en Apple Wallet
export const PetCard = ({ pet, className }: PetCardProps) => {
  const [copied, setCopied] = useState(false);
  const primaryPhoto = pet.photos.find((photo) => photo.isPrimary) || pet.photos[0];
  const age = calculateAge(pet.birthDate || null);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicked inside a link
    e.stopPropagation();

    const url = `${window.location.origin}/p/${pet.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pet.name} - PetFinder`,
          text: `Conoce a ${pet.name} en PetFinder`,
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
      toast.success("Enlace copiado");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Error al copiar");
    }
  };

  return (
    <div className={cn("group relative w-full h-[460px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5", className)}>
      {/* Background Image */}
      <div className="absolute inset-0 bg-muted">
        {primaryPhoto ? (
          <Image
            src={primaryPhoto.url}
            alt={pet.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
             <div className="w-20 h-20 rounded-full bg-gray-200 mb-4" />
             <span>Sin Foto</span>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Floating Actions (Top Right) */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 p-2">
        <Link href={`/pet/${pet.id}`}>
            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:scale-110 transition-all shadow-lg">
                <Edit className="h-4 w-4" />
            </Button>
        </Link>
        <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleShare}
            className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:scale-110 transition-all shadow-lg"
        >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Content (Bottom) */}
      <Link href={`/pet/${pet.id}`} className="absolute inset-0 flex flex-col justify-end p-8 cursor-pointer">
        <div className="space-y-3 transform transition-transform duration-300 group-hover:-translate-y-2">
            
            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-1">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 hover:bg-white/30 font-normal px-3 py-1 text-xs">
                    {formatPetType(pet.type)}
                </Badge>
                {age && (
                    <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white/90 border-0 pointer-events-none font-normal px-3 py-1 text-xs">
                        {age}
                    </Badge>
                )}
            </div>

            {/* Name */}
            <h3 className="text-4xl font-bold text-white tracking-tight text-shadow-sm">
                {pet.name}
            </h3>

            {/* Subtitle/Breed */}
            {pet.breed && (
                <p className="text-white/80 text-lg font-medium leading-relaxed">
                    {pet.breed}
                </p>
            )}
            
            {/* View Profile CTA - Visible on Hover */}
            <div className="h-0 overflow-hidden group-hover:h-10 transition-[height] duration-300 ease-out">
               <div className="pt-4 flex items-center text-white/70 text-sm font-medium hover:text-white transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver perfil completo
               </div>
            </div>
        </div>
      </Link>
    </div>
  );
};

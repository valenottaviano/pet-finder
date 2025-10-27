"use client";

import dynamic from "next/dynamic";

const GlobalLostPetsMap = dynamic(() => import("./global-lost-pets-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
});

interface LostPetAlert {
  id: string;
  petId: string;
  status: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  pet: {
    id: string;
    name: string;
    type: string;
    breed: string | null;
    color: string | null;
    photos: Array<{
      url: string;
      isPrimary: boolean;
    }>;
    user: {
      name: string | null;
      email: string | null;
      phone: string | null;
    };
  };
}

interface GlobalLostPetsMapWrapperProps {
  alerts: LostPetAlert[];
}

export function GlobalLostPetsMapWrapper({
  alerts,
}: GlobalLostPetsMapWrapperProps) {
  return <GlobalLostPetsMap alerts={alerts} />;
}

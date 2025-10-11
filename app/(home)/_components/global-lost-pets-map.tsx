"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { AlertTriangle, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Arreglar el icono del marcador de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Icono personalizado para mascotas perdidas
const lostPetIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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

interface GlobalLostPetsMapProps {
  alerts: LostPetAlert[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
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

export default function GlobalLostPetsMap({ alerts }: GlobalLostPetsMapProps) {
  // Filtrar alertas con coordenadas válidas
  const validAlerts = alerts.filter(
    (alert) => alert.latitude !== null && alert.longitude !== null
  );

  // Centro del mapa (Argentina - Buenos Aires)
  const defaultCenter: [number, number] = [-34.6037, -58.3816];

  // Si hay alertas, centrar en la primera
  const mapCenter: [number, number] =
    validAlerts.length > 0 &&
    validAlerts[0].latitude &&
    validAlerts[0].longitude
      ? [validAlerts[0].latitude, validAlerts[0].longitude]
      : defaultCenter;

  return (
    <div className="h-[600px] rounded-lg overflow-hidden border shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validAlerts.map((alert) => (
          <Marker
            key={alert.id}
            position={[alert.latitude!, alert.longitude!]}
            icon={lostPetIcon}
          >
            <Popup maxWidth={300} className="custom-popup">
              <div className="p-2 space-y-3">
                {/* Header con foto y nombre */}
                <div className="flex items-start gap-3">
                  {alert.pet.photos.length > 0 && (
                    <img
                      src={alert.pet.photos[0].url}
                      alt={alert.pet.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{alert.pet.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Perdido
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Información de la mascota */}
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Tipo:</span>{" "}
                    {getPetTypeLabel(alert.pet.type)}
                  </p>
                  {alert.pet.breed && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Raza:</span>{" "}
                      {alert.pet.breed}
                    </p>
                  )}
                  {alert.pet.color && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Color:</span>{" "}
                      {alert.pet.color}
                    </p>
                  )}
                </div>

                {/* Descripción */}
                {alert.description && (
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Descripción:</p>
                    <p className="text-gray-600 line-clamp-3">
                      {alert.description}
                    </p>
                  </div>
                )}

                {/* Fecha */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Perdido el {formatDate(alert.createdAt)}</span>
                </div>

                {/* Información de contacto */}
                <div className="space-y-1 pt-2 border-t">
                  <p className="text-xs font-semibold text-gray-900">
                    Contactar al dueño:
                  </p>
                  {alert.pet.user.phone && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Phone className="h-3 w-3" />
                      <a
                        href={`tel:${alert.pet.user.phone}`}
                        className="hover:underline"
                      >
                        {alert.pet.user.phone}
                      </a>
                    </div>
                  )}
                  {alert.pet.user.email && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Mail className="h-3 w-3" />
                      <a
                        href={`mailto:${alert.pet.user.email}`}
                        className="hover:underline"
                      >
                        {alert.pet.user.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Botón para ver perfil */}
                <Button asChild className="w-full" size="sm">
                  <Link href={`/p/${alert.pet.id}`} target="_blank">
                    <p>Ver Perfil Completo</p>
                  </Link>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

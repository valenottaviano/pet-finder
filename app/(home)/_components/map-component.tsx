"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Smartphone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default markers
if (typeof window !== "undefined") {
  const L = require("leaflet");

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface ScanEvent {
  id: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  userAgent: string | null;
  ipAddress: string | null;
  pet: {
    id: string;
    name: string;
    type: string;
    photo: string | null;
  };
}

interface MapComponentProps {
  scanEvents: ScanEvent[];
}

export const MapComponent = ({ scanEvents }: MapComponentProps) => {
  const getDeviceInfo = (userAgent: string | null) => {
    if (!userAgent) return "Dispositivo desconocido";

    if (userAgent.includes("Mobile")) return "Móvil";
    if (userAgent.includes("iPhone")) return "iPhone";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPad")) return "iPad";
    return "Escritorio";
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

  const validScanEvents = scanEvents.filter(
    (event) => event.latitude !== 0 && event.longitude !== 0
  );

  // Calculate map center
  const mapCenter: [number, number] =
    validScanEvents.length > 0
      ? [
          validScanEvents.reduce((sum, event) => sum + event.latitude, 0) /
            validScanEvents.length,
          validScanEvents.reduce((sum, event) => sum + event.longitude, 0) /
            validScanEvents.length,
        ]
      : [-34.6118, -58.396]; // Buenos Aires default

  return (
    <MapContainer
      center={mapCenter}
      zoom={validScanEvents.length === 1 ? 15 : 10}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validScanEvents.map((event) => (
        <Marker key={event.id} position={[event.latitude, event.longitude]}>
          <Popup maxWidth={300}>
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                {event.pet.photo && (
                  <img
                    src={event.pet.photo}
                    alt={event.pet.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{event.pet.name}</h3>
                  <p className="text-xs text-gray-600">
                    {getPetTypeLabel(event.pet.type)}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(event.createdAt, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <Smartphone className="h-3 w-3" />
                  <span>{getDeviceInfo(event.userAgent)}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">
                    {event.latitude.toFixed(6)}, {event.longitude.toFixed(6)}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full mt-2"
                onClick={() => {
                  const url = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`;
                  window.open(url, "_blank");
                }}
              >
                Ver en Google Maps
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

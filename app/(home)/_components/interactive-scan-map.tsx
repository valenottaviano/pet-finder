"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  RefreshCw,
  Loader2,
  Calendar,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { getAllUserScanEvents } from "../_actions/scan-events";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

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

interface InteractiveScanMapProps {
  className?: string;
}

// Simple embedded map using OpenStreetMap
const SimpleMap = ({ scanEvents }: { scanEvents: ScanEvent[] }) => {
  if (scanEvents.length === 0) return null;

  // Calculate center
  const centerLat =
    scanEvents.reduce((sum, event) => sum + event.latitude, 0) /
    scanEvents.length;
  const centerLng =
    scanEvents.reduce((sum, event) => sum + event.longitude, 0) /
    scanEvents.length;

  // Create markers query string for OpenStreetMap
  const markers = scanEvents
    .map(
      (event, index) => `markers=${event.latitude},${event.longitude},lightblue`
    )
    .join("&");

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    centerLng - 0.01
  },${centerLat - 0.01},${centerLng + 0.01},${
    centerLat + 0.01
  }&layer=mapnik&marker=${centerLat},${centerLng}`;

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Mapa de escaneos"
        loading="lazy"
      />
    </div>
  );
};

export const InteractiveScanMap = ({ className }: InteractiveScanMapProps) => {
  const [scanEvents, setScanEvents] = useState<ScanEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchScanEvents();
    }
  }, [isMounted]);

  const fetchScanEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getAllUserScanEvents();

      if (!result.success) {
        throw new Error(result.error || "Error al cargar los escaneos");
      }

      setScanEvents(
        result.scanEvents?.map((event: any) => ({
          ...event,
          createdAt: new Date(event.createdAt),
        })) || []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const validScanEvents = scanEvents.filter(
    (event) => event.latitude !== 0 && event.longitude !== 0
  );

  if (!isMounted) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Escaneos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded-lg border flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Inicializando mapa...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Escaneos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Cargando escaneos...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Escaneos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={fetchScanEvents}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (validScanEvents.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Escaneos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">
              No hay escaneos con ubicación disponible
            </p>
            <p className="text-sm text-muted-foreground">
              Los escaneos aparecerán aquí cuando las personas compartan su
              ubicación al escanear los códigos QR de tus mascotas.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Escaneos
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {validScanEvents.length} ubicación
              {validScanEvents.length !== 1 ? "es" : ""}
            </Badge>
            <Button variant="outline" size="sm" onClick={fetchScanEvents}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 rounded-lg overflow-hidden border">
          <SimpleMap scanEvents={validScanEvents} />
        </div>

        {/* Scan Events List */}
        <div className="mt-6">
          <h3 className="font-medium text-sm mb-3">Escaneos recientes:</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {validScanEvents.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  {event.pet.photo && (
                    <img
                      src={event.pet.photo}
                      alt={event.pet.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">
                      {event.pet.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(event.createdAt, {
                          addSuffix: true,
                          locale: es,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`;
                    window.open(url, "_blank");
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {validScanEvents.length > 5 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                Y {validScanEvents.length - 5} escaneos más...
              </p>
            )}
          </div>
        </div>

        {/* Map Legend */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Información del mapa:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>
              • Cada marcador representa un lugar donde se escaneó el código QR
              de una mascota
            </li>
            <li>• Haz clic en los marcadores para ver detalles del escaneo</li>
            <li>• Solo se muestran escaneos donde se compartió la ubicación</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

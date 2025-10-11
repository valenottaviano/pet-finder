"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, RefreshCw, Loader2 } from "lucide-react";
import { getAllUserScanEvents } from "../_actions/scan-events";

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

// Dynamic import del mapa completo
const DynamicMap = dynamic(
  () => import("./map-component").then((mod) => mod.MapComponent),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 rounded-lg border flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    ),
  }
);

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
          <DynamicMap scanEvents={validScanEvents} />
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

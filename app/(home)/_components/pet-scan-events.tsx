"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Clock, Smartphone, Eye, BarChart3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { getPetScanEvents, getPetScanStats } from "../_actions/scan-events";
import { cn } from "@/lib/utils";

interface ScanEvent {
  id: string;
  latitude: number;
  longitude: number;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: Date;
}

interface ScanStats {
  totalScans: number;
  scansToday: number;
  scansThisWeek: number;
  scansThisMonth: number;
  latestScan: {
    id: string;
    createdAt: Date;
    petId: string;
    latitude: number;
    longitude: number;
    userAgent: string | null;
    ipAddress: string | null;
  } | null;
}

interface PetScanEventsProps {
  petId: string;
  petName: string;
  className?: string;
}

export const PetScanEvents = ({ petId, petName, className }: PetScanEventsProps) => {
  const [scanEvents, setScanEvents] = useState<ScanEvent[]>([]);
  const [stats, setStats] = useState<ScanStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScanData();
  }, [petId]);

  const fetchScanData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [eventsResult, statsResult] = await Promise.all([
        getPetScanEvents(petId),
        getPetScanStats(petId),
      ]);

      if (!eventsResult.success || !statsResult.success) {
        throw new Error(
          eventsResult.error ||
            statsResult.error ||
            "Error al cargar los datos de escaneos"
        );
      }

      setScanEvents(
        eventsResult.scanEvents?.map((event: any) => ({
          ...event,
          createdAt: new Date(event.createdAt),
        })) || []
      );

      setStats(statsResult.stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationString = (lat: number, lng: number) => {
    if (lat === 0 && lng === 0) return "Ubicación no disponible";
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const getDeviceInfo = (userAgent: string | null) => {
    if (!userAgent) return "Dispositivo desconocido";

    if (userAgent.includes("Mobile")) return "Móvil";
    if (userAgent.includes("iPhone")) return "iPhone";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPad")) return "iPad";
    return "Escritorio";
  };

  const openInMaps = (lat: number, lng: number) => {
    if (lat === 0 && lng === 0) return;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Escaneos del Código QR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Cargando escaneos...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("border-destructive/50", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Escaneos del Código QR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-600">
            <p>{error}</p>
            <Button variant="outline" onClick={fetchScanData} className="mt-2">
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Escaneos del Código QR
          </div>
          {stats && (
            <Badge variant={stats.totalScans > 0 ? "default" : "secondary"}>
              {stats.totalScans} total
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.totalScans}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.scansToday}
              </div>
              <div className="text-xs text-muted-foreground">Hoy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.scansThisWeek}
              </div>
              <div className="text-xs text-muted-foreground">Esta semana</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.scansThisMonth}
              </div>
              <div className="text-xs text-muted-foreground">Este mes</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">
                {stats.latestScan
                  ? formatDistanceToNow(stats.latestScan.createdAt, {
                      addSuffix: true,
                      locale: es,
                    })
                  : "Nunca"}
              </div>
              <div className="text-xs text-muted-foreground">Último</div>
            </div>
          </div>
        )}

        {/* Recent Scans */}
        {scanEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Aún no hay escaneos del código QR</p>
            <p className="text-sm">
              Cuando alguien escanee el código, aparecerá aquí
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Escaneos recientes</h4>
              {scanEvents.length > 3 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Ver todos ({scanEvents.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Todos los escaneos de {petName}</DialogTitle>
                      <DialogDescription>
                        Historial completo de escaneos del código QR
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      {scanEvents.map((scan) => (
                        <ScanEventCard key={scan.id} scan={scan} />
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Show only first 3 scans */}
            <div className="space-y-2">
              {scanEvents.slice(0, 3).map((scan) => (
                <ScanEventCard key={scan.id} scan={scan} compact />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ScanEventCardProps {
  scan: ScanEvent;
  compact?: boolean;
}

const ScanEventCard = ({ scan, compact = false }: ScanEventCardProps) => {
  const hasLocation = scan.latitude !== 0 || scan.longitude !== 0;

  return (
    <div
      className={`border rounded-lg p-3 bg-gray-50 ${compact ? "text-sm" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {formatDistanceToNow(scan.createdAt, {
                addSuffix: true,
                locale: es,
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {hasLocation ? (
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${scan.latitude},${scan.longitude}`,
                      "_blank"
                    )
                  }
                  className="text-blue-600 hover:underline"
                >
                  Ver ubicación
                </button>
              ) : (
                "Sin ubicación"
              )}
            </span>
          </div>

          {!compact && scan.userAgent && (
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                {(() => {
                  if (!scan.userAgent) return "Dispositivo desconocido";
                  if (scan.userAgent.includes("Mobile")) return "Móvil";
                  if (scan.userAgent.includes("iPhone")) return "iPhone";
                  if (scan.userAgent.includes("Android")) return "Android";
                  if (scan.userAgent.includes("iPad")) return "iPad";
                  return "Escritorio";
                })()}
              </span>
            </div>
          )}
        </div>

        {hasLocation && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${scan.latitude},${scan.longitude}`,
                "_blank"
              )
            }
          >
            <MapPin className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

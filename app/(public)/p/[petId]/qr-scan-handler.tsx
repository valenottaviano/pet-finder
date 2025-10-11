"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface QRScanHandlerProps {
  petId: string;
  petName: string;
}

export const QRScanHandler = ({ petId, petName }: QRScanHandlerProps) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanRecorded, setScanRecorded] = useState(false);

  useEffect(() => {
    // Check if this is a QR scan (s=1 parameter)
    const isQRScan = searchParams.get("s") === "1";
    if (isQRScan && !scanRecorded) {
      setIsOpen(true);
    }
  }, [searchParams, scanRecorded]);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("La geolocalización no está disponible en este navegador");
      return;
    }

    setIsLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      // Send scan event to API
      const response = await fetch("/api/scan-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId,
          latitude,
          longitude,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setScanRecorded(true);

        // Mensaje personalizado basado en si el email fue enviado
        const hasLocation = latitude !== 0 && longitude !== 0;
        const emailMessage = result.emailSent
          ? "El dueño ha sido notificado por email."
          : "Escaneo registrado (no se pudo enviar el email).";

        const locationMessage = hasLocation
          ? " Se compartió la ubicación."
          : "";

        toast.success(`¡Escaneo registrado! ${emailMessage}${locationMessage}`);
        setIsOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Error al registrar el escaneo");
      }
    } catch (error) {
      console.error("Error getting location or recording scan:", error);
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Permiso de ubicación denegado");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Ubicación no disponible");
            break;
          case error.TIMEOUT:
            toast.error("Tiempo agotado al obtener la ubicación");
            break;
          default:
            toast.error("Error al obtener la ubicación");
        }
      } else {
        toast.error("Error al registrar el escaneo");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const skipLocation = async () => {
    try {
      setIsLoading(true);

      // Record scan without location (using 0,0 as placeholder)
      const response = await fetch("/api/scan-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId,
          latitude: 0,
          longitude: 0,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setScanRecorded(true);

        const emailMessage = result.emailSent
          ? "El dueño ha sido notificado por email."
          : "Escaneo registrado (no se pudo enviar el email).";

        toast.success(`¡Escaneo registrado! ${emailMessage}`);
        setIsOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Error al registrar el escaneo");
      }
    } catch (error) {
      console.error("Error recording scan:", error);
      toast.error("Error al registrar el escaneo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Código QR Escaneado
          </DialogTitle>
          <DialogDescription>
            Has escaneado el código QR de <strong>{petName}</strong>. ¿Quieres
            compartir tu ubicación para que el dueño sepa dónde fue vista su
            mascota?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={requestLocation}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            {isLoading ? "Registrando..." : "Compartir ubicación"}
          </Button>

          <Button
            variant="outline"
            onClick={skipLocation}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Registrar sin ubicación
          </Button>

          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>

        <div className="text-xs text-muted-foreground mt-2">
          <AlertCircle className="h-3 w-3 inline mr-1" />
          Tu ubicación se usará solo para ayudar al dueño a encontrar a su
          mascota.
        </div>
      </DialogContent>
    </Dialog>
  );
};

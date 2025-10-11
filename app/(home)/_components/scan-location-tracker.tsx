"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createScanEvent } from "../_actions/scan-events";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Check, AlertCircle } from "lucide-react";

interface ScanLocationTrackerProps {
  petId: string;
}

export function ScanLocationTracker({ petId }: ScanLocationTrackerProps) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "idle" | "requesting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Only track if s=1 parameter is present (QR scan)
    if (searchParams.get("s") !== "1") {
      return;
    }

    const trackLocation = async () => {
      setStatus("requesting");

      // Check if geolocation is supported
      if (!navigator.geolocation) {
        setStatus("error");
        setErrorMessage("La geolocalización no es compatible con tu navegador");
        return;
      }

      // Request location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // Get user agent and basic device info
            const userAgent = navigator.userAgent;

            // Create scan event using server action
            const result = await createScanEvent({
              petId,
              latitude,
              longitude,
              userAgent,
            });

            if (result.error) {
              setStatus("error");
              setErrorMessage(result.error);
            } else {
              setStatus("success");
              console.log("Scan event created successfully:", result.scanEvent);

              // Hide success message after 5 seconds
              setTimeout(() => {
                setStatus("idle");
              }, 5000);
            }
          } catch (error) {
            console.error("Error creating scan event:", error);
            setStatus("error");
            setErrorMessage("Error al registrar la ubicación");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setStatus("error");

          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Permiso de ubicación denegado");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Ubicación no disponible");
              break;
            case error.TIMEOUT:
              setErrorMessage(
                "Tiempo de espera agotado para obtener la ubicación"
              );
              break;
            default:
              setErrorMessage("Error desconocido al obtener la ubicación");
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    };

    trackLocation();
  }, [petId, searchParams]);

  // Don't render anything if s=1 is not present
  if (searchParams.get("s") !== "1") {
    return null;
  }

  if (status === "idle") {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="shadow-lg border-2">
        <CardContent className="p-4">
          {status === "requesting" && (
            <div className="flex items-center gap-3 text-blue-600">
              <MapPin className="h-5 w-5 animate-pulse" />
              <span className="font-medium">
                Registrando ubicación del escaneo...
              </span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-3 text-green-600">
              <Check className="h-5 w-5" />
              <span className="font-medium">
                ¡Escaneo registrado correctamente!
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Error al registrar escaneo</p>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

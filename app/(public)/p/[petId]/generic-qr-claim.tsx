"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, LogIn, PawPrint } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface GenericQRCodeClaimProps {
  code: string;
}

export function GenericQRCodeClaim({ code }: GenericQRCodeClaimProps) {
  const searchParams = useSearchParams();
  const isQRScan = searchParams.get("s") === "1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-6 w-24 h-24 flex items-center justify-center">
            <QrCode className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isQRScan ? "¡Código QR Escaneado!" : "Código QR Disponible"}
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Código:{" "}
            <span className="font-mono font-bold text-gray-900">{code}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {isQRScan && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-medium">
                Este código QR aún no está asociado a ninguna mascota
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 rounded-full p-2 mt-1">
                <PawPrint className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Registra tu Mascota
                </h3>
                <p className="text-gray-600 text-sm">
                  Este código QR genérico está disponible para que lo asignes a
                  tu mascota. Podrás compartir su información de contacto y
                  recibir notificaciones si alguien lo escanea.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 rounded-full p-2 mt-1">
                <LogIn className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Inicia Sesión
                </h3>
                <p className="text-gray-600 text-sm">
                  Necesitas una cuenta para reclamar este código QR. Si no
                  tienes cuenta, puedes registrarte gratis en segundos.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg py-6"
              asChild
            >
              <Link href={`/auth/login?callbackUrl=/home/new?code=${code}`}>
                Iniciar Sesión y Reclamar Código
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 py-6"
              asChild
            >
              <Link href={`/auth/register?callbackUrl=/home/new?code=${code}`}>
                Crear Cuenta Nueva
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              ¿Ya tienes una cuenta con mascotas?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

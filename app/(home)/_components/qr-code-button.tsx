"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import QRCodeLib from "qrcode";
import { toast } from "sonner";

interface QRCodeButtonProps {
  petId: string;
  petName: string;
}

export const QRCodeButton = ({ petId, petName }: QRCodeButtonProps) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateQRCode = async () => {
    try {
      setIsLoading(true);
      const url = `${window.location.origin}/p/${petId}`;
      const qrCodeDataURL = await QRCodeLib.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCode(qrCodeDataURL);
    } catch (error) {
      toast.error("Error al generar el código QR");
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !qrCode) {
      generateQRCode();
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-code-${petName.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Código QR descargado");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <QrCode className="h-4 w-4 mr-2" />
          Código QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Código QR de {petName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            {isLoading ? (
              <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 rounded">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : qrCode ? (
              <img
                src={qrCode}
                alt={`Código QR para ${petName}`}
                className="w-[300px] h-[300px]"
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 rounded">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Escanea este código para acceder al perfil público de {petName}
            </p>
            <p className="text-xs text-gray-500">
              {window?.location?.origin}/p/{petId}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              onClick={downloadQRCode}
              disabled={!qrCode || isLoading}
              className="flex-1"
            >
              Descargar
            </Button>
            <Button onClick={() => setIsOpen(false)} className="flex-1">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/lib/image-compression";

interface PetImageUploadProps {
  value: Array<{ url: string; key: string }>;
  onChange: (images: Array<{ url: string; key: string }>) => void;
  disabled?: boolean;
}

export const PetImageUpload = ({
  value = [],
  onChange,
  disabled,
}: PetImageUploadProps) => {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const onRemove = (keyToRemove: string) => {
    onChange(value.filter((image) => image.key !== keyToRemove));
  };

  const canUploadMore = value.length < 4;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Imágenes de tu mascota (máximo 4)
          {value.length > 0 && (
            <span className="text-gray-500 font-normal">
              {" "}
              - {value.length}/4 imágenes
            </span>
          )}
        </label>
        <p className="text-xs text-gray-500">
          La primera imagen será la imagen principal
        </p>
      </div>

      {/* Display uploaded images */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {value.map((image, index) => (
            <div key={image.key} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={image.url}
                  alt={`Pet image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
                {!disabled && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onRemove(image.key)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {canUploadMore && !disabled && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg">
          {isCompressing && (
            <div className="p-6 text-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Comprimiendo imágenes...</p>
            </div>
          )}

          {!isCompressing && (
            <UploadDropzone
              endpoint="petImageUploader"
              onBeforeUploadBegin={async (files) => {
                setIsCompressing(true);
                setUploadError(null);

                try {
                  // Only take the number of files that fit in remaining slots
                  const remainingSlots = 4 - value.length;
                  const filesToProcess = files.slice(0, remainingSlots);

                  // Compress each file
                  const compressedFiles = await Promise.all(
                    filesToProcess.map((file) =>
                      compressImage(file, {
                        maxSizeMB: 0.8,
                        maxWidthOrHeight: 1920,
                        quality: 0.8,
                      })
                    )
                  );

                  setIsCompressing(false);
                  return compressedFiles;
                } catch (error) {
                  console.error("Error compressing images:", error);
                  setUploadError("Error al comprimir las imágenes");
                  setIsCompressing(false);
                  return [];
                }
              }}
              onClientUploadComplete={(res) => {
                if (res) {
                  const newImages = res.map((file) => ({
                    url: file.ufsUrl,
                    key: file.key,
                  }));
                  onChange([...value, ...newImages]);
                  setUploadError(null);
                }
              }}
              onUploadError={(error: Error) => {
                setUploadError(error.message);
                setIsCompressing(false);
              }}
              appearance={{
                container: "border-none p-6",
                uploadIcon: "text-gray-400",
                label: "text-sm text-gray-600 hover:text-gray-800",
                allowedContent: "text-xs text-gray-500",
                button:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              }}
              content={{
                label: "Arrastra imágenes aquí o haz clic para seleccionar",
                allowedContent: `PNG, JPG, GIF hasta 4MB (se comprimirán automáticamente). Máximo ${
                  4 - value.length
                } más.`,
              }}
            />
          )}
        </div>
      )}

      {/* Show placeholder when no images */}
      {value.length === 0 && disabled && (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No hay imágenes</p>
        </div>
      )}

      {/* Error message */}
      {uploadError && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
          Error: {uploadError}
        </div>
      )}

      {/* Info message */}
      {value.length >= 4 && (
        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
          Has alcanzado el límite máximo de 4 imágenes.
        </div>
      )}

      {/* Compression info */}
      {value.length === 0 && !disabled && (
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          💡 Las imágenes se comprimen automáticamente para optimizar el
          almacenamiento y velocidad de carga.
        </div>
      )}
    </div>
  );
};

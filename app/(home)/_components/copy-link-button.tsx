"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyLinkButtonProps {
  petId: string;
}

export const CopyLinkButton = ({ petId }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}/p/${petId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Enlace copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Error al copiar el enlace");
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Copiado
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4 mr-2" />
          Copiar Enlace
        </>
      )}
    </Button>
  );
};

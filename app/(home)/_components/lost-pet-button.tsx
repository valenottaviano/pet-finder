"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreatePetAlertSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createPetAlert } from "../_actions/create-pet-alert";
import dynamic from "next/dynamic";

// Importar el mapa de forma dinámica para evitar problemas de SSR
const MapPicker = dynamic(() => import("./map-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
});

interface LostPetButtonProps {
  petId: string;
  petName: string;
}

export const LostPetButton = ({ petId, petName }: LostPetButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof CreatePetAlertSchema>>({
    resolver: zodResolver(CreatePetAlertSchema),
    defaultValues: {
      petId,
      status: "LOST",
      description: "",
      latitude: -34.6037, // Buenos Aires por defecto
      longitude: -58.3816,
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePetAlertSchema>) => {
    setIsPending(true);
    try {
      const result = await createPetAlert(values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success || "Alerta creada exitosamente");
        setIsOpen(false);
        form.reset();
        // Recargar la página para mostrar la nueva alerta
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error al crear la alerta");
      console.error("Error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Se ha perdido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reportar mascota perdida</DialogTitle>
          <DialogDescription>
            Completa la información sobre dónde y cuándo se perdió {petName}.
            Esta información ayudará a otras personas a encontrar a tu mascota.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe las circunstancias en las que se perdió tu mascota, características distintivas, comportamiento, etc."
                      className="min-h-[100px]"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación donde se perdió</FormLabel>
                  <FormControl>
                    <MapPicker
                      latitude={field.value}
                      longitude={form.watch("longitude")}
                      onLocationChange={(lat, lng) => {
                        form.setValue("latitude", lat);
                        form.setValue("longitude", lng);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creando alerta..." : "Crear alerta"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

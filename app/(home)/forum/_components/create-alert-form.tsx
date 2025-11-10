"use client";

import React, { useState, useEffect, useTransition } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createPetAlert } from "@/app/(home)/_actions/create-pet-alert";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MapPicker = dynamic(() => import("@/app/(home)/_components/map-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
});

const CreatePetAlertSchema = z.object({
  petId: z.string().min(1),
  status: z.enum(["LOST", "FOUND"]),
  description: z.string().min(10).max(500),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

type FormValues = z.infer<typeof CreatePetAlertSchema>;

interface CreateAlertFormProps {
  pets: Array<any>;
}

export const CreateAlertForm = ({ pets }: CreateAlertFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(CreatePetAlertSchema),
    defaultValues: {
      petId: pets[0]?.id || "",
      status: "LOST",
      description: "",
      latitude: null,
      longitude: null,
    },
  });

  useEffect(() => {
    // If pets prop changes and no petId selected, set default
    if (!form.getValues("petId") && pets?.length > 0) {
      form.setValue("petId", pets[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pets]);

  const onGetLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocalización no disponible en este navegador");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        form.setValue("latitude", latitude);
        form.setValue("longitude", longitude);
        setIsLoadingLocation(false);
        toast.success("Ubicación obtenida correctamente");
      },
      (err) => {
        console.error(err);
        setIsLoadingLocation(false);
        toast.error("No se pudo obtener la ubicación");
      },
      { enableHighAccuracy: true }
    );
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          petId: values.petId,
          status: values.status,
          description: values.description,
          latitude: values.latitude ?? undefined,
          longitude: values.longitude ?? undefined,
        } as any;

        const res = await createPetAlert(payload);

        if (res.error) {
          toast.error(res.error);
          return;
        }

        toast.success(res.success || "Alerta creada");
        // Redirect to the new post in the forum if available
        if (res.alertId) {
          router.push(`/home/forum/${res.alertId}`);
        } else {
          router.push(`/home/forum`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error creando la alerta");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="petId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecciona tu mascota</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una mascota" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      <div className="flex items-center gap-3">
                        {pet.photos && pet.photos.length > 0 ? (
                          <img
                            src={pet.photos[0].url}
                            alt={pet.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              {pet.name[0]?.toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span>{pet.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="LOST" />
                    <Label className="font-normal">Perdido</Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="FOUND" />
                    <Label className="font-normal">Encontrado</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[120px]"
                  placeholder="Describe las circunstancias, características distintivas, comportamiento, etc."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Ubicación</FormLabel>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onGetLocation}
              disabled={isLoadingLocation}
            >
              {isLoadingLocation ? "Obteniendo..." : "Usar mi ubicación"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.setValue("latitude", null);
                form.setValue("longitude", null);
              }}
            >
              Limpiar ubicación
            </Button>
          </div>

          <div>
            <MapPicker
              latitude={form.getValues("latitude") ?? -34.6037}
              longitude={form.getValues("longitude") ?? -58.3816}
              onLocationChange={(lat: number, lng: number) => {
                form.setValue("latitude", lat);
                form.setValue("longitude", lng);
              }}
              isLoading={isLoadingLocation}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creando..." : "Crear alerta"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

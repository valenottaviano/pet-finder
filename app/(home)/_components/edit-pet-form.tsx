"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePetSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/app/(auth)/auth/_components/form-error";
import { FormSuccess } from "@/app/(auth)/auth/_components/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePet } from "../_actions/update-pet";
import { useRouter } from "next/navigation";
import { PetImageUpload } from "./pet-image-upload";

interface Pet {
  id: string;
  name: string;
  type: string;
  sex: string;
  birthDate?: Date | null;
  breed?: string | null;
  size?: string | null;
  hairType?: string | null;
  hairPattern?: string | null;
  color?: string | null;
  photos: Array<{
    id: string;
    url: string;
    publicId: string | null;
    isPrimary: boolean;
  }>;
}

interface EditPetFormProps {
  pet: Pet;
}

export const EditPetForm = ({ pet }: EditPetFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePetSchema>>({
    resolver: zodResolver(CreatePetSchema),
    defaultValues: {
      name: pet.name,
      type: pet.type as any,
      sex: pet.sex as any,
      birthDate: pet.birthDate ? pet.birthDate.toISOString().split("T")[0] : "",
      breed: pet.breed || "",
      size: pet.size as any,
      hairType: pet.hairType as any,
      hairPattern: pet.hairPattern || "",
      color: pet.color || "",
      images: pet.photos.map((photo) => ({
        url: photo.url,
        key: photo.publicId || photo.id,
      })),
    },
  });

  const onSubmit = (values: z.infer<typeof CreatePetSchema>) => {
    setError("");
    setSuccess("");

    console.log("Form values being submitted:", values);

    startTransition(() => {
      updatePet(pet.id, values).then((data) => {
        console.log("Server response:", data);
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          setTimeout(() => {
            router.push("/home");
          }, 1500);
        }
      });
    });
  };

  const petTypes = [
    { value: "DOG", label: "Perro" },
    { value: "CAT", label: "Gato" },
    { value: "BIRD", label: "Pájaro" },
    { value: "RABBIT", label: "Conejo" },
    { value: "HAMSTER", label: "Hámster" },
    { value: "FISH", label: "Pez" },
    { value: "REPTILE", label: "Reptil" },
    { value: "OTHER", label: "Otro" },
  ];

  const sexOptions = [
    { value: "MALE", label: "Macho" },
    { value: "FEMALE", label: "Hembra" },
    { value: "UNKNOWN", label: "No determinado" },
  ];

  const sizeOptions = [
    { value: "SMALL", label: "Pequeño" },
    { value: "MEDIUM", label: "Mediano" },
    { value: "LARGE", label: "Grande" },
    { value: "EXTRA_LARGE", label: "Extra Grande" },
  ];

  const hairTypeOptions = [
    { value: "SHORT", label: "Corto" },
    { value: "MEDIUM", label: "Mediano" },
    { value: "LONG", label: "Largo" },
    { value: "CURLY", label: "Rizado" },
    { value: "HAIRLESS", label: "Sin pelo" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Nombre de tu mascota"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de mascota *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de mascota" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {petTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el sexo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sexOptions.map((sex) => (
                      <SelectItem key={sex.value} value={sex.value}>
                        {sex.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <Input {...field} type="date" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raza</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Ej: Labrador, Persa, etc."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamaño</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizeOptions.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hairType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de pelo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de pelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hairTypeOptions.map((hairType) => (
                      <SelectItem key={hairType.value} value={hairType.value}>
                        {hairType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hairPattern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patrón del pelo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Ej: Manchado, rayado, sólido, etc."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Ej: Marrón, negro, blanco, etc."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PetImageUpload
                    value={field.value || []}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit" className="w-full">
            Actualizar Mascota
          </Button>
        </div>
      </form>
    </Form>
  );
};

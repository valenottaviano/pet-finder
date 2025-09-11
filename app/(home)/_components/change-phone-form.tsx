"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone } from "lucide-react";

import { ChangePhoneSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/app/(auth)/auth/_components/form-error";
import { FormSuccess } from "@/app/(auth)/auth/_components/form-success";
import { updatePhone } from "../_actions/update-phone";

interface ChangePhoneFormProps {
  currentPhone?: string | null;
  hasPassword: boolean;
  onPhoneUpdated?: () => void;
}

export function ChangePhoneForm({
  currentPhone,
  hasPassword,
  onPhoneUpdated,
}: ChangePhoneFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangePhoneSchema>>({
    resolver: zodResolver(ChangePhoneSchema),
    defaultValues: {
      phone: currentPhone || "",
      currentPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePhoneSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      updatePhone(values)
        .then((data) => {
          if (data?.error) {
            setFormError(data.error);
          }

          if (data?.success) {
            setFormSuccess(data.success);
            form.reset();
            onPhoneUpdated?.();
            // Close dialog after a brief delay to show success message
            setTimeout(() => {
              setIsOpen(false);
              setFormSuccess("");
            }, 2000);
          }
        })
        .catch(() => setFormError("¡Algo salió mal!"));
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset({
        phone: currentPhone || "",
        currentPassword: "",
      });
      setFormError("");
      setFormSuccess("");
    }
    setIsOpen(open);
  };

  const formatPhoneDisplay = (phone: string) => {
    // Remove +54 prefix and format for display
    const cleanPhone = phone.replace(/^\+54\s?/, "");
    return `+54 ${cleanPhone}`;
  };

  const generateWhatsAppLink = (phone: string) => {
    // Clean the phone number for WhatsApp (remove spaces and special chars except +)
    const cleanPhone = phone.replace(/\s/g, "");
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Teléfono:</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {currentPhone
              ? formatPhoneDisplay(currentPhone)
              : "No especificado"}
          </span>
          {currentPhone && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-6 w-6 p-0"
              title="Abrir WhatsApp"
            >
              <a
                href={generateWhatsAppLink(currentPhone)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Phone className="mr-2 h-4 w-4" />
            {currentPhone ? "Cambiar teléfono" : "Agregar teléfono"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {currentPhone ? "Cambiar Teléfono" : "Agregar Teléfono"}
            </DialogTitle>
            <DialogDescription>
              {currentPhone
                ? "Modifica tu número de teléfono para que otros usuarios puedan contactarte vía WhatsApp."
                : "Agrega tu número de teléfono para que otros usuarios puedan contactarte vía WhatsApp."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {currentPhone && (
                <div className="text-sm text-muted-foreground">
                  Teléfono actual:{" "}
                  <span className="font-medium">
                    {formatPhoneDisplay(currentPhone)}
                  </span>
                </div>
              )}

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de teléfono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="+54 9 11 12345678"
                        type="tel"
                      />
                    </FormControl>
                    <FormDescription>
                      Formato argentino: +54 9 [área] [número]. Ejemplo: +54 9
                      11 12345678
                      {field.value && (
                        <span className="block mt-1 text-xs">
                          Dejalo vacío para eliminar tu teléfono.
                        </span>
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {hasPassword && (
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña actual</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormError message={formError} />
              <FormSuccess message={formSuccess} />

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isPending}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending ? "Actualizando..." : "Actualizar"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

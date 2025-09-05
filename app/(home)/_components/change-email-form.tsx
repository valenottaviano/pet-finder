"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ChangeEmailSchema } from "@/schemas";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/app/(auth)/auth/_components/form-error";
import { FormSuccess } from "@/app/(auth)/auth/_components/form-success";
import { requestEmailChange } from "../_actions/request-email-change";

interface ChangeEmailFormProps {
  currentEmail: string;
  hasPassword: boolean;
}

export function ChangeEmailForm({
  currentEmail,
  hasPassword,
}: ChangeEmailFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // Check if user has password when form opens
  const toggleForm = async () => {
    if (!isOpen) {
      // Check if user has password before allowing email change
      if (!hasPassword) {
        setFormError(
          "No puedes cambiar tu email porque no tienes contraseña configurada. Configura una contraseña primero."
        );
        return;
      }
    }
    setIsOpen(!isOpen);
    setFormError("");
    setFormSuccess("");
  };
  const form = useForm<z.infer<typeof ChangeEmailSchema>>({
    resolver: zodResolver(ChangeEmailSchema),
    defaultValues: {
      newEmail: "",
      currentPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangeEmailSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      requestEmailChange(values)
        .then((data) => {
          if (data?.error) {
            setFormError(data.error);
          }

          if (data?.success) {
            setFormSuccess(data.success);
            form.reset();
            setIsOpen(false);
          }
        })
        .catch(() => setFormError("¡Algo salió mal!"));
    });
  };

  if (!isOpen) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Email actual:</span>
          <span className="text-sm font-medium">{currentEmail}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleForm}
          className="w-full"
        >
          Cambiar email
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Cambiar Email</h3>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Email actual: <span className="font-medium">{currentEmail}</span>
            </div>

            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nuevo email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="nuevo@email.com"
                      type="email"
                    />
                  </FormControl>
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
          </div>

          <FormError message={formError} />
          <FormSuccess message={formSuccess} />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                form.reset();
                setFormError("");
                setFormSuccess("");
              }}
              disabled={isPending}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Enviando..." : "Enviar código"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

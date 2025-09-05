"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import * as z from "zod";

import { VerifyNewEmailSchema } from "@/schemas";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/app/(auth)/auth/_components/form-error";
import { FormSuccess } from "@/app/(auth)/auth/_components/form-success";
import { verifyEmailChange } from "../_actions/verify-email-change";
import { signOut } from "next-auth/react";

export function VerifyEmailChangeForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof VerifyNewEmailSchema>>({
    resolver: zodResolver(VerifyNewEmailSchema),
    defaultValues: {
      newEmail: "",
      token: token || "",
    },
  });

  const onSubmit = (values: z.infer<typeof VerifyNewEmailSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      verifyEmailChange(values)
        .then((data) => {
          if (data?.error) {
            setFormError(data.error);
          }

          if (data?.success) {
            setFormSuccess(data.success);
            form.reset();

            // If shouldLogout is true, sign out and redirect to login
            if (data.shouldLogout) {
              setTimeout(() => {
                signOut({ callbackUrl: "/auth/login" });
              }, 2000);
            } else {
              // Otherwise redirect to profile
              setTimeout(() => {
                router.push("/home/profile");
              }, 2000);
            }
          }
        })
        .catch(() => setFormError("¡Algo salió mal!"));
    });
  };

  return (
    <Card className="mx-auto max-w-md p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Verificar Nuevo Email
      </h2>
      <p className="text-center text-muted-foreground mb-6">
        Ingresa el código de 6 dígitos que enviamos a tu nuevo email y confirma
        la dirección.
      </p>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de verificación</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} disabled={isPending}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={formError} />
          <FormSuccess message={formSuccess} />

          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? "Verificando..." : "Verificar y cambiar email"}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => router.push("/home/profile")}
              disabled={isPending}
            >
              ← Volver al perfil
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

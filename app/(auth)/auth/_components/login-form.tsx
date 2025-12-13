"use client";

import * as z from "zod";

import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { LoginSchema } from "@/schemas";
import { use, useState, useTransition } from "react";
import { FormError } from "./form-error";
import { login } from "../_actions/login";
import { FormSuccess } from "./form-success";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { resendVerificationCode } from "../_actions/verify-email";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [showResendLink, setShowResendLink] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFormError("");
    setFormSuccess("");
    setShowResendLink(false);

    startTransition(() => {
      login(values)
        .then((response: any) => {
          if (response?.error) {
            form.reset();
            setFormError(response?.error);

            // Show resend link if it's an email verification error
            if (response?.showResendLink) {
              setShowResendLink(true);
              setUserEmail(response?.email || values.email);
            }
          }

          if (response?.success) {
            form.reset();
            router.push(callbackUrl);
          }
        })
        .catch((error: any) => {
          setFormError("¡Algo salió mal!");
        });
    });
  };

  const handleResendCode = () => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      resendVerificationCode(userEmail)
        .then((response: any) => {
          if (response?.error) {
            setFormError(response?.error);
          }
          if (response?.success) {
            setFormSuccess(response?.success);
          }
        })
        .catch((error: any) => {
          setFormError("¡Algo salió mal!");
        });
    });
  };

  return (
    <Card className="p-5 w-full max-w-[400px] mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Iniciar Sesión
      </h2>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <>
                <FormField
                  control={form.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="email"
                          placeholder="john.doe@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"password"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Link
                    href="/auth/reset"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </>
            </div>
            <FormError message={formError} />
            <FormSuccess message={formSuccess} />

            {showResendLink && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  ¿No recibiste el código?
                </p>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendCode}
                  disabled={isPending}
                  className="text-sm"
                >
                  Solicitar nuevo código de verificación
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  O{" "}
                  <Link
                    href={`/auth/verify-email?email=${encodeURIComponent(
                      userEmail
                    )}`}
                    className="text-primary hover:underline"
                  >
                    ir a la página de verificación
                  </Link>
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              Iniciar Sesión
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link
                  href={
                    callbackUrl !== DEFAULT_LOGIN_REDIRECT
                      ? `/auth/register?callbackUrl=${encodeURIComponent(
                          callbackUrl
                        )}`
                      : "/auth/register"
                  }
                  className="text-primary hover:underline"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

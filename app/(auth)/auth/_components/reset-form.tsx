"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
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
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { reset } from "../_actions/reset";

export function ResetForm() {
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setFormError(data.error);
          }

          if (data?.success) {
            form.reset();
            setFormSuccess(data.success);
          }
        })
        .catch(() => setFormError("¡Algo salió mal!"));
    });
  };

  return (
    <Card className="mx-auto max-w-sm p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        ¿Olvidaste tu contraseña?
      </h2>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john@doe.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
          <Button className="w-full" disabled={isPending} type="submit">
            Enviar email de recuperación
          </Button>
        </form>
      </Form>
    </Card>
  );
}

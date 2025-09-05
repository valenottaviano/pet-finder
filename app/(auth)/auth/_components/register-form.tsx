"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { UserRole } from "@prisma/client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

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
import { RegisterSchema } from "@/schemas";
import { register } from "../_actions/register";
import { useRouter } from "next/navigation";

export function RegisterForm({ role }: { role: UserRole }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      register(values, role)
        .then((response: any) => {
          if (response?.error) {
            form.reset();
            setFormError(response?.error);
          }
          if (response?.success) {
            form.reset();
            setFormSuccess(response?.success);

            // Redirect to verification page if redirectTo is provided
            if (response?.redirectTo) {
              setTimeout(() => {
                router.push(response.redirectTo);
              }, 1500);
            } else {
              router.refresh();
            }
          }
        })
        .catch((error: any) => {
          setFormError("Something went wrong!");
        });
    });
  };

  return (
    <Card className="p-5 w-full max-w-[400px] mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Crear Cuenta</h2>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
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
            Crear Cuenta
          </Button>
        </form>
      </Form>
    </Card>
  );
}

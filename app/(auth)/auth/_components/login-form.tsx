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
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");

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

    startTransition(() => {
      login(values)
        .then((response: any) => {
          if (response?.error) {
            form.reset();
            setFormError(response?.error);
          }

          if (response?.success) {
            form.reset();
            setFormSuccess(response?.success);
            router.push("/");
          }
        })
        .catch((error: any) => {
          setFormError("Something went wrong!");
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
              </>
            </div>
            <FormError message={formError} />
            <FormSuccess message={formSuccess} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

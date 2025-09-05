"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Key, Mail } from "lucide-react";
import { FormError } from "@/app/(auth)/auth/_components/form-error";
import { FormSuccess } from "@/app/(auth)/auth/_components/form-success";
import { reset } from "@/app/(auth)/auth/_actions/reset";

interface ChangePasswordButtonProps {
  userEmail: string;
  hasPassword: boolean;
}

export function ChangePasswordButton({
  userEmail,
  hasPassword,
}: ChangePasswordButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleSendResetEmail = () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset({ email: userEmail }).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
          // Close dialog after successful email send
          setTimeout(() => {
            setIsOpen(false);
            setSuccess("");
          }, 3000);
        }
      });
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setError("");
      setSuccess("");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Key className="h-4 w-4" />
          {hasPassword ? "Cambiar contraseña" : "Configurar contraseña"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {hasPassword ? "Cambiar contraseña" : "Configurar contraseña"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hasPassword
              ? "Te enviaremos un email con un enlace para cambiar tu contraseña actual."
              : "Te enviaremos un email con un enlace para configurar tu primera contraseña."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <Mail className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Enviaremos el enlace a: <strong>{userEmail}</strong>
            </span>
          </div>

          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSendResetEmail}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? "Enviando..." : "Enviar enlace"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

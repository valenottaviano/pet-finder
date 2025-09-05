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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteAccount } from "../_actions/delete-account";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Trash2 } from "lucide-react";

interface DeleteAccountButtonProps {
  hasPassword: boolean;
}

export function DeleteAccountButton({ hasPassword }: DeleteAccountButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (hasPassword && !password.trim()) {
      setError("Por favor ingresa tu contraseña");
      return;
    }

    setError("");

    startTransition(() => {
      deleteAccount(password)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            // Account deleted successfully, sign out and redirect
            signOut({ callbackUrl: "/auth/login" });
          }
        })
        .catch(() => {
          setError("Error inesperado al eliminar la cuenta");
        });
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setPassword("");
      setError("");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar cuenta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            cuenta y removerá todos tus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {hasPassword && (
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">
              Confirma tu contraseña para continuar:
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? "Eliminando..." : "Sí, eliminar mi cuenta"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

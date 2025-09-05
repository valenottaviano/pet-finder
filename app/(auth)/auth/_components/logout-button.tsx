"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut()}
      variant="outline"
      className="w-full flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Cerrar Sesión
    </Button>
  );
}

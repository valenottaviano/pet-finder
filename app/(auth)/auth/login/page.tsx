import { UserRole } from "@prisma/client";
import { LoginForm } from "../_components/login-form";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

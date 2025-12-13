import { RegisterForm } from "../_components/register-form";
import { UserRole } from "@prisma/client";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <RegisterForm role={UserRole.USER} />
      </Suspense>
    </div>
  );
}

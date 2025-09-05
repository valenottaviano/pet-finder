import { Suspense } from "react";
import { NewPasswordForm } from "../_components/new-password-form";
import Link from "next/link";

function NewPasswordContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  p-4">
      <NewPasswordForm />
      <div className="mt-4 text-center">
        <Link href="/auth/login" className="text-sm  hover:underline">
          ← Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}

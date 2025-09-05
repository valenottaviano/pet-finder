import { Suspense } from "react";
import { VerifyEmailChangeForm } from "../../../_components/verify-email-change-form";

function VerifyEmailChangeContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <VerifyEmailChangeForm />
    </div>
  );
}

export default function VerifyEmailChangePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <VerifyEmailChangeContent />
    </Suspense>
  );
}

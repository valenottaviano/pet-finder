import { Suspense } from "react";
import { VerifyEmailForm } from "../_components/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}

import { ResetForm } from "../_components/reset-form";
import Link from "next/link";

export default function ResetPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  p-4">
      <ResetForm />
      <div className="mt-4 text-center">
        <Link href="/auth/login" className="text-sm  hover:underline">
          ← Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}

import { UserRole } from "@prisma/client";
import { LoginForm } from "../_components/login-form";

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}

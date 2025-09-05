import { RegisterForm } from "../_components/register-form";
import { UserRole } from "@prisma/client";

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm role={UserRole.USER} />
    </div>
  );
}

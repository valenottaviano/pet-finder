import { RegisterForm } from "../_components/register-form";
import { UserRole } from "@prisma/client";

export default function RegisterPage() {
  return (
    <section>
      <RegisterForm role={UserRole.USER} />
    </section>
  );
}

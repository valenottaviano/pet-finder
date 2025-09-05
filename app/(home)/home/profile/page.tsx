import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/app/(auth)/auth/_components/logout-button";
import { getUserById } from "@/data/user";
import { DeleteAccountButton } from "../../_components/delete-account-button";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const user = session.user;

  // Get full user data to check if they have a password
  const fullUserData = await getUserById(user.id!);
  const hasPassword = !!fullUserData?.password;

  return (
    <main className="p-4 max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <b>Nombre:</b> {user?.name}
        </div>
        <div>
          <b>Email:</b> {user?.email}
        </div>
        {user?.role && (
          <div>
            <b>Rol:</b> {user.role}
          </div>
        )}
        {/* Add more user info fields here if needed */}
      </div>
      <div className="mt-6 space-y-3">
        <LogoutButton />
        <DeleteAccountButton hasPassword={hasPassword} />
      </div>
    </main>
  );
}

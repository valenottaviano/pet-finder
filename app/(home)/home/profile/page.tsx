import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/app/(auth)/auth/_components/logout-button";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const user = session.user;

  return (
    <main className="p-4 max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <b>Name:</b> {user?.name}
        </div>
        <div>
          <b>Email:</b> {user?.email}
        </div>
        {user?.role && (
          <div>
            <b>Role:</b> {user.role}
          </div>
        )}
        {/* Add more user info fields here if needed */}
      </div>
      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}

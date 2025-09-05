import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (!session) redirect("/auth/login");

  return (
    <main className="p-4 flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        <Link href="/home/profile" prefetch={false}>
          <Avatar className="cursor-pointer border-2 border-primary">
            {user?.image ? (
              <AvatarImage
                src={user.image}
                alt={user.name || user.email || "User"}
              />
            ) : (
              <AvatarFallback>
                {user?.name?.[0] || user?.email?.[0] || "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      </div>
      <div>¡Bienvenido a Pet Finder!</div>
    </main>
  );
}

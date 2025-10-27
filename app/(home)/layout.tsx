import { auth } from "@/auth";
import { NavigationBar } from "@/components/navigation-bar";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <NavigationBar />
      <main className="container mx-auto md:pt-20 pb-20 min-h-screen">
        {children}
      </main>
    </>
  );
}

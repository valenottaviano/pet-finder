import { auth } from "@/auth";
import { NavigationBar } from "@/components/navigation-bar";
import { AuthProvider } from "@/components/auth-provider";
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
    <AuthProvider session={session}>
      <NavigationBar />
      <main className="max-w-5xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-background">
        {children}
      </main>
    </AuthProvider>
  );
}

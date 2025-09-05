import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  console.log(user);

  if (!session) redirect("/auth/login");

  return <main className="p-4">Welcome to Pet Finder!</main>;
}

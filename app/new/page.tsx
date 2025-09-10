import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreatePetForm } from "../(home)/_components/create-pet-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function NewPetPage() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/home">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Registrar Nueva Mascota
            </CardTitle>
            <CardDescription className="text-center">
              Completa la información de tu mascota para registrarla en Pet
              Finder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreatePetForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

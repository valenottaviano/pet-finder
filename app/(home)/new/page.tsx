import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreatePetForm } from "../_components/create-pet-form";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { isValidPetCode } from "@/lib/pet-codes";

interface PageProps {
  searchParams: Promise<{
    code?: string;
  }>;
}

export default async function NewPetPage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session) redirect("/auth/login");

  const params = await searchParams;
  const genericCode = params.code;

  // Validate the code format if provided
  const isCodeValid = genericCode ? isValidPetCode(genericCode) : false;

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

        {genericCode && isCodeValid && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <span className="text-blue-700">
                📋 Asignando código QR{" "}
                <span className="font-mono font-bold">{genericCode}</span> a tu
                mascota.
              </span>
            </AlertDescription>
          </Alert>
        )}

        {genericCode && !isCodeValid && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <span className="text-red-700">
                ✗ El código proporcionado no es válido.
              </span>
            </AlertDescription>
          </Alert>
        )}

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
            <CreatePetForm
              existingCode={isCodeValid ? genericCode : undefined}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

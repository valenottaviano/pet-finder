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
import { claimGenericCode } from "../_actions/claim-generic-code";

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

  // If a generic code is provided, claim it automatically
  let claimResult = null;
  if (genericCode) {
    claimResult = await claimGenericCode(genericCode);
  }

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

        {genericCode && claimResult && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {claimResult.success ? (
                <span className="text-green-700">
                  ✓ Código{" "}
                  <span className="font-mono font-bold">{genericCode}</span>{" "}
                  reclamado exitosamente. Completa el formulario para asignarlo
                  a tu mascota.
                </span>
              ) : (
                <span className="text-red-700">✗ {claimResult.error}</span>
              )}
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
              existingCode={claimResult?.success ? genericCode : undefined}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/app/(auth)/auth/_components/logout-button";
import { DeleteAccountButton } from "../../_components/delete-account-button";
import { ChangeEmailForm } from "../../_components/change-email-form";
import { ChangePasswordButton } from "../../_components/change-password-button";
import { ChangePhoneForm } from "../../_components/change-phone-form";
import { getUserById } from "@/data/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Shield,
  Settings,
  LogOut,
  UserX,
  Phone,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const user = session.user;

  // Get full user data to check if they have a password
  const fullUserData = await getUserById(user.id!);
  const hasPassword = !!fullUserData?.password;

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Mi Perfil
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gestiona tu información personal y configuración de cuenta
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information Card */}
          <Card className="md:col-span-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                {user?.name || "Usuario"}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Nombre completo</span>
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 font-medium">
                    {user?.name || "No especificado"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Correo electrónico</span>
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 font-medium">
                    {user?.email || "No especificado"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Teléfono</span>
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 font-medium">
                    {fullUserData?.phone || "No especificado"}
                  </p>
                </div>

                {user?.role && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Rol</span>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {user.role}
                    </Badge>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Seguridad</span>
                  </div>
                  <Badge
                    variant={hasPassword ? "default" : "destructive"}
                    className="w-fit"
                  >
                    {hasPassword ? "Contraseña configurada" : "Sin contraseña"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración de cuenta
              </CardTitle>
              <CardDescription>
                Modifica la configuración de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ChangeEmailForm
                  currentEmail={user?.email || ""}
                  hasPassword={hasPassword}
                />

                <Separator />

                <ChangePhoneForm
                  currentPhone={fullUserData?.phone}
                  hasPassword={hasPassword}
                />

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {hasPassword
                      ? "Cambiar tu contraseña actual"
                      : "Configurar una contraseña para tu cuenta"}
                  </p>
                  <ChangePasswordButton
                    userEmail={user?.email || ""}
                    hasPassword={hasPassword}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5" />
                Acciones de cuenta
              </CardTitle>
              <CardDescription>Gestiona tu sesión y cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Cerrar sesión en todos los dispositivos
                </p>
                <LogoutButton />
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Eliminar permanentemente tu cuenta
                </p>
                <DeleteAccountButton hasPassword={hasPassword} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-6">
          <p>¿Necesitas ayuda? Contacta a nuestro equipo de soporte</p>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Star } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            Planes y Precios
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Elige el plan perfecto para proteger a tu mascota
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Básico
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Perfecto para comenzar a proteger a tu mascota
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    1 mascota registrada
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Código QR digital
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Notificaciones por email
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Ubicación de escaneos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Perfil básico</span>
                </li>
              </ul>
              <Link href="/auth/register" className="block">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Comenzar Gratis
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-primary rounded-2xl p-8 relative hover:shadow-xl transition-shadow bg-primary/5">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Más Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  $9.99
                </span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Para dueños que quieren la mejor protección
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Hasta 5 mascotas registradas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Etiqueta QR física incluida
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Notificaciones SMS + Email
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Historial completo de escaneos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Múltiples contactos de emergencia
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Información médica detallada
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Soporte prioritario
                  </span>
                </li>
              </ul>
              <Link href="/auth/register" className="block">
                <Button className="w-full bg-primary text-foreground hover:bg-primary/90">
                  Comenzar Prueba Gratis
                </Button>
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Premium
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  $19.99
                </span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Para criadores y refugios profesionales
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Mascotas ilimitadas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    5 etiquetas QR físicas/mes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Todo lo del plan Pro
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Panel de administración
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Alertas de comunidad ampliadas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    API para integración
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Gerente de cuenta dedicado
                  </span>
                </li>
              </ul>
              <Link href="/auth/register" className="block">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Contactar Ventas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Preguntas Frecuentes sobre Precios
          </h2>
          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-muted-foreground">
                Sí, puedes actualizar o cambiar tu plan en cualquier momento
                desde tu panel de control. Los cambios se aplican
                inmediatamente.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                ¿Hay período de prueba gratis?
              </h3>
              <p className="text-muted-foreground">
                El plan Pro incluye 14 días de prueba gratis. No necesitas
                tarjeta de crédito para comenzar.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                ¿Qué pasa si cancelo mi suscripción?
              </h3>
              <p className="text-muted-foreground">
                Tu perfil se mantendrá activo hasta el final del período pagado,
                luego se convertirá automáticamente al plan Básico gratuito.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                ¿Ofrecen descuentos por pago anual?
              </h3>
              <p className="text-muted-foreground">
                Sí, ahorra 2 meses pagando anualmente. Contáctanos para más
                información sobre planes anuales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Tienes Preguntas?</h2>
          <p className="text-xl mb-8">
            Nuestro equipo está aquí para ayudarte a elegir el plan perfecto.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Contactar Soporte
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

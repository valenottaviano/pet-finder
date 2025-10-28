import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QrCode, Smartphone, Bell, MapPin, Check } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            ¿Cómo Funciona PetFinder?
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Un sistema simple de 3 pasos para mantener a tu mascota segura
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <span className="text-3xl font-bold text-primary-foreground">
                  1
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Registra Tu Mascota
              </h2>
              <p className="text-muted-foreground mb-6">
                Crea una cuenta gratuita y añade la información de tu mascota:
                nombre, foto, información médica importante y tus datos de
                contacto. Todo en menos de 5 minutos.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Perfil completo con fotos y datos médicos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Genera tu código QR único al instante
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Información privada y segura
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-muted rounded-2xl p-8 flex items-center justify-center h-[400px]">
                <QrCode className="h-64 w-64 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="bg-muted rounded-2xl p-8 flex items-center justify-center h-[400px]">
                <Smartphone className="h-64 w-64 text-muted-foreground" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <span className="text-3xl font-bold text-primary-foreground">
                  2
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Coloca el Código QR en el Collar
              </h2>
              <p className="text-muted-foreground mb-6">
                Descarga e imprime tu código QR, o solicita una etiqueta
                resistente al agua. Colócala en el collar de tu mascota junto
                con su placa de identificación.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Etiquetas resistentes al agua y duraderas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Descarga gratuita para imprimir en casa
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Compatible con cualquier collar o arnés
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <span className="text-3xl font-bold text-primary-foreground">
                  3
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Conexión Instantánea Cuando se Escanea
              </h2>
              <p className="text-muted-foreground mb-6">
                Si tu mascota se pierde y alguien escanea el código QR, reciben
                al instante la información que compartiste. Tú recibes una
                notificación con la ubicación exacta del escaneo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Bell className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Notificación instantánea por email y SMS
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Ubicación GPS del escaneo en tiempo real
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Smartphone className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    No requiere app - funciona con cualquier celular
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-muted rounded-2xl p-8 flex items-center justify-center h-[400px]">
                <Bell className="h-64 w-64 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Características Adicionales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">
                Historial de Escaneos
              </h3>
              <p className="text-muted-foreground">
                Ve todos los escaneos con fecha, hora y ubicación para rastrear
                el recorrido de tu mascota.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">
                Múltiples Contactos
              </h3>
              <p className="text-muted-foreground">
                Añade contactos de emergencia y el veterinario para que reciban
                notificaciones también.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">Información Médica</h3>
              <p className="text-muted-foreground">
                Incluye alergias, medicamentos y condiciones especiales que
                quien encuentre debe conocer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para Proteger a Tu Mascota?
          </h2>
          <p className="text-xl mb-8 text-background/90">
            Comienza en minutos y mantén a tu mejor amigo seguro.
          </p>
          <Link href="/auth/register">
            <Button className="bg-primary text-primary-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Registrar Mi Mascota
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

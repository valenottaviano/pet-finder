import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-foreground">
            Encuentra respuestas a las preguntas más comunes sobre PetFinder
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* General Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">General</h2>
            <div className="space-y-4">
              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Qué es PetFinder?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  PetFinder es un servicio de identificación y localización de
                  mascotas que utiliza códigos QR inteligentes. Cuando alguien
                  encuentra tu mascota y escanea el código QR, te contacta
                  instantáneamente con la ubicación exacta donde fue escaneada.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Cómo funciona el sistema de QR?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Cada mascota recibe un código QR único vinculado a su perfil.
                  Cuando alguien escanea el código con cualquier smartphone,
                  accede a la información que decidiste compartir (nombre,
                  contacto, información médica) y tú recibes una notificación
                  instantánea con la ubicación GPS del escaneo.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Es gratis PetFinder?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Sí, ofrecemos un plan básico completamente gratuito que
                  incluye todas las funciones esenciales para proteger a tu
                  mascota. También tenemos planes premium con características
                  adicionales como etiquetas físicas, múltiples mascotas, y
                  soporte prioritario.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Necesito descargar una app?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  No necesitas descargar ninguna app. El sistema funciona
                  directamente desde el navegador web de cualquier smartphone.
                  Simplemente escanea el código QR con la cámara del celular y
                  se abre automáticamente.
                </p>
              </details>
            </div>
          </div>

          {/* Setup Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Configuración
            </h2>
            <div className="space-y-4">
              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Cómo registro a mi mascota?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Es muy simple: 1) Crea una cuenta gratuita, 2) Completa el
                  perfil de tu mascota con su foto y datos importantes, 3)
                  Genera tu código QR único, 4) Descárgalo e imprímelo, o
                  solicita una etiqueta física. ¡Todo toma menos de 5 minutos!
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Qué información debo incluir?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Recomendamos incluir: nombre de la mascota, tu número de
                  teléfono, email alternativo, información médica importante
                  (alergias, medicamentos), y el nombre de tu veterinario. Tú
                  decides qué información compartir públicamente.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Puedo cambiar la información después?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Sí, puedes actualizar la información de tu mascota en
                  cualquier momento desde tu panel de control. Los cambios se
                  reflejan inmediatamente, no necesitas generar un nuevo código
                  QR.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Cómo obtengo la etiqueta física?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Puedes descargar el código QR e imprimirlo gratis en casa, o
                  solicitar una etiqueta física profesional resistente al agua
                  con los planes Pro o Premium. Las etiquetas se envían a tu
                  domicilio en 3-5 días hábiles.
                </p>
              </details>
            </div>
          </div>

          {/* Usage Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Uso</h2>
            <div className="space-y-4">
              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Qué pasa cuando alguien escanea el código?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Cuando alguien escanea el código QR, ve la información que
                  compartiste sobre tu mascota y puede contactarte directamente.
                  Al mismo tiempo, tú recibes una notificación instantánea por
                  email y/o SMS (según tu plan) con la ubicación GPS exacta
                  donde se escaneó el código.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Cuántas veces se puede escanear el código?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  El código QR puede escanearse ilimitadas veces. Cada escaneo
                  genera una notificación y queda registrado en tu historial con
                  fecha, hora y ubicación.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Puedo tener múltiples mascotas?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  El plan básico permite 1 mascota. El plan Pro permite hasta 5
                  mascotas, y el plan Premium permite mascotas ilimitadas. Cada
                  mascota tiene su propio código QR único y perfil individual.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Funciona en cualquier país?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Sí, PetFinder funciona en todo el mundo. El código QR puede
                  escanearse desde cualquier lugar con conexión a internet. Las
                  notificaciones y el servicio están disponibles
                  internacionalmente.
                </p>
              </details>
            </div>
          </div>

          {/* Security Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Seguridad y Privacidad
            </h2>
            <div className="space-y-4">
              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Es segura mi información personal?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Sí, tu información está protegida con encriptación de nivel
                  bancario. Solo compartes lo que decides mostrar en el perfil
                  público de tu mascota. Tu información personal completa nunca
                  se muestra sin tu permiso.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Quién puede ver mi información de contacto?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Solo las personas que escaneen el código QR de tu mascota
                  verán la información que elijas compartir. Puedes configurar
                  qué datos mostrar: número de teléfono, email, o un formulario
                  de contacto anónimo.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Puedo desactivar temporalmente el código?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Sí, puedes desactivar y reactivar el código QR en cualquier
                  momento desde tu panel de control. Esto es útil si encuentras
                  a tu mascota o si quieres pausar temporalmente las
                  notificaciones.
                </p>
              </details>
            </div>
          </div>

          {/* Technical Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Problemas Técnicos
            </h2>
            <div className="space-y-4">
              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  El código QR no escanea, ¿qué hago?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Asegúrate de que el código QR esté limpio, sin arrugas ni
                  daños. Intenta escanearlo con buena iluminación. Si el
                  problema persiste, puedes generar un nuevo código desde tu
                  panel de control o contactar a soporte.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  No recibo notificaciones
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Verifica tu configuración de notificaciones en el panel de
                  control. Revisa tu carpeta de spam si no recibes emails.
                  Asegúrate de que tu número de teléfono esté verificado para
                  recibir SMS.
                </p>
              </details>

              <details className="bg-muted p-6 rounded-lg group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  ¿Qué pasa si pierdo mi contraseña?
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Puedes restablecer tu contraseña fácilmente desde la página de
                  inicio de sesión usando la opción "Olvidé mi contraseña".
                  Recibirás un enlace de recuperación por email.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Tienes Más Preguntas?</h2>
          <p className="text-xl mb-8">
            Nuestro equipo de soporte está listo para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
                Contactar Soporte
              </Button>
            </Link>
            <Link href="/help">
              <Button
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-foreground text-lg px-8 py-3 rounded-full"
              >
                Centro de Ayuda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

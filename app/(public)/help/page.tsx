import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Book,
  MessageCircle,
  Video,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Centro de Ayuda
          </h1>
          <p className="text-xl text-foreground">
            Documentación y guías de uso del proyecto PetFinder
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            ¿Cómo Podemos Ayudarte?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Getting Started */}
            <Link href="/how-it-works">
              <div className="bg-muted p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <Book className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comenzar</h3>
                <p className="text-muted-foreground">
                  Aprende cómo registrar tu mascota y configurar tu perfil en
                  minutos.
                </p>
              </div>
            </Link>

            {/* FAQ */}
            <Link href="/faq">
              <div className="bg-muted p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <MessageCircle className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Preguntas Frecuentes
                </h3>
                <p className="text-muted-foreground">
                  Encuentra respuestas rápidas a las preguntas más comunes.
                </p>
              </div>
            </Link>

            {/* Video Tutorials */}
            <div className="bg-muted p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Video className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Tutoriales</h3>
              <p className="text-muted-foreground">
                Mira guías paso a paso para aprovechar al máximo PetFinder.
              </p>
            </div>

            {/* Contact Support */}
            <Link href="/contact">
              <div className="bg-muted p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <Mail className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Contactar Soporte
                </h3>
                <p className="text-muted-foreground">
                  Envíanos un mensaje y te responderemos en menos de 24 horas.
                </p>
              </div>
            </Link>

            {/* Phone Support */}
            <div className="bg-muted p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Phone className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Soporte Telefónico</h3>
              <p className="text-muted-foreground mb-3">
                Llámanos de Lunes a Viernes, 9AM - 6PM
              </p>
              <a
                href="tel:+1234567890"
                className="text-yellow-600 font-semibold"
              >
                +123 456 7890
              </a>
            </div>

            {/* Documentation */}
            <div className="bg-muted p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <FileText className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Documentación</h3>
              <p className="text-muted-foreground">
                Guías detalladas y manuales técnicos para usuarios avanzados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Temas Populares
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/help/register-pet">
              <div className="bg-background p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">
                  Cómo registrar mi primera mascota
                </h3>
                <p className="text-muted-foreground text-sm">
                  Guía paso a paso para crear el perfil de tu mascota
                </p>
              </div>
            </Link>
            <Link href="/help/qr-tag">
              <div className="bg-background p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">
                  Cómo usar la etiqueta QR
                </h3>
                <p className="text-muted-foreground text-sm">
                  Todo sobre las etiquetas QR físicas y digitales
                </p>
              </div>
            </Link>
            <Link href="/help/notifications">
              <div className="bg-background p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">
                  Configurar notificaciones
                </h3>
                <p className="text-muted-foreground text-sm">
                  Personaliza cómo y cuándo recibir alertas
                </p>
              </div>
            </Link>
            <Link href="/help/lost-pet">
              <div className="bg-background p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">
                  Qué hacer si mi mascota se pierde
                </h3>
                <p className="text-muted-foreground text-sm">
                  Protocolo de acción y mejores prácticas
                </p>
              </div>
            </Link>
            <Link href="/help/found-pet">
              <div className="bg-background p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">
                  Encontré una mascota con QR
                </h3>
                <p className="text-muted-foreground text-sm">
                  Instrucciones para quien encuentra una mascota
                </p>
              </div>
            </Link>
            <Link href="/help/account">
              <div className="bg-background p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">
                  Gestionar mi cuenta
                </h3>
                <p className="text-muted-foreground text-sm">
                  Cambiar datos, contraseña y configuración
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border-t-4 border-red-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            ¿Tu Mascota Se Ha Perdido Ahora?
          </h2>
          <p className="text-red-800 mb-6">
            Si tu mascota está perdida en este momento, actúa rápidamente:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home/pet">
              <Button className="bg-red-600 text-background hover:bg-red-700">
                Reportar Mascota Perdida
              </Button>
            </Link>
            <a href="tel:+1234567890">
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Llamar Soporte de Emergencia
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿No Encontraste lo que Buscabas?
          </h2>
          <p className="text-xl mb-8">
            Este es un proyecto académico en desarrollo. Tu feedback es muy
            valioso para mejorar la plataforma.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Enviar Feedback
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

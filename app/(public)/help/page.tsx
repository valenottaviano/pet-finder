import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Book,
  MessageCircle,
  Video,
  Mail,
  Phone,
  FileText,
  Search,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-b border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
            Centro de Ayuda
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para aprovechar al máximo PetFinder.
            Guías, tutoriales y soporte.
          </p>
          
          {/* Search Bar Placeholder (Visual only for now) */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-full leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm shadow-sm transition-all hover:shadow-md"
              placeholder="Buscar un tema..."
            />
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            ¿Cómo podemos ayudarte?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/how-it-works" className="group">
              <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 h-full group-hover:bg-accent/5">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  <Book className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Comenzar</h3>
                <p className="text-muted-foreground">
                  Aprende cómo registrar tu mascota y configurar tu perfil en minutos.
                </p>
              </div>
            </Link>

            <Link href="/faq" className="group">
              <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 h-full group-hover:bg-accent/5">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Preguntas Frecuentes</h3>
                <p className="text-muted-foreground">
                  Respuestas rápidas a las dudas más comunes de nuestra comunidad.
                </p>
              </div>
            </Link>

            <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 h-full cursor-pointer hover:bg-accent/5 group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Video Tutoriales</h3>
              <p className="text-muted-foreground">
                Guías paso a paso visuales para dominar todas las funciones.
              </p>
            </div>

            <Link href="/contact" className="group">
              <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 h-full group-hover:bg-accent/5">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Soporte</h3>
                <p className="text-muted-foreground">
                  ¿No encuentras lo que buscas? Escríbenos y te ayudaremos.
                </p>
              </div>
            </Link>

            <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 h-full cursor-pointer hover:bg-accent/5 group">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Teléfono</h3>
              <p className="text-muted-foreground mb-4">
                Línea de atención disponible Lun-Vie, 9AM - 6PM.
              </p>
              <span className="font-semibold text-foreground">+123 456 7890</span>
            </div>

            <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 h-full cursor-pointer hover:bg-accent/5 group">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Documentación</h3>
              <p className="text-muted-foreground">
                Manuales técnicos detallados y referencias del sistema.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Section - Styled as a critical alert card */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
                <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">
                  ¿Emergencia con tu Mascota?
                </h2>
              </div>
              <p className="text-red-800 dark:text-red-200 text-lg mb-6">
                Si has perdido tu mascota en este momento, no pierdas tiempo. Activa la alerta de pérdida inmediatamente.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/home/pet">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 shadow-md hover:shadow-xl transition-all">
                    Reportar Pérdida
                  </Button>
                </Link>
                <a href="tel:+1234567890">
                  <Button variant="outline" size="lg" className="border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full">
                    Llamar Soporte
                  </Button>
                </a>
              </div>
            </div>
            {/* Optional graphic could go here */}
          </div>
        </div>
      </div>

      {/* Popular Topics - Minimal list */}
      <div className="bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Artículos Populares
          </h2>
          <div className="space-y-4">
            {[
              { title: "Cómo registrar mi primera mascota", path: "/help/register-pet" },
              { title: "Cómo funciona la etiqueta QR inteligente", path: "/help/qr-tag" },
              { title: "Configuración de notificaciones de seguridad", path: "/help/notifications" },
              { title: "Protocolo en caso de mascota perdida", path: "/help/lost-pet", highlight: true },
              { title: "Guía para quien encuentra una mascota", path: "/help/found-pet" },
            ].map((topic, i) => (
              <Link key={i} href={topic.path}>
                <div className="bg-background border border-border/50 p-4 sm:p-6 rounded-2xl flex items-center justify-between hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                  <span className={`font-medium ${topic.highlight ? 'text-primary' : 'text-foreground'}`}>
                    {topic.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modern CTA */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Sigues con dudas?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Nuestro equipo de soporte está listo para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
        </p>
        <Link href="/contact">
          <Button variant="default" size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Contactar al Equipo
          </Button>
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PawPrint,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Map,
} from "lucide-react";
import { auth } from "@/auth";
import { getAllLostPetAlerts } from "@/data/pet-alerts";
import { GlobalLostPetsMapWrapper } from "@/app/(home)/_components/global-lost-pets-map-wrapper";

export default async function HomePage() {
  const session = await auth();
  const lostPetAlerts = await getAllLostPetAlerts();

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border shadow-sm z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground"
          >
            <PawPrint className="h-6 w-6 text-primary" />
            PetFinder
          </Link>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/home">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Mi Cuenta
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-foreground hover:text-primary"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="bg-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Nunca Pierdas a Tu Mejor Amigo
              </h1>
              <p className="text-xl sm:text-2xl text-foreground/80 mb-8 max-w-3xl">
                Protege a tus mascotas con códigos QR inteligentes y conecta
                instantáneamente con quien las encuentre. Tu tranquilidad está a
                solo un escaneo de distancia.
              </p>
              <Link href="/auth/register">
                <Button className="bg-foreground text-background text-lg px-8 py-3 rounded-full hover:bg-foreground/90">
                  Registra Tu Mascota Hoy
                </Button>
              </Link>
            </div>
            <div className="order-first lg:order-last">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/foto_1.jpg"
                  alt="Persona feliz abrazando a su perro"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-muted p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Protección con QR Inteligente
              </h3>
              <p className="text-muted-foreground">
                Cada mascota obtiene una etiqueta QR única. Al escanearla,
                conecta instantáneamente a quien la encuentra con el dueño - no
                se requiere app.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-muted p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Seguimiento de Ubicación en Vivo
              </h3>
              <p className="text-muted-foreground">
                Mira dónde fue escaneada tu mascota por última vez. Recibe
                notificaciones en tiempo real y datos de ubicación para guiar tu
                búsqueda.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-muted p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Apoyo Comunitario
              </h3>
              <p className="text-muted-foreground">
                Únete a nuestro foro comunitario donde vecinos ayudan a vecinos.
                Reporta mascotas encontradas y ayuda a otros a reunirse con sus
                seres queridos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Únete a Nuestra Comunidad en Crecimiento
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Conéctate con amantes de las mascotas en tu área. Juntos, creamos
              una comunidad más segura para nuestros amigos peludos.
            </p>
          </div>
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/Community.jpg"
              alt="Comunidad de dueños de mascotas reunidos"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Mascotas Perdidas en Tu Área
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visualiza ubicaciones en tiempo real de mascotas perdidas en tu
              comunidad. Cada marcador representa una mascota esperando ser
              encontrada y reunida con su familia.
            </p>
          </div>
          <div className="w-full h-[600px] bg-background border border-border rounded-xl shadow-inner overflow-hidden">
            <div className="h-full">
              {lostPetAlerts.length > 0 ? (
                <GlobalLostPetsMapWrapper alerts={lostPetAlerts} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">
                      No hay mascotas perdidas reportadas en este momento
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para Proteger a Tu Mascota?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Únete a miles de dueños de mascotas que duermen mejor sabiendo que
            sus mascotas están protegidas con el sistema de rastreo inteligente
            de Petfinder.
          </p>
          <div className="space-x-4">
            <Link href="/auth/register">
              <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
                Comenzar
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-background text-background text-lg px-8 py-3 rounded-full hover:bg-background hover:text-foreground"
              >
                Conocer Más
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-background">
                  PetFinder
                </span>
              </div>
              <p className="text-sm mb-4">
                Protegiendo a tus mascotas con tecnología inteligente. Nunca más
                pierdas a tu mejor amigo.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/auth/register"
                    className="hover:text-primary transition-colors"
                  >
                    Registrar Mascota
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-primary transition-colors"
                  >
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-primary transition-colors"
                  >
                    Precios
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-colors"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-primary transition-colors"
                  >
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-background font-semibold mb-4">Contacto</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-primary" />
                  <a
                    href="mailto:info@petfinder.com"
                    className="hover:text-primary transition-colors"
                  >
                    info@petfinder.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-primary" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-primary transition-colors"
                  >
                    +123 456 7890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <span>
                    123 Pet Street
                    <br />
                    Ciudad, País
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>
                © {new Date().getFullYear()} PetFinder. Todos los derechos
                reservados.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Términos de Uso
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

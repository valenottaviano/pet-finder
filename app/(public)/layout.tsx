import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PawPrint,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { auth } from "@/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

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

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

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
              <h3 className="text-background font-semibold mb-4">
                Enlaces Rápidos
              </h3>
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
              <h3 className="text-background font-semibold mb-4">Soporte</h3>
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

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
  ArrowLeft,
} from "lucide-react";
import { auth } from "@/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Bar - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <PawPrint className="h-5 w-5" />
            <span>PetFinder</span>
          </Link>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/home">
                <Button variant="default" size="sm">
                  Mi Cuenta
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-sm font-normal">
                   Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="default" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content with Top Padding for Fixed Nav */}
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
             {/* Optional Back Button for deeper pages could go here if needed, but keeping it clean for now */}
            {children}
          </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                <PawPrint className="h-5 w-5" />
                <span className="font-semibold text-lg">PetFinder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Diseñado con amor para proteger a quienes más quieres.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Producto</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/how-it-works" className="hover:text-foreground transition-colors">Cómo funciona</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Precios</Link></li>
                <li><Link href="/faqs" className="hover:text-foreground transition-colors">Preguntas frecuentes</Link></li>
              </ul>
            </div>

             <div>
              <h4 className="font-medium mb-4">Compañía</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">Nosotros</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contacto</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacidad</Link></li>
              </ul>
            </div>

             <div>
              <h4 className="font-medium mb-4">Soporte</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Centro de ayuda</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Términos</Link></li>
              </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
           <p>© {new Date().getFullYear()} PetFinder Inc.</p>
           <div className="flex gap-4 mt-4 md:mt-0">
             {/* Social icons could go here */}
           </div>
        </div>
      </footer>
    </div>
  );
}

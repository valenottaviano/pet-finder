import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-border/40 pb-12">
           <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
           </Link>
           <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-muted-foreground text-lg">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-lg text-muted-foreground leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceptación de los Términos</h2>
            <p className="mb-4">
              Bienvenido a PetFinder. Al acceder y utilizar nuestro sitio web, aplicación móvil y servicios, 
              aceptas estar legalmente vinculado por estos Términos y Condiciones de Uso.
            </p>
            <p>
               Este es un proyecto académico. Al usarlo, entiendes que el servicio se proporciona "tal cual" 
               con fines educativos y demostrativos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Descripción del Servicio</h2>
            <p className="mb-4">
              PetFinder proporciona un sistema de identificación y recuperación de mascotas mediante tecnología QR.
              El servicio permite registrar perfiles de mascotas, generar códigos QR únicos y recibir alertas de escaneo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Registro y Cuentas</h2>
            <p className="mb-4">
               Para utilizar ciertas funciones, debes crear una cuenta. Te comprometes a proporcionar información 
               veraz y mantener la seguridad de tus credenciales de acceso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Uso Aceptable</h2>
            <p className="mb-4">
               Te comprometes a no utilizar el servicio para fines ilegales, fraudulentos o que violen los derechos de terceros.
               Queda prohibido el intento de ingeniería inversa, scraping o ataques a la infraestructura.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitación de Responsabilidad</h2>
            <p className="mb-4">
               PetFinder no garantiza la recuperación de mascotas perdidas. La plataforma es una herramienta de ayuda 
               que depende de la colaboración comunitaria y el correcto funcionamiento de tecnologías de terceros (GPS, Internet).
            </p>
            <p className="font-medium text-foreground/80">
               En ningún caso PetFinder será responsable por daños directos, indirectos o incidentales derivados del uso del servicio.
            </p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-foreground mb-4">6. Modificaciones</h2>
             <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio 
                implica la aceptación de los nuevos términos.
             </p>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-16 border-t border-border/40 text-center">
           <p className="mb-6 text-muted-foreground">¿Dudas sobre los términos?</p>
           <Link href="/contact">
             <Button variant="outline" className="rounded-full px-8">Contactar Legal</Button>
           </Link>
        </div>

      </div>
    </div>
  );
}

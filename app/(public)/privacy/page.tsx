import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Política de Privacidad
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

        {/* Content - Using standard Tailwind Typography classes if available or custom styles */}
        <div className="space-y-12 text-lg text-muted-foreground leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introducción</h2>
            <p className="mb-4">
              En PetFinder, nos tomamos muy en serio tu privacidad. Esta Política de Privacidad describe cómo recopilamos, 
              usamos, compartimos y protegemos tu información personal cuando utilizas nuestros servicios.
            </p>
            <p>
              Al utilizar PetFinder, aceptas las prácticas descritas en esta política. 
              Si no estás de acuerdo con algún aspecto de esta política, por favor no utilices nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Información que Recopilamos</h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Información que Proporcionas Directamente</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Información de cuenta:</strong> nombre, dirección de email, contraseña, número de teléfono.</li>
              <li><strong>Información de mascotas:</strong> nombre, especie, raza, edad, características, fotos.</li>
              <li><strong>Información de contacto:</strong> números adicionales, contactos de emergencia.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Información Recopilada Automáticamente</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Datos de ubicación:</strong> ubicación GPS aproximada cuando se escanea un código QR.</li>
              <li><strong>Información del dispositivo:</strong> tipo de dispositivo, navegador, dirección IP.</li>
              <li><strong>Datos de uso:</strong> interacciones con el servicio y análisis de rendimiento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Seguridad de los Datos</h2>
            <p className="mb-4">
               Implementamos medidas de seguridad técnicas y organizativas robustas para proteger tu información, incluyendo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
               <li>Encriptación SSL/TLS para todas las transmisiones.</li>
               <li>Controles de acceso estrictos a la base de datos.</li>
               <li>Auditorías de seguridad regulares.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Tus Derechos</h2>
            <p className="mb-4">
               Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento.
               Para ejercer estos derechos, puedes gestionar tu cuenta desde el panel de usuario o contactarnos directamente.
            </p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-foreground mb-4">5. Contacto</h2>
             <p>
                Si tienes preguntas sobre nuestra política de privacidad, no dudes en contactarnos en 
                <a href="mailto:privacy@petfinder.com" className="text-primary hover:underline ml-1">privacy@petfinder.com</a>.
             </p>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-16 border-t border-border/40 text-center">
           <p className="mb-6 text-muted-foreground">¿Tienes más preguntas?</p>
           <Link href="/contact">
             <Button variant="outline" className="rounded-full px-8">Contactar Soporte</Button>
           </Link>
        </div>

      </div>
    </div>
  );
}

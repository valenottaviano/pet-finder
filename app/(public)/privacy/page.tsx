import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Política de Privacidad
          </h1>
          <p className="text-xl text-foreground">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              1. Introducción
            </h2>
            <p className="text-muted-foreground mb-4">
              En PetFinder, nos tomamos muy en serio tu privacidad. Esta
              Política de Privacidad describe cómo recopilamos, usamos,
              compartimos y protegemos tu información personal cuando utilizas
              nuestros servicios.
            </p>
            <p className="text-muted-foreground mb-4">
              Al utilizar PetFinder, aceptas las prácticas descritas en esta
              política. Si no estás de acuerdo con algún aspecto de esta
              política, por favor no utilices nuestros servicios.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. Información que Recopilamos
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              2.1 Información que Proporcionas Directamente
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Información de cuenta:</strong> nombre, dirección de
                email, contraseña, número de teléfono
              </li>
              <li>
                <strong>Información de mascotas:</strong> nombre, especie, raza,
                edad, características físicas, fotos, información médica
              </li>
              <li>
                <strong>Información de contacto:</strong> números de teléfono
                adicionales, contactos de emergencia, información del
                veterinario
              </li>
              <li>
                <strong>Información de pago:</strong> datos de tarjeta de
                crédito o débito (procesados de forma segura por nuestros
                proveedores de pago)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              2.2 Información Recopilada Automáticamente
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Datos de ubicación:</strong> ubicación GPS cuando se
                escanea un código QR
              </li>
              <li>
                <strong>Información del dispositivo:</strong> tipo de
                dispositivo, sistema operativo, navegador, dirección IP
              </li>
              <li>
                <strong>Datos de uso:</strong> páginas visitadas, funciones
                utilizadas, tiempo de uso, interacciones con el servicio
              </li>
              <li>
                <strong>Cookies y tecnologías similares:</strong> para mejorar
                tu experiencia y analizar el uso del servicio
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. Cómo Usamos Tu Información
            </h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Proporcionar y mantener nuestros servicios</li>
              <li>
                Procesar transacciones y enviar notificaciones relacionadas
              </li>
              <li>
                Enviar notificaciones cuando tu mascota sea escaneada,
                incluyendo ubicación GPS
              </li>
              <li>
                Comunicarnos contigo sobre actualizaciones, nuevas funciones y
                ofertas
              </li>
              <li>Mejorar, personalizar y expandir nuestros servicios</li>
              <li>
                Analizar cómo se utiliza el servicio para optimizar la
                experiencia del usuario
              </li>
              <li>Detectar, prevenir y abordar problemas técnicos</li>
              <li>
                Cumplir con obligaciones legales y hacer cumplir nuestros
                términos de servicio
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. Compartir Tu Información
            </h2>
            <p className="text-muted-foreground mb-4">
              Compartimos tu información solo en las siguientes circunstancias:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Con personas que escanean tu código QR:</strong> Solo la
                información que elijas hacer pública en el perfil de tu mascota
              </li>
              <li>
                <strong>Con proveedores de servicios:</strong> Empresas que nos
                ayudan a operar nuestro servicio (hosting, procesamiento de
                pagos, análisis, email)
              </li>
              <li>
                <strong>Por razones legales:</strong> Si es requerido por ley o
                para proteger nuestros derechos
              </li>
              <li>
                <strong>Transferencias comerciales:</strong> En caso de fusión,
                venta o transferencia de activos
              </li>
              <li>
                <strong>Con tu consentimiento:</strong> Para cualquier otro
                propósito con tu autorización explícita
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>
                Nunca vendemos tu información personal a terceros.
              </strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. Seguridad de los Datos
            </h2>
            <p className="text-muted-foreground mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger tu información:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                Encriptación SSL/TLS para todas las transmisiones de datos
              </li>
              <li>Encriptación de datos sensibles en reposo</li>
              <li>
                Controles de acceso estrictos y autenticación de múltiples
                factores
              </li>
              <li>Auditorías de seguridad regulares</li>
              <li>Cumplimiento con estándares de la industria</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Sin embargo, ningún método de transmisión por Internet o
              almacenamiento electrónico es 100% seguro. Aunque nos esforzamos
              por proteger tu información, no podemos garantizar su seguridad
              absoluta.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. Tus Derechos
            </h2>
            <p className="text-muted-foreground mb-4">
              Dependiendo de tu ubicación, puedes tener los siguientes derechos:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Acceso:</strong> Solicitar una copia de tu información
                personal
              </li>
              <li>
                <strong>Corrección:</strong> Actualizar o corregir tu
                información
              </li>
              <li>
                <strong>Eliminación:</strong> Solicitar la eliminación de tu
                información (derecho al olvido)
              </li>
              <li>
                <strong>Portabilidad:</strong> Recibir tu información en un
                formato estructurado y comúnmente utilizado
              </li>
              <li>
                <strong>Objeción:</strong> Oponerte al procesamiento de tu
                información
              </li>
              <li>
                <strong>Restricción:</strong> Solicitar que limitemos el
                procesamiento de tu información
              </li>
              <li>
                <strong>Retirar consentimiento:</strong> Donde el procesamiento
                se base en tu consentimiento
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Para ejercer estos derechos, contáctanos en{" "}
              <a
                href="mailto:privacy@petfinder.com"
                className="text-yellow-600 hover:underline"
              >
                privacy@petfinder.com
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              7. Retención de Datos
            </h2>
            <p className="text-muted-foreground mb-4">
              Retenemos tu información personal mientras tu cuenta esté activa o
              según sea necesario para proporcionarte servicios. También
              retenemos y utilizamos tu información según sea necesario para
              cumplir con nuestras obligaciones legales, resolver disputas y
              hacer cumplir nuestros acuerdos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              8. Privacidad de Menores
            </h2>
            <p className="text-muted-foreground mb-4">
              Nuestros servicios no están dirigidos a menores de 13 años. No
              recopilamos intencionalmente información personal de niños menores
              de 13 años. Si descubres que un menor nos ha proporcionado
              información personal, contáctanos de inmediato.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              9. Transferencias Internacionales
            </h2>
            <p className="text-muted-foreground mb-4">
              Tu información puede ser transferida y mantenida en servidores
              ubicados fuera de tu país de residencia. Al usar nuestros
              servicios, consientes estas transferencias. Tomamos medidas para
              garantizar que tu información reciba un nivel adecuado de
              protección.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              10. Cambios a Esta Política
            </h2>
            <p className="text-muted-foreground mb-4">
              Podemos actualizar esta Política de Privacidad periódicamente. Te
              notificaremos sobre cambios significativos publicando la nueva
              política en esta página y actualizando la fecha de &ldquo;última
              actualización&rdquo;. Te recomendamos revisar esta política
              periódicamente.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              11. Contacto
            </h2>
            <p className="text-muted-foreground mb-4">
              Si tienes preguntas o inquietudes sobre esta Política de
              Privacidad, contáctanos:
            </p>
            <ul className="list-none text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@petfinder.com"
                  className="text-yellow-600 hover:underline"
                >
                  privacy@petfinder.com
                </a>
              </li>
              <li>
                <strong>Teléfono:</strong> +123 456 7890
              </li>
              <li>
                <strong>Dirección:</strong> 123 Pet Street, Ciudad, País
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Tienes Preguntas sobre Privacidad?
          </h2>
          <p className="text-xl mb-8">
            Estamos comprometidos con la protección de tu privacidad.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

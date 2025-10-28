import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Términos y Condiciones de Uso
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
              1. Aceptación de los Términos
            </h2>
            <p className="text-muted-foreground mb-4">
              Bienvenido a PetFinder. Al acceder y utilizar nuestro sitio web,
              aplicación móvil y servicios (colectivamente, el
              &ldquo;Servicio&rdquo;), aceptas estar legalmente vinculado por
              estos Términos y Condiciones de Uso (&ldquo;Términos&rdquo;).
            </p>
            <p className="text-muted-foreground mb-4">
              Si no estás de acuerdo con estos Términos, no utilices nuestro
              Servicio. Podemos modificar estos Términos en cualquier momento, y
              tu uso continuado del Servicio constituye tu aceptación de los
              Términos modificados.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. Descripción del Servicio
            </h2>
            <p className="text-muted-foreground mb-4">
              PetFinder proporciona un servicio de identificación y localización
              de mascotas mediante códigos QR. El Servicio permite a los
              usuarios:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Registrar información sobre sus mascotas</li>
              <li>Generar códigos QR únicos para cada mascota</li>
              <li>
                Recibir notificaciones cuando alguien escanee el código QR de su
                mascota
              </li>
              <li>Acceder a la ubicación GPS donde se escaneó el código</li>
              <li>
                Compartir información de contacto con personas que encuentren a
                su mascota
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. Registro de Cuenta
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              3.1 Requisitos de Registro
            </h3>
            <p className="text-muted-foreground mb-4">
              Para utilizar ciertas funciones del Servicio, debes crear una
              cuenta. Al registrarte, aceptas:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Proporcionar información precisa, actual y completa</li>
              <li>Mantener y actualizar tu información de forma oportuna</li>
              <li>Mantener la seguridad de tu contraseña</li>
              <li>
                Aceptar la responsabilidad de toda actividad bajo tu cuenta
              </li>
              <li>
                Notificarnos inmediatamente de cualquier uso no autorizado
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              3.2 Elegibilidad
            </h3>
            <p className="text-muted-foreground mb-4">
              Debes tener al menos 13 años de edad para usar el Servicio. Si
              eres menor de 18 años, debes tener el permiso de tus padres o
              tutores legales.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. Uso Aceptable
            </h2>
            <p className="text-muted-foreground mb-4">
              Al usar el Servicio, aceptas NO:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                Violar ninguna ley o regulación local, estatal, nacional o
                internacional
              </li>
              <li>Infringir los derechos de propiedad intelectual de otros</li>
              <li>Transmitir material ofensivo, difamatorio o ilegal</li>
              <li>
                Intentar obtener acceso no autorizado a cualquier parte del
                Servicio
              </li>
              <li>Interferir con o interrumpir el Servicio</li>
              <li>
                Usar el Servicio para cualquier propósito comercial no
                autorizado
              </li>
              <li>
                Recopilar información de otros usuarios sin su consentimiento
              </li>
              <li>Crear cuentas falsas o múltiples con fines fraudulentos</li>
              <li>
                Usar robots, scrapers u otros medios automatizados para acceder
                al Servicio
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. Contenido del Usuario
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              5.1 Propiedad del Contenido
            </h3>
            <p className="text-muted-foreground mb-4">
              Mantienes todos los derechos sobre el contenido que subes al
              Servicio (fotos, información de mascotas, etc.). Sin embargo, al
              subir contenido, nos otorgas una licencia mundial, no exclusiva,
              libre de regalías para usar, reproducir, modificar y mostrar ese
              contenido en relación con el Servicio.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              5.2 Responsabilidad del Contenido
            </h3>
            <p className="text-muted-foreground mb-4">
              Eres el único responsable del contenido que subes. Garantizas que:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Tienes derecho a subir el contenido</li>
              <li>El contenido no infringe derechos de terceros</li>
              <li>El contenido no es ilegal, ofensivo o inapropiado</li>
              <li>El contenido no contiene virus o código malicioso</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. Planes de Pago y Facturación
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              6.1 Planes Premium
            </h3>
            <p className="text-muted-foreground mb-4">
              Ofrecemos planes de pago con características adicionales. Al
              suscribirte a un plan de pago:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Autorizas cargos recurrentes en tu método de pago</li>
              <li>Aceptas que los precios pueden cambiar con aviso previo</li>
              <li>
                Entiendes que las suscripciones se renuevan automáticamente
              </li>
              <li>Puedes cancelar en cualquier momento desde tu cuenta</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              6.2 Reembolsos
            </h3>
            <p className="text-muted-foreground mb-4">
              Los pagos son no reembolsables excepto donde lo requiera la ley o
              a nuestra discreción. Si cancelas tu suscripción, mantendrás
              acceso a las funciones premium hasta el final del período pagado.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              7. Propiedad Intelectual
            </h2>
            <p className="text-muted-foreground mb-4">
              El Servicio y su contenido original (excluyendo el contenido del
              usuario), características y funcionalidad son y permanecerán
              propiedad exclusiva de PetFinder y sus licenciantes. El Servicio
              está protegido por derechos de autor, marcas comerciales y otras
              leyes.
            </p>
            <p className="text-muted-foreground mb-4">
              Nuestra marca comercial y marcas comerciales no pueden usarse en
              conexión con ningún producto o servicio sin nuestro consentimiento
              previo por escrito.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              8. Limitación de Responsabilidad
            </h2>
            <p className="text-muted-foreground mb-4">
              EL SERVICIO SE PROPORCIONA &ldquo;TAL CUAL&rdquo; Y &ldquo;SEGÚN
              DISPONIBILIDAD&rdquo;. HASTA EL MÁXIMO PERMITIDO POR LA LEY:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>
                No garantizamos que el Servicio será ininterrumpido, seguro o
                libre de errores
              </li>
              <li>
                No somos responsables por mascotas perdidas o no encontradas
              </li>
              <li>
                No somos responsables por la exactitud de la información
                proporcionada por usuarios
              </li>
              <li>
                No somos responsables por las acciones de personas que escanean
                códigos QR
              </li>
              <li>
                Nuestra responsabilidad total no excederá el monto que pagaste
                en los últimos 12 meses
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">
              El Servicio es una herramienta de asistencia y no reemplaza las
              medidas tradicionales de identificación de mascotas ni garantiza
              su recuperación.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              9. Indemnización
            </h2>
            <p className="text-muted-foreground mb-4">
              Aceptas indemnizar, defender y mantener indemne a PetFinder, sus
              oficiales, directores, empleados y agentes de cualquier reclamo,
              daño, obligación, pérdida, responsabilidad, costo o deuda, y gasto
              (incluyendo honorarios legales) que surja de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Tu uso y acceso al Servicio</li>
              <li>Tu violación de estos Términos</li>
              <li>Tu violación de los derechos de terceros</li>
              <li>Cualquier contenido que subas al Servicio</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              10. Terminación
            </h2>
            <p className="text-muted-foreground mb-4">
              Podemos terminar o suspender tu cuenta y acceso al Servicio
              inmediatamente, sin aviso previo o responsabilidad, por cualquier
              razón, incluyendo si violas estos Términos.
            </p>
            <p className="text-muted-foreground mb-4">
              Puedes terminar tu cuenta en cualquier momento desde la
              configuración de tu cuenta. Tras la terminación, tu derecho a usar
              el Servicio cesará inmediatamente.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              11. Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-muted-foreground mb-4">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              del país/estado donde está registrada PetFinder, sin tener en
              cuenta sus disposiciones sobre conflictos de leyes.
            </p>
            <p className="text-muted-foreground mb-4">
              Cualquier disputa que surja de o relacionada con estos Términos se
              resolverá en los tribunales competentes de nuestra jurisdicción.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              12. Disposiciones Generales
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              12.1 Cambios a los Términos
            </h3>
            <p className="text-muted-foreground mb-4">
              Nos reservamos el derecho de modificar estos Términos en cualquier
              momento. Te notificaremos sobre cambios materiales por email o
              mediante un aviso destacado en el Servicio.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              12.2 Acuerdo Completo
            </h3>
            <p className="text-muted-foreground mb-4">
              Estos Términos constituyen el acuerdo completo entre tú y
              PetFinder con respecto al Servicio y reemplazan todos los acuerdos
              anteriores.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              12.3 Divisibilidad
            </h3>
            <p className="text-muted-foreground mb-4">
              Si alguna disposición de estos Términos se considera inválida o
              inaplicable, las disposiciones restantes continuarán en pleno
              vigor y efecto.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              12.4 Renuncia
            </h3>
            <p className="text-muted-foreground mb-4">
              Ninguna renuncia a cualquier término de estos Términos se
              considerará una renuncia adicional o continua de tal término o
              cualquier otro término.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              13. Contacto
            </h2>
            <p className="text-muted-foreground mb-4">
              Si tienes preguntas sobre estos Términos, contáctanos:
            </p>
            <ul className="list-none text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@petfinder.com"
                  className="text-yellow-600 hover:underline"
                >
                  legal@petfinder.com
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
            ¿Preguntas sobre los Términos?
          </h2>
          <p className="text-xl mb-8">
            Estamos aquí para aclarar cualquier duda que tengas.
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

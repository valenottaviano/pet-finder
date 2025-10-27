import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie, Shield, Eye, Settings } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-foreground rounded-full mb-6">
            <Cookie className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Política de Cookies
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
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ¿Qué son las Cookies?
            </h2>
            <p className="text-muted-foreground mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo (computadora, tablet o teléfono móvil) cuando visitas
              un sitio web. Nos ayudan a hacer que el sitio web funcione de
              manera más eficiente, mejoran tu experiencia y nos proporcionan
              información sobre cómo utilizas nuestro servicio.
            </p>
            <p className="text-muted-foreground mb-4">
              En PetFinder, utilizamos cookies y tecnologías similares para
              proporcionar, proteger y mejorar nuestros servicios.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Tipos de Cookies que Utilizamos
            </h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Cookies Esenciales
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Estas cookies son necesarias para que el sitio web
                      funcione correctamente. No puedes desactivarlas sin
                      afectar el funcionamiento del sitio.
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Propósito:</strong>
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Mantener tu sesión iniciada</li>
                      <li>Recordar tus preferencias de seguridad</li>
                      <li>Habilitar funciones básicas del sitio</li>
                      <li>Proteger contra fraudes y mantener la seguridad</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Cookies de Análisis
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Estas cookies nos ayudan a entender cómo los visitantes
                      interactúan con nuestro sitio web, recopilando información
                      de forma anónima.
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Propósito:</strong>
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Contar visitantes y medir el tráfico</li>
                      <li>Ver qué páginas son más populares</li>
                      <li>Identificar problemas técnicos</li>
                      <li>Mejorar el rendimiento del sitio</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      <strong>Proveedores:</strong> Google Analytics
                    </p>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Settings className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Cookies Funcionales
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Estas cookies permiten que el sitio web recuerde tus
                      elecciones y proporcione funciones mejoradas y más
                      personales.
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Propósito:</strong>
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Recordar tus preferencias de idioma</li>
                      <li>Guardar tus opciones de visualización</li>
                      <li>Recordar tu región o ubicación</li>
                      <li>Personalizar el contenido para ti</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Cookie className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Cookies de Marketing
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Estas cookies se utilizan para rastrear visitantes en
                      sitios web con el propósito de mostrar anuncios
                      relevantes.
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Propósito:</strong>
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Mostrar publicidad relevante</li>
                      <li>Medir la efectividad de campañas</li>
                      <li>Limitar el número de veces que ves un anuncio</li>
                      <li>Entender cómo llegaste a nuestro sitio</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      <strong>Proveedores:</strong> Facebook Pixel, Google Ads
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cookies Específicas que Utilizamos
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-background border border-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Duración
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Propósito
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      session_id
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Esencial
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Sesión</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Mantiene tu sesión iniciada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-muted-foreground">_ga</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Análisis
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">2 años</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Google Analytics - distingue usuarios
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-muted-foreground">_gid</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Análisis
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      24 horas
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Google Analytics - distingue usuarios
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      preferences
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Funcional
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">1 año</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Guarda tus preferencias de usuario
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-muted-foreground">_fbp</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Marketing
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">3 meses</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Facebook Pixel - rastreo de conversiones
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cómo Controlar las Cookies
            </h2>
            <p className="text-muted-foreground mb-4">
              Tienes el derecho de decidir si aceptas o rechazas cookies. Puedes
              ejercer tus preferencias de cookies de las siguientes maneras:
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              Configuración del Navegador
            </h3>
            <p className="text-muted-foreground mb-4">
              La mayoría de los navegadores web te permiten controlar las
              cookies a través de su configuración. Para saber más sobre
              cookies, incluyendo cómo ver qué cookies se han establecido y cómo
              gestionarlas y eliminarlas, visita:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-1">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/es-es/microsoft-edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              Opt-Out de Cookies de Análisis
            </h3>
            <p className="text-muted-foreground mb-4">
              Puedes optar por no participar en el seguimiento de Google
              Analytics instalando el{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:underline"
              >
                complemento de inhabilitación de Google Analytics
              </a>
              .
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded mt-6">
              <p className="text-foreground">
                <strong>Nota Importante:</strong> Si eliges rechazar las
                cookies, algunas funciones del sitio web pueden no funcionar
                correctamente. Las cookies esenciales no se pueden desactivar ya
                que son necesarias para el funcionamiento básico del sitio.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cambios en Esta Política
            </h2>
            <p className="text-muted-foreground mb-4">
              Podemos actualizar esta Política de Cookies ocasionalmente para
              reflejar cambios en las cookies que utilizamos o por otras razones
              operativas, legales o regulatorias. Te recomendamos revisar esta
              política periódicamente para mantenerte informado sobre cómo
              utilizamos las cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Más Información
            </h2>
            <p className="text-muted-foreground mb-4">
              Si tienes preguntas sobre nuestra política de cookies o cómo
              utilizamos las cookies, contáctanos:
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
            </ul>
            <p className="text-muted-foreground">
              Para más información sobre cómo protegemos tu privacidad, consulta
              nuestra{" "}
              <Link href="/privacy" className="text-yellow-600 hover:underline">
                Política de Privacidad
              </Link>
              .
            </p>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Preguntas sobre Cookies?</h2>
          <p className="text-xl mb-8">
            Estamos comprometidos con la transparencia sobre cómo utilizamos las
            cookies.
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

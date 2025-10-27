import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-foreground">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos
            pronto.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Envíanos un Mensaje
              </h2>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos más sobre tu consulta..."
                    rows={6}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-foreground hover:bg-primary/90 text-lg py-6"
                >
                  Enviar Mensaje
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4">
                * Campos obligatorios. Responderemos en menos de 24 horas.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:info@petfinder.com"
                        className="hover:text-yellow-600"
                      >
                        info@petfinder.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:soporte@petfinder.com"
                        className="hover:text-yellow-600"
                      >
                        soporte@petfinder.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">
                      <a
                        href="tel:+1234567890"
                        className="hover:text-yellow-600"
                      >
                        +123 456 7890
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Lunes a Viernes, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      123 Pet Street
                      <br />
                      Ciudad, Provincia
                      <br />
                      País, CP 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Horario de Atención
                    </h3>
                    <p className="text-muted-foreground">
                      Lunes a Viernes: 9:00 AM - 6:00 PM
                      <br />
                      Sábado: 10:00 AM - 2:00 PM
                      <br />
                      Domingo: Cerrado
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-6 rounded">
                <h3 className="font-semibold text-lg text-red-900 mb-2">
                  ¿Emergencia?
                </h3>
                <p className="text-red-800 mb-3">
                  Si tu mascota está perdida ahora mismo, no esperes:
                </p>
                <Button className="bg-red-600 text-background hover:bg-red-700">
                  Reportar Mascota Perdida
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Nuestra Ubicación
          </h2>
          <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Mapa de Google Maps aquí</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Prefieres Hablar Directamente?
          </h2>
          <p className="text-xl mb-8">
            Llámanos y estaremos encantados de ayudarte en tiempo real.
          </p>
          <a href="tel:+1234567890">
            <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Llamar Ahora
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

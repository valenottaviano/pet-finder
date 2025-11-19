import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Users } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Contacto
          </h1>
          <p className="text-xl text-foreground">
            Proyecto de tesis - Ingeniería en Informática. Enviá tus consultas,
            sugerencias o reportes de errores.
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
                Enviá tu Consulta o Feedback
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
                * Campos obligatorios. Este es un proyecto académico,
                responderemos a la brevedad según disponibilidad.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Información del Proyecto
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
                        href="mailto:valentinottaviano@gmail.com"
                        className="hover:text-yellow-600"
                      >
                        valentinottaviano@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Autor</h3>
                    <p className="text-muted-foreground">Valentín Ottaviano</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Estudiante de Ingeniería en Informática
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Institución</h3>
                    <p className="text-muted-foreground">
                      Universidad del Norte Santo Tomás de Aquino (UNSTA)
                      <br />
                      Carrera: Ingeniería en Informática
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Estado del Proyecto
                    </h3>
                    <p className="text-muted-foreground">
                      Proyecto de tesis en desarrollo
                      <br />
                      Año: 2025
                      <br />
                      Fase: Implementación y pruebas
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                <h3 className="font-semibold text-lg text-blue-900 mb-2">
                  Proyecto Académico
                </h3>
                <p className="text-blue-800 mb-3">
                  Este es un proyecto de tesis en desarrollo activo. Tu feedback
                  es fundamental para mejorar la plataforma y completar la
                  investigación.
                </p>
                <p className="text-sm text-blue-700">
                  Todas las funcionalidades están disponibles para pruebas y
                  evaluación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Info Section */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Sobre el Proyecto de Tesis
          </h2>
          <div className="max-w-3xl mx-auto bg-background p-8 rounded-xl">
            <p className="text-muted-foreground mb-4">
              <strong>Título:</strong> Sistema de Identificación y Recuperación
              de Mascotas mediante Códigos QR
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Objetivo:</strong> Desarrollar una plataforma web que
              facilite la recuperación de mascotas perdidas utilizando
              tecnología de códigos QR, geolocalización y notificaciones en
              tiempo real.
            </p>
            <p className="text-muted-foreground">
              <strong>Tecnologías:</strong> Next.js, React, TypeScript, Prisma,
              PostgreSQL, NextAuth, Tailwind CSS, y servicios de
              geolocalización.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Querés Colaborar con el Proyecto?
          </h2>
          <p className="text-xl mb-8">
            Tu participación y feedback son valiosos para el desarrollo de esta
            tesis. Probá la plataforma y compartí tu experiencia.
          </p>
          <Link href="/auth/register">
            <Button className="bg-primary text-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Comenzar a Probar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

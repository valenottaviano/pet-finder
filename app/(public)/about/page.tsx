import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PawPrint, Heart, Shield, Users, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            Sobre PetFinder
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Proyecto de tesis de Ingeniería en Informática que busca
            revolucionar la forma en que protegemos a nuestras mascotas mediante
            tecnología QR.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                El Proyecto
              </h2>
              <p className="text-muted-foreground mb-4">
                PetFinder es un proyecto de tesis de la carrera de Ingeniería en
                Informática desarrollado por Valentín Ottaviano. Este trabajo
                académico propone una solución innovadora al problema de las
                mascotas perdidas mediante el uso de códigos QR y tecnología web
                moderna.
              </p>
              <p className="text-gray-600 mb-4">
                El objetivo principal es demostrar cómo las tecnologías actuales
                pueden aplicarse para resolver problemas reales de la comunidad,
                creando un sistema accesible, fácil de usar y efectivo que
                conecte instantáneamente a las mascotas perdidas con sus dueños.
              </p>
              <p className="text-gray-600">
                Este proyecto combina conceptos de desarrollo web full-stack,
                bases de datos, geolocalización y notificaciones en tiempo real
                para crear una plataforma integral de protección de mascotas.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/foto_1.jpg"
                alt="Historia de PetFinder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Objetivos del Proyecto
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Solución Real</h3>
              <p className="text-muted-foreground">
                Abordar un problema real de la comunidad con tecnología
                accesible y efectiva.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tecnología Moderna</h3>
              <p className="text-muted-foreground">
                Implementar las mejores prácticas de desarrollo web y seguridad
                de datos.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accesibilidad</h3>
              <p className="text-muted-foreground">
                Crear una plataforma intuitiva que cualquier persona pueda usar
                sin dificultad.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-muted-foreground">
                Demostrar cómo la tecnología puede mejorar la vida de las
                personas y sus mascotas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Tecnologías Utilizadas
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">
                Next.js
              </div>
              <div className="text-xl text-muted-foreground">
                Framework Full-Stack
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">Prisma</div>
              <div className="text-xl text-muted-foreground">
                ORM y Base de Datos
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">QR</div>
              <div className="text-xl text-muted-foreground">
                Códigos de Identificación
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Proyecto Académico en Desarrollo
          </h2>
          <p className="text-xl mb-8 text-background/90">
            Este proyecto de tesis está en constante evolución. Probá la
            plataforma y ayudanos a mejorarla con tu feedback.
          </p>
          <Link href="/auth/register">
            <Button className="bg-primary text-primary-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Probar la Plataforma
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

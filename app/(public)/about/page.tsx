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
            Nuestra misión es mantener a las mascotas seguras y reunir a las
            familias con sus compañeros perdidos.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Nuestra Historia
              </h2>
              <p className="text-muted-foreground mb-4">
                PetFinder nació de una experiencia personal. En 2023, cuando
                nuestra fundadora perdió a su perro Max durante 3 días
                angustiosos, se dio cuenta de que debía haber una mejor manera
                de proteger a nuestras mascotas.
              </p>
              <p className="text-gray-600 mb-4">
                Así comenzó nuestra misión: crear un sistema simple pero
                poderoso que use tecnología QR para conectar instantáneamente a
                las mascotas perdidas con sus dueños.
              </p>
              <p className="text-gray-600">
                Hoy, miles de mascotas están protegidas con PetFinder, y
                seguimos creciendo cada día.
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
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Amor por las Mascotas
              </h3>
              <p className="text-muted-foreground">
                Las mascotas son familia. Tratamos cada caso con el cuidado que
                merece.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seguridad</h3>
              <p className="text-muted-foreground">
                Protegemos la privacidad de nuestros usuarios con tecnología de
                vanguardia.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
              <p className="text-muted-foreground">
                Creemos en el poder de la comunidad para ayudarse mutuamente.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-muted-foreground">
                Mejoramos constantemente para ofrecer el mejor servicio posible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Nuestro Impacto
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">
                10,000+
              </div>
              <div className="text-xl text-muted-foreground">
                Mascotas Registradas
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-xl text-muted-foreground">
                Reuniones Exitosas
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-xl text-muted-foreground">Ciudades</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Únete a Nuestra Misión</h2>
          <p className="text-xl mb-8 text-background/90">
            Ayúdanos a crear un mundo donde ninguna mascota se pierda para
            siempre.
          </p>
          <Link href="/auth/register">
            <Button className="bg-primary text-primary-foreground text-lg px-8 py-3 rounded-full hover:bg-primary/90">
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PawPrint,
  Heart,
  Shield,
  Users,
  Target,
  Rocket,
  Code2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Minimalist */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 transition-colors pointer-events-none">
            Proyecto de Tesis
          </Badge>
          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-foreground mb-8">
            Revolucionando la seguridad <br className="hidden sm:block" />
            <span className="text-muted-foreground">de nuestras mascotas.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PetFinder nace de la intersección entre la tecnología moderna y el
            amor por los animales. Una solución integral para conectar mascotas
            perdidas con sus familias.
          </p>
        </div>
      </div>

      {/* Story Section - Split Layout */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">La Historia</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  PetFinder es un proyecto de tesis de Ingeniería en Informática
                  desarrollado por
                  <strong className="text-foreground">
                    {" "}
                    Valentín Ottaviano y Ezequiel Balardini
                  </strong>
                  . Este trabajo académico propone una solución innovadora al
                  problema de las mascotas perdidas.
                </p>
                <p>
                  El objetivo principal es demostrar cómo las tecnologías
                  actuales (Geolocalización, QR, PWA) pueden aplicarse para
                  resolver problemas reales de la comunidad, creando un sistema
                  accesible, fácil de usar y efectivo.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-4">
                    {/* Placeholder for small avatars if needed, or just icons */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-background z-30">
                      <Code2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-background z-20">
                      <Rocket className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    Ingeniería en Informática
                  </span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-muted">
              <Image
                src="/images/foto_1.jpg"
                alt="Historia de PetFinder"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]" />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Values Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Nuestros Pilares
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Impacto Real",
                desc: "Soluciones tecnológicas para problemas cotidianos de la comunidad.",
                color: "text-red-500 bg-red-100 dark:bg-red-900/20",
              },
              {
                icon: Shield,
                title: "Seguridad",
                desc: "Protección de datos y privacidad como prioridad fundamental.",
                color: "text-blue-500 bg-blue-100 dark:bg-blue-900/20",
              },
              {
                icon: Users,
                title: "Accesibilidad",
                desc: "Diseño intuitivo pensado para todo tipo de usuarios.",
                color: "text-purple-500 bg-purple-100 dark:bg-purple-900/20",
              },
              {
                icon: Rocket,
                title: "Innovación",
                desc: "Utilizando el stack tecnológico más moderno disponible.",
                color: "text-orange-500 bg-orange-100 dark:bg-orange-900/20",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background p-8 rounded-3xl border border-border/50 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack - Horizontal Scroll or Clean Grid */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-12 uppercase tracking-widest text-sm">
            Construido con tecnología moderna
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Can replace with actual logos if available, using text for now with refined typo */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold tracking-tighter">
                Next.js
              </span>
              <span className="text-xs text-muted-foreground">Framework</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold tracking-tighter">
                Prisma
              </span>
              <span className="text-xs text-muted-foreground">Database</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold tracking-tighter">
                Vercel
              </span>
              <span className="text-xs text-muted-foreground">Deployment</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold tracking-tighter">
                Stripe
              </span>
              <span className="text-xs text-muted-foreground">Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern CTA */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-foreground text-background text-center rounded-t-[3rem] mx-4 sm:mx-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8">
            Sé parte del cambio.
          </h2>
          <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto">
            Este proyecto está vivo y evolucionando. Tu feedback es esencial
            para seguir mejorando.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 h-14 text-lg font-medium"
              >
                Crear Cuenta
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-background/20 text-background hover:bg-background/10 rounded-full px-8 h-14 text-lg font-medium bg-transparent"
              >
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

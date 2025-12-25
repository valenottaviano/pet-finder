import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PawPrint,
  MapPin,
  ShieldCheck,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation Bar - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <PawPrint className="h-5 w-5" />
            <span>PetFinder</span>
          </Link>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/home">
                <Button variant="default" size="sm">
                  Mi Cuenta
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-sm font-normal">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="default" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-foreground max-w-4xl mx-auto leading-[1.1]">
            Nunca pierdas a <br className="hidden md:block" />
            <span className="text-primary">tu mejor amigo.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            La red de seguridad más avanzada para tus mascotas. 
            Tecnología inteligente y una comunidad que cuida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 text-lg h-14">
                Comenzar ahora
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="link" size="lg" className="text-lg h-14 gap-2">
                Ver cómo funciona <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 sm:mt-24 relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 aspect-[16/9] md:aspect-[21/9]">
             <Image
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mascota feliz"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" /> */}
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="max-w-7xl mx-auto mt-32 space-y-4">
           <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16">
            Protección integral.
            <span className="block text-muted-foreground mt-2 text-2xl md:text-4xl">Diseñada para la tranquilidad.</span>
           </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large Card */}
            <div className="md:col-span-2 bg-secondary/50 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:bg-secondary/70 transition-colors">
              <div className="z-10 relative">
                <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                   <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium mb-4">QR Inteligente</h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  Cada etiqueta es única. Al escanearla, quien encuentre a tu mascota podrá contactarte al instante sin necesidad de apps adicionales.
                </p>
              </div>
               {/* Decorative background element could go here */}
            </div>

            {/* Feature 2 - Small Card */}
            <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:bg-secondary/70 transition-colors">
               <div className="z-10 relative">
                 <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                   <MapPin className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-2xl font-medium mb-4">Ubicación Real</h3>
                 <p className="text-muted-foreground text-lg">
                   Recibe alertas instantáneas con la ubicación exacta del escaneo.
                 </p>
               </div>
            </div>

             {/* Feature 3 - Small Card */}
             <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:bg-secondary/70 transition-colors">
               <div className="z-10 relative">
                 <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                   <Users className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-2xl font-medium mb-4">Comunidad</h3>
                 <p className="text-muted-foreground text-lg">
                   Una red de vecinos alertas listos para ayudar en la búsqueda.
                 </p>
               </div>
            </div>

            {/* Feature 4 - Large Card */}
            <div className="md:col-span-2 bg-secondary/50 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:bg-secondary/70 transition-colors">
              <div className="z-10 relative">
                <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                   <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium mb-4">Búsqueda Activa</h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  Herramientas avanzadas para difundir alertas de mascotas perdidas en tu zona y maximizar las posibilidades de reencuentro.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Image Section */}
        <div className="max-w-7xl mx-auto mt-32 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[21/9]">
           <Image
              src="https://images.unsplash.com/photo-1545529468-42764ef8c85f?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Comunidad PetFinder"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Únete a la red.</h2>
                <Link href="/auth/register">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 border-none h-14 px-8 text-lg">
                    Registrarse Gratis
                  </Button>
                </Link>
              </div>
            </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                <PawPrint className="h-5 w-5" />
                <span className="font-semibold text-lg">PetFinder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Diseñado con amor para proteger a quienes más quieres.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Producto</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/how-it-works" className="hover:text-foreground transition-colors">Cómo funciona</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Precios</Link></li>
                <li><Link href="/faqs" className="hover:text-foreground transition-colors">Preguntas frecuentes</Link></li>
              </ul>
            </div>

             <div>
              <h4 className="font-medium mb-4">Compañía</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">Nosotros</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contacto</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacidad</Link></li>
              </ul>
            </div>

             <div>
              <h4 className="font-medium mb-4">Soporte</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Centro de ayuda</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Términos</Link></li>
              </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
           <p>© {new Date().getFullYear()} PetFinder Inc.</p>
           <div className="flex gap-4 mt-4 md:mt-0">
             {/* Social icons could go here */}
           </div>
        </div>
      </footer>
    </div>
  );
}

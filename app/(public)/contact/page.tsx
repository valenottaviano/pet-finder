import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Users, ArrowRight, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
              Hablemos.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              ¿Tienes alguna pregunta, sugerencia o feedback? Nos encantaría escucharte.
              Este es un proyecto académico en constante evolución.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-8">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">Nombre</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan Pérez"
                      required
                      className="bg-background border-border/50 h-12 rounded-xl focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hola@ejemplo.com"
                      required
                      className="bg-background border-border/50 h-12 rounded-xl focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-muted-foreground">Asunto</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="bg-background border-border/50 h-12 rounded-xl focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    required
                    className="bg-background border-border/50 rounded-xl resize-none focus:ring-primary/20 p-4"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  * Responderemos a la brevedad posible. Tus datos están seguros con nosotros.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                 <h2 className="text-2xl font-bold mb-8">Información de Contacto</h2>
                 <div className="space-y-8">
                    <div className="flex items-start gap-6">
                       <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                          <Mail className="h-6 w-6" />
                       </div>
                       <div>
                          <h3 className="font-semibold text-lg mb-1">Email de Soporte</h3>
                          <p className="text-muted-foreground mb-2">Para consultas generales y técnicas.</p>
                          <a href="mailto:valentin.ottaviano@example.com" className="text-primary hover:underline font-medium">valentin.ottaviano@example.com</a>
                       </div>
                    </div>

                    <div className="flex items-start gap-6">
                       <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center shrink-0">
                          <Users className="h-6 w-6" />
                       </div>
                       <div>
                          <h3 className="font-semibold text-lg mb-1">Autor del Proyecto</h3>
                          <p className="text-muted-foreground mb-2">Valentín Ottaviano</p>
                          <p className="text-sm text-muted-foreground">Estudiante de Ingeniería en Informática</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-6">
                       <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center shrink-0">
                          <MapPin className="h-6 w-6" />
                       </div>
                       <div>
                          <h3 className="font-semibold text-lg mb-1">Ubicación</h3>
                          <p className="text-muted-foreground">Universidad del Norte Santo Tomás de Aquino (UNSTA)</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Note Card */}
              <div className="bg-muted/50 border border-border/50 p-6 rounded-3xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                 <h3 className="font-semibold text-lg mb-2">Nota Académica</h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                    Este formulario envía notificaciones reales al equipo de desarrollo de la tesis. 
                    Si estás probando la plataforma, siéntete libre de enviar feedback constructivo.
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

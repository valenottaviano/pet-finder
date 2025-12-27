import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Send,
} from "lucide-react";

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
              ¿Tienes alguna pregunta, sugerencia o feedback? Nos encantaría
              escucharte. Este es un proyecto académico en constante evolución.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  MapIcon,
  PawPrint,
  HelpCircle,
  UserCircle2,
  MessageSquare,
} from "lucide-react";

export function NavigationBar() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-sm hidden md:block z-[9999]">
        <div className="container h-full mx-auto flex items-center justify-between">
          <Link href="/home" className="text-xl font-bold">
            PetFinder
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/map">
                <MapIcon className="mr-2" />
                Mapa
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/home">
                <PawPrint className="mr-2" />
                Mis Mascotas
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/forum">
                <MessageSquare className="mr-2" />
                Foro
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/help">
                <HelpCircle className="mr-2" />
                Ayuda
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/home/profile">
                <UserCircle2 className="mr-2" />
                Perfil
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t bg-background/80 backdrop-blur-sm md:hidden z-[9999]">
        <div className="container h-full mx-auto">
          <div className="grid h-full grid-cols-5 items-center justify-items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/map">
                <MapIcon />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/home">
                <PawPrint />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/forum">
                <MessageSquare />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/help">
                <HelpCircle />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/home/profile">
                <UserCircle2 />
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  MapIcon,
  PawPrint,
  HelpCircle,
  UserCircle2,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);

  const navItems = [
    {
      href: "/home",
      icon: PawPrint,
      label: "Mascotas",
      active: isActive("/home") && !isActive("/home/profile"),
    },
    // {
    //   href: "/help",
    //   icon: HelpCircle,
    //   label: "Ayuda",
    //   active: isActive("/help"),
    // },
    {
      href: "/home/profile",
      icon: UserCircle2,
      label: "Perfil",
      active: isActive("/home/profile"),
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b bg-background/60 backdrop-blur-xl hidden md:block z-[50]">
        <div className="container h-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            PetFinder
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={item.active ? "secondary" : "ghost"}
                size="sm"
                asChild
                className={cn(
                  "rounded-full px-4 transition-all",
                  item.active && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <Link href={item.href}>
                  <item.icon className={cn("mr-2 h-4 w-4", item.active && "fill-current")} />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar (Branding) */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-white/5 md:hidden z-[40] flex items-center justify-center">
         <span className="text-lg font-bold tracking-tight">PetFinder</span>
      </div>

      {/* Mobile Navigation - Floating Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] h-16 bg-black/80 dark:bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl md:hidden z-[50] flex items-center justify-evenly px-2 ring-1 ring-black/5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
              item.active 
                ? "text-white bg-white/20 scale-110 shadow-lg shadow-white/5" 
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            )}
          >
            <item.icon 
              className={cn(
                "h-5 w-5 transition-transform duration-300", 
                item.active && "fill-current"
              )} 
            />
            {item.active && (
              <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full animate-in fade-in zoom-in" />
            )}
          </Link>
        ))}
      </nav>
    </>
  );
}

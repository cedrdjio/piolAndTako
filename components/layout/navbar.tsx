"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/search?type=accommodation", label: "Hébergements" },
  { href: "/search?type=vehicle", label: "Véhicules" },
  { href: "/host", label: "Devenir hôte" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent")}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className={cn("font-bold text-xl tracking-tight transition-colors", isScrolled ? "text-gray-900" : "text-white")}>
              piol<span className="text-emerald-400">And</span>Tako
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={cn("text-sm font-medium transition-colors hover:text-emerald-500", isScrolled ? "text-gray-700" : "text-white/90")}>{link.label}</Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <button className={cn("p-2 rounded-xl transition-colors", isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10")}><Globe size={18} /></button>
            <Link href="/auth/login"><Button variant="ghost" size="sm" className={cn(isScrolled ? "text-gray-700" : "text-white hover:bg-white/10")}>Connexion</Button></Link>
            <Link href="/auth/register"><Button variant="primary" size="sm">S&apos;inscrire</Button></Link>
          </div>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={cn("lg:hidden p-2 rounded-xl transition-colors", isScrolled ? "text-gray-700" : "text-white")}>
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-700 font-medium py-2 hover:text-emerald-600 transition-colors" onClick={() => setIsMobileOpen(false)}>{link.label}</Link>
              ))}
              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                <Link href="/auth/login" onClick={() => setIsMobileOpen(false)}><Button variant="outline" className="w-full">Connexion</Button></Link>
                <Link href="/auth/register" onClick={() => setIsMobileOpen(false)}><Button variant="primary" className="w-full">S&apos;inscrire</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Single, always-legible top bar. Navigation lives here on desktop; on mobile
 * the app-style bottom tab bar is the primary navigation, so the top bar stays
 * minimal (logo + account) — no duplicate hamburger menu.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "glass fixed inset-x-0 top-0 z-50 border-b transition-shadow duration-300",
        scrolled ? "border-border shadow-[var(--shadow-sm)]" : "border-border/60",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo tone="navy" priority />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/register">Créer un compte</Link>
            </Button>
          </div>

          {/* Mobile action — the bottom tab bar handles navigation */}
          <Button asChild variant="outline" size="sm" className="lg:hidden">
            <Link href="/auth/login">
              <User className="size-4" />
              Connexion
            </Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}

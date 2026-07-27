"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Elevated, always-visible top bar. Solid surface + a persistent soft shadow so
 * it clearly sits above the page (never blends in). Navigation lives here on
 * desktop; on mobile the app-style bottom tab bar remains the primary nav.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    // Category links all share the /search base; the on-page filters already
    // show the active category, so don't over-highlight them here.
    if (base === "/search") return false;
    return pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-shadow duration-300",
        scrolled
          ? "shadow-[0_6px_24px_-10px_rgb(10_22_51_/_0.22)]"
          : "shadow-[0_2px_12px_-8px_rgb(10_22_51_/_0.14)]",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[74px]">
          <Logo tone="navy" priority />

          <nav
            className="hidden items-center gap-1 rounded-full border border-border bg-surface/60 p-1 lg:flex"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-background text-brand shadow-[var(--shadow-xs)]"
                      : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button asChild size="sm" className="shadow-[var(--shadow-glow)]">
              <Link href="/auth/register">Créer un compte</Link>
            </Button>
          </div>

          {/* Mobile actions — bottom tab bar handles navigation */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              aria-label="Notifications"
              className="relative inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-2"
            >
              <Bell className="size-[18px]" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-brand ring-2 ring-background" />
            </button>
            <Button asChild size="sm" className="rounded-full">
              <Link href="/auth/login">
                <User className="size-4" />
                Connexion
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

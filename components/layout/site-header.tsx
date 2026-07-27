"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Routes that render a dark hero behind a transparent header at the top. */
const DARK_HERO_ROUTES = ["/", "/host"];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = DARK_HERO_ROUTES.includes(pathname) && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        onDark
          ? "border-b border-transparent bg-transparent"
          : "glass border-b border-border shadow-[var(--shadow-sm)]",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo tone={onDark ? "white" : "navy"} priority />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  onDark
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-foreground/80 hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={onDark ? "text-white hover:bg-white/10" : undefined}
            >
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/register">Créer un compte</Link>
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              aria-label="Rechercher"
              className={onDark ? "text-white hover:bg-white/10" : undefined}
            >
              <Link href="/search">
                <Search className="size-5" />
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-[var(--radius-sm)] transition-colors",
                onDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-surface-2",
              )}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background p-6 shadow-[var(--shadow-xl)]"
            >
              <div className="flex items-center justify-between">
                <Logo tone="navy" href={null} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="inline-flex size-9 items-center justify-center rounded-[var(--radius-sm)] hover:bg-surface-2"
                >
                  <X className="size-6" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Navigation mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-[var(--radius-md)] px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/auth/login" onClick={() => setOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button asChild size="lg" className="w-full">
                  <Link href="/auth/register" onClick={() => setOpen(false)}>
                    Créer un compte
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

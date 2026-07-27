"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Bell,
  Building2,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  Home,
  LayoutDashboard,
  type LucideIcon,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Star,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const HOST_NAV: NavItem[] = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/listings", label: "Mes annonces", icon: Home },
  { href: "/dashboard/bookings", label: "Réservations", icon: CalendarCheck },
  { href: "/dashboard/calendar", label: "Calendrier", icon: CalendarDays },
  { href: "/dashboard/earnings", label: "Revenus", icon: Wallet },
  { href: "/dashboard/messages", label: "Messagerie", icon: MessageSquare },
  { href: "/dashboard/reviews", label: "Avis", icon: Star },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/listings", label: "Modération", icon: Building2 },
  { href: "/admin/bookings", label: "Réservations", icon: CalendarCheck },
  { href: "/admin/payments", label: "Paiements", icon: CreditCard },
  { href: "/admin/reviews", label: "Avis", icon: Star },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const nav = isAdmin ? ADMIN_NAV : HOST_NAV;
  const [open, setOpen] = useState(false);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5 lg:h-[72px]">
        <Logo tone="navy" />
        <button
          onClick={() => setOpen(false)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface-2 lg:hidden"
          aria-label="Fermer"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="px-3">
        <span className="flex items-center gap-2 rounded-[var(--radius-md)] bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {isAdmin ? <Shield className="size-3.5 text-brand" /> : <Home className="size-3.5 text-brand" />}
          {isAdmin ? "Administration" : "Espace hôte"}
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Navigation dashboard">
        {nav.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-navy text-white"
                  : "text-foreground/75 hover:bg-surface-2 hover:text-foreground",
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-border p-3">
        <Link
          href={isAdmin ? "/dashboard" : "/admin"}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowLeftRight className="size-[18px]" />
          {isAdmin ? "Espace hôte" : "Espace admin"}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowLeftRight className="size-[18px] rotate-180" />
          Retour au site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-background lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-background shadow-[var(--shadow-xl)]">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="glass sticky top-0 z-30 border-b border-border">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:h-[72px]">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-foreground hover:bg-surface-2 lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-5" />
            </button>

            <div className="relative hidden max-w-xs flex-1 sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Rechercher…"
                className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm focus:border-brand focus:outline-none"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-surface-2"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-brand ring-2 ring-background" />
              </button>
              <span className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
                <Avatar name={isAdmin ? "Inès Kamdem" : "Awa Njoya"} size={30} />
                <span className="hidden text-sm font-medium text-foreground sm:block">
                  {isAdmin ? "Inès K." : "Awa N."}
                </span>
              </span>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

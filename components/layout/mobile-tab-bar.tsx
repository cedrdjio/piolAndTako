"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Heart, Home, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/search", label: "Recherche", icon: Search },
  { href: "/favorites", label: "Favoris", icon: Heart },
  { href: "/bookings", label: "Réservations", icon: CalendarCheck },
  { href: "/account", label: "Profil", icon: User },
];

/** App-like bottom navigation, mobile only — mirrors the native app IA. */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation mobile"
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-border pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                  active ? "text-brand" : "text-muted-foreground",
                )}
              >
                <tab.icon
                  className={cn("size-[22px]", active && "fill-brand/10")}
                  strokeWidth={active ? 2.25 : 1.9}
                />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

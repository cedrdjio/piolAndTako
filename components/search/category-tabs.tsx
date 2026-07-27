"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VERTICALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CategoryTabs() {
  const params = useSearchParams();
  const active = params.get("category");

  function hrefFor(category: string | null) {
    const next = new URLSearchParams(params.toString());
    if (category) next.set("category", category);
    else next.delete("category");
    next.delete("type");
    return `/search?${next.toString()}`;
  }

  const items = [{ id: null, label: "Tout", icon: null }, ...VERTICALS.map((v) => ({ id: v.id, label: v.label, icon: v.icon }))];

  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {items.map((item) => {
        const isActive = item.id === active || (item.id === null && !active);
        return (
          <Link
            key={item.label}
            href={hrefFor(item.id)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-navy bg-navy text-white"
                : "border-border bg-background text-foreground hover:border-brand/40 hover:bg-surface",
            )}
          >
            {item.icon && <item.icon className="size-4" />}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { CITIES, VERTICALS, type VerticalId } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchPanelProps {
  defaultCategory?: VerticalId;
  className?: string;
  /** Compact single-row variant for the search results page header. */
  compact?: boolean;
}

export function SearchPanel({ defaultCategory = "property", className, compact }: SearchPanelProps) {
  const router = useRouter();
  const [category, setCategory] = useState<VerticalId>(defaultCategory);
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ category });
    if (destination) params.set("city", destination);
    if (guests) params.set("guests", String(guests));
    router.push(`/search?${params.toString()}`);
  }

  const dateLabel = category === "experience" ? "Date" : "Arrivée";

  return (
    <div className={cn("w-full", className)}>
      {/* Category segments */}
      <div
        className={cn(
          "mb-3 inline-flex gap-1 rounded-full bg-white/10 p-1 backdrop-blur",
          compact && "bg-surface-2/80",
        )}
      >
        {VERTICALS.map((v) => {
          const active = v.id === category;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setCategory(v.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4",
                active
                  ? "bg-white text-navy shadow-[var(--shadow-sm)]"
                  : compact
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/85 hover:text-white",
              )}
            >
              <v.icon className="size-4" />
              {v.label}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 gap-1 rounded-[var(--radius-xl)] border border-border bg-background p-2 shadow-[var(--shadow-lg)] sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:rounded-full sm:p-1.5"
      >
        <Field icon={MapPin} label="Destination">
          <input
            list="cities"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Où allez-vous ?"
            className="w-full bg-transparent text-sm font-medium text-foreground placeholder:font-normal placeholder:text-muted-foreground focus:outline-none"
          />
          <datalist id="cities">
            {CITIES.map((c) => (
              <option key={c.id} value={c.name} />
            ))}
          </datalist>
        </Field>

        <Field icon={Calendar} label={dateLabel} className="sm:border-l sm:border-border">
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none"
          />
        </Field>

        <Field icon={Users} label="Voyageurs" className="sm:border-l sm:border-border">
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full cursor-pointer bg-transparent text-sm font-medium text-foreground focus:outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "voyageurs" : "voyageur"}
              </option>
            ))}
          </select>
        </Field>

        <Button type="submit" size="lg" className="w-full sm:aspect-square sm:w-14 sm:rounded-full sm:px-0">
          <Search className="size-5" />
          <span className="sm:hidden">Rechercher</span>
        </Button>
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
  className,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-surface", className)}>
      <Icon className="size-4 shrink-0 text-brand" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

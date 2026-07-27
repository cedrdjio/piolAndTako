"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, SlidersHorizontal, Zap } from "lucide-react";
import {
  CAR_TYPES,
  EXPERIENCE_TYPES,
  PROPERTY_TYPES,
  VERTICALS,
  type VerticalId,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatAmount, cn } from "@/lib/utils";

const PRICE_MIN = 0;
const PRICE_MAX = 200_000;
const PRICE_STEP = 5_000;

const SORTS = [
  { value: "recommended", label: "Recommandés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];

const TYPES_BY_CATEGORY: Record<VerticalId, readonly { id: string; label: string }[]> = {
  property: PROPERTY_TYPES,
  car: CAR_TYPES,
  experience: EXPERIENCE_TYPES,
};

export function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const category = (params.get("category") as VerticalId | null) ?? null;

  /** Merge patch into current query and navigate. `null` deletes a key. */
  function apply(patch: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    router.push(`/search?${next.toString()}`);
  }

  const activeCount =
    (params.get("city") ? 1 : 0) +
    (params.get("type") ? 1 : 0) +
    (params.get("minPrice") || params.get("maxPrice") ? 1 : 0) +
    (params.get("instant") ? 1 : 0);

  const categories = [
    { id: null as VerticalId | null, label: "Tout", icon: null },
    ...VERTICALS.map((v) => ({ id: v.id, label: v.label, icon: v.icon })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category — single control */}
      <div className="no-scrollbar -mx-1 flex max-w-full flex-1 gap-2 overflow-x-auto px-1 sm:flex-none">
        {categories.map((c) => {
          const active = c.id === category || (c.id === null && !category);
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => apply({ category: c.id, type: null })}
              aria-pressed={active}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-background text-foreground hover:border-brand/40 hover:bg-surface",
              )}
            >
              {c.icon && <c.icon className="size-4" />}
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <FiltersDialog category={category} activeCount={activeCount} apply={apply} params={params} />

        <label className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium shadow-[var(--shadow-xs)]">
          <ArrowUpDown className="size-4 text-muted-foreground" />
          <span className="hidden text-muted-foreground sm:inline">Trier</span>
          <select
            value={params.get("sort") ?? "recommended"}
            onChange={(e) => apply({ sort: e.target.value === "recommended" ? null : e.target.value })}
            className="cursor-pointer bg-transparent font-semibold text-foreground focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function FiltersDialog({
  category,
  activeCount,
  apply,
  params,
}: {
  category: VerticalId | null;
  activeCount: number;
  apply: (patch: Record<string, string | null>) => void;
  params: URLSearchParams;
}) {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(params.get("city") ?? "");
  const [type, setType] = useState(params.get("type") ?? "");
  const [instant, setInstant] = useState(params.get("instant") === "1");
  const [range, setRange] = useState<[number, number]>([
    Number(params.get("minPrice")) || PRICE_MIN,
    Number(params.get("maxPrice")) || PRICE_MAX,
  ]);

  const types = useMemo(() => (category ? TYPES_BY_CATEGORY[category] : null), [category]);

  function submit() {
    apply({
      city: city.trim() || null,
      type: type || null,
      instant: instant ? "1" : null,
      minPrice: range[0] > PRICE_MIN ? String(range[0]) : null,
      maxPrice: range[1] < PRICE_MAX ? String(range[1]) : null,
    });
    setOpen(false);
  }

  function reset() {
    setCity("");
    setType("");
    setInstant(false);
    setRange([PRICE_MIN, PRICE_MAX]);
    apply({ city: null, type: null, instant: null, minPrice: null, maxPrice: null });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <SlidersHorizontal className="size-4" />
          Filtres
          {activeCount > 0 && (
            <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              {activeCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className="flex max-h-[85dvh] w-[calc(100vw-2rem)] max-w-lg flex-col overflow-hidden rounded-[var(--radius-xl)] bg-background text-left shadow-[var(--shadow-xl)]"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <DialogTitle className="text-lg font-semibold">Filtres avancés</DialogTitle>
          <DialogClose className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
            <span className="sr-only">Fermer</span>✕
          </DialogClose>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          {/* Destination */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Destination</label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ville, région…"
            />
          </div>

          {/* Price range */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">Budget</label>
              <span className="text-sm text-muted-foreground">
                {formatAmount(range[0])} – {formatAmount(range[1])}
                {range[1] >= PRICE_MAX ? "+" : ""} FCFA
              </span>
            </div>
            <Slider
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={range}
              onValueChange={(v) => setRange([v[0], v[1]] as [number, number])}
            />
          </div>

          {/* Type */}
          {types && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => {
                  const active = type === t.label;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(active ? "" : t.label)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "border-brand bg-brand-50 text-brand-700"
                          : "border-border text-foreground hover:border-brand/40",
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instant book */}
          <button
            type="button"
            onClick={() => setInstant((v) => !v)}
            className="flex w-full items-center justify-between rounded-[var(--radius-md)] border border-border p-4 text-left transition-colors hover:bg-surface"
          >
            <span className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Zap className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Réservation instantanée
                </span>
                <span className="block text-sm text-muted-foreground">Sans attente de validation</span>
              </span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                instant ? "bg-brand" : "bg-surface-2",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform",
                  instant ? "translate-x-[22px]" : "translate-x-0.5",
                )}
              />
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Tout réinitialiser
          </button>
          <Button onClick={submit}>Voir les résultats</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

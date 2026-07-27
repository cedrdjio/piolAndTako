"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";
import type { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { formatAmount } from "@/lib/utils";

const SERVICE_RATE = 0.05;

function daysBetween(a: string, b: string): number {
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0;
  return Math.round((end - start) / 86_400_000);
}

export function BookingWidget({ listing }: { listing: Listing }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);

  function reserve() {
    const params = new URLSearchParams({ listing: listing.slug, guests: String(guests) });
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    router.push(`/booking?${params.toString()}`);
  }

  const perPerson = listing.priceUnit === "personne";
  const nights = perPerson ? 1 : daysBetween(checkin, checkout);

  const { units, subtotal, service, total, unitWord } = useMemo(() => {
    const units = perPerson ? guests : nights;
    const subtotal = listing.price * (units || 0);
    const service = Math.round(subtotal * SERVICE_RATE);
    return {
      units,
      subtotal,
      service,
      total: subtotal + service,
      unitWord: perPerson ? (guests > 1 ? "personnes" : "personne") : "nuits",
    };
  }, [perPerson, guests, nights, listing.price]);

  const ready = perPerson ? guests > 0 : nights > 0;

  return (
    <div className="rounded-[var(--radius-xl)] border border-border bg-background p-6 shadow-[var(--shadow-lg)]">
      <div className="flex items-baseline justify-between gap-2">
        <p>
          <span className="text-2xl font-semibold text-foreground">{formatAmount(listing.price)} FCFA</span>
          <span className="text-muted-foreground"> / {listing.priceUnit}</span>
        </p>
        <Rating value={listing.rating} reviews={listing.reviewsCount} />
      </div>

      {listing.instantBook && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          <Zap className="size-3.5" /> Réservation instantanée
        </p>
      )}

      <div className="mt-5 overflow-hidden rounded-[var(--radius-md)] border border-border-strong">
        <div className="grid grid-cols-2 divide-x divide-border-strong">
          <label className="flex flex-col p-3">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {perPerson ? "Date" : "Arrivée"}
            </span>
            <input
              type="date"
              min={today}
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="mt-0.5 bg-transparent text-sm font-medium text-foreground focus:outline-none"
            />
          </label>
          <label className="flex flex-col p-3">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {perPerson ? "Participants" : "Départ"}
            </span>
            {perPerson ? (
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-0.5 cursor-pointer bg-transparent text-sm font-medium text-foreground focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="date"
                min={checkin || today}
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="mt-0.5 bg-transparent text-sm font-medium text-foreground focus:outline-none"
              />
            )}
          </label>
        </div>
        {!perPerson && (
          <label className="flex items-center justify-between border-t border-border-strong p-3">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Voyageurs
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="cursor-pointer bg-transparent text-sm font-medium text-foreground focus:outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n > 1 ? "voyageurs" : "voyageur"}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <Button size="lg" className="mt-4 w-full" disabled={!ready} onClick={reserve}>
        Réserver
      </Button>

      {ready && (
        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>
              {formatAmount(listing.price)} FCFA × {units} {unitWord}
            </dt>
            <dd className="text-foreground">{formatAmount(subtotal)} FCFA</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Frais de service</dt>
            <dd className="text-foreground">{formatAmount(service)} FCFA</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
            <dt>Total</dt>
            <dd>{formatAmount(total)} FCFA</dd>
          </div>
        </dl>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 text-success" />
        Vous ne serez débité qu&apos;après confirmation
      </p>
    </div>
  );
}

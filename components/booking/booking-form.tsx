"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { CreditCard, Loader2, Lock, Smartphone } from "lucide-react";
import type { Listing } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/cover-image";
import { Rating } from "@/components/ui/rating";
import { createBooking, type BookingState } from "@/lib/actions/booking";
import { formatAmount, cn } from "@/lib/utils";

const SERVICE_RATE = 0.05;
const METHODS = [
  { id: "orange", label: "Orange Money", hint: "Paiement mobile", icon: Smartphone },
  { id: "mtn", label: "MTN MoMo", hint: "Paiement mobile", icon: Smartphone },
  { id: "card", label: "Carte bancaire", hint: "Visa · Mastercard", icon: CreditCard },
] as const;

function daysBetween(a: string, b: string): number {
  const s = new Date(a).getTime();
  const e = new Date(b).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e <= s) return 0;
  return Math.round((e - s) / 86_400_000);
}

interface Props {
  listing: Listing;
  initial: { checkin: string; checkout: string; guests: number };
}

export function BookingForm({ listing, initial }: Props) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(createBooking, {
    ok: true,
  });
  const today = new Date().toISOString().slice(0, 10);
  const [checkin, setCheckin] = useState(initial.checkin);
  const [checkout, setCheckout] = useState(initial.checkout);
  const [guests, setGuests] = useState(initial.guests || 1);
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("orange");

  const perPerson = listing.priceUnit === "personne";
  const { units, subtotal, service, total, unitWord } = useMemo(() => {
    const u = perPerson ? guests : daysBetween(checkin, checkout) || 0;
    const sub = listing.price * u;
    const svc = Math.round(sub * SERVICE_RATE);
    return {
      units: u,
      subtotal: sub,
      service: svc,
      total: sub + svc,
      unitWord: perPerson ? (guests > 1 ? "personnes" : "personne") : "nuits",
    };
  }, [perPerson, guests, checkin, checkout, listing.price]);

  const err = state.errors ?? {};

  return (
    <form action={formAction} className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
      <input type="hidden" name="slug" value={listing.slug} />

      <div className="min-w-0 space-y-8">
        {state.message && !state.ok && (
          <p className="rounded-[var(--radius-md)] border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {state.message}
          </p>
        )}

        {/* Trip */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Votre voyage</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={perPerson ? "Date" : "Arrivée"} error={err.checkin}>
              <Input
                type="date"
                name="checkin"
                min={today}
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </Field>
            {!perPerson ? (
              <Field label="Départ" error={err.checkout}>
                <Input
                  type="date"
                  name="checkout"
                  min={checkin || today}
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </Field>
            ) : (
              <input type="hidden" name="checkout" value="" />
            )}
            <Field label="Voyageurs" error={err.guests}>
              <select
                name="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="flex h-11 w-full cursor-pointer rounded-[var(--radius-md)] border border-input bg-background px-3.5 text-sm text-foreground shadow-[var(--shadow-xs)] focus-visible:border-brand focus-visible:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n > 1 ? "voyageurs" : "voyageur"}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Vos coordonnées</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Prénom" error={err.firstName}>
              <Input name="firstName" autoComplete="given-name" placeholder="Awa" />
            </Field>
            <Field label="Nom" error={err.lastName}>
              <Input name="lastName" autoComplete="family-name" placeholder="Njoya" />
            </Field>
            <Field label="Email" error={err.email}>
              <Input name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" />
            </Field>
            <Field label="Téléphone" error={err.phone}>
              <Input name="phone" type="tel" autoComplete="tel" placeholder="+237 6XX XX XX XX" />
            </Field>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Paiement</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {METHODS.map((m) => {
              const active = method === m.id;
              return (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer flex-col gap-2 rounded-[var(--radius-md)] border p-4 transition-colors",
                    active ? "border-brand bg-brand-50" : "border-border hover:border-brand/40",
                  )}
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.id}
                    checked={active}
                    onChange={() => setMethod(m.id)}
                    className="sr-only"
                  />
                  <m.icon className={cn("size-5", active ? "text-brand" : "text-muted-foreground")} />
                  <span className="text-sm font-semibold text-foreground">{m.label}</span>
                  <span className="text-xs text-muted-foreground">{m.hint}</span>
                </label>
              );
            })}
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="size-3.5 text-success" />
            Paiement chiffré. Vous ne serez débité qu&apos;après confirmation de l&apos;hôte.
          </p>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:relative">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-[var(--radius-xl)] border border-border bg-background p-6 shadow-[var(--shadow-lg)]">
            <div className="flex gap-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                <CoverImage
                  seed={listing.id}
                  category={listing.category}
                  src={listing.images[0]}
                  alt={listing.title}
                  sizes="80px"
                  className="size-full"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{listing.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {listing.city}, {listing.region}
                </p>
                <Rating value={listing.rating} reviews={listing.reviewsCount} className="mt-1" />
              </div>
            </div>

            <div className="my-5 h-px bg-border" />

            <dl className="space-y-2.5 text-sm">
              <Row
                label={`${formatAmount(listing.price)} FCFA × ${units || 0} ${unitWord}`}
                value={`${formatAmount(subtotal)} FCFA`}
              />
              <Row label="Frais de service" value={`${formatAmount(service)} FCFA`} />
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
                <dt>Total</dt>
                <dd>{formatAmount(total)} FCFA</dd>
              </div>
            </dl>

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={pending}>
              {pending && <Loader2 className="size-4 animate-spin" />}
              {pending ? "Traitement…" : `Confirmer et payer`}
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              En confirmant, vous acceptez les{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                conditions
              </Link>{" "}
              et la politique d&apos;annulation.
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <dt>{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

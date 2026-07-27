"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getListingBySlug } from "@/lib/data/listings";

const SERVICE_RATE = 0.05;

const schema = z.object({
  slug: z.string().min(1),
  checkin: z.string().min(1, "Date requise"),
  checkout: z.string().optional().default(""),
  guests: z.coerce.number().int().min(1).max(20),
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Téléphone requis"),
  method: z.enum(["orange", "mtn", "card"]),
});

export type BookingState = {
  ok: boolean;
  errors?: Record<string, string>;
  message?: string;
};

function daysBetween(a: string, b: string): number {
  const s = new Date(a).getTime();
  const e = new Date(b).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e <= s) return 0;
  return Math.round((e - s) / 86_400_000);
}

function reference(): string {
  return `PT-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.random().toString(36).toUpperCase().slice(2, 5)}`;
}

/**
 * Creates a booking request. Currently validates + computes the total and
 * issues a confirmation reference. Wiring this to Prisma is a single
 * `prisma.booking.create(...)` call — the shape already matches the model.
 */
export async function createBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] = issue.message;
    return { ok: false, errors, message: "Veuillez corriger les champs indiqués." };
  }

  const data = parsed.data;
  const listing = await getListingBySlug(data.slug);
  if (!listing) return { ok: false, message: "Annonce introuvable." };

  const perPerson = listing.priceUnit === "personne";
  const units = perPerson ? data.guests : daysBetween(data.checkin, data.checkout) || 1;
  const subtotal = listing.price * units;
  const total = subtotal + Math.round(subtotal * SERVICE_RATE);
  const ref = reference();

  // TODO(prisma): await prisma.booking.create({ data: { listingId: listing.id, ... } })

  const params = new URLSearchParams({
    ref,
    listing: listing.slug,
    total: String(total),
    method: data.method,
    email: data.email,
  });
  redirect(`/booking/confirmation?${params.toString()}`);
}

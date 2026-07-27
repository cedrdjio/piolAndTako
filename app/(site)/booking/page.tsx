import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BookingForm } from "@/components/booking/booking-form";
import { getListingBySlug } from "@/lib/data/listings";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Réservation",
  path: "/booking",
  noIndex: true,
});

type RawParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = await searchParams;
  const slug = one(sp.listing);
  const listing = slug ? await getListingBySlug(slug) : null;
  if (!listing) notFound();

  const initial = {
    checkin: one(sp.checkin),
    checkout: one(sp.checkout),
    guests: Number(one(sp.guests)) || 2,
  };

  return (
    <Container className="pb-24 pt-24 lg:pt-28">
      <Link
        href={`/listing/${listing.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Retour à l&apos;annonce
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Demande de réservation
      </h1>
      <p className="mt-1 text-muted-foreground">
        Plus qu&apos;une étape avant de vivre l&apos;exception.
      </p>

      <div className="mt-10">
        <BookingForm listing={listing} initial={initial} />
      </div>
    </Container>
  );
}

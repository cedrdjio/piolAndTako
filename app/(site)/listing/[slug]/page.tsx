import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Car,
  Check,
  Clock,
  Cog,
  DoorOpen,
  Fuel,
  Languages,
  MapPin,
  Ruler,
  Share2,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import type { Listing } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { CoverImage } from "@/components/ui/cover-image";
import { Separator } from "@/components/ui/separator";
import { FavoriteButton } from "@/components/listings/favorite-button";
import { BookingWidget } from "@/components/listings/booking-widget";
import { ListingCarousel } from "@/components/listings/listing-carousel";
import { JsonLd } from "@/components/seo/json-ld";
import {
  allListingSlugs,
  getListingBySlug,
  getRelatedListings,
} from "@/lib/data/listings";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, VERTICALS } from "@/lib/constants";

export function generateStaticParams() {
  return allListingSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return buildMetadata({ title: "Annonce introuvable", noIndex: true });
  return buildMetadata({
    title: listing.title,
    description: `${listing.summary} — ${listing.city}, ${SITE.city.split(",")[1] ?? "Cameroun"}. À partir de ${listing.price.toLocaleString("fr-FR")} FCFA / ${listing.priceUnit}.`,
    path: `/listing/${slug}`,
  });
}

function specItems(listing: Listing) {
  const s = listing.specs;
  if (s.kind === "property")
    return [
      { icon: Users, label: `${s.guests} voyageurs` },
      { icon: BedDouble, label: `${s.bedrooms} chambres` },
      { icon: Bath, label: `${s.bathrooms} salles de bain` },
      { icon: Ruler, label: `${s.area} m²` },
    ];
  if (s.kind === "car")
    return [
      { icon: Users, label: `${s.seats} places` },
      { icon: Cog, label: s.transmission },
      { icon: Fuel, label: s.fuel },
      { icon: s.withDriver ? Car : DoorOpen, label: s.withDriver ? "Avec chauffeur" : `${s.doors} portes` },
    ];
  return [
    { icon: Clock, label: `${s.durationHours} h` },
    { icon: Users, label: `${s.groupSize} pers. max` },
    { icon: Languages, label: s.language },
  ];
}

const BADGE_LABEL: Record<string, string> = {
  populaire: "Populaire",
  nouveau: "Nouveau",
  "coup-de-coeur": "Coup de cœur",
  vip: "VIP",
};

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const related = await getRelatedListings(listing, 4);
  const vertical = VERTICALS.find((v) => v.id === listing.category);
  const specs = specItems(listing);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    category: vertical?.label,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: listing.rating,
      reviewCount: listing.reviewsCount,
    },
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="pt-20 lg:pt-24">
      <JsonLd data={productJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: vertical?.label ?? "Recherche", path: `/search?category=${listing.category}` },
          { name: listing.title, path: `/listing/${listing.slug}` },
        ])}
      />

      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Fil d'ariane" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Accueil</Link>
          <span>/</span>
          <Link href={`/search?category=${listing.category}`} className="hover:text-foreground">
            {vertical?.label}
          </Link>
          <span>/</span>
          <span className="text-foreground">{listing.title}</span>
        </nav>

        {/* Header */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            {listing.badges[0] && (
              <Badge variant="subtle" className="mb-2">
                {BADGE_LABEL[listing.badges[0]]}
              </Badge>
            )}
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {listing.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <Rating value={listing.rating} reviews={listing.reviewsCount} />
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4 text-brand" />
                {listing.city}, {listing.region}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface">
              <Share2 className="size-4" /> Partager
            </button>
            <FavoriteButton listingId={listing.id} className="relative size-10 border border-border shadow-none" />
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-2 overflow-hidden rounded-[var(--radius-xl)] sm:grid-cols-4 sm:grid-rows-2">
          <div className="relative aspect-[16/10] sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <CoverImage
              seed={listing.id}
              category={listing.category}
              src={listing.images[0]}
              alt={listing.title}
              priority
              variant={0}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="size-full"
            />
          </div>
          {[1, 2, 3, 4].map((v) => (
            <div key={v} className="relative hidden aspect-[4/3] sm:block">
              <CoverImage
                seed={listing.id}
                category={listing.category}
                src={listing.images[v]}
                alt={`${listing.title} — vue ${v}`}
                variant={v}
                sizes="25vw"
                className="size-full"
              />
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="min-w-0">
            {/* Host */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={listing.host.name} size={52} />
                <div>
                  <p className="font-semibold text-foreground">Proposé par {listing.host.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Hôte depuis {listing.host.since} · {listing.host.responseRate}% de réponses
                  </p>
                </div>
              </div>
              {listing.host.superhost && <Badge variant="navy">Superhôte</Badge>}
            </div>

            <Separator className="my-8" />

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {specs.map((spec) => (
                <div key={spec.label} className="flex flex-col items-start gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-4">
                  <spec.icon className="size-5 text-brand" />
                  <span className="text-sm font-medium text-foreground">{spec.label}</span>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">À propos</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{listing.description}</p>
            </section>

            <Separator className="my-8" />

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Ce qui est inclus</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {listing.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-foreground">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                      <Check className="size-3.5" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            <Separator className="my-8" />

            {/* Location (map placeholder) */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Localisation</h2>
              <div className="bg-mesh relative mt-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[var(--radius-lg)] text-white">
                <div className="pointer-events-none absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <MapPin className="size-8" />
                  <p className="font-semibold">{listing.city}, {listing.region}</p>
                  <p className="text-sm text-white/70">Localisation exacte communiquée après réservation</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky booking */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <BookingWidget listing={listing} />
            </div>
          </aside>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <div className="py-16 lg:py-24">
          <ListingCarousel
            title={`Autres ${vertical?.label.toLowerCase()} à découvrir`}
            href={`/search?category=${listing.category}`}
            listings={related}
          />
        </div>
      )}
    </div>
  );
}

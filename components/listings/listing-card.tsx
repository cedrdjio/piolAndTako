import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Listing } from "@/lib/types";
import { CoverImage } from "@/components/ui/cover-image";
import { Rating } from "@/components/ui/rating";
import { FavoriteButton } from "@/components/listings/favorite-button";
import { cn, formatAmount } from "@/lib/utils";

const BADGE_LABEL: Record<string, string> = {
  populaire: "Populaire",
  nouveau: "Nouveau",
  "coup-de-coeur": "Coup de cœur",
  vip: "VIP",
};

function specLine(listing: Listing): string {
  const s = listing.specs;
  if (s.kind === "property")
    return `${s.guests} voyageurs · ${s.bedrooms} ch. · ${s.bathrooms} sdb`;
  if (s.kind === "car")
    return `${s.seats} places · ${s.transmission}${s.withDriver ? " · Chauffeur" : ""}`;
  return `${s.durationHours}h · ${s.groupSize} pers. max · ${s.language}`;
}

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ListingCard({ listing, priority, className, sizes }: ListingCardProps) {
  const badge = listing.badges[0];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background hover-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CoverImage
          seed={listing.id}
          category={listing.category}
          src={listing.images[0]}
          alt={`${listing.title}, ${listing.city}`}
          priority={priority}
          sizes={sizes ?? "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"}
          className="size-full transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
        />
        {badge && (
          <span className="glass-dark absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white">
            {BADGE_LABEL[badge]}
          </span>
        )}
        <FavoriteButton listingId={listing.id} className="absolute right-3 top-3 z-10" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight text-foreground">
            {/* Stretched link makes the whole card clickable while the heart stays interactive */}
            <Link href={`/listing/${listing.slug}`} className="after:absolute after:inset-0">
              {listing.title}
            </Link>
          </h3>
          <Rating value={listing.rating} className="shrink-0 whitespace-nowrap" />
        </div>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-brand" />
          {listing.city}, {listing.region}
        </p>

        <p className="text-sm text-muted-foreground/90">{specLine(listing)}</p>

        <p className="mt-auto pt-2 text-foreground">
          <span className="text-lg font-semibold">{formatAmount(listing.price)} FCFA</span>
          <span className="text-sm text-muted-foreground"> / {listing.priceUnit}</span>
        </p>
      </div>
    </article>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background">
      <div className="aspect-[4/3] animate-pulse bg-surface-2" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
        <div className="mt-2 h-5 w-1/3 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Listing } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { ListingCard } from "@/components/listings/listing-card";
import { Reveal } from "@/components/motion/reveal";

interface ListingCarouselProps {
  title: string;
  description?: string;
  href: string;
  hrefLabel?: string;
  listings: Listing[];
}

/**
 * Horizontal, snap-scrolling rail on mobile that becomes a clean 4-up grid on
 * desktop — the same premium pattern Airbnb/Booking use for discovery rows.
 */
export function ListingCarousel({
  title,
  description,
  href,
  hrefLabel = "Voir tout",
  listings,
}: ListingCarouselProps) {
  return (
    <Container>
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600 sm:inline-flex"
        >
          {hrefLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
        {listings.map((listing, i) => (
          <Reveal
            key={listing.id}
            delay={i * 60}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-[31%] lg:w-auto"
          >
            <ListingCard listing={listing} priority={i < 4} />
          </Reveal>
        ))}
      </div>

      <Link
        href={href}
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand sm:hidden"
      >
        {hrefLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Container>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { Listing } from "@/lib/types";
import { CoverImage } from "@/components/ui/cover-image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** At least 5 slots so the desktop mosaic always looks intentional. */
function usePhotos(listing: Listing) {
  const count = Math.max(listing.images.length, 5);
  return Array.from({ length: count }, (_, i) => listing.images[i]);
}

export function ListingGallery({ listing }: { listing: Listing }) {
  const photos = usePhotos(listing);
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openAt = (i: number) => {
    setStartIndex(i);
    setOpen(true);
  };

  return (
    <>
      {/* Mobile: swipeable carousel */}
      <MobileCarousel listing={listing} photos={photos} onExpand={openAt} />

      {/* Desktop: mosaic */}
      <div className="mt-6 hidden gap-2 overflow-hidden rounded-[var(--radius-xl)] sm:grid sm:grid-cols-4 sm:grid-rows-2">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative row-span-2 aspect-auto cursor-pointer overflow-hidden sm:col-span-2"
        >
          <CoverImage
            seed={listing.id}
            category={listing.category}
            src={photos[0]}
            alt={listing.title}
            priority
            variant={0}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="size-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
          >
            <CoverImage
              seed={listing.id}
              category={listing.category}
              src={photos[i]}
              alt={`${listing.title} — vue ${i + 1}`}
              variant={i}
              sizes="25vw"
              className="size-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-md)] backdrop-blur transition-transform hover:scale-105"
        >
          <Expand className="size-4" />
          Voir les {photos.length} photos
        </button>
      </div>

      <Lightbox
        listing={listing}
        photos={photos}
        open={open}
        onOpenChange={setOpen}
        startIndex={startIndex}
      />
    </>
  );
}

function MobileCarousel({
  listing,
  photos,
  onExpand,
}: {
  listing: Listing;
  photos: (string | undefined)[];
  onExpand: (i: number) => void;
}) {
  const [ref, embla] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <div className="relative mt-4 sm:hidden">
      <div ref={ref} className="overflow-hidden rounded-[var(--radius-lg)]">
        <div className="flex">
          {photos.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onExpand(i)}
              className="relative aspect-[4/3] w-full flex-[0_0_100%]"
            >
              <CoverImage
                seed={listing.id}
                category={listing.category}
                src={src}
                alt={`${listing.title} — vue ${i + 1}`}
                priority={i === 0}
                variant={i}
                sizes="100vw"
                className="size-full"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {photos.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full bg-white transition-all",
              i === selected ? "w-5" : "w-1.5 opacity-60",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Lightbox({
  listing,
  photos,
  open,
  onOpenChange,
  startIndex,
}: {
  listing: Listing;
  photos: (string | undefined)[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
  startIndex: number;
}) {
  const [ref, embla] = useEmblaCarousel({ loop: true, startIndex });
  const [selected, setSelected] = useState(startIndex);

  useEffect(() => {
    if (embla && open) embla.scrollTo(startIndex, true);
  }, [embla, open, startIndex]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-dvh w-screen max-w-none flex-col justify-center bg-transparent p-0">
        <DialogTitle className="sr-only">Galerie photos — {listing.title}</DialogTitle>

        <div ref={ref} className="overflow-hidden">
          <div className="flex">
            {photos.map((src, i) => (
              <div key={i} className="flex-[0_0_100%] px-4">
                <div className="relative mx-auto aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)]">
                  <CoverImage
                    seed={listing.id}
                    category={listing.category}
                    src={src}
                    alt={`${listing.title} — vue ${i + 1}`}
                    variant={i}
                    sizes="100vw"
                    className="size-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Photo précédente"
          className="absolute left-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Photo suivante"
          className="absolute right-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronRight className="size-6" />
        </button>

        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
          {selected + 1} / {photos.length}
        </p>
      </DialogContent>
    </Dialog>
  );
}

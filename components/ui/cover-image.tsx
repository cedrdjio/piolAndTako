import Image from "next/image";
import { Car, Compass, Home } from "lucide-react";
import type { ListingCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Cover art for listings.
 *
 * If a real photo URL is provided (Vercel Blob in production), it renders an
 * optimized <Image>. Otherwise it renders a deterministic, on-brand gradient
 * cover — guaranteed to look intentional, zero network cost, Lighthouse-clean.
 * Swapping in photography later is just passing a `src`.
 */

const GRADIENTS = [
  "linear-gradient(135deg,#0a1633 0%,#182a5e 55%,#1e5bff 130%)",
  "linear-gradient(140deg,#101f47 0%,#1547e6 120%)",
  "linear-gradient(155deg,#0a1633 0%,#1e5bff 140%)",
  "linear-gradient(135deg,#182a5e 0%,#3b74ff 120%)",
  "linear-gradient(160deg,#0c1a3f 0%,#101f47 45%,#2a5bff 130%)",
  "linear-gradient(135deg,#0a1633 0%,#1139bd 60%,#4d84ff 130%)",
];

const ICONS: Record<ListingCategory, typeof Home> = {
  property: Home,
  car: Car,
  experience: Compass,
};

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

interface CoverImageProps {
  seed: string;
  category: ListingCategory;
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** index for galleries so each photo of a listing differs */
  variant?: number;
}

export function CoverImage({
  seed,
  category,
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  variant = 0,
}: CoverImageProps) {
  if (src && src.startsWith("http")) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const g = GRADIENTS[(hash(seed) + variant) % GRADIENTS.length];
  const Icon = ICONS[category];

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative isolate overflow-hidden", className)}
      style={{ background: g }}
    >
      {/* Soft light bloom */}
      <div className="absolute -right-10 -top-16 size-56 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-56 rounded-full bg-white/10 blur-3xl" />
      {/* Brand mark watermark */}
      <Image
        src="/brand/mark-white.png"
        alt=""
        width={728}
        height={513}
        aria-hidden
        className="absolute -right-6 -bottom-4 w-2/3 opacity-[0.10]"
      />
      {/* Category glyph */}
      <Icon
        className="absolute left-5 top-5 size-7 text-white/70"
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

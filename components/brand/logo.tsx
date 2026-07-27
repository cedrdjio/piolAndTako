import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "navy" | "white";

const MARK = {
  navy: "/brand/mark-navy.png",
  white: "/brand/mark-white.png",
} as const;

interface LogoProps {
  tone?: Tone;
  /** lockup = horizontal mark + wordmark (nav/footer); mark = icon only. */
  variant?: "lockup" | "mark";
  /** Show the "PROPERTIES · CARS · EXPERIENCES" tagline under the wordmark. */
  tagline?: boolean;
  href?: string | null;
  priority?: boolean;
  className?: string;
}

/**
 * Brand lockup for Piol & Tako.
 * The supplied logo asset is a stacked lock-up; for horizontal placements we
 * recompose it from the mark (image) + a typographic wordmark so it stays crisp
 * and theme-aware (navy on light, white on dark surfaces).
 */
export function Logo({
  tone = "navy",
  variant = "lockup",
  tagline = false,
  href = "/",
  priority = false,
  className,
}: LogoProps) {
  const textColor = tone === "white" ? "text-white" : "text-navy";

  const mark = (
    <Image
      src={MARK[tone]}
      alt=""
      width={728}
      height={513}
      priority={priority}
      className="h-full w-auto"
      aria-hidden
    />
  );

  const content =
    variant === "mark" ? (
      <span className={cn("inline-flex h-9 items-center", className)}>{mark}</span>
    ) : (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <span className="h-8 shrink-0 sm:h-9">{mark}</span>
        <span className="flex flex-col justify-center leading-none">
          <span
            className={cn(
              "text-[1.35rem] font-bold tracking-tight sm:text-2xl",
              textColor,
            )}
          >
            piol <span className="text-brand">&amp;</span> tako
          </span>
          {tagline && (
            <span
              className={cn(
                "mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.25em]",
                tone === "white" ? "text-white/70" : "text-muted-foreground",
              )}
            >
              Properties · Cars · Experiences
            </span>
          )}
        </span>
      </span>
    );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="Piol & Tako — Accueil" className="inline-flex items-center">
      {content}
    </Link>
  );
}

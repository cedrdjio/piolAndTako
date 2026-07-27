import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviews?: number;
  className?: string;
  /** Compact shows a single star + number (card style). */
  variant?: "compact" | "stars";
}

function Rating({ value, reviews, className, variant = "compact" }: RatingProps) {
  if (variant === "stars") {
    return (
      <div className={cn("flex items-center gap-0.5", className)} aria-label={`Note ${value} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < Math.round(value) ? "fill-star text-star" : "fill-border text-border",
            )}
          />
        ))}
        {reviews !== undefined && (
          <span className="ml-1.5 text-sm text-muted-foreground">({reviews})</span>
        )}
      </div>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1 text-sm font-medium text-foreground", className)}
      aria-label={`Note ${value} sur 5${reviews ? `, ${reviews} avis` : ""}`}
    >
      <Star className="size-4 fill-star text-star" />
      {value.toFixed(1)}
      {reviews !== undefined && (
        <span className="font-normal text-muted-foreground">({reviews})</span>
      )}
    </span>
  );
}

export { Rating };

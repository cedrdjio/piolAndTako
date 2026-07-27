"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  listingId: string;
  className?: string;
  initial?: boolean;
}

export function FavoriteButton({ listingId, className, initial = false }: FavoriteButtonProps) {
  const [active, setActive] = useState(initial);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      data-listing={listingId}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive((v) => !v);
      }}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-[var(--shadow-sm)] backdrop-blur transition-transform hover:scale-110 active:scale-95",
        className,
      )}
    >
      <Heart
        className={cn("size-[18px] transition-colors", active ? "fill-danger text-danger" : "text-navy")}
      />
    </button>
  );
}

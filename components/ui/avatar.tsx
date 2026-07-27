import Image from "next/image";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface AvatarProps {
  name: string;
  src?: string;
  className?: string;
  size?: number;
}

/** Circular avatar with a graceful initials fallback. */
export function Avatar({ name, src, className, size = 40 }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src && src.startsWith("http") ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span className="text-[0.7em] font-semibold" style={{ fontSize: size * 0.36 }}>
          {initials(name)}
        </span>
      )}
    </span>
  );
}

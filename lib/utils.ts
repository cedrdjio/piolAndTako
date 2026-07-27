import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "XAF"): string {
  if (currency === "XAF") {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("fr-CM", { style: "currency", currency }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-CM", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Compact price for cards, e.g. 100000 → "100 000". */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-CM", { maximumFractionDigits: 0 }).format(amount);
}

/** URL-safe slug from a title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

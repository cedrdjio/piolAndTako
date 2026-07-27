import type { VerticalId } from "@/lib/constants";

export type ListingCategory = VerticalId; // "property" | "car" | "experience"

export type ListingBadge = "populaire" | "nouveau" | "coup-de-coeur" | "vip";

export interface Host {
  id: string;
  name: string;
  avatar: string;
  superhost: boolean;
  since: number;
  responseRate: number;
}

export interface PropertySpecs {
  kind: "property";
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  area: number;
}

export interface CarSpecs {
  kind: "car";
  type: string;
  seats: number;
  transmission: "Automatique" | "Manuelle";
  fuel: "Essence" | "Diesel" | "Hybride" | "Électrique";
  doors: number;
  withDriver: boolean;
}

export interface ExperienceSpecs {
  kind: "experience";
  type: string;
  durationHours: number;
  groupSize: number;
  language: string;
}

export type ListingSpecs = PropertySpecs | CarSpecs | ExperienceSpecs;

export interface Listing {
  id: string;
  slug: string;
  category: ListingCategory;
  title: string;
  summary: string;
  description: string;
  city: string;
  region: string;
  country: string;
  coordinates: { lat: number; lng: number };
  price: number;
  /** Displayed after the price, e.g. "nuit", "jour", "personne". */
  priceUnit: string;
  currency: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  badges: ListingBadge[];
  instantBook: boolean;
  amenities: string[];
  host: Host;
  specs: ListingSpecs;
}

export interface SearchParams {
  category?: ListingCategory;
  query?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  sort?: "recommended" | "price-asc" | "price-desc" | "rating";
  type?: string;
}

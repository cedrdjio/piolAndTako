import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarCheck,
  Compass,
  CreditCard,
  Headphones,
  Home,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  Car,
  Star,
} from "lucide-react";

/** Public site identity. */
export const SITE = {
  name: "Piol & Tako",
  legalName: "Piol & Tako SARL",
  tagline: "Properties · Cars · Experiences",
  description:
    "La plateforme premium pour réserver logements d'exception, voitures de prestige et expériences uniques au Cameroun. Tout au même endroit.",
  url: "https://piolandtako.com",
  locale: "fr_CM",
  currency: "XAF",
  email: "hello@piolandtako.com",
  city: "Douala, Cameroun",
} as const;

export type VerticalId = "property" | "car" | "experience";

export interface Vertical {
  id: VerticalId;
  label: string;
  labelSingular: string;
  href: string;
  icon: LucideIcon;
  blurb: string;
}

export const VERTICALS: Vertical[] = [
  {
    id: "property",
    label: "Logements",
    labelSingular: "Logement",
    href: "/search?category=property",
    icon: Home,
    blurb: "Villas, appartements et résidences d'exception, prêts à vivre.",
  },
  {
    id: "car",
    label: "Voitures",
    labelSingular: "Voiture",
    href: "/search?category=car",
    icon: Car,
    blurb: "Du quotidien au prestige — louez avec ou sans chauffeur.",
  },
  {
    id: "experience",
    label: "Expériences",
    labelSingular: "Expérience",
    href: "/search?category=experience",
    icon: Compass,
    blurb: "Moments inoubliables, activités uniques et adresses confidentielles.",
  },
];

export const PROPERTY_TYPES = [
  { id: "villa", label: "Villa" },
  { id: "apartment", label: "Appartement" },
  { id: "studio", label: "Studio" },
  { id: "house", label: "Maison" },
  { id: "residence", label: "Résidence" },
  { id: "penthouse", label: "Penthouse" },
] as const;

export const CAR_TYPES = [
  { id: "suv", label: "SUV" },
  { id: "sedan", label: "Berline" },
  { id: "luxury", label: "Luxe" },
  { id: "city", label: "Citadine" },
  { id: "pickup", label: "Pick-up" },
  { id: "van", label: "Van" },
] as const;

export const EXPERIENCE_TYPES = [
  { id: "gastronomy", label: "Gastronomie" },
  { id: "nautical", label: "Nautisme" },
  { id: "adventure", label: "Aventure" },
  { id: "wellness", label: "Bien-être" },
  { id: "culture", label: "Culture" },
  { id: "nightlife", label: "Vie nocturne" },
] as const;

export interface City {
  id: string;
  name: string;
  region: string;
  listings: number;
  image: string;
}

export const CITIES: City[] = [
  { id: "douala", name: "Douala", region: "Littoral", listings: 2100, image: "1449034446853-66c86144b0ad" },
  { id: "yaounde", name: "Yaoundé", region: "Centre", listings: 1240, image: "1580746738099-78d6833b3e86" },
  { id: "kribi", name: "Kribi", region: "Sud", listings: 450, image: "1507525428034-b723cf961d3e" },
  { id: "limbe", name: "Limbé", region: "Sud-Ouest", listings: 320, image: "1505228395891-9a51e7e86bf6" },
  { id: "bafoussam", name: "Bafoussam", region: "Ouest", listings: 380, image: "1502920917128-1aa500764cbd" },
  { id: "buea", name: "Buea", region: "Sud-Ouest", listings: 290, image: "1441974231531-c6227db76b6e" },
];

export const STATS = [
  { value: "5 000+", label: "Annonces vérifiées" },
  { value: "12 000+", label: "Réservations réussies" },
  { value: "4.9/5", label: "Satisfaction voyageurs" },
  { value: "6", label: "Villes couvertes" },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TRUST_FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description: "Mobile Money & carte, chiffrés de bout en bout. Vos fonds sont protégés jusqu'au check-in.",
  },
  {
    icon: BadgeCheck,
    title: "Annonces vérifiées",
    description: "Chaque logement, voiture et expérience est contrôlé par nos équipes avant publication.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Une conciergerie humaine, joignable à tout moment, en français et en anglais.",
  },
  {
    icon: Sparkles,
    title: "Expériences VIP",
    description: "Un catalogue confidentiel d'adresses et d'activités que l'on ne trouve nulle part ailleurs.",
  },
];

export const HOW_IT_WORKS = [
  {
    icon: Search,
    step: "01",
    title: "Explorez",
    description: "Logements, voitures, expériences — une recherche unifiée, des filtres précis, une carte interactive.",
  },
  {
    icon: Star,
    step: "02",
    title: "Comparez",
    description: "Photos HD, avis vérifiés, disponibilités en temps réel. Choisissez en toute confiance.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Réservez",
    description: "Paiement instantané par Mobile Money ou carte. Confirmation immédiate, sans surprise.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Profitez",
    description: "Votre séjour, votre trajet, votre moment. Nous restons à vos côtés du début à la fin.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Marie Tchouang",
    role: "Voyageuse · Yaoundé",
    rating: 5,
    quote:
      "J'ai réservé une villa à Kribi et une voiture avec chauffeur en cinq minutes. Tout était impeccable, exactement comme sur les photos.",
  },
  {
    id: 2,
    name: "Jean-Paul Mbarga",
    role: "Entrepreneur · Douala",
    rating: 5,
    quote:
      "La meilleure plateforme du pays. Le paiement Mobile Money est instantané et le support répond en quelques minutes.",
  },
  {
    id: 3,
    name: "Cécile Fouda",
    role: "Hôte · Bafoussam",
    rating: 5,
    quote:
      "En tant qu'hôte, le tableau de bord est d'une clarté rare. Mes annonces sont plus visibles et mieux réservées.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Comment fonctionne une réservation ?",
    answer:
      "Choisissez un logement, une voiture ou une expérience, sélectionnez vos dates, payez par Mobile Money ou carte, et recevez une confirmation instantanée par email et SMS.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Orange Money, MTN Mobile Money et les cartes bancaires (Visa, Mastercard). Toutes les transactions sont chiffrées et sécurisées.",
  },
  {
    question: "Puis-je publier mon logement, ma voiture ou une expérience ?",
    answer:
      "Oui. Créez un compte hôte, renseignez votre annonce, ajoutez des photos HD et définissez vos tarifs. Notre équipe vérifie et publie sous 24h.",
  },
  {
    question: "Quelle est la politique d'annulation ?",
    answer:
      "Elle est affichée clairement sur chaque annonce. En cas d'annulation éligible, le remboursement est traité sous 5 jours ouvrés.",
  },
  {
    question: "Le support est-il vraiment disponible 24/7 ?",
    answer:
      "Oui, notre conciergerie est joignable à tout moment via le chat, par email ou par téléphone, en français et en anglais.",
  },
];

export const NAV_LINKS = [
  { href: "/search?category=property", label: "Logements" },
  { href: "/search?category=car", label: "Voitures" },
  { href: "/search?category=experience", label: "Expériences" },
  { href: "/host", label: "Devenir hôte" },
];

export const AMENITY_ICON = { Home, MapPinned } satisfies Record<string, LucideIcon>;

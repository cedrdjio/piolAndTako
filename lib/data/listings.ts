import type { Host, Listing, ListingCategory, SearchParams } from "@/lib/types";
import { SITE } from "@/lib/constants";

/**
 * In-memory listing repository.
 *
 * This mirrors the Prisma model shape 1:1 (see prisma/schema.prisma), so the
 * accessors below can later be swapped for real Prisma queries without touching
 * any UI. Functions are async on purpose — they model the eventual DB latency
 * and let pages stream with Suspense today.
 */

const HOSTS: Record<string, Host> = {
  awa: { id: "h-awa", name: "Awa Njoya", avatar: "", superhost: true, since: 2021, responseRate: 99 },
  eric: { id: "h-eric", name: "Éric Fotso", avatar: "", superhost: true, since: 2020, responseRate: 98 },
  lea: { id: "h-lea", name: "Léa Manga", avatar: "", superhost: false, since: 2022, responseRate: 95 },
  paul: { id: "h-paul", name: "Paul Biya Jr.", avatar: "", superhost: true, since: 2019, responseRate: 100 },
  ines: { id: "h-ines", name: "Inès Kamdem", avatar: "", superhost: true, since: 2021, responseRate: 97 },
};

const CURRENCY = SITE.currency;
const COUNTRY = "Cameroun";

function makeSlug(title: string, id: string) {
  return `${title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}-${id}`;
}

type Seed = Omit<Listing, "slug" | "currency" | "country"> & Partial<Pick<Listing, "slug">>;

const SEED: Seed[] = [
  // ---- PROPERTIES ---------------------------------------------------------
  {
    id: "p1",
    category: "property",
    title: "Villa Bonanjo",
    summary: "Villa contemporaine avec piscine à débordement",
    description:
      "Perchée sur les hauteurs de Bonanjo, cette villa d'architecte offre une vue panoramique sur l'estuaire du Wouri. Cinq suites, une piscine à débordement, un chef privé sur demande et un service de conciergerie 24/7.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0429, lng: 9.6928 },
    price: 100000,
    priceUnit: "nuit",
    rating: 4.9,
    reviewsCount: 128,
    images: [],
    badges: ["populaire", "coup-de-coeur"],
    instantBook: true,
    amenities: ["Piscine à débordement", "Wi-Fi fibre", "Climatisation", "Parking privé", "Chef sur demande", "Vue mer"],
    host: HOSTS.awa,
    specs: { kind: "property", type: "Villa", guests: 10, bedrooms: 5, beds: 6, bathrooms: 5, area: 420 },
  },
  {
    id: "p2",
    category: "property",
    title: "Cape Shark Villas",
    summary: "Résidence balnéaire face à l'océan",
    description:
      "À quelques pas de la plage de Kribi, une résidence de standing aux volumes généreux, baignée de lumière, avec accès direct au sable blanc et couchers de soleil inoubliables.",
    city: "Kribi",
    region: "Sud",
    coordinates: { lat: 2.9391, lng: 9.9095 },
    price: 100000,
    priceUnit: "nuit",
    rating: 4.9,
    reviewsCount: 96,
    images: [],
    badges: ["populaire"],
    instantBook: true,
    amenities: ["Accès plage", "Wi-Fi fibre", "Climatisation", "Terrasse", "Cuisine équipée"],
    host: HOSTS.eric,
    specs: { kind: "property", type: "Villa", guests: 8, bedrooms: 4, beds: 5, bathrooms: 4, area: 310 },
  },
  {
    id: "p3",
    category: "property",
    title: "Makalele Eclipse",
    summary: "Penthouse design au cœur d'Akwa",
    description:
      "Un penthouse au dernier étage d'une tour d'Akwa : plafonds hauts, mobilier signé, home cinéma et rooftop privatif avec jacuzzi surplombant la ville.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0511, lng: 9.7679 },
    price: 100000,
    priceUnit: "nuit",
    rating: 4.9,
    reviewsCount: 73,
    images: [],
    badges: ["populaire", "vip"],
    instantBook: false,
    amenities: ["Rooftop privatif", "Jacuzzi", "Home cinéma", "Wi-Fi fibre", "Ascenseur", "Sécurité 24/7"],
    host: HOSTS.paul,
    specs: { kind: "property", type: "Penthouse", guests: 4, bedrooms: 2, beds: 2, bathrooms: 2, area: 180 },
  },
  {
    id: "p4",
    category: "property",
    title: "Résidence Djeuga",
    summary: "Appartement lumineux proche du centre",
    description:
      "Un appartement récemment rénové à Yaoundé, idéal pour un séjour d'affaires : bureau dédié, connexion fibre, et à dix minutes du quartier administratif.",
    city: "Yaoundé",
    region: "Centre",
    coordinates: { lat: 3.848, lng: 11.5021 },
    price: 65000,
    priceUnit: "nuit",
    rating: 4.7,
    reviewsCount: 54,
    images: [],
    badges: ["nouveau"],
    instantBook: true,
    amenities: ["Bureau dédié", "Wi-Fi fibre", "Climatisation", "Parking"],
    host: HOSTS.lea,
    specs: { kind: "property", type: "Appartement", guests: 3, bedrooms: 2, beds: 2, bathrooms: 1, area: 95 },
  },
  {
    id: "p5",
    category: "property",
    title: "Villa Riviera",
    summary: "Maison familiale avec grand jardin",
    description:
      "Une maison chaleureuse à Limbé, entourée d'un jardin tropical, à deux pas des plages de sable noir et du pied du mont Cameroun.",
    city: "Limbé",
    region: "Sud-Ouest",
    coordinates: { lat: 4.0186, lng: 9.2148 },
    price: 78000,
    priceUnit: "nuit",
    rating: 4.8,
    reviewsCount: 64,
    images: [],
    badges: [],
    instantBook: true,
    amenities: ["Jardin tropical", "Barbecue", "Wi-Fi", "Parking", "Proche plage"],
    host: HOSTS.ines,
    specs: { kind: "property", type: "Maison", guests: 6, bedrooms: 3, beds: 4, bathrooms: 2, area: 210 },
  },
  {
    id: "p6",
    category: "property",
    title: "Studio Highland",
    summary: "Studio cosy sur les hauteurs de Buea",
    description:
      "Un studio design au climat frais de Buea, parfait pour les randonneurs du mont Cameroun. Vue sur les plantations et petit-déjeuner local offert.",
    city: "Buea",
    region: "Sud-Ouest",
    coordinates: { lat: 4.1537, lng: 9.2418 },
    price: 42000,
    priceUnit: "nuit",
    rating: 4.6,
    reviewsCount: 41,
    images: [],
    badges: ["nouveau"],
    instantBook: true,
    amenities: ["Petit-déjeuner offert", "Wi-Fi", "Vue montagne", "Cuisine"],
    host: HOSTS.lea,
    specs: { kind: "property", type: "Studio", guests: 2, bedrooms: 1, beds: 1, bathrooms: 1, area: 48 },
  },

  // ---- CARS ---------------------------------------------------------------
  {
    id: "c1",
    category: "car",
    title: "Range Rover Autobiography",
    summary: "SUV de prestige avec chauffeur",
    description:
      "Le summum du luxe tout-terrain. Intérieur cuir, sièges massants, et chauffeur professionnel expérimenté pour vos déplacements à Douala et au-delà.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0483, lng: 9.7043 },
    price: 120000,
    priceUnit: "jour",
    rating: 5.0,
    reviewsCount: 87,
    images: [],
    badges: ["vip", "populaire"],
    instantBook: true,
    amenities: ["Chauffeur inclus", "Cuir", "Toit panoramique", "Wi-Fi à bord", "Eau offerte"],
    host: HOSTS.eric,
    specs: { kind: "car", type: "SUV", seats: 5, transmission: "Automatique", fuel: "Diesel", doors: 5, withDriver: true },
  },
  {
    id: "c2",
    category: "car",
    title: "Mercedes-Benz Classe E",
    summary: "Berline exécutive élégante",
    description:
      "La berline d'affaires par excellence. Confort feutré, silence de roulement et prestance pour vos rendez-vous professionnels.",
    city: "Yaoundé",
    region: "Centre",
    coordinates: { lat: 3.8667, lng: 11.5167 },
    price: 85000,
    priceUnit: "jour",
    rating: 4.9,
    reviewsCount: 62,
    images: [],
    badges: ["populaire"],
    instantBook: true,
    amenities: ["Chauffeur en option", "Cuir", "Climatisation 4 zones", "GPS"],
    host: HOSTS.paul,
    specs: { kind: "car", type: "Berline", seats: 5, transmission: "Automatique", fuel: "Essence", doors: 4, withDriver: false },
  },
  {
    id: "c3",
    category: "car",
    title: "Toyota Land Cruiser",
    summary: "4x4 robuste pour toutes les routes",
    description:
      "Le compagnon idéal pour explorer le Cameroun, des pistes du Nord aux plages du Sud. Fiable, spacieux et prêt à l'aventure.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0611, lng: 9.7859 },
    price: 70000,
    priceUnit: "jour",
    rating: 4.8,
    reviewsCount: 74,
    images: [],
    badges: [],
    instantBook: true,
    amenities: ["4 roues motrices", "7 places", "Climatisation", "Grand coffre"],
    host: HOSTS.awa,
    specs: { kind: "car", type: "SUV", seats: 7, transmission: "Manuelle", fuel: "Diesel", doors: 5, withDriver: false },
  },
  {
    id: "c4",
    category: "car",
    title: "Hyundai Tucson",
    summary: "SUV compact économique",
    description:
      "Un SUV moderne, sobre et confortable, parfait pour la ville comme pour les escapades du week-end. Faible consommation.",
    city: "Yaoundé",
    region: "Centre",
    coordinates: { lat: 3.848, lng: 11.5021 },
    price: 45000,
    priceUnit: "jour",
    rating: 4.6,
    reviewsCount: 38,
    images: [],
    badges: ["nouveau"],
    instantBook: true,
    amenities: ["Bluetooth", "Caméra de recul", "Climatisation", "USB"],
    host: HOSTS.lea,
    specs: { kind: "car", type: "SUV", seats: 5, transmission: "Automatique", fuel: "Essence", doors: 5, withDriver: false },
  },
  {
    id: "c5",
    category: "car",
    title: "BMW Série 7",
    summary: "Limousine de direction avec chauffeur",
    description:
      "Pour vos événements et transferts VIP : une limousine d'exception, chauffeur en costume, discrétion et ponctualité garanties.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0511, lng: 9.7679 },
    price: 150000,
    priceUnit: "jour",
    rating: 5.0,
    reviewsCount: 29,
    images: [],
    badges: ["vip"],
    instantBook: false,
    amenities: ["Chauffeur inclus", "Sièges arrière inclinables", "Réfrigérateur", "Wi-Fi", "Vitres teintées"],
    host: HOSTS.eric,
    specs: { kind: "car", type: "Luxe", seats: 4, transmission: "Automatique", fuel: "Hybride", doors: 4, withDriver: true },
  },
  {
    id: "c6",
    category: "car",
    title: "Suzuki Swift",
    summary: "Citadine agile et maligne",
    description:
      "La citadine idéale pour se faufiler dans le trafic de Douala. Économique, facile à garer, parfaite pour les trajets urbains.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0483, lng: 9.7043 },
    price: 28000,
    priceUnit: "jour",
    rating: 4.5,
    reviewsCount: 52,
    images: [],
    badges: [],
    instantBook: true,
    amenities: ["Faible consommation", "Bluetooth", "Climatisation", "Compacte"],
    host: HOSTS.ines,
    specs: { kind: "car", type: "Citadine", seats: 5, transmission: "Manuelle", fuel: "Essence", doors: 5, withDriver: false },
  },

  // ---- EXPERIENCES --------------------------------------------------------
  {
    id: "e1",
    category: "experience",
    title: "Coucher de soleil en yacht",
    summary: "Croisière privée au large de Kribi",
    description:
      "Embarquez pour une croisière privée au coucher du soleil. Champagne, fruits de mer frais et baignade dans les eaux turquoise au large de Kribi.",
    city: "Kribi",
    region: "Sud",
    coordinates: { lat: 2.9391, lng: 9.9095 },
    price: 55000,
    priceUnit: "personne",
    rating: 5.0,
    reviewsCount: 44,
    images: [],
    badges: ["populaire", "vip"],
    instantBook: true,
    amenities: ["Champagne offert", "Skipper privé", "Équipement snorkeling", "Fruits de mer"],
    host: HOSTS.eric,
    specs: { kind: "experience", type: "Nautisme", durationHours: 4, groupSize: 8, language: "FR · EN" },
  },
  {
    id: "e2",
    category: "experience",
    title: "Safari culinaire à Douala",
    summary: "Découverte gastronomique guidée",
    description:
      "Un chef local vous emmène à la découverte des saveurs camerounaises : marchés colorés, street food authentique et dîner dans une table confidentielle.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0483, lng: 9.7043 },
    price: 35000,
    priceUnit: "personne",
    rating: 4.9,
    reviewsCount: 67,
    images: [],
    badges: ["coup-de-coeur"],
    instantBook: true,
    amenities: ["Guide chef local", "Dégustations", "Transport inclus", "Dîner"],
    host: HOSTS.awa,
    specs: { kind: "experience", type: "Gastronomie", durationHours: 5, groupSize: 6, language: "FR · EN" },
  },
  {
    id: "e3",
    category: "experience",
    title: "Ascension du Mont Cameroun",
    summary: "Trek guidé de deux jours",
    description:
      "Relevez le défi du plus haut sommet d'Afrique de l'Ouest avec des guides certifiés. Bivouac sous les étoiles et lever de soleil à couper le souffle.",
    city: "Buea",
    region: "Sud-Ouest",
    coordinates: { lat: 4.2039, lng: 9.1706 },
    price: 90000,
    priceUnit: "personne",
    rating: 4.8,
    reviewsCount: 31,
    images: [],
    badges: ["nouveau"],
    instantBook: false,
    amenities: ["Guides certifiés", "Équipement fourni", "Repas inclus", "Bivouac"],
    host: HOSTS.ines,
    specs: { kind: "experience", type: "Aventure", durationHours: 36, groupSize: 10, language: "FR · EN" },
  },
  {
    id: "e4",
    category: "experience",
    title: "Spa & bien-être en bord de mer",
    summary: "Journée détente signature",
    description:
      "Une parenthèse de sérénité : massages aux huiles locales, hammam, yoga face à l'océan et déjeuner healthy dans un cadre idyllique.",
    city: "Limbé",
    region: "Sud-Ouest",
    coordinates: { lat: 4.0186, lng: 9.2148 },
    price: 48000,
    priceUnit: "personne",
    rating: 4.9,
    reviewsCount: 38,
    images: [],
    badges: ["coup-de-coeur"],
    instantBook: true,
    amenities: ["Massage 60 min", "Hammam", "Cours de yoga", "Déjeuner healthy"],
    host: HOSTS.lea,
    specs: { kind: "experience", type: "Bien-être", durationHours: 6, groupSize: 4, language: "FR" },
  },
  {
    id: "e5",
    category: "experience",
    title: "Tour street-art & culture",
    summary: "Yaoundé côté artistes",
    description:
      "Explorez la scène artistique bouillonnante de Yaoundé : ateliers d'artistes, fresques murales, galeries indépendantes et rencontre avec les créateurs.",
    city: "Yaoundé",
    region: "Centre",
    coordinates: { lat: 3.848, lng: 11.5021 },
    price: 22000,
    priceUnit: "personne",
    rating: 4.7,
    reviewsCount: 26,
    images: [],
    badges: [],
    instantBook: true,
    amenities: ["Guide artiste", "Entrées galeries", "Atelier créatif", "Café offert"],
    host: HOSTS.paul,
    specs: { kind: "experience", type: "Culture", durationHours: 3, groupSize: 12, language: "FR · EN" },
  },
  {
    id: "e6",
    category: "experience",
    title: "Nuit VIP en rooftop",
    summary: "Soirée privée avec DJ",
    description:
      "Vivez la nuit camerounaise depuis un rooftop exclusif : DJ set, cocktails signature, vue sur la skyline et accès coupe-file aux meilleurs clubs.",
    city: "Douala",
    region: "Littoral",
    coordinates: { lat: 4.0511, lng: 9.7679 },
    price: 40000,
    priceUnit: "personne",
    rating: 4.8,
    reviewsCount: 49,
    images: [],
    badges: ["vip", "populaire"],
    instantBook: true,
    amenities: ["DJ set", "Cocktails inclus", "Accès coupe-file", "Espace privatif"],
    host: HOSTS.eric,
    specs: { kind: "experience", type: "Vie nocturne", durationHours: 5, groupSize: 15, language: "FR · EN" },
  },
];

const LISTINGS: Listing[] = SEED.map((s) => ({
  ...s,
  slug: s.slug ?? makeSlug(s.title, s.id),
  currency: CURRENCY,
  country: COUNTRY,
}));

// --- Repository API --------------------------------------------------------

export async function getAllListings(): Promise<Listing[]> {
  return LISTINGS;
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return LISTINGS.find((l) => l.slug === slug) ?? null;
}

export async function getListingsByCategory(
  category: ListingCategory,
  limit?: number,
): Promise<Listing[]> {
  const items = LISTINGS.filter((l) => l.category === category);
  return limit ? items.slice(0, limit) : items;
}

export async function getFeaturedListings(limit = 8): Promise<Listing[]> {
  return [...LISTINGS]
    .sort((a, b) => Number(b.badges.includes("populaire")) - Number(a.badges.includes("populaire")))
    .slice(0, limit);
}

export async function getRelatedListings(listing: Listing, limit = 3): Promise<Listing[]> {
  return LISTINGS.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, limit);
}

export async function searchListings(params: SearchParams): Promise<Listing[]> {
  let results = [...LISTINGS];

  if (params.category) results = results.filter((l) => l.category === params.category);
  if (params.city) results = results.filter((l) => l.city.toLowerCase() === params.city!.toLowerCase());
  if (params.type) results = results.filter((l) => l.specs.type.toLowerCase() === params.type!.toLowerCase());
  if (params.minPrice != null) results = results.filter((l) => l.price >= params.minPrice!);
  if (params.maxPrice != null) results = results.filter((l) => l.price <= params.maxPrice!);
  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.summary.toLowerCase().includes(q),
    );
  }

  switch (params.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    default:
      results.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  return results;
}

export function allListingSlugs(): { slug: string }[] {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

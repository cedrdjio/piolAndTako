/**
 * Mock dashboard data (host + admin). Same shape the Prisma aggregates would
 * return, so screens can later swap to real queries without UI changes.
 */

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ModerationStatus = "pending" | "approved" | "rejected";
export type PayoutStatus = "paid" | "processing" | "scheduled";

export interface KpiPoint {
  label: string;
  value: number;
}

export interface HostBooking {
  id: string;
  ref: string;
  guest: string;
  listing: string;
  category: "property" | "car" | "experience";
  checkin: string;
  checkout: string;
  guests: number;
  total: number;
  status: BookingStatus;
}

export interface Transaction {
  id: string;
  date: string;
  label: string;
  amount: number;
  status: PayoutStatus;
  method: string;
}

export interface DashboardReview {
  id: string;
  author: string;
  listing: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
}

export interface MessageThread {
  id: string;
  name: string;
  listing: string;
  preview: string;
  time: string;
  unread: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "GUEST" | "HOST" | "ADMIN";
  status: "active" | "suspended";
  joined: string;
  bookings: number;
}

export interface AdminListingRow {
  id: string;
  title: string;
  host: string;
  category: "property" | "car" | "experience";
  city: string;
  price: number;
  status: ModerationStatus;
  submitted: string;
}

// --- Host --------------------------------------------------------------------

export const HOST_STATS = {
  revenue: 4_820_000,
  revenueDelta: 12.4,
  bookings: 38,
  bookingsDelta: 8.1,
  occupancy: 76,
  occupancyDelta: 3.2,
  rating: 4.9,
  ratingDelta: 0.1,
  views: 12_480,
};

export const HOST_REVENUE_TREND: KpiPoint[] = [
  { label: "Jan", value: 280 },
  { label: "Fév", value: 340 },
  { label: "Mar", value: 410 },
  { label: "Avr", value: 380 },
  { label: "Mai", value: 520 },
  { label: "Juin", value: 610 },
  { label: "Juil", value: 720 },
  { label: "Aoû", value: 690 },
  { label: "Sep", value: 560 },
  { label: "Oct", value: 480 },
  { label: "Nov", value: 420 },
  { label: "Déc", value: 610 },
];

export const HOST_BOOKINGS: HostBooking[] = [
  { id: "b1", ref: "PT-4KD9A", guest: "Marie Tchouang", listing: "Villa Bonanjo", category: "property", checkin: "2026-08-12", checkout: "2026-08-16", guests: 6, total: 420000, status: "confirmed" },
  { id: "b2", ref: "PT-7XB21", guest: "Jean-Paul Mbarga", listing: "Range Rover Autobiography", category: "car", checkin: "2026-08-14", checkout: "2026-08-15", guests: 3, total: 126000, status: "pending" },
  { id: "b3", ref: "PT-9QW34", guest: "Cécile Fouda", listing: "Coucher de soleil en yacht", category: "experience", checkin: "2026-08-18", checkout: "2026-08-18", guests: 4, total: 231000, status: "confirmed" },
  { id: "b4", ref: "PT-2MN88", guest: "Éric Nkolo", listing: "Cape Shark Villas", category: "property", checkin: "2026-07-20", checkout: "2026-07-24", guests: 8, total: 420000, status: "completed" },
  { id: "b5", ref: "PT-5RT19", guest: "Aïcha Bello", listing: "Makalele Eclipse", category: "property", checkin: "2026-09-01", checkout: "2026-09-03", guests: 2, total: 210000, status: "pending" },
  { id: "b6", ref: "PT-8LP52", guest: "Franck Owona", listing: "Mercedes-Benz Classe E", category: "car", checkin: "2026-07-11", checkout: "2026-07-13", guests: 4, total: 178500, status: "cancelled" },
  { id: "b7", ref: "PT-3VC70", guest: "Nadège Essomba", listing: "Villa Riviera", category: "property", checkin: "2026-08-25", checkout: "2026-08-28", guests: 6, total: 245700, status: "confirmed" },
];

export const HOST_TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "2026-07-24", label: "Versement — Cape Shark Villas", amount: 399000, status: "paid", method: "Orange Money" },
  { id: "t2", date: "2026-07-13", label: "Versement — Mercedes Classe E", amount: 169575, status: "paid", method: "Virement" },
  { id: "t3", date: "2026-08-16", label: "Versement — Villa Bonanjo", amount: 399000, status: "scheduled", method: "MTN MoMo" },
  { id: "t4", date: "2026-08-18", label: "Versement — Yacht sunset", amount: 219450, status: "processing", method: "Orange Money" },
];

export const HOST_REVIEWS: DashboardReview[] = [
  { id: "r1", author: "Marie Tchouang", listing: "Villa Bonanjo", rating: 5, comment: "Séjour parfait, vue imprenable et hôte aux petits soins.", date: "2026-07-26", replied: false },
  { id: "r2", author: "Éric Nkolo", listing: "Cape Shark Villas", rating: 5, comment: "Emplacement idéal face à l'océan, tout était impeccable.", date: "2026-07-25", replied: true },
  { id: "r3", author: "Franck Owona", listing: "Mercedes-Benz Classe E", rating: 4, comment: "Voiture confortable, chauffeur ponctuel. Rien à redire.", date: "2026-07-14", replied: false },
];

export const HOST_MESSAGES: MessageThread[] = [
  { id: "m1", name: "Marie Tchouang", listing: "Villa Bonanjo", preview: "Bonjour, est-il possible d'arriver plus tôt ?", time: "09:24", unread: 2 },
  { id: "m2", name: "Aïcha Bello", listing: "Makalele Eclipse", preview: "Merci pour la confirmation !", time: "Hier", unread: 0 },
  { id: "m3", name: "Nadège Essomba", listing: "Villa Riviera", preview: "Le parking est-il inclus ?", time: "Lun.", unread: 1 },
];

// --- Admin -------------------------------------------------------------------

export const ADMIN_STATS = {
  gmv: 184_500_000,
  gmvDelta: 18.2,
  users: 8_420,
  usersDelta: 6.4,
  listings: 5_120,
  listingsDelta: 4.1,
  bookings: 12_640,
  bookingsDelta: 9.7,
};

export const ADMIN_GMV_TREND: KpiPoint[] = HOST_REVENUE_TREND.map((p, i) => ({
  label: p.label,
  value: p.value * 24 + i * 60,
}));

export const ADMIN_CATEGORY_SPLIT: KpiPoint[] = [
  { label: "Logements", value: 58 },
  { label: "Voitures", value: 27 },
  { label: "Expériences", value: 15 },
];

export const ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Awa Njoya", email: "awa@piolandtako.com", role: "HOST", status: "active", joined: "2024-03-11", bookings: 128 },
  { id: "u2", name: "Éric Fotso", email: "eric.f@example.com", role: "HOST", status: "active", joined: "2023-11-02", bookings: 96 },
  { id: "u3", name: "Marie Tchouang", email: "marie.t@example.com", role: "GUEST", status: "active", joined: "2025-01-19", bookings: 14 },
  { id: "u4", name: "Paul Biya Jr.", email: "paul.jr@example.com", role: "HOST", status: "suspended", joined: "2023-06-30", bookings: 41 },
  { id: "u5", name: "Inès Kamdem", email: "ines.k@example.com", role: "ADMIN", status: "active", joined: "2022-09-15", bookings: 0 },
  { id: "u6", name: "Franck Owona", email: "franck.o@example.com", role: "GUEST", status: "active", joined: "2025-05-08", bookings: 7 },
];

export const ADMIN_LISTINGS: AdminListingRow[] = [
  { id: "al1", title: "Penthouse Bali Sky", host: "Awa Njoya", category: "property", city: "Douala", price: 145000, status: "pending", submitted: "2026-07-26" },
  { id: "al2", title: "Porsche 911 Carrera", host: "Éric Fotso", category: "car", city: "Yaoundé", price: 180000, status: "pending", submitted: "2026-07-25" },
  { id: "al3", title: "Dégustation vins & cacao", host: "Léa Manga", category: "experience", city: "Kribi", price: 38000, status: "approved", submitted: "2026-07-23" },
  { id: "al4", title: "Studio douteux centre-ville", host: "Compte non vérifié", category: "property", city: "Douala", price: 12000, status: "rejected", submitted: "2026-07-22" },
  { id: "al5", title: "Villa Riviera Deluxe", host: "Inès Kamdem", category: "property", city: "Limbé", price: 98000, status: "approved", submitted: "2026-07-20" },
];

export const ADMIN_TRANSACTIONS: Transaction[] = [
  { id: "at1", date: "2026-07-26", label: "Commission — PT-4KD9A", amount: 21000, status: "paid", method: "Orange Money" },
  { id: "at2", date: "2026-07-26", label: "Versement hôte — Awa Njoya", amount: 399000, status: "processing", method: "MTN MoMo" },
  { id: "at3", date: "2026-07-25", label: "Commission — PT-9QW34", amount: 11550, status: "paid", method: "Carte" },
  { id: "at4", date: "2026-07-24", label: "Remboursement — PT-8LP52", amount: -178500, status: "paid", method: "Carte" },
  { id: "at5", date: "2026-07-24", label: "Versement hôte — Éric Fotso", amount: 245000, status: "scheduled", method: "Virement" },
];

export const ADMIN_REVIEWS: DashboardReview[] = [
  { id: "ar1", author: "Utilisateur anonyme", listing: "Studio centre-ville", rating: 1, comment: "Signalé : propos inappropriés dans l'avis.", date: "2026-07-26", replied: false },
  { id: "ar2", author: "Marie Tchouang", listing: "Villa Bonanjo", rating: 5, comment: "Séjour parfait, vue imprenable.", date: "2026-07-26", replied: false },
  { id: "ar3", author: "Franck Owona", listing: "Mercedes-Benz Classe E", rating: 4, comment: "Voiture confortable, chauffeur ponctuel.", date: "2026-07-14", replied: false },
];

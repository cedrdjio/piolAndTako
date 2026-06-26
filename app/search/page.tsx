"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, SlidersHorizontal, Map, Star } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "Tout", icon: "🏠" },
  { id: "apartment", label: "Appartements", icon: "🏘️" },
  { id: "studio", label: "Studios", icon: "🛋️" },
  { id: "villa", label: "Villas", icon: "🏡" },
  { id: "hotel", label: "Hôtels", icon: "🏨" },
  { id: "house", label: "Maisons", icon: "🏠" },
  { id: "room", label: "Chambres", icon: "🛏️" },
  { id: "vehicle", label: "Véhicules", icon: "🚗" },
  { id: "luxury", label: "Luxe", icon: "💎" },
];

const MOCK_LISTINGS = [
  { id: "1", type: "accommodation", title: "Appartement moderne Centre-ville", city: "Yaoundé", neighborhood: "Bastos", distance: "2 km du centre", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", price: 45000, rating: 4.9, reviews: 128, category: "apartment", isFeatured: true, isNew: false },
  { id: "2", type: "accommodation", title: "Villa avec piscine Bastos", city: "Yaoundé", neighborhood: "Bastos", distance: "5 km du centre", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", price: 150000, rating: 4.8, reviews: 64, category: "villa", isFeatured: false, isNew: true },
  { id: "3", type: "accommodation", title: "Studio meublé Akwa", city: "Douala", neighborhood: "Akwa", distance: "1 km du centre", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80", price: 25000, rating: 4.7, reviews: 89, category: "studio", isFeatured: false, isNew: false },
  { id: "4", type: "accommodation", title: "Hôtel Prestige Bonapriso", city: "Douala", neighborhood: "Bonapriso", distance: "3 km du centre", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", price: 85000, rating: 4.6, reviews: 210, category: "hotel", isFeatured: true, isNew: false },
  { id: "5", type: "accommodation", title: "Maison familiale à Kribi", city: "Kribi", neighborhood: "Bord de mer", distance: "500m de la plage", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&q=80", price: 60000, rating: 5.0, reviews: 34, category: "house", isFeatured: false, isNew: true },
  { id: "6", type: "accommodation", title: "Studio cosy Bafoussam", city: "Bafoussam", neighborhood: "Centre", distance: "800m du centre", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", price: 18000, rating: 4.5, reviews: 42, category: "studio", isFeatured: false, isNew: false },
  { id: "7", type: "vehicle", title: "Toyota RAV4 avec chauffeur", city: "Yaoundé", neighborhood: "Toute la ville", distance: "Disponible maintenant", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", price: 35000, rating: 4.9, reviews: 156, category: "vehicle", isFeatured: true, isNew: false },
  { id: "8", type: "vehicle", title: "Mercedes-Benz Classe E", city: "Douala", neighborhood: "Toute la ville", distance: "Luxe & Confort", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", price: 80000, rating: 5.0, reviews: 28, category: "vehicle", isFeatured: false, isNew: true },
  { id: "9", type: "accommodation", title: "Résidence Meubleé Garoua", city: "Garoua", neighborhood: "Centre", distance: "1.2 km du centre", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", price: 22000, rating: 4.4, reviews: 19, category: "residence", isFeatured: false, isNew: false },
  { id: "10", type: "accommodation", title: "Chambre VIP Bamenda", city: "Bamenda", neighborhood: "Up Station", distance: "3 km du centre", image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&q=80", price: 15000, rating: 4.6, reviews: 31, category: "room", isFeatured: false, isNew: true },
  { id: "11", type: "vehicle", title: "SUV Toyota Land Cruiser", city: "Yaoundé", neighborhood: "Toute la ville", distance: "Idéal routes difficiles", image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", price: 55000, rating: 4.8, reviews: 44, category: "vehicle", isFeatured: false, isNew: false },
  { id: "12", type: "accommodation", title: "Appartement Luxe Bonapriso", city: "Douala", neighborhood: "Bonapriso", distance: "Centre d'affaires", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", price: 120000, rating: 5.0, reviews: 17, category: "apartment", isFeatured: true, isNew: false },
];

function ListingCard({ listing }: { listing: (typeof MOCK_LISTINGS)[0] }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-gray-100">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
        >
          <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-700"} />
        </button>
        {listing.isFeatured && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            En vedette
          </div>
        )}
        {listing.isNew && !listing.isFeatured && (
          <div className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
            Nouveau
          </div>
        )}
        {listing.type === "vehicle" && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            🚗 Véhicule
          </div>
        )}
      </div>
      <div>
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{listing.title}</h3>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={12} className="fill-gray-900 text-gray-900" />
            <span className="text-sm font-medium text-gray-900">{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{listing.city} · {listing.neighborhood}</p>
        <p className="text-xs text-gray-400 mb-1">{listing.distance}</p>
        <p className="text-sm">
          <span className="font-semibold text-gray-900">{formatPrice(listing.price)}</span>
          <span className="text-gray-400"> / {listing.type === "vehicle" ? "jour" : "nuit"}</span>
        </p>
      </div>
    </Link>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showMap, setShowMap] = useState(false);
  const city = searchParams.get("city") ?? "";

  const filtered = MOCK_LISTINGS.filter((l) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "vehicle") return l.type === "vehicle";
    if (activeCategory === "luxury") return l.price > 80000;
    return l.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Category bar */}
      <div className="border-b border-gray-100 sticky top-16 z-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl flex-shrink-0 transition-all ${
                  activeCategory === cat.id
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
              </button>
            ))}

            <div className="ml-auto pl-4 flex items-center gap-2 flex-shrink-0 border-l border-gray-100">
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                  showMap ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <Map size={13} />
                Carte
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:border-gray-300 transition-colors">
                <SlidersHorizontal size={13} />
                Filtres
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold text-gray-900">{filtered.length} logements</span>
          {city && ` à ${city}`} disponibles
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-900 font-semibold text-lg mb-2">Aucun résultat</p>
            <p className="text-gray-400 text-sm">Essayez une autre catégorie</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-xl border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors">
              Charger plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}

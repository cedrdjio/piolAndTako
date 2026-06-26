"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ListingCard from "@/components/landing/listing-card";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";

const MOCK_RESULTS = [
  { id: "acc-1", title: "Appartement moderne vue panoramique - Centre-ville Yaoundé", type: "Appartement", city: "Yaoundé", neighborhood: "Centre-ville", price: 35000, priceUnit: "night" as const, rating: 4.9, reviewCount: 127, images: [], amenities: ["wifi", "parking", "ac"], isFeatured: true, gradient: "from-emerald-400 to-teal-500" },
  { id: "acc-2", title: "Villa luxueuse avec piscine à Bastos", type: "Villa", city: "Yaoundé", neighborhood: "Bastos", price: 85000, priceUnit: "night" as const, rating: 5.0, reviewCount: 43, images: [], amenities: ["wifi", "parking", "ac"], isNew: true, gradient: "from-violet-400 to-purple-600" },
  { id: "acc-3", title: "Studio cosy meublé Akwa Douala", type: "Studio", city: "Douala", neighborhood: "Akwa", price: 20000, priceUnit: "night" as const, rating: 4.7, reviewCount: 89, images: [], amenities: ["wifi", "ac"], gradient: "from-blue-400 to-cyan-500" },
  { id: "acc-4", title: "Hôtel boutique 4 étoiles Bonapriso", type: "Hôtel", city: "Douala", neighborhood: "Bonapriso", price: 45000, priceUnit: "night" as const, rating: 4.8, reviewCount: 211, images: [], amenities: ["wifi", "parking", "ac"], gradient: "from-amber-400 to-orange-500" },
  { id: "acc-5", title: "Résidence meublée bord de mer Kribi", type: "Résidence", city: "Kribi", price: 55000, priceUnit: "night" as const, rating: 4.9, reviewCount: 67, images: [], amenities: ["wifi", "parking"], gradient: "from-cyan-400 to-blue-600" },
  { id: "acc-6", title: "Chambre confort dans résidence sécurisée", type: "Chambre", city: "Bafoussam", price: 15000, priceUnit: "night" as const, rating: 4.6, reviewCount: 34, images: [], amenities: ["wifi"], isNew: true, gradient: "from-rose-400 to-pink-600" },
];

const FILTERS = {
  types: ["Appartement", "Studio", "Villa", "Hôtel", "Chambre", "Résidence"],
  amenities: ["Wi-Fi", "Piscine", "Parking", "Climatisation", "Cuisine", "Animaux"],
};

function SearchContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20">
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="font-bold text-gray-900">{MOCK_RESULTS.length} offres{city ? ` à ${city}` : ""}</h1>
                <p className="text-sm text-gray-500">Résultats de recherche</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal size={15} />Filtres
                </Button>
                <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-xl p-1">
                  <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}><Grid3X3 size={16} /></button>
                  <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}><List size={16} /></button>
                </div>
              </div>
            </div>
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">TYPE</p>
                  <div className="flex flex-wrap gap-2">
                    {FILTERS.types.map((type) => (
                      <button key={type} onClick={() => setSelectedTypes(selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type])}
                        className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${selectedTypes.includes(type) ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>{type}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">ÉQUIPEMENTS</p>
                  <div className="flex flex-wrap gap-2">
                    {FILTERS.amenities.map((a) => (<button key={a} className="px-3 py-1 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-gray-300 transition-all">{a}</button>))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {MOCK_RESULTS.map((listing) => <ListingCard key={listing.id} {...listing} />)}
          </div>
          <div className="text-center mt-12"><Button variant="outline" size="lg">Charger plus d&apos;offres</Button></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" /></div>}>
      <SearchContent />
    </Suspense>
  );
}

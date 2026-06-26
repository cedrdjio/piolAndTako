"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ListingCard from "./listing-card";

const MOCK_ACCOMMODATIONS = [
  { id: "acc-1", title: "Appartement moderne vue panoramique - Centre-ville Yaoundé", type: "Appartement", city: "Yaoundé", neighborhood: "Centre-ville", price: 35000, priceUnit: "night" as const, rating: 4.9, reviewCount: 127, images: [], amenities: ["wifi", "parking", "ac"], isFeatured: true, gradient: "from-emerald-400 to-teal-500" },
  { id: "acc-2", title: "Villa luxueuse avec piscine à Bastos", type: "Villa", city: "Yaoundé", neighborhood: "Bastos", price: 85000, priceUnit: "night" as const, rating: 5.0, reviewCount: 43, images: [], amenities: ["wifi", "parking", "ac"], isNew: true, gradient: "from-violet-400 to-purple-600" },
  { id: "acc-3", title: "Studio cosy meublé Akwa Douala", type: "Studio", city: "Douala", neighborhood: "Akwa", price: 20000, priceUnit: "night" as const, rating: 4.7, reviewCount: 89, images: [], amenities: ["wifi", "ac"], gradient: "from-blue-400 to-cyan-500" },
  { id: "acc-4", title: "Hôtel boutique 4 étoiles Bonapriso", type: "Hôtel", city: "Douala", neighborhood: "Bonapriso", price: 45000, priceUnit: "night" as const, rating: 4.8, reviewCount: 211, images: [], amenities: ["wifi", "parking", "ac"], gradient: "from-amber-400 to-orange-500" },
  { id: "acc-5", title: "Résidence meublée bord de mer Kribi", type: "Résidence", city: "Kribi", price: 55000, priceUnit: "night" as const, rating: 4.9, reviewCount: 67, images: [], amenities: ["wifi", "parking"], gradient: "from-cyan-400 to-blue-600" },
  { id: "acc-6", title: "Chambre confort dans résidence sécurisée", type: "Chambre", city: "Bafoussam", price: 15000, priceUnit: "night" as const, rating: 4.6, reviewCount: 34, images: [], amenities: ["wifi"], isNew: true, gradient: "from-rose-400 to-pink-600" },
];

const MOCK_VEHICLES = [
  { id: "veh-1", title: "Toyota Prado TXL - SUV Premium avec chauffeur", type: "SUV", city: "Yaoundé", price: 80000, priceUnit: "day" as const, rating: 4.9, reviewCount: 56, images: [], withDriver: true, isFeatured: true, gradient: "from-slate-600 to-gray-800" },
  { id: "veh-2", title: "Mercedes C-Class Berline de luxe", type: "Berline luxe", city: "Douala", price: 120000, priceUnit: "day" as const, rating: 5.0, reviewCount: 28, images: [], withDriver: true, gradient: "from-zinc-700 to-zinc-900" },
  { id: "veh-3", title: "Toyota Corolla - Citadine automatique", type: "Citadine", city: "Yaoundé", price: 35000, priceUnit: "day" as const, rating: 4.7, reviewCount: 92, images: [], gradient: "from-sky-400 to-blue-600" },
  { id: "veh-4", title: "Pick-up Toyota Hilux - Double cabine", type: "Pick-up", city: "Garoua", price: 60000, priceUnit: "day" as const, rating: 4.8, reviewCount: 41, images: [], gradient: "from-orange-400 to-red-500" },
];

export default function PopularListings() {
  const [activeTab, setActiveTab] = useState<"accommodation" | "vehicle">("accommodation");
  const listings = activeTab === "accommodation" ? MOCK_ACCOMMODATIONS : MOCK_VEHICLES;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{activeTab === "accommodation" ? "Logements populaires" : "Véhicules populaires"}</h2>
            <p className="text-gray-500">Les meilleures offres sélectionnées pour vous.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1 bg-gray-100 rounded-2xl p-1">
              <button onClick={() => setActiveTab("accommodation")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "accommodation" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>🏠 Logements</button>
              <button onClick={() => setActiveTab("vehicle")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "vehicle" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>🚗 Véhicules</button>
            </div>
            <Link href={`/search?type=${activeTab}`} className="hidden sm:block text-emerald-600 font-semibold hover:text-emerald-700 text-sm">Voir tout →</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, i) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <ListingCard {...listing} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={`/search?type=${activeTab}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-600 hover:text-white transition-all">Voir toutes les offres →</Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { POPULAR_CITIES } from "@/lib/constants";

const CITY_GRADIENTS = ["from-orange-400 to-red-500", "from-blue-400 to-indigo-600", "from-emerald-400 to-teal-600", "from-purple-400 to-pink-500", "from-amber-400 to-orange-500", "from-cyan-400 to-blue-500"];

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Destinations populaires</h2>
            <p className="text-gray-500">Les villes les plus recherchées par nos voyageurs.</p>
          </div>
          <Link href="/destinations" className="hidden md:block text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm">Voir toutes →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_CITIES.map((city, i) => (
            <motion.div key={city.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={`/search?city=${city.name}`} className={`group relative overflow-hidden rounded-2xl h-48 flex flex-col justify-end p-6 bg-gradient-to-br ${CITY_GRADIENTS[i % CITY_GRADIENTS.length]} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1 text-white/80 text-xs mb-1"><MapPin size={12} /><span>{city.listings.toLocaleString("fr")} annonces</span></div>
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

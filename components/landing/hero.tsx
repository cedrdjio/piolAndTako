"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Car, MapPin, Star } from "lucide-react";
import SearchBar from "@/components/search/search-bar";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"accommodation" | "vehicle">("accommodation");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-950" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <Star size={14} className="text-emerald-400 fill-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">#1 Plateforme de réservation au Cameroun</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            Votre prochain séjour,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">réservé en minutes</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Logements meublés et véhicules disponibles dans toutes les grandes villes du Cameroun. Réservez en toute sécurité avec Mobile Money.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1 mb-8">
            <button onClick={() => setActiveTab("accommodation")} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "accommodation" ? "bg-white text-gray-900 shadow-md" : "text-white/80 hover:text-white"}`}>
              <Building2 size={16} />🏠 Hébergements
            </button>
            <button onClick={() => setActiveTab("vehicle")} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "vehicle" ? "bg-white text-gray-900 shadow-md" : "text-white/80 hover:text-white"}`}>
              <Car size={16} />🚗 Véhicules
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <SearchBar mode={activeTab} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-400">
            {[{ icon: MapPin, text: "6 villes couvertes" }, { icon: Building2, text: "5 000+ annonces" }, { icon: Star, text: "4.8/5 satisfaction" }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5"><Icon size={14} className="text-emerald-400" /><span>{text}</span></div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" fill="white"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" /></svg>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ACCOMMODATION_TYPES, VEHICLE_TYPES } from "@/lib/constants";

export default function Categories() {
  const [activeMode, setActiveMode] = useState<"accommodation" | "vehicle">("accommodation");
  const items = activeMode === "accommodation" ? ACCOMMODATION_TYPES : VEHICLE_TYPES;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explorez par catégorie</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Appartements, villas, hôtels ou véhicules — trouvez exactement ce qu&apos;il vous faut.</p>
          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-2xl p-1 mt-6">
            <button onClick={() => setActiveMode("accommodation")} className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeMode === "accommodation" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>🏠 Hébergements</button>
            <button onClick={() => setActiveMode("vehicle")} className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeMode === "vehicle" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>🚗 Véhicules</button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={`/search?type=${activeMode}&category=${item.id}`} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group cursor-pointer">
                <span className="text-4xl">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 text-center">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

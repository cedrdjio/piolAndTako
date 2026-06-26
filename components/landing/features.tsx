"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Pourquoi choisir piolAndTako ?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Nous offrons la meilleure expérience de réservation au Cameroun.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

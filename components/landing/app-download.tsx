"use client";

import { motion } from "framer-motion";
import { Smartphone, Check } from "lucide-react";

export default function AppDownload() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Téléchargez l&apos;application mobile</h2>
            <p className="text-emerald-100 mb-8 max-w-lg leading-relaxed">Gérez vos réservations, chattez avec vos hôtes et découvrez de nouvelles offres — directement depuis votre téléphone.</p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Notifications en temps réel", "Paiement Mobile Money intégré", "Support chat 24h/7j", "Réservation en 1 clic"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-emerald-50">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><Check size={12} className="text-white" /></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition-colors"><span className="text-2xl">🍎</span><div className="text-left"><p className="text-xs text-gray-400">Disponible sur</p><p className="font-semibold text-sm">App Store</p></div></a>
              <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition-colors"><span className="text-2xl">🤖</span><div className="text-left"><p className="text-xs text-gray-400">Disponible sur</p><p className="font-semibold text-sm">Google Play</p></div></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-shrink-0">
            <div className="w-64 h-[480px] bg-white/10 border border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
              <Smartphone size={80} className="text-white/50" />
              <p className="text-white/70 text-sm mt-4 font-medium">Bientôt disponible</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

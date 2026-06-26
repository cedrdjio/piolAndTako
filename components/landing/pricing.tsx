"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Plans tarifaires</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Choisissez le plan adapté à vos besoins. Changez ou annulez à tout moment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 border-2 relative ${plan.highlighted ? "border-emerald-500 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl shadow-emerald-200 scale-105" : "border-gray-100 bg-white"}`}>
              {plan.highlighted && <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full">LE PLUS POPULAIRE</span></div>}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? "text-emerald-100" : "text-gray-500"}`}>{plan.description}</p>
              </div>
              <div className="mb-8">
                {plan.price === 0 ? <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>Gratuit</span> : (
                  <div><span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>{formatPrice(plan.price)}</span><span className={`text-sm ml-1 ${plan.highlighted ? "text-emerald-100" : "text-gray-400"}`}>/ {plan.period}</span></div>
                )}
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? "bg-white/20" : "bg-emerald-100"}`}><Check size={12} className={plan.highlighted ? "text-white" : "text-emerald-600"} /></div>
                    <span className={`text-sm ${plan.highlighted ? "text-emerald-50" : "text-gray-600"}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? "secondary" : "primary"} size="lg" className={`w-full ${plan.highlighted ? "bg-white text-emerald-700 hover:bg-emerald-50" : ""}`}>{plan.cta}</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

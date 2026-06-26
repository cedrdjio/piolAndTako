"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Tout ce que vous devez savoir sur piolAndTako.</p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 transition-colors">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="font-semibold text-gray-900 text-sm pr-4">{item.question}</span>
                <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180 text-emerald-600" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50"><div className="pt-4">{item.answer}</div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

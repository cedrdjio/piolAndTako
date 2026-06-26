"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Car, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps { mode: "accommodation" | "vehicle"; }

export default function SearchBar({ mode }: SearchBarProps) {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [vehicleType, setVehicleType] = useState("all");

  const cities = ["Yaoundé", "Douala", "Bafoussam", "Garoua", "Bamenda", "Kribi"];

  function handleSearch() {
    const params = new URLSearchParams({ type: mode, city, checkIn, checkOut,
      ...(mode === "accommodation" ? { guests: guests.toString() } : { vehicleType }),
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-gray-100">
          <MapPin size={18} className="text-emerald-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 mb-0.5">Ville</p>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-gray-800 text-sm font-medium outline-none cursor-pointer">
              <option value="">Choisir une ville</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-gray-100">
          <Calendar size={18} className="text-emerald-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 mb-0.5">{mode === "accommodation" ? "Arrivée" : "Début"}</p>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent text-gray-800 text-sm font-medium outline-none" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-gray-100">
          <Calendar size={18} className="text-emerald-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 mb-0.5">{mode === "accommodation" ? "Départ" : "Fin"}</p>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent text-gray-800 text-sm font-medium outline-none" />
          </div>
        </div>
        {mode === "accommodation" ? (
          <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-gray-100">
            <Users size={18} className="text-emerald-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 mb-0.5">Voyageurs</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-emerald-500 hover:text-emerald-500 transition-colors">-</button>
                <span className="text-sm font-semibold text-gray-800 w-6 text-center">{guests}</span>
                <button onClick={() => setGuests(guests + 1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-emerald-500 hover:text-emerald-500 transition-colors">+</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-gray-100">
            <Car size={18} className="text-emerald-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 mb-0.5">Type</p>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full bg-transparent text-gray-800 text-sm font-medium outline-none cursor-pointer">
                <option value="all">Tous les types</option>
                <option value="city_car">Citadine</option>
                <option value="suv">SUV</option>
                <option value="sedan">Berline</option>
                <option value="luxury">Luxe</option>
              </select>
            </div>
          </div>
        )}
        <div className="px-4 py-3 flex items-center">
          <Button variant="primary" size="lg" className="w-full lg:w-auto gap-2 rounded-xl px-8" onClick={handleSearch}>
            <Search size={18} />Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
}

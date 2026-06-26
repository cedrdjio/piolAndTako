"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Star, Heart, Share2, Wifi, Car, Wind, ChefHat, Tv, Waves, MapPin, Shield, Award, MessageSquare, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const MOCK = {
  id: "1",
  title: "Appartement moderne Centre-ville Yaoundé",
  type: "Appartement entier",
  city: "Yaoundé",
  neighborhood: "Bastos",
  price: 45000,
  rating: 4.9,
  reviews: 128,
  maxGuests: 4,
  bedrooms: 2,
  bathrooms: 1,
  sizeSqm: 75,
  description: "Magnifique appartement entièrement meublé au cœur du quartier diplomatique de Bastos. Idéal pour les voyages d’affaires ou les séjours touristiques. Vue panoramique sur la ville, climatisation dans toutes les pièces, connexion WiFi haut débit incluse.",
  amenities: [
    { icon: Wifi, label: "WiFi haut débit" },
    { icon: Wind, label: "Climatisation" },
    { icon: ChefHat, label: "Cuisine équipée" },
    { icon: Tv, label: "TV écran plat" },
    { icon: Car, label: "Parking gratuit" },
    { icon: Waves, label: "Eau chaude" },
  ],
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
  ],
  host: {
    name: "Paul Kamga",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    isSuperhost: true,
    joinedYear: 2022,
    reviews: 127,
    rating: 4.94,
    responseRate: "100%",
    bio: "Passionné d’immobilier et d’hospitalité. N’hésitez pas à me contacter pour toute question !",
  },
};

export default function ListingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const listing = MOCK;
  const [liked, setLiked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              86400000
          )
        )
      : 0;
  const subtotal = listing.price * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  function handleReserve() {
    if (nights < 1) return;
    router.push(
      `/checkout?listing_id=${listing.id}&type=accommodation&check_in=${checkIn}&check_out=${checkOut}&guests=${guests}&total=${total}`
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ChevronLeft size={16} /> Retour
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <span className="flex items-center gap-1 font-semibold">
                <Star size={14} className="fill-gray-900 text-gray-900" />
                {listing.rating}
                <span className="text-gray-400 font-normal">({listing.reviews} avis)</span>
              </span>
              {listing.host.isSuperhost && (
                <><span className="text-gray-200">·</span><span>🏆 Superhôte</span></>
              )}
              <span className="text-gray-200">·</span>
              <span className="flex items-center gap-1 text-gray-600">
                <MapPin size={12} />{listing.city}, {listing.neighborhood}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors">
              <Share2 size={15} /> Partager
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors"
            >
              <Heart size={15} className={liked ? "fill-red-500 text-red-500" : ""} /> Sauvegarder
            </button>
          </div>
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] mb-10">
          <div className="col-span-2 row-span-2">
            <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
          </div>
          {listing.images.slice(1, 5).map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Host line */}
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={listing.host.avatar} alt={listing.host.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{listing.type} · Hôte : {listing.host.name}</p>
                <p className="text-sm text-gray-500">
                  {listing.maxGuests} voyageurs · {listing.bedrooms} ch. · {listing.bathrooms} SDB · {listing.sizeSqm} m²
                </p>
              </div>
              {listing.host.isSuperhost && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-full">
                  <Award size={13} className="text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">Superhôte</span>
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="py-6 border-b border-gray-100 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Shield size={22} className="text-gray-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Annulation flexible</p>
                  <p className="text-sm text-gray-400">Annulation gratuite avant 24h</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award size={22} className="text-gray-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Logement vérifié</p>
                  <p className="text-sm text-gray-400">Contrôlé et certifié par piolAndTako</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this space</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ce que propose ce logement</h2>
              <div className="grid grid-cols-2 gap-3">
                {listing.amenities.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-gray-700">
                    <Icon size={17} className="text-gray-400" /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Host card */}
            <div className="py-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Votre hôte</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={listing.host.avatar} alt={listing.host.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{listing.host.name}</h3>
                    {listing.host.isSuperhost && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        🏆 Superhôte
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Membre depuis {listing.host.joinedYear}</p>
                  <div className="flex gap-4 text-sm mb-3">
                    <span><strong>{listing.host.reviews}</strong> <span className="text-gray-400">avis</span></span>
                    <span><strong>{listing.host.rating}</strong> <span className="text-gray-400">★</span></span>
                    <span><strong>{listing.host.responseRate}</strong> <span className="text-gray-400">réponses</span></span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{listing.host.bio}</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageSquare size={14} /> Contacter l&apos;hôte
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(listing.price)}</span>
                  <span className="text-gray-400 text-sm"> / nuit</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={13} className="fill-gray-900 text-gray-900" />
                  <span className="font-semibold">{listing.rating}</span>
                  <span className="text-gray-400">({listing.reviews})</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  <div className="p-3">
                    <label className="text-xs font-bold text-gray-900 block mb-1">ARRIVÉE</label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm text-gray-700 outline-none bg-transparent"
                    />
                  </div>
                  <div className="p-3">
                    <label className="text-xs font-bold text-gray-900 block mb-1">DÉPART</label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm text-gray-700 outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-200 p-3">
                  <label className="text-xs font-bold text-gray-900 block mb-1">VOYAGEURS</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm text-gray-700 outline-none bg-transparent"
                  >
                    {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} voyageur{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mb-3"
                onClick={handleReserve}
                disabled={!checkIn || !checkOut || nights < 1}
              >
                {checkIn && checkOut && nights >= 1 ? "Réserver" : "Sélectionnez les dates"}
              </Button>

              <p className="text-center text-xs text-gray-400 mb-4">
                Vous ne serez pas débité maintenant
              </p>

              {nights > 0 && (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{formatPrice(listing.price)} × {nights} nuit{nights > 1 ? "s" : ""}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frais de service (12%)</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

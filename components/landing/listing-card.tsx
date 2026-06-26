"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star, MapPin, Wifi, Car, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";

interface ListingCardProps {
  id: string; title: string; type: string; city: string; neighborhood?: string;
  price: number; priceUnit: "night" | "day"; rating: number; reviewCount: number;
  images: string[]; amenities?: string[]; isNew?: boolean; isFeatured?: boolean;
  withDriver?: boolean; gradient?: string;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={12} />, parking: <Car size={12} />, ac: <Wind size={12} />,
};

export default function ListingCard({ id, title, type, city, neighborhood, price, priceUnit, rating, reviewCount, images, amenities = [], isNew, isFeatured, withDriver, gradient = "from-emerald-400 to-teal-500" }: ListingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/listings/${id}`} className="block relative h-52 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-6xl opacity-30">{type === "vehicle" ? "🚗" : "🏠"}</span>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && <Badge variant="success">Nouveau</Badge>}
          {isFeatured && <Badge>En vedette</Badge>}
          {withDriver && <Badge variant="secondary">Avec chauffeur</Badge>}
        </div>
        <button onClick={(e) => { e.preventDefault(); setIsFavorited(!isFavorited); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm">
          <Heart size={16} className={cn("transition-colors", isFavorited ? "fill-red-500 stroke-red-500" : "stroke-gray-600")} />
        </button>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 font-medium mb-0.5">{type}</p>
            <Link href={`/listings/${id}`} className="font-semibold text-gray-900 hover:text-emerald-700 transition-colors text-sm leading-tight line-clamp-2">{title}</Link>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={13} className="fill-amber-400 stroke-amber-400" />
            <span className="text-xs font-semibold text-gray-800">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3"><MapPin size={11} /><span>{neighborhood ? `${neighborhood}, ` : ""}{city}</span></div>
        {amenities.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {amenities.slice(0, 3).map((a) => (
              <span key={a} className="flex items-center gap-1 text-xs text-gray-500">{AMENITY_ICONS[a]}{a === "wifi" ? "Wi-Fi" : a === "parking" ? "Parking" : a === "ac" ? "Clim." : a}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div><span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span><span className="text-xs text-gray-400 ml-1">/ {priceUnit === "night" ? "nuit" : "jour"}</span></div>
          <Link href={`/listings/${id}`} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Voir →</Link>
        </div>
      </div>
    </div>
  );
}

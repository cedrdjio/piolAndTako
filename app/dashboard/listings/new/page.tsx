"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { ACCOMMODATION_TYPES, POPULAR_CITIES } from "@/lib/constants";

const AMENITIES_LIST = [
  "WiFi", "Climatisation", "Cuisine équipée", "TV", "Parking", "Eau chaude",
  "Machine à laver", "Fer à repasser", "Bureau de travail", "Balcon", "Piscine", "Gardien 24h",
];

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("apartment");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("2");
  const [bedrooms, setBedrooms] = useState("1");
  const [bathrooms, setBathrooms] = useState("1");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  function toggleAmenity(a: string) {
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (images.length === 0) { setError("Ajoutez au moins une photo."); return; }
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    const { error: insertError } = await supabase.from("accommodations").insert({
      host_id: user.id,
      title,
      description,
      type,
      city,
      neighborhood,
      price_per_night: Number(price),
      max_guests: Number(maxGuests),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities,
      images,
      is_active: true,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-900 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="font-bold text-gray-900">Nouvelle annonce</h1>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-2xl">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Photos du logement</h2>
            <ImageUpload value={images} onChange={setImages} maxImages={10} bucket="listings" folder="accommodations" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900">Informations de base</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Titre *</label>
              <Input placeholder="Ex: Appartement meublé au centre de Yaoundé" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Type de logement *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {ACCOMMODATION_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Ville *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                >
                  <option value="">Choisir...</option>
                  {POPULAR_CITIES.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Quartier</label>
                <Input placeholder="Ex: Bastos, Akwa..." value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Description</label>
              <textarea
                placeholder="Décrivez votre logement, ses points forts..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900">Capacité et tarif</h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Voyageurs</label>
                <Input type="number" min="1" max="20" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Chambres</label>
                <Input type="number" min="0" max="20" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Salles de bain</label>
                <Input type="number" min="0" max="10" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Prix par nuit (XAF) *</label>
              <Input
                type="number"
                placeholder="Ex: 25000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Équipements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AMENITIES_LIST.map((a) => (
                <label
                  key={a}
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                    amenities.includes(a)
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium"
                      : "border-gray-100 text-gray-700 hover:border-gray-200"
                  }`}
                >
                  <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)} className="sr-only" />
                  <span className="text-base">{amenities.includes(a) ? "✓" : "+"}</span>
                  {a}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? (
              <><Loader2 size={16} className="animate-spin mr-2" />Publication...</>
            ) : (
              "Publier l'annonce"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

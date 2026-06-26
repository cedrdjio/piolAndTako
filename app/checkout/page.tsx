"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Shield, Check, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { createClient } from "@/lib/supabase/client";

const PAYMENT_METHODS = [
  { id: "orange_money", label: "Orange Money", icon: "🟠", color: "orange" },
  { id: "mtn_mobile_money", label: "MTN Mobile Money", icon: "🟡", color: "yellow" },
  { id: "express_union", label: "Express Union Mobile", icon: "🔵", color: "blue" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const listingId = searchParams.get("listing_id") ?? "";
  const type = searchParams.get("type") ?? "accommodation";
  const checkIn = searchParams.get("check_in") ?? "";
  const checkOut = searchParams.get("check_out") ?? "";
  const guests = searchParams.get("guests") ?? "1";
  const total = Number(searchParams.get("total") ?? 0);

  const [paymentMethod, setPaymentMethod] = useState("orange_money");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 0;
  const subtotal = Math.round(total / 1.12);
  const serviceFee = total - subtotal;

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login?next=/checkout" + window.location.search);
      return;
    }

    const ref = "PAT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    if (type === "accommodation") {
      await supabase.from("accommodation_bookings").insert({
        accommodation_id: listingId,
        guest_id: user.id,
        check_in: checkIn,
        check_out: checkOut,
        guests_count: Number(guests),
        total_price: total,
        service_fee: serviceFee,
        status: "pending",
        payment_status: "pending",
        payment_method: paymentMethod,
        payment_reference: ref,
        guest_note: `Tél.: ${phone}`,
      });
    }

    setBookingRef(ref);
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Réservation envoyée !</h2>
          <p className="text-gray-500 text-sm mb-6">
            Un message de confirmation sera envoyé à votre téléphone. L&apos;hôte examinera votre demande.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">N° de réservation</span>
              <span className="font-bold text-emerald-600">{bookingRef}</span>
            </div>
            {checkIn && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Arrivée</span>
                <span className="font-medium">{new Date(checkIn).toLocaleDateString("fr-FR")}</span>
              </div>
            )}
            {checkOut && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Départ</span>
                <span className="font-medium">{new Date(checkOut).toLocaleDateString("fr-FR")}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t border-gray-100 pt-2 mt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="primary" className="w-full">Voir mes réservations</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16 max-w-3xl">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ChevronLeft size={16} /> Retour
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Confirmer et payer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
              <h2 className="font-bold text-gray-900 mb-4">Informations de voyage</h2>
              <div className="flex flex-col gap-2 text-sm">
                {checkIn && checkOut && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dates</span>
                    <span className="font-medium">
                      {new Date(checkIn).toLocaleDateString("fr-FR")} → {new Date(checkOut).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Durée</span>
                  <span className="font-medium">{nights} nuit{nights > 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voyageurs</span>
                  <span className="font-medium">{guests} personne{Number(guests) > 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <h2 className="font-bold text-gray-900 mb-4">Mode de paiement</h2>
                <div className="flex flex-col gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === m.id ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="sr-only" />
                      <span className="text-2xl">{m.icon}</span>
                      <span className="font-medium text-gray-900">{m.label}</span>
                      {paymentMethod === m.id && <Check size={16} className="ml-auto text-emerald-600" />}
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <h2 className="font-bold text-gray-900 mb-4">Numéro Mobile Money</h2>
                <Input
                  type="tel"
                  placeholder="+237 6XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  Un message de confirmation sera envoyé à ce numéro pour autoriser le paiement.
                </p>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-500 mb-6">
                <Shield size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Vos paiements sont sécurisés et cryptés. piolAndTako ne partage jamais vos informations financières.</span>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading || !phone}>
                {loading ? (
                  <><Loader2 size={16} className="animate-spin mr-2" />Traitement...</>
                ) : (
                  `Payer ${formatPrice(total)}`
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="aspect-video rounded-xl bg-gray-100 overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Appartement moderne Centre-ville Yaoundé</h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                <Star size={11} className="fill-gray-400 text-gray-400" />
                <span>4.9 · 128 avis</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                <h4 className="font-bold text-gray-900">Détail du prix</h4>
                <div className="flex justify-between text-gray-500">
                  <span>Sous-total</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Frais de service</span><span>{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-100 pt-2">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense><CheckoutContent /></Suspense>;
}

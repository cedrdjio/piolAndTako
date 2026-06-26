"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ROLES = [
  { id: "traveler", label: "Voyageur", icon: "🧳", description: "Je cherche à réserver un logement ou un véhicule" },
  { id: "host", label: "Hôte", icon: "🏠", description: "Je veux publier mes logements" },
  { id: "vehicle_owner", label: "Loueur auto", icon: "🚗", description: "Je veux louer mes véhicules" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("traveler");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard"); }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">piol<span className="text-emerald-600">And</span>Tako</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Rejoignez des milliers de Camerounais</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Je suis :</p>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center ${
                    role === r.id ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"
                  }`}>
                  <span className="text-2xl">{r.icon}</span>
                  <span className={`text-xs font-semibold ${role === r.id ? "text-emerald-700" : "text-gray-700"}`}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                <div className="relative"><User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><Input placeholder="Jean" className="pl-10" required /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label><Input placeholder="Mbarga" required /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><Input type="email" placeholder="vous@exemple.cm" className="pl-10" required /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
              <div className="relative"><Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><Input type="tel" placeholder="+237 6XX XXX XXX" className="pl-10" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input type={showPassword ? "text" : "password"} placeholder="Au moins 8 caractères" className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              En vous inscrivant, vous acceptez nos <Link href="/terms" className="text-emerald-600 hover:underline">conditions d&apos;utilisation</Link>{" "}et notre <Link href="/privacy" className="text-emerald-600 hover:underline">politique de confidentialité</Link>.
            </p>
            <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}<Link href="/auth/login" className="text-emerald-600 font-semibold hover:text-emerald-700">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

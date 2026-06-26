"use client";

import Link from "next/link";
import { BarChart3, Home, Car, Calendar, Star, TrendingUp, MessageSquare, Settings, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

const STATS = [
  { label: "Revenus ce mois", value: formatPrice(485000), trend: "+12%", icon: TrendingUp, color: "emerald" },
  { label: "Réservations actives", value: "8", trend: "+3", icon: Calendar, color: "blue" },
  { label: "Note moyenne", value: "4.9", trend: "★", icon: Star, color: "amber" },
  { label: "Messages non lus", value: "5", trend: "nouveau", icon: MessageSquare, color: "purple" },
];

const RECENT_BOOKINGS = [
  { id: "b1", guest: "Marie T.", listing: "Appartement Centre-ville Yaoundé", dates: "15-20 Juin 2026", amount: 175000, status: "confirmed" },
  { id: "b2", guest: "Paul M.", listing: "Studio Akwa Douala", dates: "18-22 Juin 2026", amount: 80000, status: "pending" },
  { id: "b3", guest: "Cécile F.", listing: "Chambre Bafoussam", dates: "25-28 Juin 2026", amount: 45000, status: "confirmed" },
];

const STATUS_STYLES = { confirmed: "bg-green-100 text-green-700", pending: "bg-amber-100 text-amber-700", cancelled: "bg-red-100 text-red-700" };
const STATUS_LABELS = { confirmed: "Confirmée", pending: "En attente", cancelled: "Annulée" };

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full z-40">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">P</span></div>
            <span className="font-bold text-gray-900">piol<span className="text-emerald-600">And</span>Tako</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {[
            { href: "/dashboard", label: "Tableau de bord", icon: BarChart3, active: true },
            { href: "/dashboard/listings", label: "Mes annonces", icon: Home },
            { href: "/dashboard/vehicles", label: "Mes véhicules", icon: Car },
            { href: "/dashboard/bookings", label: "Réservations", icon: Calendar },
            { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
            { href: "/dashboard/reviews", label: "Avis", icon: Star },
            { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
          ].map(({ href, label, icon: Icon, active }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}><Icon size={18} />{label}</Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center"><span className="text-white font-bold text-xs">P</span></div>
            <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-900 truncate">Paul Kamga</p><p className="text-xs text-gray-500 truncate">Hôte Pro</p></div>
          </div>
        </div>
      </aside>
      <main className="flex-1 lg:ml-64">
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="font-bold text-gray-900 text-lg">Tableau de bord</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
            <Button variant="primary" size="sm" asChild><Link href="/dashboard/listings/new">+ Nouvelle annonce</Link></Button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat) => (
              <Card key={stat.label}><CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <div className={`w-8 h-8 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}><stat.icon size={16} className={`text-${stat.color}-600`} /></div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">{stat.trend}</p>
              </CardContent></Card>
            ))}
          </div>
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Réservations récentes</CardTitle>
              <Link href="/dashboard/bookings" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Voir tout →</Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y divide-gray-50">
                {RECENT_BOOKINGS.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0"><span className="text-emerald-700 font-bold text-sm">{booking.guest.charAt(0)}</span></div>
                      <div className="min-w-0"><p className="font-semibold text-gray-900 text-sm">{booking.guest}</p><p className="text-xs text-gray-500 truncate">{booking.listing}</p><p className="text-xs text-gray-400">{booking.dates}</p></div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-sm">{formatPrice(booking.amount)}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[booking.status as keyof typeof STATUS_STYLES]}`}>{STATUS_LABELS[booking.status as keyof typeof STATUS_LABELS]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Créer une annonce", desc: "Publiez un nouveau logement", href: "/dashboard/listings/new", icon: "🏠" },
              { title: "Ajouter un véhicule", desc: "Ajoutez un véhicule à louer", href: "/dashboard/vehicles/new", icon: "🚗" },
              { title: "Voir les statistiques", desc: "Analysez vos performances", href: "/dashboard/analytics", icon: "📊" },
            ].map((action) => (
              <Link key={action.href} href={action.href} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-emerald-200 hover:shadow-md transition-all group flex items-center gap-4">
                <span className="text-3xl">{action.icon}</span>
                <div className="flex-1 min-w-0"><p className="font-semibold text-gray-900 text-sm">{action.title}</p><p className="text-xs text-gray-500">{action.desc}</p></div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

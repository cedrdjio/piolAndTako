import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, TrendingUp, Shield, Headphones } from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, title: "Revenus supplémentaires", desc: "Les hôtes gagnent en moyenne 250 000 XAF par mois sur piolAndTako." },
  { icon: Shield, title: "Sécurité garantie", desc: "Vos paiements sont protégés et traités en toute sécurité." },
  { icon: Headphones, title: "Support dédié", desc: "Notre équipe vous accompagne à chaque étape de votre parcours d'hôte." },
];

const STEPS = [
  { number: "1", title: "Créez votre annonce", desc: "Décrivez votre logement, ajoutez des photos et définissez vos tarifs." },
  { number: "2", title: "Accueillez vos voyageurs", desc: "Gérez vos réservations depuis votre tableau de bord personnalisé." },
  { number: "3", title: "Recevez vos paiements", desc: "Soyez payé en Mobile Money ou par virement dès le lendemain de l'arrivée." },
];

export default function HostPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-emerald-950 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Devenez hôte sur piolAndTako et gagnez de l&apos;argent avec votre logement</h1>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">Rejoignez des milliers d&apos;hôtes camerounais et transformez votre logement en source de revenus supplémentaires.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/register?role=host"><Button variant="primary" size="xl">Commencer maintenant</Button></Link>
              <Link href="/host/learn-more"><Button variant="outline" size="xl" className="text-white border-white/30 hover:bg-white/10">En savoir plus</Button></Link>
            </div>
            <p className="text-emerald-200 text-sm mt-6">✓ Gratuit pour commencer · ✓ Aucun engagement · ✓ Publiez en 30 minutes</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Pourquoi devenir hôte ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={24} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Comment ça marche ?</h2>
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
                <div><h3 className="font-bold text-gray-900 mb-1">{step.title}</h3><p className="text-gray-500 text-sm">{step.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/auth/register?role=host"><Button variant="primary" size="xl">Publier mon logement gratuitement</Button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

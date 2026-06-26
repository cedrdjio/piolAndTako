import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  platform: { title: "Plateforme", links: [
    { label: "Hébergements", href: "/search?type=accommodation" },
    { label: "Véhicules", href: "/search?type=vehicle" },
    { label: "Destinations", href: "/destinations" },
    { label: "Expériences", href: "/experiences" },
  ]},
  host: { title: "Pour les hôtes", links: [
    { label: "Devenir hôte", href: "/host" },
    { label: "Devenir loueur", href: "/host/vehicle" },
    { label: "Tarification", href: "/pricing" },
    { label: "Ressources", href: "/host/resources" },
  ]},
  company: { title: "Entreprise", links: [
    { label: "À propos", href: "/about" },
    { label: "Presse", href: "/press" },
    { label: "Carrières", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ]},
  support: { title: "Support", links: [
    { label: "Centre d'aide", href: "/help" },
    { label: "Contactez-nous", href: "/contact" },
    { label: "Signaler un problème", href: "/report" },
    { label: "Confidentialité", href: "/privacy" },
  ]},
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-white">piol<span className="text-emerald-400">And</span>Tako</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">La plateforme de référence au Cameroun pour la réservation de logements meublés et la location de véhicules.</p>
            <div className="flex flex-col gap-2 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-emerald-500 flex-shrink-0" /><span>Yaoundé, Cameroun</span></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-emerald-500 flex-shrink-0" /><span>+237 655 000 000</span></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-emerald-500 flex-shrink-0" /><span>contact@piolandtako.cm</span></div>
            </div>
            <div className="flex items-center gap-3">
              {[{ label: "f", href: "#" }, { label: "in", href: "#" }, { label: "X", href: "#" }].map((social, i) => (
                <a key={i} href={social.href} className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors text-sm font-bold">{social.label}</a>
              ))}
            </div>
          </div>
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} piolAndTako. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Conditions d&apos;utilisation</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Confidentialité</Link>
            <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

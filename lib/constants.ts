export const ACCOMMODATION_TYPES = [
  { id: "apartment", label: "Appartement", icon: "🏢" },
  { id: "studio", label: "Studio", icon: "🏠" },
  { id: "villa", label: "Villa", icon: "🏡" },
  { id: "hotel", label: "Hôtel", icon: "🏨" },
  { id: "house", label: "Maison", icon: "🏘️" },
  { id: "residence", label: "Résidence meublée", icon: "🛋️" },
  { id: "room", label: "Chambre", icon: "🛌" },
  { id: "hostel", label: "Auberge", icon: "🏕️" },
] as const;

export const VEHICLE_TYPES = [
  { id: "city_car", label: "Citadine", icon: "🚗" },
  { id: "suv", label: "SUV", icon: "🚙" },
  { id: "sedan", label: "Berline", icon: "🚘" },
  { id: "pickup", label: "Pick-up", icon: "🛻" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "motorcycle", label: "Moto", icon: "🏍️" },
  { id: "luxury", label: "Voiture de luxe", icon: "🏎️" },
  { id: "wedding", label: "Voiture de mariage", icon: "💒" },
] as const;

export const POPULAR_CITIES = [
  { id: "yaounde", name: "Yaoundé", image: "/cities/yaounde.jpg", listings: 1240 },
  { id: "douala", name: "Douala", image: "/cities/douala.jpg", listings: 2100 },
  { id: "bafoussam", name: "Bafoussam", image: "/cities/bafoussam.jpg", listings: 380 },
  { id: "garoua", name: "Garoua", image: "/cities/garoua.jpg", listings: 210 },
  { id: "bamenda", name: "Bamenda", image: "/cities/bamenda.jpg", listings: 290 },
  { id: "kribi", name: "Kribi", image: "/cities/kribi.jpg", listings: 450 },
];

export const STATS = [
  { value: "5,000+", label: "Annonces actives" },
  { value: "12,000+", label: "Réservations effectuées" },
  { value: "8,000+", label: "Voyageurs satisfaits" },
  { value: "6", label: "Villes couvertes" },
];

export const FEATURES = [
  { icon: "🔒", title: "Paiements sécurisés", description: "Mobile Money, Stripe — vos transactions sont protégées à 100%." },
  { icon: "✅", title: "Annonces vérifiées", description: "Chaque logement et véhicule est contrôlé avant publication." },
  { icon: "💬", title: "Support 24h/7j", description: "Notre équipe est disponible à tout moment pour vous aider." },
  { icon: "🗺️", title: "Recherche sur carte", description: "Trouvez des logements ou véhicules directement sur la carte interactive." },
  { icon: "⚡", title: "Réservation instantanée", description: "Confirmez votre réservation en quelques secondes, sans attendre." },
  { icon: "🌟", title: "Meilleurs prix garantis", description: "Nous vous assurons les tarifs les plus compétitifs du marché." },
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Recherchez", description: "Entrez votre destination, vos dates et vos préférences." },
  { step: "02", title: "Comparez", description: "Parcourez les annonces, lisez les avis et choisissez l'offre idéale." },
  { step: "03", title: "Réservez", description: "Payez en toute sécurité via Mobile Money ou carte bancaire." },
  { step: "04", title: "Profitez", description: "Recevez votre confirmation et profitez de votre séjour." },
];

export const TESTIMONIALS = [
  { id: 1, name: "Marie Tchouang", location: "Yaoundé", rating: 5, comment: "Excellent service ! J'ai trouvé un appartement magnifique à Douala en moins de 5 minutes. La réservation était simple et le paiement sécurisé.", avatar: null, type: "accommodation" },
  { id: 2, name: "Jean-Paul Mbarga", location: "Douala", rating: 5, comment: "La meilleure plateforme de location de voitures au Cameroun. Le chauffeur était ponctuel et le véhicule impeccable.", avatar: null, type: "vehicle" },
  { id: 3, name: "Cécile Fouda", location: "Bafoussam", rating: 4, comment: "Très bonne expérience globale. Je recommande piolAndTako à tous mes amis pour leurs voyages au Cameroun.", avatar: null, type: "accommodation" },
];

export const PRICING_PLANS = [
  { id: "free", name: "Gratuit", price: 0, period: "mois", description: "Parfait pour commencer", features: ["1 annonce active", "Photos de base", "Support email", "Visibilité standard"], highlighted: false, cta: "Commencer gratuitement" },
  { id: "pro", name: "Pro", price: 15000, period: "mois", description: "Pour les hôtes actifs", features: ["10 annonces actives", "Photos HD illimitées", "Support prioritaire", "Boost hebdomadaire", "Statistiques avancées", "Badge vérifié"], highlighted: true, cta: "Passer au Pro" },
  { id: "agency", name: "Agence", price: 45000, period: "mois", description: "Pour les professionnels", features: ["Annonces illimitées", "Photos HD illimitées", "Support dédié 24h/7j", "Boost quotidien", "Tableau de bord avancé", "API accès", "Intégration personnalisée"], highlighted: false, cta: "Contacter les ventes" },
];

export const FAQ_ITEMS = [
  { question: "Comment fonctionne la réservation ?", answer: "Recherchez un logement ou un véhicule, sélectionnez vos dates, choisissez votre mode de paiement (Mobile Money ou carte) et confirmez. Vous recevrez une confirmation par email et SMS." },
  { question: "Quels moyens de paiement acceptez-vous ?", answer: "Nous acceptons Orange Money, MTN Mobile Money et les cartes bancaires via Stripe. Toutes les transactions sont sécurisées et cryptées." },
  { question: "Comment puis-je publier mon logement ou mon véhicule ?", answer: "Créez un compte hôte ou loueur, remplissez les informations de votre annonce, ajoutez des photos et définissez vos tarifs. Votre annonce sera vérifiée sous 24h." },
  { question: "Quelle est la politique d'annulation ?", answer: "La politique d'annulation varie selon les hôtes. Chaque annonce affiche clairement les conditions d'annulation. En cas d'annulation éligible, le remboursement est effectué sous 5 jours ouvrables." },
  { question: "Comment contacter le support ?", answer: "Notre support est disponible 24h/7j via le chat intégré, par email ou par téléphone. Nous répondons en français et en anglais." },
];

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "piolAndTako — Réservez logements & véhicules au Cameroun",
  description:
    "La plateforme de référence au Cameroun pour la réservation de logements meublés et la location de véhicules. Appartements, villas, hôtels, SUV, berlines — payez en Mobile Money.",
  keywords: ["logement cameroun", "location voiture cameroun", "réservation yaoundé", "airbnb cameroun"],
  openGraph: {
    title: "piolAndTako",
    description: "Réservez votre logement ou véhicule au Cameroun en quelques minutes.",
    type: "website",
    locale: "fr_CM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

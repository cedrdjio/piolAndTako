import Link from "next/link";
import { BarChart3, CalendarCheck, Home, MessageSquare, Star, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tableau de bord",
  description: "Gérez vos annonces, réservations et revenus depuis votre espace hôte Piol & Tako.",
  path: "/dashboard",
  noIndex: true,
});

const MODULES = [
  { icon: Home, title: "Mes annonces", desc: "Créez et gérez logements, voitures et expériences." },
  { icon: CalendarCheck, title: "Réservations", desc: "Suivez arrivées, départs et demandes en attente." },
  { icon: Wallet, title: "Revenus", desc: "Paiements, versements et historique en un coup d'œil." },
  { icon: MessageSquare, title: "Messagerie", desc: "Échangez avec vos voyageurs en temps réel." },
  { icon: Star, title: "Avis", desc: "Consultez et répondez aux évaluations reçues." },
  { icon: BarChart3, title: "Statistiques", desc: "Taux d'occupation, vues et performances détaillées." },
];

export default function DashboardPage() {
  return (
    <Container className="py-24 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="subtle">Bientôt disponible</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Votre espace hôte, réinventé
        </h1>
        <p className="mt-3 text-muted-foreground">
          Un tableau de bord clair et puissant pour piloter vos annonces, réservations et revenus.
          Nous y mettons la dernière main.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/host">Devenir hôte</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => (
          <div
            key={m.title}
            className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-border bg-background p-6 shadow-[var(--shadow-sm)]"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
              <m.icon className="size-5" />
            </span>
            <h2 className="font-semibold text-foreground">{m.title}</h2>
            <p className="text-sm text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

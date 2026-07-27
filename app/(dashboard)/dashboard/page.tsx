import Link from "next/link";
import { CalendarCheck, Eye, Percent, Plus, Star, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { BarChart } from "@/components/dashboard/charts";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { HOST_BOOKINGS, HOST_REVENUE_TREND, HOST_STATS } from "@/lib/data/dashboard";
import { formatAmount, formatDate } from "@/lib/utils";

export default function HostOverview() {
  const upcoming = HOST_BOOKINGS.filter((b) => b.status !== "cancelled").slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bonjour, Awa 👋"
        description="Voici l'activité de vos annonces cette semaine."
        action={
          <Button asChild>
            <Link href="/dashboard/listings">
              <Plus className="size-4" /> Nouvelle annonce
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenus (30 j)" value={`${formatAmount(HOST_STATS.revenue)} FCFA`} delta={HOST_STATS.revenueDelta} icon={Wallet} />
        <StatCard label="Réservations" value={String(HOST_STATS.bookings)} delta={HOST_STATS.bookingsDelta} icon={CalendarCheck} />
        <StatCard label="Taux d'occupation" value={`${HOST_STATS.occupancy}%`} delta={HOST_STATS.occupancyDelta} icon={Percent} />
        <StatCard label="Note moyenne" value={HOST_STATS.rating.toFixed(1)} delta={HOST_STATS.ratingDelta} icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Revenus mensuels" className="lg:col-span-2" action={<span className="text-sm text-muted-foreground">en milliers FCFA</span>}>
          <div className="p-5">
            <BarChart data={HOST_REVENUE_TREND} />
          </div>
        </Panel>

        <Panel title="Cette semaine">
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
                <Eye className="size-5" />
              </span>
              <div>
                <p className="text-xl font-semibold text-foreground">{formatAmount(HOST_STATS.views)}</p>
                <p className="text-sm text-muted-foreground">Vues sur vos annonces</p>
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] bg-surface p-4">
              <p className="text-sm font-medium text-foreground">Prochaine arrivée</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {upcoming[0]?.guest} · {formatDate(upcoming[0]?.checkin ?? new Date())}
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/bookings">Voir les réservations</Link>
            </Button>
          </div>
        </Panel>
      </div>

      <Panel
        title="Réservations récentes"
        action={
          <Link href="/dashboard/bookings" className="text-sm font-semibold text-brand hover:underline">
            Tout voir
          </Link>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voyageur</TableHead>
              <TableHead>Annonce</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcoming.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium text-foreground">{b.guest}</TableCell>
                <TableCell className="text-muted-foreground">{b.listing}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(b.checkin)}
                </TableCell>
                <TableCell className="font-semibold text-foreground">{formatAmount(b.total)} FCFA</TableCell>
                <TableCell>
                  <StatusBadge status={b.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

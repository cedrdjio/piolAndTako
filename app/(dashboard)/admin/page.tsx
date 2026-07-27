import Link from "next/link";
import { Building2, CalendarCheck, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { LineChart, Donut } from "@/components/dashboard/charts";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  ADMIN_CATEGORY_SPLIT,
  ADMIN_GMV_TREND,
  ADMIN_LISTINGS,
  ADMIN_STATS,
  ADMIN_USERS,
} from "@/lib/data/dashboard";
import { formatAmount, formatDate } from "@/lib/utils";

export default function AdminOverview() {
  const pending = ADMIN_LISTINGS.filter((l) => l.status === "pending");

  return (
    <div className="space-y-6">
      <PageHeader title="Vue d'ensemble" description="Santé de la plateforme Piol & Tako en un coup d'œil." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Volume d'affaires (GMV)" value={`${(ADMIN_STATS.gmv / 1_000_000).toFixed(1)} M FCFA`} delta={ADMIN_STATS.gmvDelta} icon={TrendingUp} />
        <StatCard label="Utilisateurs" value={formatAmount(ADMIN_STATS.users)} delta={ADMIN_STATS.usersDelta} icon={Users} />
        <StatCard label="Annonces" value={formatAmount(ADMIN_STATS.listings)} delta={ADMIN_STATS.listingsDelta} icon={Building2} />
        <StatCard label="Réservations" value={formatAmount(ADMIN_STATS.bookings)} delta={ADMIN_STATS.bookingsDelta} icon={CalendarCheck} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Volume d'affaires" className="lg:col-span-2" action={<span className="text-sm text-muted-foreground">12 mois</span>}>
          <div className="p-5">
            <LineChart data={ADMIN_GMV_TREND} />
          </div>
        </Panel>
        <Panel title="Répartition par catégorie">
          <div className="p-5">
            <Donut data={ADMIN_CATEGORY_SPLIT} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="À modérer"
          action={<Link href="/admin/listings" className="text-sm font-semibold text-brand hover:underline">Tout voir</Link>}
        >
          <ul className="divide-y divide-border">
            {pending.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{l.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{l.host} · {l.city}</p>
                </div>
                <StatusBadge status={l.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Nouveaux utilisateurs"
          action={<Link href="/admin/users" className="text-sm font-semibold text-brand hover:underline">Tout voir</Link>}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Inscrit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ADMIN_USERS.slice(0, 4).map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={u.name} size={32} />
                      <span className="font-medium text-foreground">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="neutral">{u.role}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(u.joined)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>
    </div>
  );
}

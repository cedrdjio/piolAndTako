import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { HOST_BOOKINGS } from "@/lib/data/dashboard";
import { CalendarCheck, CheckCircle2, Clock } from "lucide-react";
import { formatAmount, formatDate } from "@/lib/utils";

export default function AdminBookings() {
  const confirmed = HOST_BOOKINGS.filter((b) => b.status === "confirmed").length;
  const pending = HOST_BOOKINGS.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Réservations" description="Toutes les réservations de la plateforme." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total (échantillon)" value={String(HOST_BOOKINGS.length)} icon={CalendarCheck} />
        <StatCard label="Confirmées" value={String(confirmed)} icon={CheckCircle2} />
        <StatCard label="En attente" value={String(pending)} icon={Clock} />
      </div>

      <Panel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Réf.</TableHead>
              <TableHead>Voyageur</TableHead>
              <TableHead>Annonce</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HOST_BOOKINGS.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{b.ref}</TableCell>
                <TableCell className="font-medium text-foreground">{b.guest}</TableCell>
                <TableCell className="text-muted-foreground">{b.listing}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(b.checkin)} → {formatDate(b.checkout)}
                </TableCell>
                <TableCell className="font-semibold text-foreground">{formatAmount(b.total)} FCFA</TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">Détails</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

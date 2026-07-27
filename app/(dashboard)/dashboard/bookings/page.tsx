import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { HOST_BOOKINGS, type BookingStatus } from "@/lib/data/dashboard";
import { formatAmount, formatDate, cn } from "@/lib/utils";

const FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "Toutes" },
  { id: "pending", label: "En attente" },
  { id: "confirmed", label: "Confirmées" },
  { id: "completed", label: "Terminées" },
  { id: "cancelled", label: "Annulées" },
];

export default async function HostBookings({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "all" } = await searchParams;
  const rows = status === "all" ? HOST_BOOKINGS : HOST_BOOKINGS.filter((b) => b.status === (status as BookingStatus));

  return (
    <div className="space-y-6">
      <PageHeader title="Réservations" description="Gérez vos demandes et séjours en cours." />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f.id === status;
          return (
            <Link
              key={f.id}
              href={f.id === "all" ? "/dashboard/bookings" : `/dashboard/bookings?status=${f.id}`}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active ? "border-navy bg-navy text-white" : "border-border bg-background hover:bg-surface",
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <Panel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Réf.</TableHead>
              <TableHead>Voyageur</TableHead>
              <TableHead>Annonce</TableHead>
              <TableHead>Arrivée</TableHead>
              <TableHead>Départ</TableHead>
              <TableHead>Voy.</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{b.ref}</TableCell>
                <TableCell className="font-medium text-foreground">{b.guest}</TableCell>
                <TableCell className="text-muted-foreground">{b.listing}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(b.checkin)}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(b.checkout)}</TableCell>
                <TableCell className="text-muted-foreground">{b.guests}</TableCell>
                <TableCell className="font-semibold text-foreground">{formatAmount(b.total)} FCFA</TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell className="text-right">
                  {b.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm">Accepter</Button>
                      <Button size="sm" variant="outline">Refuser</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost">Détails</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <p className="p-10 text-center text-muted-foreground">Aucune réservation dans cette catégorie.</p>
        )}
      </Panel>
    </div>
  );
}

import { Banknote, Download, Landmark, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ADMIN_TRANSACTIONS } from "@/lib/data/dashboard";
import { formatAmount, formatDate, cn } from "@/lib/utils";

export default function AdminPayments() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Paiements"
        description="Commissions, versements aux hôtes et remboursements."
        action={
          <Button variant="outline">
            <Download className="size-4" /> Exporter
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Commissions (30 j)" value="9 225 000 FCFA" delta={16.5} icon={TrendingUp} />
        <StatCard label="Versements en attente" value="4 640 000 FCFA" icon={Landmark} />
        <StatCard label="Remboursements (30 j)" value="612 000 FCFA" icon={Banknote} />
      </div>

      <Panel title="Transactions">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADMIN_TRANSACTIONS.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="text-muted-foreground">{formatDate(t.date)}</TableCell>
                <TableCell className="font-medium text-foreground">{t.label}</TableCell>
                <TableCell className="text-muted-foreground">{t.method}</TableCell>
                <TableCell className={cn("font-semibold", t.amount < 0 ? "text-danger" : "text-foreground")}>
                  {t.amount < 0 ? "−" : ""}{formatAmount(Math.abs(t.amount))} FCFA
                </TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

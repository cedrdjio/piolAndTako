import { Banknote, Clock, Download, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { LineChart } from "@/components/dashboard/charts";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { HOST_REVENUE_TREND, HOST_TRANSACTIONS } from "@/lib/data/dashboard";
import { formatAmount, formatDate } from "@/lib/utils";

export default function HostEarnings() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenus"
        description="Suivez vos versements et votre historique de paiements."
        action={
          <Button variant="outline">
            <Download className="size-4" /> Exporter
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Solde disponible" value="1 218 450 FCFA" icon={Wallet} hint="Versable dès maintenant" />
        <StatCard label="En attente" value="618 450 FCFA" icon={Clock} hint="Séjours à venir" />
        <StatCard label="Total versé (2026)" value="4 820 000 FCFA" icon={Banknote} />
      </div>

      <Panel title="Évolution des revenus" action={<span className="text-sm text-muted-foreground">12 derniers mois</span>}>
        <div className="p-5">
          <LineChart data={HOST_REVENUE_TREND} />
        </div>
      </Panel>

      <Panel title="Historique des versements">
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
            {HOST_TRANSACTIONS.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="text-muted-foreground">{formatDate(t.date)}</TableCell>
                <TableCell className="font-medium text-foreground">{t.label}</TableCell>
                <TableCell className="text-muted-foreground">{t.method}</TableCell>
                <TableCell className="font-semibold text-foreground">{formatAmount(t.amount)} FCFA</TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

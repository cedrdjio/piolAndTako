import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ADMIN_LISTINGS } from "@/lib/data/dashboard";
import { VERTICALS } from "@/lib/constants";
import { formatAmount, formatDate } from "@/lib/utils";

export default function AdminListings() {
  const label = (id: string) => VERTICALS.find((v) => v.id === id)?.labelSingular ?? id;
  const pending = ADMIN_LISTINGS.filter((l) => l.status === "pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Modération des annonces"
        description={`${pending} annonces en attente de validation.`}
      />

      <Panel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Annonce</TableHead>
              <TableHead>Hôte</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Soumise</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADMIN_LISTINGS.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium text-foreground">{l.title}</TableCell>
                <TableCell className="text-muted-foreground">{l.host}</TableCell>
                <TableCell><Badge variant="neutral">{label(l.category)}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{l.city}</TableCell>
                <TableCell className="font-semibold text-foreground">{formatAmount(l.price)} FCFA</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(l.submitted)}</TableCell>
                <TableCell><StatusBadge status={l.status} /></TableCell>
                <TableCell className="text-right">
                  {l.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm"><Check className="size-4" /> Approuver</Button>
                      <Button size="sm" variant="outline"><X className="size-4" /> Rejeter</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost">Détails</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

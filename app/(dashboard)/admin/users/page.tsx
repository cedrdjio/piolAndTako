import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ADMIN_USERS } from "@/lib/data/dashboard";
import { formatDate } from "@/lib/utils";

const ROLE_VARIANT: Record<string, "navy" | "subtle" | "neutral"> = {
  ADMIN: "navy",
  HOST: "subtle",
  GUEST: "neutral",
};

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <PageHeader title="Utilisateurs" description={`${ADMIN_USERS.length} comptes · voyageurs, hôtes et administrateurs.`} />

      <Panel>
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Rechercher un utilisateur…"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm focus:border-brand focus:outline-none"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Inscrit</TableHead>
              <TableHead>Réservations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADMIN_USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size={36} />
                    <div>
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant={ROLE_VARIANT[u.role]}>{u.role}</Badge></TableCell>
                <TableCell><StatusBadge status={u.status} /></TableCell>
                <TableCell className="text-muted-foreground">{formatDate(u.joined)}</TableCell>
                <TableCell className="text-muted-foreground">{u.bookings}</TableCell>
                <TableCell className="text-right">
                  <Button variant={u.status === "active" ? "outline" : "primary"} size="sm">
                    {u.status === "active" ? "Suspendre" : "Réactiver"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

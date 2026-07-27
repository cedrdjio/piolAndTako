import { Flag, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { ADMIN_REVIEWS } from "@/lib/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function AdminReviews() {
  return (
    <div className="space-y-6">
      <PageHeader title="Modération des avis" description="Vérifiez les avis signalés et maintenez la qualité." />

      <Panel title="File de modération">
        <ul className="divide-y divide-border">
          {ADMIN_REVIEWS.map((r) => {
            const flagged = r.rating <= 1;
            return (
              <li key={r.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                <Avatar name={r.author} size={44} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold text-foreground">{r.author}</p>
                    <Rating value={r.rating} variant="stars" />
                    <span className="text-sm text-muted-foreground">· {r.listing}</span>
                    <span className="text-sm text-muted-foreground">· {formatDate(r.date)}</span>
                    {flagged && (
                      <Badge variant="warning">
                        <Flag className="size-3" /> Signalé
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-foreground">{r.comment}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="sm">Approuver</Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="size-4" /> Supprimer
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}

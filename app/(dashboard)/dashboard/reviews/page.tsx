import { MessageSquare, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { HOST_REVIEWS } from "@/lib/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function HostReviews() {
  const avg = (HOST_REVIEWS.reduce((s, r) => s + r.rating, 0) / HOST_REVIEWS.length).toFixed(1);
  const pending = HOST_REVIEWS.filter((r) => !r.replied).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Avis" description="Ce que vos voyageurs pensent de vos annonces." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Note moyenne" value={avg} icon={Star} />
        <StatCard label="Total d'avis" value={String(HOST_REVIEWS.length)} icon={MessageSquare} />
        <StatCard label="À répondre" value={String(pending)} icon={MessageSquare} />
      </div>

      <Panel title="Tous les avis">
        <ul className="divide-y divide-border">
          {HOST_REVIEWS.map((r) => (
            <li key={r.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
              <Avatar name={r.author} size={44} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold text-foreground">{r.author}</p>
                  <Rating value={r.rating} variant="stars" />
                  <span className="text-sm text-muted-foreground">· {r.listing}</span>
                  <span className="text-sm text-muted-foreground">· {formatDate(r.date)}</span>
                </div>
                <p className="mt-2 text-foreground">{r.comment}</p>
              </div>
              <div className="shrink-0">
                {r.replied ? (
                  <span className="text-sm text-success">Répondu</span>
                ) : (
                  <Button variant="outline" size="sm">Répondre</Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

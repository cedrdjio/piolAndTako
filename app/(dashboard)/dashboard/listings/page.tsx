import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoverImage } from "@/components/ui/cover-image";
import { Rating } from "@/components/ui/rating";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { getAllListings } from "@/lib/data/listings";
import { VERTICALS } from "@/lib/constants";
import { formatAmount } from "@/lib/utils";

export default async function HostListings() {
  const listings = (await getAllListings()).slice(0, 8);
  const label = (id: string) => VERTICALS.find((v) => v.id === id)?.labelSingular ?? id;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes annonces"
        description={`${listings.length} annonces publiées`}
        action={
          <Button>
            <Plus className="size-4" /> Nouvelle annonce
          </Button>
        }
      />

      <Panel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Annonce</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
                      <CoverImage seed={l.id} category={l.category} src={l.images[0]} alt={l.title} sizes="48px" className="size-full" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{l.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{l.city}, {l.region}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="neutral">{label(l.category)}</Badge>
                </TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatAmount(l.price)} FCFA
                  <span className="font-normal text-muted-foreground"> /{l.priceUnit}</span>
                </TableCell>
                <TableCell>
                  <Rating value={l.rating} reviews={l.reviewsCount} />
                </TableCell>
                <TableCell>
                  <Badge variant="success">Publiée</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/listing/${l.slug}`}>Voir</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="size-4" /> Modifier
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

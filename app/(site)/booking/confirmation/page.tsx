import Link from "next/link";
import { Check, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getListingBySlug } from "@/lib/data/listings";
import { buildMetadata } from "@/lib/seo";
import { formatAmount } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Réservation confirmée",
  path: "/booking/confirmation",
  noIndex: true,
});

type RawParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

const METHOD_LABEL: Record<string, string> = {
  orange: "Orange Money",
  mtn: "MTN MoMo",
  card: "Carte bancaire",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = await searchParams;
  const ref = one(sp.ref) || "PT-XXXXX";
  const total = Number(one(sp.total)) || 0;
  const email = one(sp.email);
  const method = METHOD_LABEL[one(sp.method)] ?? "Paiement mobile";
  const listing = await getListingBySlug(one(sp.listing));

  return (
    <Container className="flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-success/12 text-success">
        <Check className="size-8" strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Demande envoyée !
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        {listing ? (
          <>
            Votre demande pour{" "}
            <span className="font-medium text-foreground">{listing.title}</span>{" "}
            a bien été enregistrée. L&apos;hôte va la confirmer sous peu.
          </>
        ) : (
          "Votre demande a bien été enregistrée."
        )}
      </p>

      <div className="mt-8 w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-background p-6 text-left shadow-[var(--shadow-sm)]">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Référence</dt>
            <dd className="font-mono font-semibold text-foreground">{ref}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Total</dt>
            <dd className="font-semibold text-foreground">{formatAmount(total)} FCFA</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Paiement</dt>
            <dd className="text-foreground">{method}</dd>
          </div>
        </dl>
        {email && (
          <p className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <Mail className="size-4 shrink-0 text-brand" />
            Un récapitulatif a été envoyé à {email}.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/bookings">Voir mes réservations</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/search">Continuer à explorer</Link>
        </Button>
      </div>
    </Container>
  );
}

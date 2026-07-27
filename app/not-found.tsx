import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo tone="navy" />
      <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Cette page s&apos;est évaporée
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Reprenons votre voyage depuis
        le début.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/search">Explorer les annonces</Link>
        </Button>
      </div>
    </main>
  );
}

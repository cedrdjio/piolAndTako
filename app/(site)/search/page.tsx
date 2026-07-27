import { Suspense } from "react";
import { SearchX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SearchPanel } from "@/components/search/search-panel";
import { CategoryTabs } from "@/components/search/category-tabs";
import { SortSelect } from "@/components/search/sort-select";
import { ListingCard, ListingCardSkeleton } from "@/components/listings/listing-card";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { searchListings } from "@/lib/data/listings";
import { VERTICALS } from "@/lib/constants";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import type { ListingCategory, SearchParams } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Recherche",
  description: "Trouvez logements, voitures et expériences au Cameroun. Filtrez, comparez, réservez.",
  path: "/search",
});

type RawParams = Record<string, string | string[] | undefined>;

function parse(sp: RawParams): SearchParams {
  const str = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const num = (k: string) => {
    const v = str(k);
    return v != null && v !== "" ? Number(v) : undefined;
  };
  return {
    category: str("category") as ListingCategory | undefined,
    query: str("query"),
    city: str("city"),
    type: str("type"),
    guests: num("guests"),
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    sort: str("sort") as SearchParams["sort"],
  };
}

function headline(params: SearchParams): string {
  const vertical = VERTICALS.find((v) => v.id === params.category);
  const noun = vertical ? vertical.label.toLowerCase() : "annonces";
  return params.city ? `${vertical?.label ?? "Résultats"} à ${params.city}` : `Tous les ${noun}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = await searchParams;
  const params = parse(sp);

  return (
    <div className="pt-20 lg:pt-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Recherche", path: "/search" },
        ])}
      />

      {/* Search + filters bar */}
      <div className="border-b border-border bg-surface/60">
        <Container className="py-6">
          <SearchPanel defaultCategory={params.category ?? "property"} compact />
          <div className="mt-5">
            <Suspense fallback={<div className="h-10" />}>
              <CategoryTabs />
            </Suspense>
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {headline(params)}
          </h1>
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>

        <Suspense key={JSON.stringify(params)} fallback={<ResultsSkeleton />}>
          <Results params={params} />
        </Suspense>
      </Container>
    </div>
  );
}

async function Results({ params }: { params: SearchParams }) {
  const results = await searchListings(params);

  if (results.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
          <SearchX className="size-7" />
        </span>
        <h2 className="text-lg font-semibold text-foreground">Aucun résultat</h2>
        <p className="max-w-sm text-muted-foreground">
          Essayez d&apos;élargir votre recherche ou de modifier vos filtres.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mt-2 text-sm text-muted-foreground">
        {results.length} {results.length > 1 ? "résultats" : "résultat"}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((listing, i) => (
          <Reveal key={listing.id} delay={Math.min(i, 8) * 40}>
            <ListingCard
              listing={listing}
              priority={i < 4}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}

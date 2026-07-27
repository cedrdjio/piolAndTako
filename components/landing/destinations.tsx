import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { Reveal } from "@/components/motion/reveal";
import { CITIES } from "@/lib/constants";

export function Destinations() {
  return (
    <Section spacing="md">
      <Container>
        <SectionHeading
          eyebrow="Explorer par ville"
          title="Des adresses dans tout le Cameroun"
          description="De l'effervescence de Douala aux plages de Kribi, trouvez votre prochaine destination."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CITIES.map((city, i) => (
            <Reveal key={city.id} delay={i * 50}>
              <Link
                href={`/search?city=${encodeURIComponent(city.name)}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)]"
              >
                <CoverImage
                  seed={`city-${city.id}`}
                  category="property"
                  alt={`Logements à ${city.name}`}
                  sizes="(max-width: 768px) 45vw, 200px"
                  className="size-full transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-semibold text-white">{city.name}</p>
                  <p className="text-xs text-white/75">{city.listings.toLocaleString("fr-FR")} annonces</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

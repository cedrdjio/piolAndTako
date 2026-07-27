import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const PERKS = [
  "Publiez gratuitement en moins de 10 minutes",
  "Tableau de bord clair et paiements sécurisés",
  "Une audience premium à travers tout le Cameroun",
];

export function Cta() {
  return (
    <Section spacing="md">
      <Container>
        <Reveal>
          <div className="bg-mesh relative overflow-hidden rounded-[var(--radius-2xl)] px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-brand/30 blur-3xl" />
            <Image
              src="/brand/mark-white.png"
              alt=""
              width={728}
              height={513}
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-6 w-1/2 max-w-md opacity-[0.08]"
            />

            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Devenez hôte et faites travailler votre patrimoine
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Logement, voiture ou expérience : partagez ce que vous avez de mieux et générez des
                revenus, en toute sérénité.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-white/90">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Check className="size-3.5" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" variant="primary">
                  <Link href="/host">
                    Devenir hôte
                    <ArrowRight className="size-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/help">En savoir plus</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

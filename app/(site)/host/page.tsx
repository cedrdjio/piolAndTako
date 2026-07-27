import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Car, Compass, TrendingUp } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Faq } from "@/components/landing/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Devenir hôte",
  description:
    "Publiez votre logement, votre voiture ou une expérience sur Piol & Tako et générez des revenus, en toute sérénité.",
  path: "/host",
});

const OFFERS = [
  { icon: Building2, title: "Un logement", desc: "Villa, appartement, studio — accueillez des voyageurs du monde entier." },
  { icon: Car, title: "Une voiture", desc: "Rentabilisez votre véhicule, avec ou sans chauffeur, en toute sécurité." },
  { icon: Compass, title: "Une expérience", desc: "Partagez votre passion et créez des moments inoubliables." },
];

export default function HostPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mesh relative overflow-hidden text-white">
        <div className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full bg-brand/25 blur-[120px]" />
        <Image
          src="/brand/mark-white.png"
          alt=""
          width={728}
          height={513}
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-6 w-1/2 max-w-lg opacity-[0.07]"
        />
        <Container className="relative pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
              <TrendingUp className="size-4 text-brand-100" />
              Rejoignez des milliers d&apos;hôtes
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Transformez ce que vous avez en revenus
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Logement, voiture ou expérience : publiez gratuitement en quelques minutes et touchez
              une audience premium à travers tout le Cameroun.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/auth/register">
                  Commencer maintenant
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#comment">Comment ça marche</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What you can host */}
      <Section spacing="md">
        <Container>
          <SectionHeading eyebrow="Trois façons de gagner" title="Que souhaitez-vous partager ?" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {OFFERS.map((offer, i) => (
              <Reveal key={offer.title} delay={i * 80}>
                <div className="flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-background p-7 shadow-[var(--shadow-sm)] hover-lift">
                  <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
                    <offer.icon className="size-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{offer.title}</h3>
                  <p className="text-muted-foreground">{offer.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <div id="comment">
        <HowItWorks />
      </div>

      <Faq />
    </>
  );
}

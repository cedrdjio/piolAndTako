import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { VERTICALS } from "@/lib/constants";

export function Verticals() {
  return (
    <Section spacing="md">
      <Container>
        <SectionHeading
          eyebrow="Trois univers, une plateforme"
          title="Tout ce qu'il vous faut, au même endroit"
          description="Un logement pour poser vos valises, une voiture pour explorer, une expérience pour s'en souvenir."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.id} delay={i * 80}>
              <Link
                href={v.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border border-border bg-navy p-7 text-white transition-all duration-500 hover:shadow-[var(--shadow-xl)] min-h-[260px]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(150deg,#0a1633 0%,#101f47 45%,#1e5bff 150%)" }}
                />
                <div className="absolute -right-8 -top-10 size-40 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                <div className="relative">
                  <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-white/12 backdrop-blur">
                    <v.icon className="size-6" />
                  </span>
                </div>

                <div className="relative mt-8">
                  <h3 className="text-2xl font-semibold">{v.label}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">{v.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-100">
                    Explorer
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

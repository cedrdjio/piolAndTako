import { Quote } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Reveal } from "@/components/motion/reveal";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <Section spacing="md">
      <Container>
        <SectionHeading
          eyebrow="Ils nous font confiance"
          title="Des milliers de voyageurs conquis"
          description="La note moyenne de 4,9/5 dit tout. Voici ce qu'ils en pensent."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <figure className="flex h-full flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-background p-7 shadow-[var(--shadow-sm)]">
                <Quote className="size-8 text-brand/30" />
                <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <Rating value={t.rating} variant="stars" />
                <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                  <Avatar name={t.name} size={44} />
                  <span>
                    <span className="block font-semibold text-foreground">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <Section spacing="md">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Simple, du début à la fin"
          title="Réserver n'a jamais été aussi fluide"
          description="Quatre étapes, quelques secondes. Nous nous occupons du reste."
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 90} className="relative">
              {i < HOW_IT_WORKS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[3.25rem] top-6 hidden h-px w-full bg-gradient-to-r from-border to-transparent lg:block"
                />
              )}
              <div className="relative flex flex-col gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-navy text-white shadow-[var(--shadow-md)]">
                  <step.icon className="size-5" />
                </span>
                <div>
                  <span className="text-sm font-semibold text-brand">{step.step}</span>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

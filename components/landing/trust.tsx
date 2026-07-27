import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { TRUST_FEATURES } from "@/lib/constants";

export function Trust() {
  return (
    <Container>
      <div className="grid gap-6 rounded-[var(--radius-xl)] border border-border bg-surface p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:gap-8">
        {TRUST_FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 70}>
            <div className="flex flex-col gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
                <feature.icon className="size-5" strokeWidth={2} />
              </span>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

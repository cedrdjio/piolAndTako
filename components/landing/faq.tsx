import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ_ITEMS } from "@/lib/constants";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section spacing="md">
      <JsonLd data={jsonLd} />
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout ce que vous devez savoir"
          description={
            <>
              Vous ne trouvez pas votre réponse ?{" "}
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Contactez-nous
              </Link>
              .
            </>
          }
        />

        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}

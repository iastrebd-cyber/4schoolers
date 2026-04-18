import { Section, FadeIn, Eyebrow } from "./section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "When should we start working with 4Schoolers?",
    a: "The earlier the better — ideally 8th or 9th grade. That said, we work with families at every stage, including focused senior-year application support.",
  },
  {
    q: "What is your acceptance rate to Ivy League schools?",
    a: "97% of our students gain admission to at least one of their top three choices. Roughly 1 in 3 is admitted to an Ivy League institution.",
  },
  {
    q: "Do you guarantee admission to a specific school?",
    a: "No reputable consultant can guarantee admission. What we guarantee is the strongest possible application, a clear strategy, and an honest assessment of your odds.",
  },
  {
    q: "How are sessions structured?",
    a: "Most students meet with their lead consultant 2–4 times per month, with additional async support for essays, school research, and quick questions.",
  },
  {
    q: "Do you offer test prep?",
    a: "Yes — SAT, ACT, AP, and subject-specific tutoring through our academic enrichment program.",
  },
  {
    q: "What does pricing look like?",
    a: "Packages are tailored to grade level and scope. We share transparent pricing during your free 30-minute strategy session.",
  },
  {
    q: "Do you work with international students?",
    a: "Absolutely. We have extensive experience guiding students from Asia, Europe, and the Middle East through US admissions.",
  },
  {
    q: "Are sessions in-person or remote?",
    a: "Both. Boston-area families meet in person; everyone else works with us remotely via video. Quality is identical.",
  },
];

export function FAQ() {
  return (
    <Section ariaLabel="Frequently asked questions" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <FadeIn>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
            Common questions, honest answers.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Don't see yours? Reach out — we reply within one business day.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </Section>
  );
}

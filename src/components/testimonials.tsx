import { Section, FadeIn, Eyebrow } from "./section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "4Schoolers transformed how my daughter approached her applications. The essay coaching alone was worth every penny — she got into Yale early.",
    author: "Priya M.",
    role: "Parent · Yale '28",
  },
  {
    quote: "I came in unsure of where to even apply. By senior year, I had a clear story, a sharpened resume, and acceptances from Princeton and Columbia.",
    author: "Daniel K.",
    role: "Princeton '27",
  },
  {
    quote: "Their interview prep was unmatched. I walked into my Harvard interview feeling like I had been doing this for years.",
    author: "Sarah L.",
    role: "Harvard '26",
  },
  {
    quote: "What sets 4Schoolers apart is the long view — they started with my son in 8th grade and built a real strategy, not a last-minute scramble.",
    author: "Robert C.",
    role: "Parent · MIT '27",
  },
];

export function Testimonials() {
  return (
    <Section ariaLabel="Testimonials">
      <FadeIn>
        <Eyebrow>What families say</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
          Stories from students who got in.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })]}
          className="mt-14"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.author} className="lg:basis-1/2">
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 lg:p-12">
                  <Quote className="h-9 w-9 text-[var(--gold)]" />
                  <blockquote className="mt-6 flex-1 font-serif text-2xl leading-snug text-primary text-balance lg:text-3xl">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 border-t border-border pt-5">
                    <div className="font-semibold text-foreground">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </FadeIn>
    </Section>
  );
}

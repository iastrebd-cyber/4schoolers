import { Section, FadeIn, Eyebrow } from "./section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Amazing tutors. I would not have been accepted into Dartmouth College without 4Schoolers. Their tutors raised my SAT score by nearly 400 points. 4Schoolers has opened so many doors for me.",
    author: "Student",
    role: "Dartmouth College",
  },
  {
    quote:
      "My high-school kids have been with 4Schoolers since elementary school. Both are straight-A students — and one scored in the top 98th percentile on the SAT in 8th grade. What matters most is that they have real confidence and know how to think, not just memorize.",
    author: "Parent of two students",
    role: "Long-time family",
  },
  {
    quote:
      "The wonderful team at 4Schoolers not only helped navigate my daughter through the complicated college admissions process but also ignited her passion for advanced mathematics and gave her life-long skills of quick thinking and problem solving.",
    author: "Parent",
    role: "College admissions client",
  },
  {
    quote:
      "Irina and her staff tutored my son for two years via Skype. As a result of this well-organized tutoring, he was admitted to a very competitive school in New York City.",
    author: "Parent",
    role: "International family",
  },
  {
    quote:
      "Thanks to 4Schoolers, my child — who was failing mathematics — is now pursuing economics in college. He hated math originally, but once he understood it, he fell in love with it. Now he wants to get his PhD.",
    author: "Parent",
    role: "Math turnaround story",
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
              <CarouselItem key={t.author + t.role} className="lg:basis-1/2">
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

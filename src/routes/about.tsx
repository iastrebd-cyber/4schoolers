import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import storyPhoto from "@/assets/articles/why-middle-schoolers-need-counselor/cover.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Founded 2015 by Educators & PhDs | 4Schoolers" },
      {
        name: "description",
        content:
          "4Schoolers was founded in 2015 by Irina Jitomirskaia, Ph.D. Today our team of PhDs, Harvard Medical School faculty, and Olympiad medalists helps families worldwide navigate elite admissions.",
      },
      { property: "og:title", content: "About 4Schoolers" },
      {
        property: "og:description",
        content: "Founded 2015. PhDs, Ivy faculty, and Olympiad medalists guiding ambitious students.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Honesty over hype", d: "We tell families what they need to hear, not what they want to hear." },
  { t: "Long-term relationships", d: "Many of our students have been with us since elementary school." },
  { t: "Senior-only educators", d: "Your child works with PhDs and university faculty. Never juniors." },
  { t: "Outcomes, not optics", d: "We measure ourselves by acceptance letters and student growth." },
];

function AboutPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>About 4Schoolers</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            A team of PhDs, faculty, and Olympiad medalists. In one place.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Founded in 2015, 4Schoolers brings together university professors, Harvard Medical School faculty, and international Olympiad winners to guide ambitious students from middle school through graduate admissions.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-secondary/40 border-y border-border">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[var(--gold)]/15" />
              <div className="overflow-hidden rounded-2xl border border-border shadow-xl shadow-primary/10">
                <img
                  src={storyPhoto}
                  alt="A 4Schoolers educator working one-on-one with a student"
                  width={1080}
                  height={720}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold text-primary lg:text-4xl">
              Founded by an educator who put students first.
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
              <p>
                In 2015, Irina Jitomirskaia, Ph.D., M.Ed. — a mother, teacher, and lifelong advocate for students — founded 4Schoolers in Brookline, Massachusetts. Her thesis was simple: pair every family with senior educators who actually understand the student behind the application.
              </p>
              <p>
                A decade later, we work with families across 24+ countries. Our team includes Harvard Medical School faculty, university professors, Olympiad medalists, and admissions specialists. Every student we work with is paired with the right experts for their goals — and many stay with us from elementary school through college.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="border-t border-border">
        <FadeIn>
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-bold text-primary lg:text-4xl">Our values.</h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <FadeIn key={v.t} delay={i * 0.06}>
              <div className="border-l-2 border-[var(--gold)] pl-6">
                <h3 className="font-serif text-xl font-semibold text-primary">{v.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="text-center border-t border-border">
        <FadeIn>
          <h2 className="font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Meet the people behind the work.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground text-lg">
            See bios for every member of our team — from PhDs to Olympiad medalists.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
              <Link to="/team">Meet the Team</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-primary px-7 text-base text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}

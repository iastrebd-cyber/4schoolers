import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — PhDs, Ivy Faculty & Olympiad Medalists | 4Schoolers" },
      {
        name: "description",
        content:
          "Meet the 4Schoolers team — Harvard Medical School faculty, university professors, Olympiad medalists, and admissions specialists guiding students since 2015.",
      },
      { property: "og:title", content: "Our Team — 4Schoolers" },
      {
        property: "og:description",
        content: "PhDs, Ivy faculty, and Olympiad medalists. Meet the experts behind every 4Schoolers student's success.",
      },
    ],
  }),
  component: TeamPage,
});

export const teamMembers = [
  {
    name: "Irina Jitomirskaia, Ph.D., M.Ed.",
    title: "CEO & Co-Founder",
    bio: "Ph.D. in Psychology, M.Ed. — Moscow State Pedagogical University. Irina founded 4Schoolers in 2015 as a mother, teacher, and advocate for students. She personally oversees relationships with schools, families, and each student's individual journey.",
    initials: "IJ",
  },
  {
    name: "Olga Katkova, Ph.D.",
    title: "Director of Mathematics",
    bio: "Ph.D. in Mathematics, Kharkiv University. Currently a Professor at University of Massachusetts Boston. Leads all math enrichment, competition prep, and advanced coursework.",
    initials: "OK",
  },
  {
    name: "Elena Aristarkhova, Ph.D.",
    title: "Chemistry & Biology — Harvard Medical School Faculty",
    bio: "Ph.D. in Bio-organic Chemistry, Russian Academy of Sciences. Holds dual appointments at Harvard Medical School and Massachusetts General Hospital. 20+ years of teaching experience. Prepares students for SAT, ACT, AP, and MCAT.",
    initials: "EA",
  },
  {
    name: "Alexander Lukyanov, Ph.D.",
    title: "Physics & Mathematics",
    bio: "Visiting Associate Professor and Research Fellow. National grant recipient. Organizer of international academic workshops and reviewer for international scientific journals.",
    initials: "AL",
  },
  {
    name: "Zlatko Vasilkoski, Ph.D.",
    title: "Physics & Data Analytics",
    bio: "Chief Data Scientist. Ph.D. from Tufts University — collaborated on Nobel Prize-winning research in protein folding. Postdoctoral work at MIT and Northeastern. 20+ years teaching at Tufts, MIT, BU, Suffolk, and Bentley.",
    initials: "ZV",
  },
  {
    name: "Alexander Aristarkhov, Ph.D.",
    title: "Biology & Chemistry",
    bio: "Ph.D. in Biochemistry and Molecular Biology. Prepares students for academic competitions and connects them to internships in drug development and biomedical sciences.",
    initials: "AA",
  },
  {
    name: "Daniyar Aubekerov",
    title: "Math Olympiad Coach & Tech Advisor",
    bio: "Silver Medal — National Math Olympiad of Kazakhstan (2012). Silver Medal — Balkan Mathematical Olympiad, Greece (2015). Double Bronze — International Zhautykov Olympiad. Founder of an online platform for math competition students.",
    initials: "DA",
  },
  {
    name: "Yenchi Kuo",
    title: "Academic & Admissions Advisor",
    bio: "B.A. in English Literature, Columbia University. Specializes in essay strategy, school selection, and language-intensive admissions support.",
    initials: "YK",
  },
  {
    name: "Philippe Izedian",
    title: "Academic & Admissions Advisor",
    bio: "With 4Schoolers since founding in 2015. Specialist in SSAT, ACT preparation, writing instruction, and secondary school admissions.",
    initials: "PI",
  },
];

function TeamPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Our team</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            PhDs, Ivy faculty, and Olympiad medalists.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Since 2015, 4Schoolers has built a team that any university would envy — university professors, Harvard Medical School faculty, and international Olympiad winners. Every student works with senior experts. Never juniors.
          </p>
        </FadeIn>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m, i) => (
            <FadeIn key={m.name} delay={(i % 3) * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_18px_40px_-20px_oklch(0.24_0.07_265_/_0.25)]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--gold)] font-serif text-2xl font-bold text-primary-foreground shadow-md">
                  {m.initials}
                </div>
                <h2 className="mt-6 font-serif text-xl font-semibold text-primary">{m.name}</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--gold-foreground)]/80">{m.title}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Work with the experts.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground text-lg">
            Book a free 30-minute consultation to find the right team members for your child's goals.
          </p>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}

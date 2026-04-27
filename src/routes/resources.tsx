import { createFileRoute } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Essays & Field Notes | 4Schoolers" },
      {
        name: "description",
        content:
          "Essays on emotional intelligence, school choice, Ivy League admissions, and the pedagogy behind 4Schoolers' approach.",
      },
      { property: "og:title", content: "Resources — 4Schoolers" },
      {
        property: "og:description",
        content:
          "Essays on emotional intelligence, school choice, Ivy League admissions, and the pedagogy behind 4Schoolers' approach.",
      },
    ],
  }),
  component: ResourcesPage,
});

type Article = {
  tag: string;
  title: string;
  description: string;
  time: string;
  date: string;
  href: string;
  image: string | null;
};

const articles: Article[] = [
  {
    tag: "Emotional Intelligence",
    title: "Emotional Intelligence: why do we care so much about it",
    description:
      "Selective colleges look for students who will thrive not only academically in the classroom, but also socially in the dorms and professionally in their careers. Here is why EQ has become a defining metric of admissions.",
    time: "8 min read",
    date: "July 2024",
    href: "https://4schoolers.com/2024/07/emotional-intelligence-why-do-we-care-so-much-about-it/",
    image:
      "https://4schoolers.com/wp-content/uploads/2024/07/istockphoto-1319802389-612x612-1.jpg",
  },
  {
    tag: "Pedagogy",
    title: "Why Must Students Learn So Much",
    description:
      "A pedagogical answer to a question every parent eventually asks: why ten subjects when a teacher only teaches one — and why much of what is forgotten still shapes how the mind works.",
    time: "12 min read",
    date: "June 2024",
    href: "https://4schoolers.com/2024/06/why-must-students-learn-so-much/",
    image:
      "https://4schoolers.com/wp-content/uploads/2024/06/Image_20240618142326.jpg",
  },
  {
    tag: "Universities",
    title: "Why You Should Apply to Columbia University",
    description:
      "Founded in 1754 as King's College, Columbia remains one of the most distinctive Ivies — a research university wrapped inside a great American city. A close look at what makes it worth the application.",
    time: "10 min read",
    date: "June 2024",
    href: "https://4schoolers.com/2024/06/why-you-should-apply-to-columbia-university/",
    image:
      "https://4schoolers.com/wp-content/uploads/2024/06/gs-student-leadership-awards-2024-photographer-april-renae_53739494474_o.jpg",
  },
  {
    tag: "Student Stories",
    title:
      "4Schoolers Student Interviews Nobel Prize-Winning Physicist Sheldon Glashow",
    description:
      "How student Nichole Wong (Sage School '24), guided by 4Schoolers, secured an interview with Nobel laureate Sheldon Glashow — and what it tells us about the kinds of opportunities a real mentor can open.",
    time: "7 min read",
    date: "April 2024",
    href: "https://4schoolers.com/2024/04/sheldon-glashow/",
    image: null,
  },
  {
    tag: "Strategy",
    title: "Picking a High School for College Admissions Success",
    description:
      "College strategy starts long before 12th grade. The high school you choose shapes the trajectory — and in today's admissions climate, that choice matters more than most families realize.",
    time: "12 min read",
    date: "March 2024",
    href: "https://4schoolers.com/2024/03/picking-a-high-school-for-college-admissions-success/",
    image: null,
  },
  {
    tag: "Early Prep",
    title: "Why Middle Schoolers Should Work with a College Counselor",
    description:
      "The path from middle school to college is full of quiet decision points. Gentle planning early on removes future stress and keeps doors open to specialized programs and the most selective schools.",
    time: "9 min read",
    date: "March 2024",
    href: "https://4schoolers.com/2024/03/why-middle-schoolers-should-work-with-a-college-counselor/",
    image:
      "https://4schoolers.com/wp-content/uploads/2024/03/qtq80-OEUDrQ.jpeg",
  },
  {
    tag: "Universities",
    title: "Why You Should Apply to MIT",
    description:
      "MIT runs one of the nation's most selective undergraduate programs — and one of its most distinctive cultures. A guide to who thrives there, and how to read MIT's signal in your application.",
    time: "11 min read",
    date: "February 2024",
    href: "https://4schoolers.com/2024/02/applying-to-mit/",
    image: null,
  },
];

function ResourcesPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <Eyebrow>Resources</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
          Insights from inside the admissions office.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Field notes and essays from our senior consultants — on character,
          craft, and the long arc of preparation.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <FadeIn key={a.href} delay={i * 0.06}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read article: ${a.title} on 4schoolers.com`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 via-secondary to-[var(--gold)]/20">
                {a.image ? (
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--gold-foreground)]/75">
                {a.tag}
              </span>
              <div className="flex-1">
                <h2 className="mt-2 font-serif text-lg font-semibold text-primary leading-snug">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {a.description}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {a.date} · {a.time}
                </span>
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

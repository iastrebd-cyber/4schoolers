import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { ServicesQuietStrip } from "@/components/services-quiet-strip";
import { TrustBento } from "@/components/trust-bento";
import { ServicesGrid } from "@/components/services-grid";
import { SpecialtyPrograms } from "@/components/specialty-programs";
import { SuccessTimeline } from "@/components/success-timeline";
import { TeamPreview } from "@/components/team-preview";
import { Testimonials } from "@/components/testimonials";
import { UniversityCloud } from "@/components/university-cloud";
import { CountriesStrip } from "@/components/countries-strip";
import { QuizCTA } from "@/components/quiz-cta";
import { FAQ } from "@/components/faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4Schoolers — 97% Success Rate in Elite College Admissions" },
      {
        name: "description",
        content:
          "Elite college admissions consulting since 2015. PhDs, Harvard Medical School faculty, and Olympiad medalists guiding students into Ivy League and top-tier universities.",
      },
      { property: "og:title", content: "4Schoolers — Elite College Admissions Consulting" },
      {
        property: "og:description",
        content: "97% success rate placing students at Ivy League and top-tier universities. Founded 2015.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesQuietStrip />
      <TrustBento />
      <ServicesGrid />
      <SpecialtyPrograms />
      <SuccessTimeline />
      <TeamPreview />
      <Testimonials />
      <UniversityCloud />
      <CountriesStrip />
      <QuizCTA />
      <FAQ />
    </>
  );
}

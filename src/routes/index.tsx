import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { TrustBento } from "@/components/trust-bento";
import { ServicesGrid } from "@/components/services-grid";
import { SuccessTimeline } from "@/components/success-timeline";
import { Testimonials } from "@/components/testimonials";
import { UniversityCloud } from "@/components/university-cloud";
import { QuizCTA } from "@/components/quiz-cta";
import { FAQ } from "@/components/faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4Schoolers — 97% Success Rate in Elite College Admissions" },
      {
        name: "description",
        content:
          "Elite college admissions consulting with 150+ years of combined Ivy League expertise. Counseling, interview prep, internships, and academic enrichment.",
      },
      { property: "og:title", content: "4Schoolers — Elite College Admissions Consulting" },
      {
        property: "og:description",
        content: "97% success rate placing students at Ivy League and top-tier universities.",
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
      <TrustBento />
      <ServicesGrid />
      <SuccessTimeline />
      <Testimonials />
      <UniversityCloud />
      <QuizCTA />
      <FAQ />
    </>
  );
}

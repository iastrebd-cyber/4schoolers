import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="space-y-4">
          <img src={logo} alt="4Schoolers logo" className="h-12 w-auto bg-white/95 rounded-md p-1.5" />
          <p className="max-w-xs text-sm text-primary-foreground/70 leading-relaxed">
            Elite college admissions consulting since 2015. Personalized guidance from PhDs, Ivy faculty, and Olympiad medalists.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/services" className="text-primary-foreground/75 hover:text-[var(--gold)]">Admissions Counseling</Link></li>
            <li><Link to="/services" className="text-primary-foreground/75 hover:text-[var(--gold)]">Interview Preparation</Link></li>
            <li><Link to="/services" className="text-primary-foreground/75 hover:text-[var(--gold)]">Internship Connections</Link></li>
            <li><Link to="/services" className="text-primary-foreground/75 hover:text-[var(--gold)]">Academic Enrichment</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="text-primary-foreground/75 hover:text-[var(--gold)]">About</Link></li>
            <li><Link to="/team" className="text-primary-foreground/75 hover:text-[var(--gold)]">Our Team</Link></li>
            <li><Link to="/success-stories" className="text-primary-foreground/75 hover:text-[var(--gold)]">Success Stories</Link></li>
            <li><Link to="/resources" className="text-primary-foreground/75 hover:text-[var(--gold)]">Resources</Link></li>
            <li><Link to="/quiz" className="text-primary-foreground/75 hover:text-[var(--gold)]">Take the Quiz</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-2.5"><Phone className="mt-0.5 h-4 w-4 text-[var(--gold)]" /><a href="tel:+17817894789" className="hover:text-[var(--gold)]">(781) 789-4789</a></li>
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 h-4 w-4 text-[var(--gold)]" /><a href="mailto:help@4schoolers.com" className="hover:text-[var(--gold)]">help@4schoolers.com</a></li>
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 text-[var(--gold)]" /><span>1309 Beacon Street<br />Brookline, MA</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/55 lg:flex-row lg:px-10">
          <p>© 2026 4Schoolers. Founded 2015. All rights reserved.</p>
          <p>Brookline · Boston · Online</p>
        </div>
      </div>
    </footer>
  );
}

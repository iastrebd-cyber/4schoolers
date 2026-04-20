import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="space-y-4">
          <img src={logo} alt="4Schoolers logo" className="h-12 w-auto" />
          <p className="max-w-xs text-sm text-primary-foreground/70 leading-relaxed">
            Elite college admissions consulting with 150+ years of combined Ivy League expertise.
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
            <li className="flex items-start gap-2.5"><Phone className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> (617) 555-0142</li>
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> hello@4schoolers.com</li>
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> Boston, MA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/55 lg:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} 4Schoolers. All rights reserved.</p>
          <p>Boston · New York · Online</p>
        </div>
      </div>
    </footer>
  );
}

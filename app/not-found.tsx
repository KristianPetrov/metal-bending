import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "./components/page-shell";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Metal Bending Corporation page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell showMobileQuote={false}>
      <main>
        <section className="page-hero page-hero-plain">
          <div className="shell">
            <p className="signal-label signal-dark">
              <span>404</span> Off radius
            </p>
            <h1>This page took the wrong curve.</h1>
            <p>Return to our capabilities or start a quote with the geometry you need.</p>
            <div className="not-found-actions">
              <Link className="button button-dark" href="/">
                <ArrowLeft size={16} aria-hidden="true" /> Return home
              </Link>
              <Link className="button button-outline" href="/#quote">
                Request a quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "./components/page-shell";

export const metadata: Metadata = {
  title: "Not Found",
  description: "This page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell showMobileQuote={false}>
      <main>
        <section className="page-hero page-hero-plain">
          <div className="shell">
            <h1>Not found.</h1>
            <div className="not-found-actions">
              <Link className="button button-dark" href="/">
                <ArrowLeft size={16} aria-hidden="true" /> Home
              </Link>
              <Link className="button button-outline" href="/#quote">
                Quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

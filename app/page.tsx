import { FileDown, Mail, Phone, Printer } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import CurveCalculator from "./components/curve-calculator";
import JsonLd from "./components/json-ld";
import PageShell from "./components/page-shell";
import PressFilm from "./components/press-film";
import QuoteWorkspace from "./components/quote-workspace";
import { about, company, specialties } from "@/lib/site-content";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}): Promise<Metadata> {
  const { payment } = await searchParams;
  return payment
    ? {
        alternates: { canonical: "/" },
        robots: { index: false, follow: false },
      }
    : {};
}

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Precision Stretch Forming | Metal Bending Corporation",
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
      },
      mainEntity: { "@id": `${SITE_URL}/#stretch-forming-video` },
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/#stretch-forming-video`,
      name: "How a stretch press forms a precise metal curve",
      description:
        "A short visualization of stretch forming: the press tensions a metal section, then wraps it around a die to a smooth radius.",
      thumbnailUrl: `${SITE_URL}/stretch-press-poster.jpg`,
      contentUrl: `${SITE_URL}/stretch-press-promo.mp4`,
      duration: "PT11S",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <PageShell>
      <JsonLd data={homeJsonLd} />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-banner"
            src="/og.png"
            alt="Metal Bending Corporation. Precision curves. Zero compromise. Stretch forming, Anaheim, CA."
            fill
            priority
            sizes="100vw"
          />
          <h1 id="hero-title" className="visually-hidden">
            Precision curves. Zero compromise.
          </h1>
          <a className="button button-primary hero-quote" href="#quote">
            Quote
          </a>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title">
          <div className="shell about-layout">
            <div className="about-copy">
              <h2 id="about-title">About</h2>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <dl className="about-facts">
                <div>
                  <dt>Since</dt>
                  <dd>{company.established}</dd>
                </div>
                <div>
                  <dt>Shop</dt>
                  <dd>Anaheim</dd>
                </div>
                <div>
                  <dt>Projects</dt>
                  <dd>Worldwide</dd>
                </div>
              </dl>
            </div>
            <div className="about-film">
              <h3>Stretch forming</h3>
              <p>{about.stretch}</p>
              <PressFilm />
            </div>
          </div>
        </section>

        <section id="capabilities" className="section capabilities-section">
          <div className="shell">
            <header className="section-heading section-heading-simple">
              <h2>Capabilities</h2>
            </header>
            <ul className="capability-cards">
              {specialties.map((specialty) => (
                <li key={specialty.slug}>
                  <a href={`/${specialty.slug}`}>
                    <span className="capability-card-image">
                      <Image src={specialty.image} alt={specialty.title} fill sizes="(max-width: 900px) 100vw, (max-width: 1060px) 50vw, 48vw" />
                    </span>
                    <span className="capability-card-copy">
                      <h3>{specialty.title}</h3>
                      <p>{specialty.detail}</p>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tools" className="section tools-section">
          <div className="shell">
            <header className="section-heading section-heading-simple">
              <h2>Curve tools</h2>
            </header>
            <CurveCalculator />
          </div>
        </section>

        <section id="quote" className="section quote-section">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <h2>Quote</h2>
              <address className="direct-contact">
                <a href={company.phoneHref}>
                  <Phone size={16} aria-hidden="true" /> {company.phone}
                </a>
                <span>
                  <Printer size={16} aria-hidden="true" /> Fax {company.fax}
                </span>
                <a href={company.emailHref}>
                  <Mail size={16} aria-hidden="true" /> {company.email}
                </a>
                <a href={company.orderForm} download>
                  <FileDown size={16} aria-hidden="true" /> Order form
                </a>
              </address>
            </div>
            <QuoteWorkspace initialPaymentComplete={payment === "success"} />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

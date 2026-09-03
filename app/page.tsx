import { ArrowDownRight, ArrowRight, FileDown, Mail, Phone, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CurveCalculator from "./components/curve-calculator";
import HeroSlideshow from "./components/hero-slideshow";
import JsonLd from "./components/json-ld";
import PageShell from "./components/page-shell";
import PressFilm from "./components/press-film";
import QuoteWorkspace from "./components/quote-workspace";
import { company, equipment, processSteps, specialties, story } from "@/lib/site-content";
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
      name: "How a Hufford stretch press forms a precise metal curve",
      description:
        "A short visualization of a Hufford stretch press holding a straight metal section in tension while hydraulic force forms a smooth, repeatable radius.",
      thumbnailUrl: `${SITE_URL}/mbc-animation-poster.jpg`,
      contentUrl: `${SITE_URL}/mbc-animation.mp4`,
      duration: "PT10S",
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
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="signal-label">
                <span>01</span> Precision stretch forming
              </p>
              <h1 id="hero-title">
                Metal,
                <br />
                <span>precisely</span> curved.
              </h1>
              <p className="hero-lede">
                Stretch forming takes just about any customer-supplied metal and achieves a precise radius —
                without notching, crimping, or compromising the profile.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#quote">
                  Start a quote <ArrowDownRight size={17} aria-hidden="true" />
                </a>
                <a className="text-link" href="#capabilities">
                  Explore capabilities <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
            <HeroSlideshow />
          </div>

          <div className="shell hero-specs" aria-label="Company highlights">
            <div>
              <strong>20</strong>
              <span>Ton capacity</span>
            </div>
            <div>
              <strong>2006</strong>
              <span>Established</span>
            </div>
            <div>
              <strong>WTC</strong>
              <span>Brake shapes</span>
            </div>
            <div>
              <strong>Global</strong>
              <span>Delivery</span>
            </div>
          </div>
        </section>

        <div className="material-rail" aria-label="Materials formed">
          <div className="shell">
            <span>Aluminum</span>
            <i />
            <span>Steel</span>
            <i />
            <span>Stainless</span>
            <i />
            <span>Copper</span>
            <i />
            <span>Brass + bronze</span>
          </div>
        </div>

        <section id="about" className="section story-section">
          <div className="shell story-grid">
            <header className="section-heading">
              <p className="signal-label signal-dark">
                <span>02</span> The company
              </p>
              <div>
                <h2>
                  Worldwide leader
                  <br />
                  in metal curving.
                </h2>
                <p>{story.intro}</p>
              </div>
            </header>
            <div className="story-points">
              <article>
                <h3>World Trade Center</h3>
                <p>{story.honor}</p>
              </article>
              <article>
                <h3>What is stretch forming?</h3>
                <p>{story.stretchForming}</p>
              </article>
              <article>
                <h3>Hands-on on every job</h3>
                <p>{story.approach}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="capabilities" className="section capabilities-section">
          <div className="shell">
            <header className="section-heading">
              <p className="signal-label signal-dark">
                <span>03</span> Capabilities
              </p>
              <div>
                <h2>
                  The shape you need.
                  <br />
                  The section you specified.
                </h2>
                <p>Anything from metal framing, storefront, ceiling systems, copper gutters, and aircraft components.</p>
              </div>
            </header>

            <ul className="capability-cards">
              {specialties.map((specialty) => (
                <li key={specialty.slug}>
                  <a href={`/${specialty.slug}`}>
                    <span className="capability-card-image">
                      <Image src={specialty.image} alt={specialty.title} fill sizes="(max-width: 900px) 100vw, (max-width: 1060px) 50vw, 48vw" />
                    </span>
                    <span className="capability-card-copy">
                      <span className="capability-number">{specialty.number}</span>
                      <h3>{specialty.title}</h3>
                      <p>{specialty.summary}</p>
                      <span className="capability-card-link">
                        View specialty <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="press" className="section press-film-section" aria-labelledby="press-film-title">
          <div className="shell">
            <header className="press-film-heading">
              <p className="signal-label">
                <span>04</span> Press in motion
              </p>
              <div>
                <h2 id="press-film-title">
                  Watch a straight section
                  <br />
                  <span>become a precise radius.</span>
                </h2>
                <p>
                  A 10-second visualization of a Hufford stretch press holding material in tension while
                  hydraulic force forms a smooth, repeatable curve.
                </p>
              </div>
            </header>

            <PressFilm />

            <dl className="press-film-specs">
              <div>
                <dt>Machine</dt>
                <dd>Hufford stretch press</dd>
              </div>
              <div>
                <dt>Method</dt>
                <dd>Simultaneous stretch + bend</dd>
              </div>
              <div>
                <dt>Result</dt>
                <dd>Smooth radius / no notching</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="shell">
            <header className="section-heading">
              <p className="signal-label signal-dark">
                <span>05</span> From the shop
              </p>
              <div>
                <h2>
                  Work from the
                  <br />
                  shop floor.
                </h2>
                <p>Framing, glazing, ceilings, copper gutters, and aerospace parts formed in Anaheim.</p>
              </div>
            </header>
            <ul className="work-preview">
              {specialties.map((specialty) => (
                <li key={specialty.slug}>
                  <a href={`/${specialty.slug}`}>
                    <Image src={specialty.image} alt={specialty.title} fill sizes="(max-width: 700px) 100vw, 20vw" />
                    <span>{specialty.navLabel}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link className="text-link work-more" href="/gallery">
              Open the full gallery <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section id="tools" className="section tools-section">
          <div className="shell">
            <header className="tools-heading">
              <div>
                <p className="signal-label"><span>06</span> Curve lab</p>
                <p className="tools-eyebrow">Field tools / live geometry</p>
              </div>
              <div>
                <h2>Measure the opening.<br /><span>Define the curve.</span></h2>
                <p>
                  Turn field dimensions into a centerline radius, check arc length, or plan stud spacing
                  before you request a quote.
                </p>
              </div>
            </header>
            <CurveCalculator />
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="shell">
            <header className="process-heading">
              <p className="signal-label">
                <span>07</span> From file to form
              </p>
              <h2>
                Complex geometry.
                <br />
                <span>Clear process.</span>
              </h2>
            </header>
            <ol className="process-steps">
              {processSteps.map(([number, title, description]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="process-proof">
              Tooling made in-house <i /> Inspected before shipment <i /> Worldwide project support
            </p>
          </div>
        </section>

        <section id="equipment" className="section equipment-teaser">
          <div className="shell equipment-teaser-grid">
            <div>
              <p className="signal-label signal-dark">
                <span>08</span> Shop
              </p>
              <h2>Hufford and Cyril Bath stretch presses, up to 20 tons.</h2>
              <p>Major forming equipment from the Anaheim shop, plus saws, a Mazak V-20, and a full quality-assurance bench.</p>
              <Link className="text-link" href="/manufacturing-equipment">
                Full equipment list <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <ul>
              {equipment.major.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="quote" className="section quote-section">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <p className="signal-label signal-dark">
                <span>09</span> Start a project
              </p>
              <h2>
                Send the curve.
                <br />
                <span>We&apos;ll solve the rest.</span>
              </h2>
              <p>Rough details are enough to begin. A forming specialist will review your project and follow up.</p>
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
                  <FileDown size={16} aria-hidden="true" /> Download order form PDF
                </a>
              </address>
              <div className="quote-coordinate" aria-hidden="true">
                <span>ANAHEIM / CA</span>
                <span>FORMING SINCE / {company.established}</span>
              </div>
            </div>
            <QuoteWorkspace initialPaymentComplete={payment === "success"} />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

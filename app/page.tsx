import { ArrowRight, ArrowUpRight, FileDown, Mail, Phone, Printer } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import CurveCalculator from "./components/curve-calculator";
import JsonLd from "./components/json-ld";
import PageShell from "./components/page-shell";
import PressFilm from "./components/press-film";
import ProfileCatalog from "./components/profile-catalog";
import QuoteWorkspace from "./components/quote-workspace";
import { about, company, equipment, specialties } from "@/lib/site-content";
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

const heroStats = [
  { value: String(company.established), label: "Forming since" },
  { value: "4", label: "Stretch presses" },
  { value: "24′", label: "Press arm length" },
  { value: "12″", label: "Max track width" },
];

const projectProof = [
  "World Trade Center",
  "LAX",
  "Doha International Airport",
  "U.S. military aerospace",
];

const processSteps = [
  {
    title: "Send the section and radius",
    body: "Share a drawing or profile, the material, quantity, and target radius. The shop reviews it for forming and quotes it directly.",
  },
  {
    title: "Die built in-house",
    body: "Forming dies are made in the shop, often before your material arrives, which keeps lead times short.",
  },
  {
    title: "Stretched and formed",
    body: "The section is put in tension and wrapped over the die in one motion, with no notching or crimping, so the profile holds.",
  },
  {
    title: "Checked and shipped",
    body: "Parts are checked against the radius on granite surface plates with calibrated gages before they leave Anaheim.",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <PageShell showFooterCta={false}>
      <JsonLd data={homeJsonLd} />
      <main>
        <section className="hero tone-dark" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Stretch forming · Anaheim, California</p>
              <h1 id="hero-title">
                Precision curves.
                <span>Zero compromise.</span>
              </h1>
              <p className="hero-lede">
                Customer-supplied metal, stretch formed to a smooth, repeatable radius for architectural
                framing, glazing, ceilings, copper gutters, and aerospace components.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#quote">
                  Request a quote <ArrowRight size={16} aria-hidden="true" />
                </a>
                <Link className="button button-outline" href="/gallery">
                  View our work
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <Image
                src="/og.png"
                alt="Stretch-formed aluminum profiles curved to matching radii"
                fill
                preload
                fetchPriority="high"
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
          </div>
          <div className="shell">
            <dl className="hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="proof-strip tone-graphite" aria-label="Project experience">
          <div className="shell proof-inner">
            <p>Project experience</p>
            <ul>
              {projectProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="capabilities" className="section tone-light" aria-labelledby="capabilities-title">
          <div className="shell">
            <header className="section-head">
              <div>
                <p className="eyebrow">01 · Capabilities</p>
                <h2 id="capabilities-title">Five specialties. One standard of precision.</h2>
              </div>
              <p>
                From curved wall framing to aircraft extrusions, every part is formed over a die built for
                the job, so the section holds its shape and the radius repeats.
              </p>
            </header>
            <ul className="capability-grid">
              {specialties.map((specialty) => (
                <li key={specialty.slug}>
                  <Link className="capability-card" href={`/${specialty.slug}`}>
                    <span className="capability-card-image">
                      <Image
                        src={specialty.image}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      />
                    </span>
                    <span className="capability-card-body">
                      <span className="capability-card-number">{specialty.number}</span>
                      <h3>{specialty.title}</h3>
                      <p>{specialty.summary}</p>
                      <span className="capability-card-link">
                        Explore <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <a className="capability-card capability-card-cta" href="#quote">
                  <span className="capability-card-body">
                    <span className="capability-card-number">+</span>
                    <h3>Custom sections</h3>
                    <p>
                      Brake shapes, extrusions, compound radii, and profiles that don&rsquo;t fit a category.
                      Send the drawing and it will be reviewed for forming.
                    </p>
                    <span className="capability-card-link">
                      Send a drawing <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="process" className="section tone-dark" aria-labelledby="process-title">
          <div className="shell">
            <header className="section-head">
              <div>
                <p className="eyebrow">02 · Process</p>
                <h2 id="process-title">How a stretch-formed curve is made.</h2>
              </div>
              <p>{about.stretch}</p>
            </header>
            <div className="process-layout">
              <ol className="process-steps">
                {processSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="process-film">
                <PressFilm />
                <p>Stretch press animation: tension the section, then wrap it over the die.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section tone-mist" aria-labelledby="about-title">
          <div className="shell about-layout">
            <figure className="about-image">
              <Image
                src="/projects/hero.jpg"
                alt="Curved steel framing members forming a vaulted roof structure"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>
            <div className="about-copy">
              <p className="eyebrow">03 · About</p>
              <h2 id="about-title">Formed in Anaheim. Installed worldwide.</h2>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <dl className="about-facts">
                <div>
                  <dt>Established</dt>
                  <dd>{company.established}</dd>
                </div>
                <div>
                  <dt>Shop</dt>
                  <dd>Anaheim, CA</dd>
                </div>
                <div>
                  <dt>Run size</dt>
                  <dd>1 to 1,000</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section section-tight tone-graphite equipment-band" aria-labelledby="equipment-title">
          <div className="shell">
            <header className="section-head section-head-row">
              <div>
                <p className="eyebrow">The press line</p>
                <h2 id="equipment-title">Built on Hufford and Cyril Bath stretch presses.</h2>
              </div>
              <Link className="button button-outline" href="/manufacturing-equipment">
                Full equipment list <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </header>
            <ul className="equipment-cards">
              {equipment.major.map((item) => (
                <li key={item}>
                  <span>{item.match(/^\((\d+)\)/)?.[1] ?? "1"}×</span>
                  <p>{item.replace(/^\(\d+\)\s*/, "")}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="profiles" className="section tone-light" aria-labelledby="profiles-title">
          <div className="shell">
            <header className="section-head">
              <div>
                <p className="eyebrow">04 · Profiles</p>
                <h2 id="profiles-title">Standard profiles, formed to your radius.</h2>
              </div>
              <p>Common framing and gutter sections the shop curves every week. Custom sections are reviewed from your drawing.</p>
            </header>
            <div className="home-profiles">
              <div>
                <h3>Framing profiles</h3>
                <ProfileCatalog
                  groups={specialties.find((item) => item.slug === "curved-metal-framing")!.catalog!}
                  href="/curved-metal-framing#profiles"
                />
              </div>
              <div>
                <h3>Radius gutter profiles</h3>
                <ProfileCatalog
                  groups={specialties.find((item) => item.slug === "copper-gutters")!.catalog!}
                  href="/copper-gutters#profiles"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="section tone-dark" aria-labelledby="tools-title">
          <div className="shell">
            <header className="section-head">
              <div>
                <p className="eyebrow">05 · Curve tools</p>
                <h2 id="tools-title">Work out the radius before you call.</h2>
              </div>
              <p>
                Find a centerline radius from an opening and rise, get arc length from a radius and angle, or
                lay out stud spacing along a curve. Send the numbers straight into a quote.
              </p>
            </header>
            <CurveCalculator />
          </div>
        </section>

        <section id="quote" className="section tone-mist quote-section" aria-labelledby="quote-title">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <p className="eyebrow">06 · Quote</p>
              <h2 id="quote-title">Request a quote</h2>
              <p>
                Tell us the section, material, quantity, and radius. Drawings help: PDF, DWG, DXF, STEP, and
                IGES are all accepted.
              </p>
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
                  <FileDown size={16} aria-hidden="true" /> Download the order form
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

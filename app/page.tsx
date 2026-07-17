import Image from "next/image";
import { ArrowDownRight, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import QuoteWorkspace from "./components/quote-workspace";
import SiteHeader from "./components/site-header";

const capabilities = [
  {
    number: "01",
    title: "Architectural framing",
    description: "Track, angle, hat channel, and brake shapes for arches, walls, soffits, and domes.",
    detail: "Simple + compound radii",
  },
  {
    number: "02",
    title: "Glass & glazing",
    description: "Storefront systems, pressure plates, caps, handrails, and thermal-break extrusions.",
    detail: "Profile integrity preserved",
  },
  {
    number: "03",
    title: "Specialty profiles",
    description: "Ceiling systems, copper gutters, aerospace parts, and one-off custom components.",
    detail: "One part or production runs",
  },
];

const steps = [
  ["01", "Share the geometry", "Send a drawing, CAD file, or rough dimensions."],
  ["02", "We form the curve", "In-house tooling creates a smooth, controlled radius."],
  ["03", "Install with confidence", "Every part is inspected, protected, and shipped ready."],
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <div id="top" className="site-frame">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="signal-label"><span>01</span> Precision stretch forming</p>
              <h1 id="hero-title">
                Metal,<br />
                <span>precisely</span> curved.
              </h1>
              <p className="hero-lede">
                Smooth, accurate radii without notching, crimping, or compromising the profile.
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

            <div className="hero-visual">
              <div className="hero-image">
                <Image
                  src="/og.png"
                  alt="Precision-formed curved metal profiles"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 48vw"
                />
                <div className="hero-grid-overlay" aria-hidden="true" />
              </div>
              <div className="radius-graphic" aria-hidden="true">
                <span className="radius-line" />
                <span className="radius-point" />
                <small>R / CONTROLLED</small>
              </div>
              <div className="visual-index" aria-hidden="true">
                <span>FORM / 01</span>
                <span>33.8366° N</span>
              </div>
            </div>
          </div>

          <div className="shell hero-specs" aria-label="Company highlights">
            <div><strong>20</strong><span>Ton capacity</span></div>
            <div><strong>2006</strong><span>Established</span></div>
            <div><strong>∞</strong><span>Project radius</span></div>
            <div><strong>Global</strong><span>Delivery</span></div>
          </div>
        </section>

        <div className="material-rail" aria-label="Materials formed">
          <div className="shell">
            <span>Aluminum</span><i />
            <span>Steel</span><i />
            <span>Stainless</span><i />
            <span>Copper</span><i />
            <span>Brass + bronze</span>
          </div>
        </div>

        <section id="capabilities" className="section capabilities-section">
          <div className="shell">
            <header className="section-heading">
              <p className="signal-label signal-dark"><span>02</span> Capabilities</p>
              <div>
                <h2>The shape you need.<br />The section you specified.</h2>
                <p>Stretch forming keeps complex profiles clean, continuous, and repeatable.</p>
              </div>
            </header>

            <ol className="capability-list">
              {capabilities.map((capability) => (
                <li key={capability.title}>
                  <span className="capability-number">{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <span className="capability-detail">{capability.detail}</span>
                  <ArrowDownRight aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="shell">
            <header className="process-heading">
              <p className="signal-label"><span>03</span> From file to form</p>
              <h2>Complex geometry.<br /><span>Clear process.</span></h2>
            </header>
            <ol className="process-steps">
              {steps.map(([number, title, description]) => (
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

        <section id="quote" className="section quote-section">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <p className="signal-label signal-dark"><span>04</span> Start a project</p>
              <h2>Send the curve.<br /><span>We&apos;ll solve the rest.</span></h2>
              <p>Rough details are enough to begin. A forming specialist will review your project and follow up.</p>
              <address className="direct-contact">
                <a href="tel:+17142381200"><Phone size={16} aria-hidden="true" /> (714) 238-1200</a>
                <a href="mailto:metalbending1@gmail.com"><Mail size={16} aria-hidden="true" /> metalbending1@gmail.com</a>
              </address>
              <div className="quote-coordinate" aria-hidden="true">
                <span>ANAHEIM / CA</span>
                <span>FORMING SINCE / 2006</span>
              </div>
            </div>
            <QuoteWorkspace initialPaymentComplete={payment === "success"} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <a className="footer-brand" href="#top">MBC<span>®</span></a>
          <p>Precision stretch forming<br />for ambitious geometry.</p>
          <address>
            <a href="https://maps.google.com/?q=1563+W+Embassy+St+Anaheim+CA+92802" target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" /> 1563 W. Embassy St., Anaheim, CA 92802
            </a>
            <a href="tel:+17142381200"><Phone aria-hidden="true" /> (714) 238-1200</a>
          </address>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Metal Bending Corporation</span>
          <span>Built around the curve</span>
        </div>
      </footer>
      <a className="mobile-quote-button" href="#quote">Request a quote <ArrowRight size={16} aria-hidden="true" /></a>
    </div>
  );
}

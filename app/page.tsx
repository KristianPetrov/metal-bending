import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Check,
  CircleGauge,
  DraftingCompass,
  Factory,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import QuoteWorkspace from "./components/quote-workspace";
import SiteHeader from "./components/site-header";

const services = [
  {
    number: "01",
    title: "Curved metal framing",
    description:
      "Smooth track, angle, hat channel, expansion joints, and custom profiles for arches, walls, soffits, and domes.",
    detail: "Up to 12 in. wide · 12 gauge",
    image: "/projects/framing.jpg",
    alt: "Curved metal framing installed on an architectural structure",
  },
  {
    number: "02",
    title: "Glass & glazing",
    description:
      "Angles, channels, tubes, pressure plates, caps, thermal-break extrusions, handrails, and storefront systems.",
    detail: "Aluminum · steel · brass · bronze",
    image: "/projects/glazing.jpg",
    alt: "Curved glazing system on a finished commercial building",
  },
  {
    number: "03",
    title: "Ceiling components",
    description:
      "Rings, waves, cones, arches, vaults, and compound radii for standard systems and custom brake shapes.",
    detail: "Simple to compound radii",
    image: "/projects/ceiling.jpg",
    alt: "Curved ceiling and structural metal components",
  },
  {
    number: "04",
    title: "Copper gutters",
    description:
      "Seamless custom gutters, coping, scuppers, and caps that follow complex fascia without distorting the profile.",
    detail: "Half round · K-style · custom",
    image: "/projects/gutters.jpg",
    alt: "Custom curved copper gutter on an architectural detail",
  },
];

const steps = [
  {
    icon: FileCheck2,
    title: "Send the shape",
    description: "Upload a drawing, CAD file, or rough dimensions. Tell us the alloy, quantity, and target radius if known.",
  },
  {
    icon: DraftingCompass,
    title: "We engineer the curve",
    description: "Our team reviews profile behavior, tolerances, tangents, and tooling, then returns a clear quote.",
  },
  {
    icon: Wrench,
    title: "We form & inspect",
    description: "Material is stretched and bent over an in-house die for a smooth, repeatable contour without notching.",
  },
  {
    icon: PackageCheck,
    title: "Ready to install",
    description: "Parts are checked, protected, and prepared for pickup or shipment to your project anywhere in the world.",
  },
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
          <div className="hero-grid shell">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Stretch forming · One part or one thousand</p>
              <h1 id="hero-title">Precision curves.<br /><em>Zero compromise.</em></h1>
              <p className="hero-lede">
                We stretch form customer-supplied metal into smooth, accurate radii—without notching,
                crimping, or distorting the profile.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#quote">
                  Start your quote <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="button button-outline-light" href="#services">
                  Explore capabilities
                </a>
              </div>
              <ul className="hero-proof" aria-label="Service advantages">
                <li><Check aria-hidden="true" /> Tight, repeatable tolerances</li>
                <li><Check aria-hidden="true" /> Tooling made in-house</li>
                <li><Check aria-hidden="true" /> Worldwide project support</li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <Image
                  src="/projects/hero.jpg"
                  alt="Large curved architectural ceiling formed with repeating metal members"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
                <div className="hero-image-shade" />
                <div className="radius-arc" aria-hidden="true"><span /></div>
                <div className="hero-measure" aria-hidden="true"><span>R</span><i /></div>
                <div className="hero-spec-card">
                  <span className="status-dot" />
                  <div><small>FORMING METHOD</small><strong>Stretch + bend</strong></div>
                  <span className="spec-tag">No distortion</span>
                </div>
              </div>
              <p className="image-caption"><span>PROJECT  /  CURVED CEILING SYSTEM</span><span>ANAHEIM, CA</span></p>
            </div>
          </div>
        </section>

        <section className="stat-rail" aria-label="Company highlights">
          <div className="shell stats-grid">
            <div><strong>2006</strong><span>Forming since</span></div>
            <div><strong>24<sup>ft</sup></strong><span>Maximum arm reach</span></div>
            <div><strong>20<sup>ton</sup></strong><span>Stretch-wrap capacity</span></div>
            <div><strong>Global</strong><span>Project delivery</span></div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="shell">
            <div className="section-heading services-heading">
              <div>
                <p className="eyebrow eyebrow-dark"><span /> What we curve</p>
                <h2>Built for the curves<br />other shops avoid.</h2>
              </div>
              <p>
                From standard framing to complex architectural extrusions, our process preserves the
                section while producing smooth, even contours with excellent repeatability.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-image">
                    <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                    <span>{service.number}</span>
                  </div>
                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <small>{service.detail}</small>
                  </div>
                </article>
              ))}
            </div>
            <div className="specialty-line">
              <span><Sparkles size={16} aria-hidden="true" /> Also forming aerospace components, custom brake shapes, store fixtures, and specialty profiles.</span>
              <a href="#quote">Have something unusual? Let&apos;s talk. <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="shell process-grid">
            <div className="process-intro">
              <p className="eyebrow"><span /> From file to formed part</p>
              <h2>A complex process.<br /><em>Made straightforward.</em></h2>
              <p>
                Stretch forming applies tension while the material wraps over a die. The result is a clean,
                controlled radius with less springback and a profile that stays intact.
              </p>
              <a className="text-link" href="#quote">Send us your project <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
            <ol className="process-list">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="process-number">0{index + 1}</span>
                  <span className="process-icon"><step.icon aria-hidden="true" /></span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="equipment" className="section equipment-section">
          <div className="shell equipment-grid">
            <div className="equipment-photo">
              <Image
                src="/projects/framing.jpg"
                alt="Curved metal framing at a large construction project"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className="equipment-photo-label"><Factory aria-hidden="true" /><span>In-house tooling<br /><strong>Faster setup. Better control.</strong></span></div>
            </div>
            <div className="equipment-copy">
              <p className="eyebrow eyebrow-dark"><span /> Equipment & quality</p>
              <h2>The capacity to<br />hold the line.</h2>
              <p className="equipment-lede">
                Our Anaheim shop combines heavy stretch-forming equipment with precision inspection tools,
                so the curve on the floor matches the curve on your drawing.
              </p>
              <div className="equipment-specs">
                <div><Box aria-hidden="true" /><span><strong>17.5-ton</strong><small>Two A-10 Hufford presses with 24 ft. arms</small></span></div>
                <div><CircleGauge aria-hidden="true" /><span><strong>20-ton</strong><small>Cyril Bath V20 stretch-wrap forming machine</small></span></div>
                <div><BadgeCheck aria-hidden="true" /><span><strong>Precision QA</strong><small>Surface plates, calipers, micrometers, height gage, and gage blocks</small></span></div>
              </div>
              <a className="button button-dark" href="#quote">Request a capability review <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="about" className="section trust-section">
          <div className="shell trust-grid">
            <div className="trust-statement">
              <ShieldCheck aria-hidden="true" />
              <p>Hands-on from the first drawing to the final inspection.</p>
            </div>
            <div className="trust-copy">
              <p className="eyebrow"><span /> Proven on demanding work</p>
              <h2>When the radius matters,<br />experience matters more.</h2>
              <p>
                Since 2006, Metal Bending Corporation has formed parts for projects across the world—from
                international airports and the World Trade Center to aerospace components for the U.S. military.
                Every order receives the same attention, whether it is one piece or one thousand.
              </p>
              <div className="trust-points">
                <span><Globe2 aria-hidden="true" /><strong>Worldwide reach</strong><small>Projects shipped globally</small></span>
                <span><ShieldCheck aria-hidden="true" /><strong>Quality first</strong><small>Measured at every stage</small></span>
              </div>
            </div>
          </div>
        </section>

        <section id="quote" className="section quote-section">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <p className="eyebrow eyebrow-dark"><span /> Get started</p>
              <h2>Show us the curve.<br />We&apos;ll take it from here.</h2>
              <p>
                Upload a drawing or tell us what you know. A forming specialist will review the request and
                help close any gaps before we quote it.
              </p>
              <div className="quote-benefits">
                <span><Check aria-hidden="true" /><span><strong>Fast technical review</strong><small>Real feedback from an experienced forming team.</small></span></span>
                <span><Check aria-hidden="true" /><span><strong>Secure file upload</strong><small>PDF, DWG, DXF, STEP, IGES, and more.</small></span></span>
                <span><Check aria-hidden="true" /><span><strong>Simple online payment</strong><small>Pay approved invoices and deposits securely.</small></span></span>
              </div>
              <div className="direct-contact">
                <p>Prefer to talk it through?</p>
                <a href="tel:+17142381200"><Phone size={17} aria-hidden="true" /> (714) 238-1200</a>
                <a href="mailto:metalbending1@gmail.com"><Mail size={17} aria-hidden="true" /> metalbending1@gmail.com</a>
              </div>
            </div>
            <QuoteWorkspace initialPaymentComplete={payment === "success"} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-top">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#top" aria-label="Metal Bending Corporation home">
              <span className="brand-mark" aria-hidden="true"><span /></span>
              <span className="brand-copy"><strong>Metal Bending</strong><small>Corporation</small></span>
            </a>
            <p>Precision stretch forming for architectural, commercial, and specialty metal projects.</p>
          </div>
          <div className="footer-column"><h3>Capabilities</h3><a href="#services">Metal framing</a><a href="#services">Glass & glazing</a><a href="#services">Ceiling components</a><a href="#services">Copper gutters</a></div>
          <div className="footer-column"><h3>Company</h3><a href="#process">Our process</a><a href="#equipment">Equipment</a><a href="#about">About us</a><a href="#quote">Request a quote</a></div>
          <address className="footer-column footer-contact"><h3>Contact</h3><a href="https://maps.google.com/?q=1563+W+Embassy+St+Anaheim+CA+92802" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" />1563 W. Embassy St.<br />Anaheim, CA 92802</a><a href="tel:+17142381200"><Phone aria-hidden="true" />(714) 238-1200</a><a href="mailto:metalbending1@gmail.com"><Mail aria-hidden="true" />metalbending1@gmail.com</a></address>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Metal Bending Corporation</span><span>Precision formed in Anaheim, California</span></div>
      </footer>
      <a className="mobile-quote-button" href="#quote">Request a quote <ArrowRight size={16} aria-hidden="true" /></a>
    </div>
  );
}

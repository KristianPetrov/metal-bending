import { ArrowRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { company, designer, specialties } from "@/lib/site-content";
import BrandMark from "./brand-mark";

export default function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="site-footer tone-dark">
      {showCta && (
        <div className="shell footer-cta">
          <div>
            <p className="eyebrow">Start a project</p>
            <h2>Have a curve to form?</h2>
            <p>Send the section, material, and radius. The shop reviews every drawing and gets back to you directly.</p>
          </div>
          <div className="footer-cta-actions">
            <Link className="button button-primary" href="/#quote">
              Request a quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a className="button button-outline" href={company.phoneHref}>
              <Phone size={16} aria-hidden="true" /> {company.phone}
            </a>
          </div>
        </div>
      )}
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link className="footer-logo-plate steel-surface" href="/" aria-label={`${company.name} home`}>
            <BrandMark className="footer-logo" sizes="280px" />
          </Link>
          <p>Precision stretch forming for architecture and aerospace. Anaheim, California, since {company.established}.</p>
        </div>
        <nav className="footer-col" aria-label="Capabilities">
          <h3>Capabilities</h3>
          {specialties.map((specialty) => (
            <Link key={specialty.slug} href={`/${specialty.slug}`}>
              {specialty.navLabel}
            </Link>
          ))}
        </nav>
        <nav className="footer-col" aria-label="Company">
          <h3>Company</h3>
          <Link href="/#about">About</Link>
          <Link href="/#process">Process</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/manufacturing-equipment">Equipment</Link>
          <Link href="/#tools">Curve tools</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <address className="footer-col">
          <h3>Contact</h3>
          <a href={company.mapHref} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" /> {company.address}
          </a>
          <a href={company.phoneHref}>
            <Phone aria-hidden="true" /> {company.phone}
          </a>
          <span>
            <Printer aria-hidden="true" /> Fax {company.fax}
          </span>
          <a href={company.emailHref}>
            <Mail aria-hidden="true" /> {company.email}
          </a>
        </address>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <a href={designer.url} target="_blank" rel="noopener noreferrer">
          Site by {designer.name}
        </a>
      </div>
    </footer>
  );
}

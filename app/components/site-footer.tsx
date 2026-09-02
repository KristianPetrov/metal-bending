import { Mail, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { company, specialties } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <Link className="footer-brand" href="/">
          {company.shortName}
          <span>®</span>
        </Link>
        <p>
          Precision stretch forming
          <br />
          for ambitious geometry.
        </p>
        <nav className="footer-links" aria-label="Services and company">
          <strong>Explore</strong>
          {specialties.map((specialty) => (
            <Link key={specialty.slug} href={`/${specialty.slug}`}>
              {specialty.navLabel}
            </Link>
          ))}
          <Link href="/gallery">Project gallery</Link>
          <Link href="/manufacturing-equipment">Equipment</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <address>
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
        <span>Forming since {company.established}</span>
      </div>
    </footer>
  );
}

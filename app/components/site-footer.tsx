import { Mail, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { company, designer, specialties } from "@/lib/site-content";
import BrandMark from "./brand-mark";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <Link className="footer-brand" href="/" aria-label={`${company.name} home`}>
          <BrandMark className="footer-logo" />
        </Link>
        <nav className="footer-links" aria-label="Services and company">
          {specialties.map((specialty) => (
            <Link key={specialty.slug} href={`/${specialty.slug}`}>
              {specialty.navLabel}
            </Link>
          ))}
          <Link href="/gallery">Gallery</Link>
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
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <a href={designer.url} target="_blank" rel="noopener noreferrer">
            {designer.name}
          </a>
        </div>
      </div>
    </footer>
  );
}

import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { company } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <a className="footer-brand" href="/">
          {company.shortName}
          <span>®</span>
        </a>
        <p>
          Precision stretch forming
          <br />
          for ambitious geometry.
        </p>
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

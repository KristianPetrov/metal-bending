"use client";

import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { company } from "@/lib/site-content";
import BrandMark from "./brand-mark";

const links = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#tools", label: "Curve tools" },
  { href: "/gallery", label: "Gallery" },
  { href: "/manufacturing-equipment", label: "Equipment" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${company.name} home`}>
          <BrandMark className="brand-logo" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={company.phoneHref}>
            <Phone size={15} aria-hidden="true" /> {company.phone}
          </a>
          <Link className="button button-primary button-sm header-cta" href="/#quote">
            Request a quote
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        <div className="shell">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
          <Link className="button button-primary" href="/#quote" onClick={() => setOpen(false)}>
            Request a quote
          </Link>
          <a className="mobile-nav-phone" href={company.phoneHref} onClick={() => setOpen(false)}>
            <Phone size={16} aria-hidden="true" /> {company.phone}
          </a>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { company } from "@/lib/site-content";
import BrandMark from "./brand-mark";

const links = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/gallery", label: "Work" },
  { href: "/#tools", label: "Curve tools" },
  { href: "/#process", label: "Process" },
  { href: "/manufacturing-equipment", label: "Equipment" },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${company.name} home`}>
      <BrandMark className="brand-mark" />
      <span className="brand-copy">
        <strong>Metal Bending</strong>
        <small>Corporation</small>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/#quote">
          Request a quote <ArrowUpRight size={15} aria-hidden="true" />
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
      <nav id="mobile-menu" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href={company.phoneHref} onClick={() => setOpen(false)}>
          Call {company.phone}
        </a>
      </nav>
    </header>
  );
}

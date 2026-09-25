"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { company } from "@/lib/site-content";
import BrandMark from "./brand-mark";

const links = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#tools", label: "Tools" },
  { href: "/gallery", label: "Gallery" },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${company.name} home`}>
      <BrandMark className="brand-logo" />
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
          Quote
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
          {company.phone}
        </a>
      </nav>
    </header>
  );
}

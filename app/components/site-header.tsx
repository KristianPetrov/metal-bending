"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#quote", label: "Quote" },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Metal Bending Corporation home">
      <span className="brand-mark" aria-hidden="true"><i /><i /></span>
      <span className="brand-copy"><strong>Metal Bending</strong><small>Corporation</small></span>
    </a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="header-cta" href="#quote">
          Request a quote <ArrowUpRight size={15} aria-hidden="true" />
        </a>
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
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
        <a href="tel:+17142381200" onClick={() => setOpen(false)}>Call (714) 238-1200</a>
      </nav>
    </header>
  );
}

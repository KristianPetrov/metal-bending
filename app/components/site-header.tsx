"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#services", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#equipment", label: "Equipment" },
  { href: "#about", label: "About" },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Metal Bending Corporation home">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-copy">
        <strong>Metal Bending</strong>
        <small>Corporation</small>
      </span>
    </a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>Precision stretch forming since 2006</span>
          <span className="utility-location">Anaheim, California · Shipping worldwide</span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="phone-link" href="tel:+17142381200" aria-label="Call Metal Bending Corporation">
              <Phone size={16} aria-hidden="true" />
              <span>(714) 238-1200</span>
            </a>
            <a className="button button-small button-light" href="#quote">
              Request a quote
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
        </div>
        <nav
          id="mobile-menu"
          className={`mobile-nav ${open ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="tel:+17142381200" onClick={() => setOpen(false)}>
            Call (714) 238-1200
          </a>
          <a className="button button-light" href="#quote" onClick={() => setOpen(false)}>
            Request a quote
          </a>
        </nav>
      </header>
    </>
  );
}
